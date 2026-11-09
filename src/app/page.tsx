import Link from "next/link";
import Image from "next/image";
import aboutImage from "@/assets/about.jpeg";
import { getProductBySlug } from "@/application/catalog";
import TypewriterText from "@/components/typewriter-text";
import RatingStars from "@/components/rating-stars";
import Reveal from "@/components/reveal";

export default function Home() {
  const product = getProductBySlug("halmesso-plus-sprat-seasoning-powder");

  return (
    <main>
      <section className="home-hero relative isolate flex h-[calc(100svh-4rem)] min-h-0 flex-col overflow-hidden border-b border-black/[.06] dark:border-white/[.08]">
        <video
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          src="/assets/hero_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/5"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30"
        />

        <div className="home-hero-content mx-auto flex w-full max-w-[1440px] flex-1 items-center px-2 py-16 sm:px-4">
          <div className="home-hero-copy flex max-w-xl flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-fresh-leaf/40 bg-brand-dark-green/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-warm-cream backdrop-blur-sm">
              Halmesso+ · Sprat seasoning
            </span>
            <h1 className="font-[family-name:var(--font-fredoka)] text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Nutrition in<br />
              <TypewriterText />
              <span className="sr-only">every spoon.</span>
            </h1>
            <p className="home-hero-description max-w-md text-lg leading-8 text-white/85">
              Healthy sprat seasoning powder — real sprats, big flavour.
              A natural boost of protein, calcium and omega-3 for rice,
              curries, kottu, noodles and porridge. Zero additives, for every age group.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products/halmesso-plus-sprat-seasoning-powder"
                className="flex h-12 items-center justify-center rounded-full bg-brand-dark-green px-7 text-sm font-semibold text-brand-pure-white shadow-lg shadow-black/25 transition-colors hover:bg-brand-olive"
              >
                Shop Halmesso+
              </Link>
              <Link
                href="/products"
                className="flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Browse the catalog
              </Link>
            </div>
            <div className="home-hero-proof flex flex-wrap items-center gap-4 pt-2">
              <RatingStars rating={4.9} reviewCount={2400} className="[&_span:last-child]:text-white/75 [&_svg]:fill-amber-300" />
              <span className="text-xs text-white/70">a family favourite</span>
            </div>
            <p className="home-hero-footnote text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              Real sprats · 100% natural · Zero additives
            </p>
          </div>
        </div>
        <a
          href="#about-product"
          className="home-hero-scroll absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white"
        >
          Discover Halmesso+
          <span aria-hidden className="animate-bounce text-lg leading-none">↓</span>
        </a>
      </section>

      <Reveal
        as="section"
        id="about-product"
        variant="fade-up"
        className="about-color-surface scroll-mt-20 overflow-hidden bg-brand-golden-sand/20 text-brand-dark-green"
      >
        <div className="mx-auto grid min-h-[75svh] max-w-[1440px] items-center gap-8 px-2 py-12 sm:px-4 sm:py-16 md:grid-cols-[1.05fr_.95fr] md:gap-10 md:py-12 lg:gap-16">
            <Reveal y={36} variant="fade-left" className="relative order-1">
              <div className="relative aspect-[389/450] max-h-[620px] overflow-hidden bg-brand-warm-cream">
                <Image
                  src={aboutImage}
                  alt="HALMASSO+ Healthy Sprat Seasoning Powder with sprats and serving ideas"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <span aria-hidden className="absolute -right-4 -top-5 -z-0 font-[family-name:var(--font-fredoka)] text-7xl font-semibold leading-none text-brand-fresh-leaf sm:-right-8 sm:-top-9 sm:text-9xl">
                +
              </span>
            </Reveal>

            <div className="order-2">
              <Reveal y={22}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-herbal">About Halmesso+</p>
                <h2 className="mt-5 max-w-lg font-[family-name:var(--font-fredoka)] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                  Small fish.<br />Big nourishment.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-brand-olive sm:text-lg sm:leading-8">
                  {product?.description}
                </p>
              </Reveal>

              <div className="mt-9 border-t border-brand-dark-green/15">
                {[
                  ["01", "Real sprats", "Made from real, locally caught sprats."],
                  ["02", "Nothing extra", "100% natural, with zero additives."],
                  ["03", "Made to be shared", "A simple savoury boost for meals across the day."],
                ].map(([number, title, body], index) => (
                  <Reveal key={number} delay={index * 120} y={16} className="about-feature-row relative">
                    <div className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 sm:grid-cols-[3rem_1fr] sm:gap-5">
                      <span className="pt-0.5 text-xs font-semibold text-brand-herbal">{number}</span>
                      <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-5">
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-brand-olive sm:mt-0 sm:text-right">{body}</p>
                      </div>
                    </div>
                    <span aria-hidden className="about-feature-line absolute inset-x-0 bottom-0 h-px bg-brand-golden-sand" />
                  </Reveal>
                ))}
              </div>

              <Reveal delay={180} y={16}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    href="/products/halmesso-plus-sprat-seasoning-powder"
                    className="inline-flex h-12 items-center justify-center gap-3 bg-brand-dark-green px-6 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive"
                  >
                    Meet Halmesso+
                    <span aria-hidden>→</span>
                  </Link>
                  <span className="text-sm text-brand-olive">{product?.name}</span>
                </div>
              </Reveal>
            </div>
        </div>
      </Reveal>

        <Reveal as="section" variant="zoom" className="use-color-surface border-t border-brand-golden-sand/45 bg-brand-warm-cream">
          <div className="mx-auto max-w-[1440px] px-2 py-16 sm:px-4 sm:py-20">
            <Reveal y={20}>
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)] md:items-end md:gap-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-herbal">From breakfast to dinner</p>
                  <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-fredoka)] text-3xl font-semibold leading-tight text-brand-dark-green sm:text-4xl">
                    Your meals, with a little more.
                  </h2>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
                  <p className="max-w-sm text-sm leading-6 text-brand-olive">
                    Sprinkle it into familiar favourites for a savoury, nourishing lift.
                  </p>
                  <Reveal delay={140} y={14}>
                    <Link
                      href="/products/halmesso-plus-sprat-seasoning-powder"
                      className="group inline-flex items-center gap-3 border-b border-brand-herbal pb-2 text-sm font-semibold text-brand-dark-green transition-colors hover:text-brand-olive"
                    >
                      Shop Halmesso+
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </Reveal>
                </div>
              </div>
            </Reveal>
            <div className="mt-10 grid border-y border-brand-golden-sand/55 md:grid-cols-3 md:divide-x md:divide-brand-golden-sand/55">
              {[
                ["01", "Stir into curries", "A savoury finish for everyday rice and curry."],
                ["02", "Toss through noodles", "Mix in while warm for an easy flavour boost."],
                ["03", "Top your porridge", "A simple addition to a comforting bowl."],
              ].map(([number, title, body], index) => (
                <Reveal key={number} delay={index * 100} y={20}>
                  <div className="min-h-36 py-6 md:px-6 md:py-8 first:md:pl-0 last:md:pr-0">
                    <span className="text-xs font-semibold tracking-[0.08em] text-brand-herbal">{number}</span>
                    <h3 className="mt-4 text-lg font-semibold leading-snug text-brand-dark-green">{title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
    </main>
  );
}
