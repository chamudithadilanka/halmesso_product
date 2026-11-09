"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AboutScrollLine — a vertical gradient line fixed to the left edge of the
 * viewport that fills downward as the user scrolls. Brand colours flow from
 * top (dark-green) → herbal → fresh-leaf → golden-sand at the bottom.
 */
export default function AboutScrollLine() {
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    /* Track */
    <div
      aria-hidden
      className="fixed left-0 top-0 z-50 hidden h-full w-[3px] md:block"
      style={{ background: "rgba(25,60,30,0.08)" }}
    >
      {/* Filled bar */}
      <div
        className="about-scroll-line w-full origin-top rounded-b-full"
        style={{ height: `${pct}%` }}
      />
      {/* Glowing dot at the tip */}
      <div
        className="about-scroll-dot absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ top: `${pct}%`, opacity: pct > 1 ? 1 : 0 }}
      />
    </div>
  );
}

