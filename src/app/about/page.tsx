import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listProducts } from "@/application/catalog";
import ProcessScroller from "@/components/motion/process-scroller";
import { BENEFITS, FAQS, PROCESS_STEPS, USES } from "@/content/brand";
import { formatPrice } from "@/lib/format";
import ScrollMotion from "@/components/motion/scroll-motion";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why Haalmasso+ uses whole Sri Lankan sprats: a natural seasoning that is rich in calcium, with no MSG and no artificial flavours.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const [masala, garlic] = listProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_80%_40%,var(--color-spice-100),transparent_70%),radial-gradient(40%_50%_at_10%_90%,var(--color-garlic-100),transparent_70%)]" />
        <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p data-reveal="up" className="font-script text-2xl text-spice-500 sm:text-3xl">Our story</p>
            <h1 data-split className="mt-2 font-display text-5xl font-bold leading-[0.98] tracking-tight text-cocoa-900 sm:text-6xl lg:text-7xl">
              Small fish. Big goodness.
            </h1>
            <p data-reveal="up" data-reveal-delay="0.1" className="mt-6 max-w-xl text-lg leading-8 text-cocoa-600">
              Sri Lankan kitchens have trusted sprats for generations. Haalmasso+ turns that humble fish into an
              everyday seasoning — so a spoonful of natural goodness fits into any meal, for every age.
            </p>
            <div data-reveal="up" data-reveal-delay="0.2" className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-7 text-sm font-semibold text-cream-50 transition hover:-translate-y-0.5 hover:bg-cocoa-700">
                Shop the flavours
              </Link>
              <a href="#how-its-made" className="inline-flex h-12 items-center rounded-full border border-cocoa-800/20 px-7 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">
                How it&apos;s made
              </a>
            </div>
          </div>

          <div className="relative order-1 mx-auto aspect-[5/4] w-full max-w-lg lg:order-2 lg:max-w-none">
            <div data-parallax="0.2" className="absolute right-0 top-0 w-[64%]">
              <div data-reveal="right" className="rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/25">
                <Image src={garlic.image} alt={garlic.imageAlt} preload sizes="(min-width: 1024px) 30vw, 60vw" className="h-auto w-full" />
              </div>
            </div>
            <div data-parallax="-0.2" className="absolute bottom-0 left-0 w-[64%]">
              <div data-reveal="left" className="-rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/25">
                <Image src={masala.image} alt={masala.imageAlt} preload sizes="(min-width: 1024px) 30vw, 60vw" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-200/60 py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal="up" className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">What is it?</p>
            <h2 data-split className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-5xl">
              The whole fish, in every spoon.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-cocoa-700 lg:col-span-7">
            <p data-reveal="up">
              Sprats are tiny, which is exactly why they pack so much goodness. Haalmasso+ uses the whole fish —
              cleaned, sun-dried and finely ground — so the natural calcium and nourishment come along with the flavour.
            </p>
            <p data-reveal="up">
              We season it two ways: a warm <span className="brush text-spice-700">masala</span> and a mellow,
              savoury <span className="brush text-garlic-700">garlic</span>. No MSG, no artificial flavours — just a
              simple way to make everyday meals a little more nourishing.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal="up" className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">Why it works</p>
            <h2 data-split className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-5xl">Built for growing families.</h2>
          </div>
          <ul data-reveal-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <li key={b.title} className="group rounded-3xl border border-cocoa-800/10 bg-cream-50 p-6 text-center transition duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cocoa-900/10">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-leaf-600/15 to-gold/20 text-leaf-700 transition-transform duration-500 group-hover:scale-110">
                  {b.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-cocoa-900">{b.title}</h3>
                <p className="mt-1 text-sm leading-6 text-cocoa-600">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div id="how-its-made" className="scroll-mt-16">
        <ProcessScroller eyebrow="From sea to spoon" title="Five honest steps. Nothing hidden." steps={PROCESS_STEPS} />
      </div>

      {/* Uses */}
      <section className="container-page py-20 sm:py-28">
        <div data-reveal="zoom" className="rounded-[2rem] bg-leaf-700 p-8 text-cream-50 sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Perfect for every meal</h2>
              <p className="mt-2 max-w-md text-cream-100/80">One teaspoon, any dish. Here&apos;s where families use it most.</p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {USES.map((use) => (
                <li key={use} className="rounded-full border border-cream-50/25 bg-cream-50/10 px-4 py-2 text-sm font-semibold">{use}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page max-w-4xl pb-20 sm:pb-28">
        <div className="text-center">
          <p data-reveal="up" className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">Good to know</p>
          <h2 data-split className="mt-3 font-display text-4xl font-semibold text-cocoa-900 sm:text-5xl">Questions, answered.</h2>
        </div>
        <div data-reveal-stagger className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="group rounded-3xl border border-cocoa-800/10 bg-cream-50 transition-colors open:bg-cream-50 open:shadow-lg open:shadow-cocoa-900/5">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-cocoa-900">
                {item.q}
                <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-cream-200 text-lg text-cocoa-700 transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="px-6 pb-6 leading-7 text-cocoa-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="brand-gradient animate-gradient py-20 text-center text-cream-50 sm:py-24">
        <div className="container-page">
          <p className="font-script text-2xl text-gold sm:text-3xl">Great taste. Great nutrition.</p>
          <h2 data-split className="mx-auto mt-2 max-w-2xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">For a stronger tomorrow.</h2>
          <Link href="/products" className="mt-8 inline-flex h-12 items-center rounded-full bg-cream-50 px-8 text-sm font-bold uppercase tracking-wide text-cocoa-900 transition hover:-translate-y-0.5 hover:bg-gold">
            Get yours — from {formatPrice(Math.min(masala.price, garlic.price))}
          </Link>
        </div>
      </section>
      <ScrollMotion />
    </>
  );
}
