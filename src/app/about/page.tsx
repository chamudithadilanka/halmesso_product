import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import aboutImage from "@/assets/about.jpeg";
import RatingStars from "@/components/rating-stars";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
  "What is HALMASSO+? Healthy Sprat Seasoning Powder made from real small fish — high in DHA, protein and calcium. Small fish. Big goodness — for every age group.",
};

const BENEFITS = [
  {
    title: "Brain development",
    body: "Rich in DHA omega-3, the building block of a growing mind.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 3a4 4 0 00-4 4 4 4 0 00.6 2.05A4 4 0 005 12a4 4 0 004 4 4.5 4.5 0 004 2.5V6.5A4.5 4.5 0 009.5 3zM14.5 3a4 4 0 014 4 4 4 0 01-.6 2.05A4 4 0 0119 12a4 4 0 01-4 4 4.5 4.5 0 01-4 2.5" />
    ),
  },
  {
    title: "Strong bones",
    body: "Naturally high in calcium and vitamin D from whole small fish.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V6a2 2 0 00-2-2 2 2 0 012-2M17 14v4a2 2 0 002 2 2 2 0 00-2 2M6.3 6.3l13.4 13.4M4 9a2 2 0 104-.2M20 15a2 2 0 10-4 .2" />
    ),
  },
  {
    title: "Boost immunity",
    body: "Micronutrients from real, whole fish — not from a lab.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 2.8v5.4c0 4.3-3 8.3-7 9.8-4-1.5-7-5.5-7-9.8V5.8L12 3z" />
    ),
  },
  {
    title: "Healthy growth",
    body: "Complete protein for all ages — from rice to porridge.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7.5-4.6-9.8-9.3C1 8.4 3.6 5.5 6.8 5.5c2 0 3.7 1 5.2 2.6 1.5-1.6 3.2-2.6 5.2-2.6 3.2 0 5.8 2.9 4.6 6.2C19.5 16.4 12 21 12 21z" />
    ),
  },
];

const PROMISES = [
  "Made from real, locally caught sprats",
  "High DHA & calcium · protein-rich",
  "No preservatives, no additives",
  "100% natural — nothing else",
];

const USES = ["Rice", "Soups", "Curries", "Kottu", "Noodles", "Porridge"];

const STEPS = [
  { step: "01", title: "Caught", body: "Small sprats, landed daily by local fishermen." },
  { step: "02", title: "Cleaned", body: "Scaled and cleaned within hours of the catch." },
  { step: "03", title: "Sun-dried", body: "Dried the traditional way — no smoke, no additives." },
  { step: "04", title: "Stone-ground", body: "Ultra-fine powder, easy to mix into any meal." },
];

