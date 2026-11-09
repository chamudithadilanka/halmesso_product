"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollProgressLine — a gradient bar fixed at the bottom of the header
 * that grows from left → right as the user scrolls down the page.
 * The gradient uses the brand palette (dark-green → herbal → fresh-leaf → golden-sand).
 */
export default function ScrollProgressLine() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="scroll-progress-track pointer-events-none absolute inset-x-0 bottom-0 h-[2.5px] overflow-hidden"
    >
      <div
        className="scroll-progress-bar h-full origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

