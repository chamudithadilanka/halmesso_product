import Image from "next/image";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/application/cart";
import { listProducts } from "@/application/catalog";
import { formatPrice } from "@/lib/format";
import FlavourCard from "@/components/flavour-card";
import HomeHero from "@/components/home/home-hero";
import Marquee from "@/components/motion/marquee";
import ProcessScroller from "@/components/motion/process-scroller";
import { BENEFITS, PACK_FACTS, PROCESS_STEPS, USES } from "@/content/brand";
import ScrollMotion from "@/components/motion/scroll-motion";

export default function Home() {
  const products = listProducts();
  const [masala, garlic] = products;

  return (
    <>
      <HomeHero front={masala} back={garlic} />

      {/* Ticker */}
      <div className="relative z-10 -rotate-1 bg-cocoa-800 py-4 font-display text-lg font-semibold text-cream-50 shadow-xl sm:text-2xl">
        <Marquee items={PACK_FACTS} />
      </div>

      {/* Flavours */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden data-parallax="0.5" className="pointer-events-none absolute -left-32 top-10 size-[28rem] rounded-full bg-spice-500/10 blur-3xl" />
        <div aria-hidden data-parallax="0.8" className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-garlic-500/10 blur-3xl" />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal="up" className="font-script text-2xl text-spice-500 sm:text-3xl">Two flavours, one goodness</p>
            <h2 data-split className="mt-2 font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-6xl">
              Pick your flavour.
            </h2>
            <p data-reveal="up" className="mx-auto mt-4 max-w-lg text-base leading-7 text-cocoa-600">
              Same real Sri Lankan sprats, same calcium-rich goodness — choose warm masala or savoury garlic.
            </p>
          </div>
          <div data-reveal-stagger className="mx-auto mt-12 grid max-w-5xl gap-6 sm:mt-16 md:grid-cols-2 lg:gap-10">
            {products.map((p) => (
              <FlavourCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-cream-200/60 py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div data-reveal="left" className="relative aspect-square">
              <div aria-hidden className="absolute inset-[8%] rounded-full bg-gradient-to-br from-gold/40 via-spice-500/20 to-garlic-500/30 blur-2xl" />
              <div data-parallax="0.25" className="absolute left-0 top-[6%] w-[62%] -rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/25">
                <Image src={masala.image} alt={masala.imageAlt} sizes="(min-width: 1024px) 28vw, 60vw" className="h-auto w-full" />
              </div>
              <div data-parallax="-0.25" className="absolute bottom-[4%] right-0 w-[62%] rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/25">
                <Image src={garlic.image} alt={garlic.imageAlt} sizes="(min-width: 1024px) 28vw, 60vw" className="h-auto w-full" />
              </div>
              <span aria-hidden className="absolute -right-2 -top-4 animate-float font-display text-8xl font-bold text-plus sm:text-9xl">+</span>
            </div>
          </div>

          <div>
            <p data-reveal="up" className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">Why Haalmasso+</p>
            <h2 data-split className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-5xl">
              Small fish. Big goodness.
            </h2>
            <p data-reveal="up" className="mt-4 max-w-lg text-base leading-7 text-cocoa-600">
              Sprats are tiny, which is exactly why they pack so much in. We use the whole fish, so every spoon carries
              its natural goodness into the meals you already cook.
            </p>
            <ul data-reveal-stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <li key={b.title} className="group rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5 transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-cocoa-900/10">
                  <span className="grid size-12 place-items-center rounded-2xl bg-leaf-600/10 text-leaf-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    {b.icon}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-cocoa-900">{b.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-cocoa-600">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProcessScroller eyebrow="From sea to spoon" title="Five honest steps. Nothing hidden." steps={PROCESS_STEPS} />

      {/* Uses */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-reveal="up" className="font-script text-2xl text-leaf-700 sm:text-3xl">From breakfast to dinner</p>
              <h2 data-split className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-5xl">
                Your meals, with a little more.
              </h2>
            </div>
            <p data-reveal="up" className="max-w-sm text-base leading-7 text-cocoa-600">
              Sprinkle it into familiar favourites while cooking or just before serving. One teaspoon is all it takes.
            </p>
          </div>
          <ul data-reveal-stagger className="mt-10 flex flex-wrap gap-3">
            {USES.map((use, i) => (
              <li
                key={use}
                className={`rounded-full border px-5 py-2.5 font-display text-lg font-semibold transition hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-xl ${
                  i % 3 === 0
                    ? "border-spice-500/30 bg-spice-100 text-spice-700"
                    : i % 3 === 1
                      ? "border-garlic-500/25 bg-garlic-100 text-garlic-700"
                      : "border-leaf-600/25 bg-leaf-600/10 text-leaf-700"
                }`}
              >
                {use}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20 sm:pb-28">
        <div data-reveal="zoom" className="brand-gradient relative isolate animate-gradient overflow-hidden rounded-[2.5rem] px-6 py-16 text-center text-cream-50 sm:px-12 sm:py-20">
          <span aria-hidden className="absolute left-[8%] top-[18%] -z-10 animate-float font-display text-7xl font-bold text-cream-50/10">+</span>
          <span aria-hidden className="absolute bottom-[12%] right-[10%] -z-10 animate-float font-display text-9xl font-bold text-cream-50/10 [animation-delay:-3s]">+</span>
          <p className="font-script text-2xl text-gold sm:text-3xl">Great taste. Great nutrition.</p>
          <h2 data-split className="mx-auto mt-2 max-w-2xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Bring home both flavours.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-100/80">
            Free delivery on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-cream-50 px-8 text-sm font-semibold text-cocoa-900 transition hover:-translate-y-0.5 hover:bg-gold">
              Shop now →
            </Link>
            <Link href="/about" className="inline-flex h-12 items-center rounded-full border border-cream-50/30 px-8 text-sm font-semibold text-cream-50 transition hover:bg-cream-50/10">
              Learn more
            </Link>
          </div>
        </div>
      </section>
      <ScrollMotion />
    </>
  );
}