const FAQS = [
  {
    q: "What exactly is sprat seasoning powder?",
    a: "Halmesso+ is 100% sprat fish, cleaned, dried and stone-ground into an ultra-fine seasoning. Nothing added — just the fish, milled fresh. One spoon stirs easily into hot food.",
  },
  {
    q: "Is it really safe for children?",
    a: "Yes. Whole small fish like sprats are among the safest, lowest-mercury fish for kids, and they carry calcium, DHA and complete protein. It's made for every age group — toddlers to grandparents.",
  },
  {
    q: "How do I use it?",
    a: "Stir a teaspoon into rice, curries, soups, kottu, noodles, porridge — or sprinkle it on literally anything savoury. It seasons and fortifies in one step.",
  },
  {
    q: "Does it smell or taste fishy?",
    a: "No — the slow sun-drying and fine milling bring out a deep, savoury umami flavour. Think of it as a nutrition-rich super seasoning, not a fish sauce.",
  },
  {
    q: "How should I store it?",
    a: "Keep the pouch sealed in a cool, dry cupboard. Once opened, use within 8 weeks — though most kitchens see it gone in a fortnight.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden border-b border-brand-golden-sand/45 bg-brand-warm-cream">
        <div className="mx-auto grid min-h-[75svh] max-w-[1440px] items-center gap-8 px-2 py-10 sm:px-4 sm:py-14 md:grid-cols-2 md:gap-12 lg:gap-20">
          <Reveal delay={100} y={24} className="relative order-1">
            <div className="relative mx-auto aspect-[389/450] w-full max-w-[430px] overflow-hidden rounded-lg border border-brand-golden-sand/45 bg-brand-pure-white shadow-xl shadow-brand-dark-green/10">
              <Image
                src={aboutImage}
                alt="HALMASSO+ sprat seasoning pouch with sprats, seasoning, and serving ideas"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain"
                priority
              />
            </div>
          </Reveal>

          <div className="order-2 md:order-1">
            <div className="flex flex-col gap-6">
                {/* <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-herbal/30 bg-brand-fresh-leaf/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-dark-green">
                Our story
              </span> */}
                <h1 className="font-[family-name:var(--font-fredoka)] text-5xl font-semibold leading-[1.02] tracking-tight text-brand-dark-green sm:text-6xl lg:text-7xl">
                  Small fish.<br />Big goodness.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-brand-olive">
                  HALMASSO+ Healthy Sprat Seasoning Powder turns the humble sprat into everyday
                  nutrition — high DHA &amp; calcium, protein and omega-3, in one honest spoonful.
                  For toddlers, adults and grandparents alike — good for every age, every meal.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/products/halmesso-plus-sprat-seasoning-powder"
                    className="flex h-12 items-center justify-center rounded-full bg-brand-dark-green px-7 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive"
                  >
                    Shop Halmesso+
                  </Link>
                  <Link
                    href="/products"
                    className="flex h-12 items-center justify-center rounded-full border border-brand-olive/30 px-7 text-sm font-semibold text-brand-olive transition-colors hover:bg-brand-golden-sand/20"
                  >
                    Explore the range
                  </Link>
                </div>
                <RatingStars rating={4.9} reviewCount={2400} />
            </div>
          </div>
        </div>
      </section>

      {/* What is Halmesso+ */}
      <section className="mx-auto max-w-[1440px] px-2 py-14 sm:px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">What is it?</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              The whole fish, in every spoon.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <p className="leading-7 text-zinc-600 dark:text-zinc-300">
              Sprats are tiny — which is exactly why they pack so much goodness. They eat low on the food
              chain, carry almost no mercury, and deliver an extraordinary mix of DHA, calcium, protein and
              omega-3. HALMASSO+ takes the whole fish — bones, skin and all — cleans it, dries it in the
              sun and stone-grinds it into an ultra-fine powder.
            </p>
            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
              No extracts, no concentrates, no filler, no preservatives. What you stir into dinner is the
              fish itself — just smaller.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-herbal" aria-hidden>
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 01.04 1.41l-7.5 8a1 1 0 01-1.45 0l-4-4.5a1 1 0 011.42-1.4l3.25 3.6 6.78-7.11a1 1 0 011.46.04z" clipRule="evenodd" />
                  </svg>
                  {promise}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-brand-golden-sand/35 bg-brand-warm-cream">
        <div className="mx-auto max-w-[1440px] px-2 py-14 sm:px-4">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">Why it works</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Built for growing bodies.
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 110} y={32}>
                <div className="h-full rounded-2xl border border-brand-golden-sand/35 bg-brand-pure-white p-5 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-herbal/40 text-brand-herbal">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7" aria-hidden>
                        {benefit.icon}
                      </svg>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{benefit.body}</p>
                  </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it's made */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">From the sea</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Four steps. Nothing hidden.
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 110} y={32} className="h-full">
              <div className="h-full rounded-2xl border border-brand-golden-sand/35 bg-brand-pure-white p-5">
                <span className="font-[family-name:var(--font-fredoka)] text-3xl font-bold text-brand-herbal/50">
                  {item.step}
                </span>
                <h3 className="mt-2 font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Uses */}
        <Reveal delay={120} className="mt-10">
                <div className="rounded-2xl border border-brand-dark-green bg-brand-dark-green p-6 text-brand-warm-cream sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">Perfect for every meal</h3>
                      <p className="mt-1 text-sm text-brand-warm-cream/75">One teaspoon, any dish — eight weeks of nutrition in a single pouch.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {USES.map((use) => (
                        <span
                          key={use}
                          className="rounded-full border border-brand-warm-cream/25 bg-brand-warm-cream/10 px-4 py-1.5 text-sm font-medium"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
            </Reveal>
          </section>

          {/* FAQ */}
          <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">Good to know</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Questions, answered.
              </h2>
            </Reveal>
            <Reveal delay={100} y={24} className="mt-6">
              <div className="divide-y divide-black/[.06] rounded-2xl border border-black/[.06] dark:divide-white/[.08] dark:border-white/[.08]">
                {FAQS.map((item) => (
                  <details key={item.q} className="group px-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-zinc-800 dark:text-zinc-100">
                      {item.q}
                      <span aria-hidden className="text-xl text-zinc-400 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-4 leading-7 text-zinc-500 dark:text-zinc-400">{item.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section className="border-t border-brand-dark-green bg-brand-herbal">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-5 px-2 py-14 text-center sm:px-4">
              <Reveal y={24}>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-brand-warm-cream sm:text-4xl">
                  Great taste. Great nutrition.<br />For a stronger tomorrow.
                </h2>
              </Reveal>
              <Reveal delay={150} y={16}>
                <Link
                  href="/products/halmesso-plus-sprat-seasoning-powder"
                  className="flex h-12 items-center justify-center rounded-full bg-brand-warm-cream px-8 text-sm font-bold uppercase tracking-wide text-brand-dark-green transition-colors hover:bg-brand-pure-white"
                >
                  Get yours — $12
                </Link>
              </Reveal>
            </div>
          </section>
        </main>
        );
}
