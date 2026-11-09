"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

export type ProcessStep = { step: string; title: string; body: string; icon: ReactNode };

/**
 * "Sea to spoon" steps. On large screens the section pins and the steps
 * slide horizontally as you scroll; on small screens they simply stack.
 */
export default function ProcessScroller({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      // Move the track itself — its children are animated by the reveal system.
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 64px",
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => barRef.current?.style.setProperty("scale", `${self.progress} 1`),
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cocoa-900 py-16 text-cream-100 sm:py-20 lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-center lg:py-0">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_20%,rgba(212,102,31,0.22),transparent_70%),radial-gradient(45%_55%_at_90%_90%,rgba(122,61,143,0.25),transparent_70%)]" />
      <div className="container-page relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p data-reveal="up" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
            <h2 data-split className="mt-3 max-w-xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h2>
          </div>
          <div aria-hidden className="hidden h-[2px] w-48 overflow-hidden rounded-full bg-cream-100/15 lg:block">
            <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold to-spice-500" />
          </div>
        </div>

        <div ref={trackRef} data-reveal-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:flex lg:gap-6">
          {steps.map((s) => (
            <article key={s.step} className="group relative flex flex-col rounded-3xl border border-cream-100/10 bg-cream-100/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-gold/40 sm:p-7 lg:min-h-[340px] lg:w-[min(30rem,42vw)] lg:shrink-0">
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-gold/15 text-gold transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  {s.icon}
                </span>
                <span className="font-display text-6xl font-bold text-cream-100/10 lg:text-7xl">{s.step}</span>
              </div>
              <h3 className="mt-auto pt-10 font-display text-2xl font-semibold text-cream-50 lg:text-3xl">{s.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-cream-100/70 lg:text-base lg:leading-7">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
