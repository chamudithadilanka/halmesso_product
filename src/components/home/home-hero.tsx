"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { Product } from "@/domain/entities";
import { formatPrice } from "@/lib/format";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import type { HeroScene } from "./hero-scene";

const HEADER_HEIGHT = 64;

export default function HomeHero({ front, back }: { front: Product; back: Product }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<0 | 1>(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const reduced = prefersReducedMotion();
    let scene: HeroScene | null = null;
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    const ctx = gsap.context(() => {
      if (reduced) return;
      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: `top ${HEADER_HEIGHT}px`,
        end: "+=110%",
        pin: true,
        pinSpacing: true, // parent <main> is flex, where GSAP defaults this to false
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          scene?.setProgress(self.progress);
          section.style.setProperty("--p", self.progress.toFixed(3));
          const next = self.progress >= 0.5 ? 1 : 0;
          setActive((prev) => (prev === next ? prev : next));
        },
      });
    }, section);

    // three.js is ~150 kB — load it after first paint, off the critical path.
    import("./hero-scene")
      .then(({ HeroScene }) => {
        if (cancelled) return;
        try {
          scene = new HeroScene({
            canvas,
            stage: stageRef.current,
            frontSrc: front.image.src,
            backSrc: back.image.src,
            reducedMotion: reduced,
            onReady: () => setReady(true),
          });
        } catch {
          return; // No WebGL — the static pack photo stays visible.
        }
        scene.setProgress(triggerRef.current?.progress ?? 0);
        io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !reduced) scene?.start();
          else scene?.stop();
        });
        io.observe(section);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      io?.disconnect();
      scene?.dispose();
      ctx.revert();
      triggerRef.current = null;
    };
  }, [front.image.src, back.image.src]);

  const showFlavour = (index: 0 | 1) => {
    const st = triggerRef.current;
    if (!st) {
      setActive(index);
      return;
    }
    window.scrollTo({ top: index === 0 ? st.start : st.start + (st.end - st.start) * 0.75, behavior: "smooth" });
  };

  const current = active === 0 ? front : back;

  return (
    <section
      ref={sectionRef}
      aria-label="Haalmasso+ seasoning"
      className="relative isolate flex h-[calc(100svh-4rem)] min-h-[540px] flex-col overflow-hidden bg-cream-100 [--p:0] lg:block"
    >
      {/* Flavour-tinted backdrop that crossfades with scroll progress */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(60%_65%_at_50%_30%,var(--color-spice-100),transparent_70%)] lg:bg-[radial-gradient(55%_75%_at_72%_50%,var(--color-spice-100),transparent_70%)]" style={{ opacity: "calc(1 - var(--p))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(60%_65%_at_50%_30%,var(--color-garlic-100),transparent_70%)] lg:bg-[radial-gradient(55%_75%_at_72%_50%,var(--color-garlic-100),transparent_70%)]" style={{ opacity: "var(--p)" }} />
        <span className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(74,37,19,0.08)] lg:left-[68%] lg:top-1/2 lg:text-[17vw]">
          {current.flavourName}
        </span>
      </div>

      <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 -z-10 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />

      {/* Stage: where the 3D pouch sits (top zone on mobile, right half on desktop).
          Holds the static pack photo — also the LCP image — until WebGL is ready. */}
      <div ref={stageRef} aria-hidden className="pointer-events-none relative min-h-0 flex-1 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className={`absolute inset-x-0 top-1/2 mx-auto aspect-[1199/1312] h-[78%] max-h-[620px] -translate-y-1/2 transition-opacity duration-700 lg:h-[62%] ${ready ? "opacity-0" : "opacity-100"}`}>
          <Image src={front.image} alt="" fill preload sizes="(min-width: 1024px) 30vw, 60vw" className="rounded-3xl object-cover shadow-2xl shadow-cocoa-900/25" />
        </div>
      </div>

      <div className="container-page relative shrink-0 pb-6 sm:pb-10 lg:flex lg:h-full lg:items-center lg:pb-0">
        <div className="max-w-xl">
          <p data-reveal="up" className="inline-flex items-center gap-2 rounded-full border border-leaf-600/25 bg-cream-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf-700">
            <span aria-hidden className="size-1.5 rounded-full bg-leaf-500" />
            Natural nutritional seasoning
          </p>
          <h1 data-split className="mt-3 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-cocoa-900 sm:mt-4 sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Small fish.<br /> <span className="text-spice-500">Strong health.</span>
          </h1>
          <p data-reveal="up" data-reveal-delay="0.15" className="mt-4 max-w-md text-[15px] leading-7 text-cocoa-600 sm:text-lg sm:leading-8 max-lg:[@media(max-height:720px)]:hidden">
            Seasoning powder made from Sri Lankan sprats. 100% natural, rich in calcium, with no MSG
            and no artificial flavours.
          </p>
          <div data-reveal="up" data-reveal-delay="0.25" className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
            <Link href="/products" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cocoa-800 px-6 text-sm font-semibold text-cream-50 shadow-lg shadow-cocoa-900/20 transition hover:-translate-y-0.5 hover:bg-cocoa-700 sm:px-7">
              Shop flavours <span aria-hidden>→</span>
            </Link>
            <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-full border border-cocoa-800/20 bg-cream-50/60 px-6 text-sm font-semibold text-cocoa-800 transition hover:bg-cream-50 sm:px-7">
              Our story
            </Link>
          </div>

          {/* Flavour switcher — synced with the 3D flip */}
          <div data-reveal="up" data-reveal-delay="0.35" className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <div role="group" aria-label="Show flavour" className="inline-flex rounded-full border border-cocoa-800/15 bg-cream-50/80 p-1">
              {[front, back].map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => showFlavour(i as 0 | 1)}
                  className={`h-9 rounded-full px-4 font-semibold transition-colors ${
                    active === i
                      ? p.flavour === "masala" ? "bg-spice-500 text-cream-50" : "bg-garlic-500 text-cream-50"
                      : "text-cocoa-600 hover:text-cocoa-900"
                  }`}
                >
                  {p.flavourName}
                </button>
              ))}
            </div>
            <Link href={`/products/${current.slug}`} className="font-medium text-cocoa-600 underline decoration-cocoa-300 underline-offset-4 hover:text-cocoa-900">
              {current.netWeight} · {formatPrice(current.price)}
            </Link>
          </div>
        </div>
      </div>

      <p aria-hidden className="pointer-events-none absolute bottom-6 right-8 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cocoa-500 lg:flex">
        Scroll to flip the pack
        <span className="inline-block animate-bounce">↓</span>
      </p>
    </section>
  );
}
