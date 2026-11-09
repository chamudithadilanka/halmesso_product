import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <section className="relative isolate overflow-hidden bg-cocoa-900 py-16 text-cream-50 sm:py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_10%_10%,rgba(212,102,31,0.35),transparent_70%),radial-gradient(40%_70%_at_95%_100%,rgba(122,61,143,0.4),transparent_70%)]" />
      <span aria-hidden data-parallax="0.6" className="absolute -right-6 top-2 -z-10 font-display text-[10rem] font-bold leading-none text-cream-50/[0.05] sm:text-[16rem]">+</span>
      <div className={`container-page ${centered ? "text-center" : ""}`}>
        <p data-reveal="up" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        <h1 data-split className={`mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl ${centered ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
          {title}
        </h1>
        {description && (
          <p data-reveal="up" data-reveal-delay="0.1" className={`mt-4 max-w-xl text-base leading-7 text-cream-100/75 sm:text-lg ${centered ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
