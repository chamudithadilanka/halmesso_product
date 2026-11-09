import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * WebGL hero: a glossy stand-up pouch printed with the real pack art
 * (Masala on the front, Garlic on the back), a school of silver sprats
 * orbiting it, drifting spice dust and a few curry leaves.
 *
 * Scroll progress (0 → 1) flips the pouch from front to back.
 * Pure three.js — React only creates/disposes it.
 */

/** Pouch region inside the 1199×1312 product photos (UV space, v from bottom). */
const UV_CROP = { u0: 0.098, u1: 0.912, v0: 0.022, v1: 0.988 };
const POUCH_W = 2.1;
const POUCH_H = 2.72;
const POUCH_DEPTH = 0.4;
const CAMERA_Z = 9;

const SPICE_COLORS = ["#d4661f", "#e7a83b", "#a84a12", "#7a4527", "#c49a78", "#46943a"];

type Options = {
  canvas: HTMLCanvasElement;
  /** Element whose box the pouch should fill. */
  stage?: HTMLElement | null;
  frontSrc: string;
  backSrc: string;
  reducedMotion: boolean;
  onReady?: () => void;
};

type FishParams = { radius: number; angle: number; speed: number; y: number; scale: number; phase: number };

function buildPouchGeometry(): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(POUCH_W, POUCH_H, 48, 64);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    const bx = Math.pow(Math.sin(Math.PI * u), 0.55);
    let by = Math.pow(Math.sin(Math.PI * v), 0.3);
    // Flat heat-sealed band across the top of the pouch.
    if (v > 0.9) by *= Math.pow(Math.max(0, 1 - (v - 0.9) / 0.1), 1.5);
    pos.setZ(i, POUCH_DEPTH * bx * by);
    uv.setXY(i, UV_CROP.u0 + u * (UV_CROP.u1 - UV_CROP.u0), UV_CROP.v0 + v * (UV_CROP.v1 - UV_CROP.v0));
  }
  geo.computeVertexNormals();
  return geo;
}

/** Thin crimped frame around the pouch edge where front and back meet. */
function buildSealGeometry(): THREE.BufferGeometry {
  const ow = (POUCH_W * 1.03) / 2;
  const oh = (POUCH_H * 1.015) / 2;
  const iw = (POUCH_W * 0.985) / 2;
  const ih = (POUCH_H * 0.99) / 2;
  const outer = new THREE.Shape();
  outer.moveTo(-ow, -oh).lineTo(ow, -oh).lineTo(ow, oh).lineTo(-ow, oh).closePath();
  const hole = new THREE.Path();
  hole.moveTo(-iw, -ih).lineTo(-iw, ih).lineTo(iw, ih).lineTo(iw, -ih).closePath();
  outer.holes.push(hole);
  return new THREE.ShapeGeometry(outer);
}

function buildFishGeometry(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(0.5, 0);
  s.bezierCurveTo(0.36, 0.12, 0.02, 0.12, -0.3, 0.025);
  s.lineTo(-0.5, 0.13);
  s.lineTo(-0.43, 0);
  s.lineTo(-0.5, -0.13);
  s.lineTo(-0.3, -0.025);
  s.bezierCurveTo(0.02, -0.1, 0.36, -0.1, 0.5, 0);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 10,
  });
  geo.center();
  // Model points along +x; lookAt() aims +z, so turn the nose to +z.
  geo.rotateY(-Math.PI / 2);
  return geo;
}

function buildLeafGeometry(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, -0.5);
  s.quadraticCurveTo(0.34, -0.1, 0, 0.5);
  s.quadraticCurveTo(-0.34, -0.1, 0, -0.5);
  return new THREE.ShapeGeometry(s, 10);
}

