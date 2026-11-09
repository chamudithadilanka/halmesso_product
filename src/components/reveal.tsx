"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from "react";

type RevealVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "zoom";

/**
 * Scroll-reveal wrapper: fades + slides content in when it enters the
 * viewport. Zero dependencies — a shared IntersectionObserver does the work.
 * Reduced-motion users get instant, static content (see globals.css).
 */
export default function Reveal({
  as,
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  variant,
  className = "",
  id,
}: {
  /** Render as another element (e.g. "li") when semantics matter. */
  as?: ElementType;
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Slide distance in pixels (vertical). */
  y?: number;
  /** Slide distance in pixels (horizontal). */
  x?: number;
  /** Starting scale (e.g. 0.95 for a subtle zoom-in). */
  scale?: number;
  /** Shorthand preset that overrides y/x/scale. */
  variant?: RevealVariant;
  className?: string;
  id?: string;
}) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Resolve presets
  let resolvedY = y;
  let resolvedX = x;
  let resolvedScale = scale;
  if (variant === "fade-up") { resolvedY = 32; resolvedX = 0; resolvedScale = 0.97; }
  if (variant === "fade-in") { resolvedY = 0; resolvedX = 0; resolvedScale = 1; }
  if (variant === "fade-left") { resolvedY = 0; resolvedX = -32; resolvedScale = 0.97; }
  if (variant === "fade-right") { resolvedY = 0; resolvedX = 32; resolvedScale = 0.97; }
  if (variant === "zoom") { resolvedY = 12; resolvedX = 0; resolvedScale = 0.94; }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!(typeof IntersectionObserver !== "undefined")) {
      const fallback = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(fallback);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenStyle: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: `translateY(${resolvedY}px) translateX(${resolvedX}px) scale(${resolvedScale})`,
    opacity: 0,
  };

  const visibleStyle: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: "translateY(0) translateX(0) scale(1)",
    opacity: 1,
  };

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible}
      className={`reveal will-change-transform ${className}`}
      style={visible ? visibleStyle : hiddenStyle}
    >
      {children}
    </Tag>
  );
}
