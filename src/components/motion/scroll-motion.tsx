"use client";

import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

const OFFSETS: Record<string, gsap.TweenVars> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -56 },
  right: { x: 56 },
  zoom: { scale: 0.9, y: 24 },
  fade: {},
};

/**
 * Declarative scroll animations. Any element (server-rendered or not) can opt in:
 *
 *   data-reveal="up|down|left|right|zoom|fade"  (+ data-reveal-delay="0.2")
 *   data-reveal-stagger                          children reveal one after another
 *   data-split                                   heading words rise out of a mask
 *   data-parallax="0.3"                          drifts while scrolling past
 *
 * Render <ScrollMotion /> as the LAST child of a page: its effect then runs only
 * after that page segment has hydrated (App Router hydrates segments
 * separately, so touching the DOM from the root layout causes mismatches).
 * Reduced-motion users get static content.
 */
export default function ScrollMotion() {

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("motion-pending");
      return;
    }

    const scope = document.getElementById("main") ?? document.body;
    // Anything already on screen animates immediately instead of waiting for a scroll.
    const trigger = (el: Element, start: string) =>
      el.getBoundingClientRect().top < window.innerHeight ? undefined : { trigger: el, start, once: true };

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", scope).forEach((el) => {
        const from = OFFSETS[el.dataset.reveal || "up"] ?? OFFSETS.up;
        gsap.fromTo(
          el,
          { autoAlpha: 0, ...from },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.revealDelay || 0),
            clearProps: "transform",
            scrollTrigger: trigger(el, "top 92%"),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]", scope).forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "expo.out",
            stagger: 0.09,
            clearProps: "transform",
            scrollTrigger: trigger(group, "top 90%"),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-split]", scope).forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: Number(el.dataset.revealDelay || 0),
            scrollTrigger: trigger(el, "top 92%"),
            clearProps: "transform",
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]", scope).forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.2);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    root.classList.remove("motion-pending");
    // Pins created by page components change layout; recalc everything.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return null;
}