function buildDotTexture(): THREE.Texture {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class HeroScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  private world = new THREE.Group();
  private pouch = new THREE.Group();
  private fish: THREE.InstancedMesh;
  private fishParams: FishParams[] = [];
  private dust: THREE.Points;
  private dustSpeeds: Float32Array;
  private leaves: { mesh: THREE.Mesh; base: THREE.Vector3; phase: number }[] = [];
  private rim: THREE.DirectionalLight;
  private envTexture: THREE.Texture;
  private dummy = new THREE.Object3D();
  private rimFrom = new THREE.Color("#ff9a4d");
  private rimTo = new THREE.Color("#c48ae0");
  private timer = new THREE.Timer();
  private resizeObserver: ResizeObserver;

  private progress = 0;
  private smoothProgress = 0;
  private pointer = new THREE.Vector2();
  private smoothPointer = new THREE.Vector2();
  private portrait = false;
  private running = false;
  private raf = 0;
  private texturesLoaded = 0;
  private disposed = false;

  constructor(private opts: Options) {
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: !mobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    this.scene.environment = this.envTexture;
    this.scene.environmentIntensity = 0.55;

    this.camera.position.set(0, 0, CAMERA_Z);

    // Lights
    const key = new THREE.DirectionalLight("#fff1dc", 2.4);
    key.position.set(3, 4, 6);
    this.rim = new THREE.DirectionalLight(this.rimFrom.clone(), 2.2);
    this.rim.position.set(-5, 2, -3);
    const fill = new THREE.HemisphereLight("#fff6e8", "#4a2513", 0.7);
    this.scene.add(key, this.rim, fill);

    // Pouch (front = first flavour, back = second flavour)
    const loader = new THREE.TextureLoader();
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    const makeMaterial = (src: string) => {
      const tex = loader.load(src, () => this.onTextureLoaded());
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0,
        clearcoat: 0.7,
        clearcoatRoughness: 0.3,
      });
    };
    const pouchGeo = buildPouchGeometry();
    const front = new THREE.Mesh(pouchGeo, makeMaterial(opts.frontSrc));
    const back = new THREE.Mesh(pouchGeo, makeMaterial(opts.backSrc));
    back.rotation.y = Math.PI;
    const seal = new THREE.Mesh(
      buildSealGeometry(),
      new THREE.MeshStandardMaterial({ color: "#5b2e14", roughness: 0.55, side: THREE.DoubleSide }),
    );
    this.pouch.add(front, back, seal);
    this.world.add(this.pouch);

    // Fish school
    const fishCount = mobile ? 12 : 22;
    this.fish = new THREE.InstancedMesh(
      buildFishGeometry(),
      new THREE.MeshStandardMaterial({ color: "#c3ccd3", metalness: 0.85, roughness: 0.26 }),
      fishCount,
    );
    for (let i = 0; i < fishCount; i++) {
      this.fishParams.push({
        radius: 1.55 + Math.random() * 0.6,
        angle: (i / fishCount) * Math.PI * 2 + Math.random() * 0.4,
        speed: 0.22 + Math.random() * 0.16,
        y: (Math.random() - 0.5) * 2.6,
        scale: 0.3 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      });
    }
    this.world.add(this.fish);

    // Curry leaves
    const leafGeo = buildLeafGeometry();
    const leafMat = new THREE.MeshStandardMaterial({ color: "#46943a", roughness: 0.55, side: THREE.DoubleSide });
    const leafSpots: [number, number, number][] = [
      [-1.9, 1.3, 0.6], [1.95, -1.1, 0.9], [-1.6, -1.5, -0.6], [1.7, 1.5, -0.8], [0.2, -1.9, 1.2],
    ];
    leafSpots.forEach(([x, y, z], i) => {
      const mesh = new THREE.Mesh(leafGeo, leafMat);
      mesh.scale.setScalar(0.32 + (i % 3) * 0.06);
      mesh.position.set(x, y, z);
      this.leaves.push({ mesh, base: new THREE.Vector3(x, y, z), phase: i * 1.7 });
      this.world.add(mesh);
    });
    this.scene.add(this.world);

    // Spice dust (lives in screen space around everything)
    const dustCount = mobile ? 220 : 520;
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);
    this.dustSpeeds = new Float32Array(dustCount);
    const color = new THREE.Color();
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      color.set(SPICE_COLORS[i % SPICE_COLORS.length]);
      colors.set([color.r, color.g, color.b], i * 3);
      this.dustSpeeds[i] = 0.08 + Math.random() * 0.25;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    this.dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: mobile ? 0.07 : 0.06,
        map: buildDotTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    this.scene.add(this.dust);

    // Size
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(opts.canvas.parentElement ?? opts.canvas);
    this.resize();

    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
  }

  /** 0 → 1 scroll progress through the pinned hero. */
  setProgress(value: number) {
    this.progress = THREE.MathUtils.clamp(value, 0, 1);
    if (!this.running) this.renderFrame(0);
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.timer.update();
    const loop = () => {
      if (!this.running) return;
      this.timer.update();
      this.renderFrame(Math.min(this.timer.getDelta(), 0.05));
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.resizeObserver.disconnect();
    window.removeEventListener("pointermove", this.onPointerMove);
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      for (const m of materials) {
        (m as THREE.MeshStandardMaterial).map?.dispose();
        m.dispose();
      }
    });
    this.envTexture.dispose();
    this.timer.dispose();
    this.renderer.dispose();
  }

  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };

  private onTextureLoaded() {
    this.texturesLoaded += 1;
    if (this.texturesLoaded === 2 && !this.disposed) {
      this.renderFrame(0);
      this.opts.onReady?.();
    }
  }

  private resize() {
    const parent = this.opts.canvas.parentElement ?? this.opts.canvas;
    const { width, height } = parent.getBoundingClientRect();
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.portrait = width < 1024;

    // Fit the pouch into the DOM "stage" box (top zone on mobile, right half
    // on desktop) by mapping its rect onto the z = 0 plane of the frustum.
    const canvasRect = parent.getBoundingClientRect();
    const stage = this.opts.stage?.getBoundingClientRect();
    let cx = 0.72, cy = 0.5, sw = 0.5, sh = 1;
    if (stage && stage.width > 0 && stage.height > 0) {
      cx = (stage.left + stage.width / 2 - canvasRect.left) / width;
      cy = (stage.top + stage.height / 2 - canvasRect.top) / height;
      sw = stage.width / width;
      sh = stage.height / height;
    }
    const visibleH = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const visibleW = visibleH * this.camera.aspect;
    const fill = this.portrait ? 0.8 : 0.62;
    const scale = Math.min(1.05, (visibleH * sh * fill) / POUCH_H, (visibleW * sw * 0.72) / POUCH_W);
    this.world.scale.setScalar(scale);
    this.world.position.set((cx - 0.5) * visibleW, (0.5 - cy) * visibleH, 0);
    this.camera.updateProjectionMatrix();
    this.renderFrame(0);
  }

  private renderFrame(dt: number) {
    const animate = !this.opts.reducedMotion;
    const t = this.timer.getElapsed();

    this.smoothProgress += (this.progress - this.smoothProgress) * (dt ? Math.min(1, dt * 6) : 1);
    this.smoothPointer.lerp(this.pointer, dt ? Math.min(1, dt * 3) : 1);
    const p = this.smoothProgress;
    const eased = p * p * (3 - 2 * p);

    // Pouch: idle sway + scroll flip + pointer tilt
    const sway = animate ? Math.sin(t * 0.7) * 0.22 : -0.18;
    this.pouch.rotation.y = sway + eased * Math.PI;
    this.pouch.rotation.x = this.smoothPointer.y * 0.12 + (animate ? Math.sin(t * 0.9) * 0.03 : 0);
    this.pouch.rotation.z = animate ? Math.sin(t * 0.6) * 0.035 : 0;
    this.pouch.position.y = animate ? Math.sin(t * 1.1) * 0.08 : 0;
    this.world.rotation.y = this.smoothPointer.x * 0.25;
    this.world.rotation.x = this.smoothPointer.y * 0.06;

    this.camera.position.z = CAMERA_Z - eased * 0.7;
    this.rim.color.copy(this.rimFrom).lerp(this.rimTo, eased);

    // Fish orbit — speeds up slightly while flipping
    const boost = 1 + Math.sin(Math.PI * p) * 1.4;
    this.fishParams.forEach((f, i) => {
      if (animate) f.angle += dt * f.speed * boost;
      const a = f.angle;
      const y = f.y + Math.sin(t * 1.2 + f.phase) * 0.12;
      this.dummy.position.set(Math.cos(a) * f.radius, y, Math.sin(a) * f.radius * 0.75);
      this.dummy.lookAt(
        Math.cos(a + 0.05) * f.radius,
        y,
        Math.sin(a + 0.05) * f.radius * 0.75,
      );
      this.dummy.rotateY(Math.sin(t * 9 + f.phase) * 0.18);
      this.dummy.scale.setScalar(f.scale);
      this.dummy.updateMatrix();
      this.fish.setMatrixAt(i, this.dummy.matrix);
    });
    this.fish.instanceMatrix.needsUpdate = true;

    // Leaves bob and spin gently
    for (const leaf of this.leaves) {
      leaf.mesh.position.y = leaf.base.y + (animate ? Math.sin(t * 0.8 + leaf.phase) * 0.15 : 0);
      leaf.mesh.rotation.set(
        animate ? Math.sin(t * 0.5 + leaf.phase) * 0.6 : 0.4,
        animate ? t * 0.3 + leaf.phase : leaf.phase,
        leaf.phase,
      );
    }

    // Spice dust drifts upward and wraps
    if (animate) {
      const pos = this.dust.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) + this.dustSpeeds[i] * dt;
        if (y > 4) y = -4;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
      this.dust.rotation.y = this.smoothPointer.x * 0.08;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
