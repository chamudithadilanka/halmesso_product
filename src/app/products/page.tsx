import type { Metadata } from "next";
import { FREE_SHIPPING_THRESHOLD } from "@/application/cart";
import { listProducts } from "@/application/catalog";
import FlavourCard from "@/components/flavour-card";
import Marquee from "@/components/motion/marquee";
import PageHero from "@/components/page-hero";
import { LeafIcon, TruckIcon, BanIcon, FishIcon } from "@/components/icons";
import { USES } from "@/content/brand";
import { formatPrice } from "@/lib/format";
import ScrollMotion from "@/components/motion/scroll-motion";

export const metadata: Metadata = {
  title: "Shop",
  description: "Choose your Haalmasso+ flavour — Masala or Garlic. Natural seasoning made from Sri Lankan sprats, 50 g packs.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const products = listProducts();
  const perks = [
    { icon: <FishIcon className="size-6" />, title: "Real Sri Lankan sprats", body: "Whole fish, sun-dried and ground." },
    { icon: <BanIcon className="size-6" />, title: "No MSG", body: "And no artificial flavours." },
    { icon: <LeafIcon className="size-6" />, title: "100% natural", body: "Nothing you can't pronounce." },
    { icon: <TruckIcon className="size-6" />, title: "Free delivery", body: `On orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}.` },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Haalmasso+ · ${products.length} flavours`}
        title="Pick your flavour."
        description="Same real sprats, same calcium-rich goodness. Choose the taste your family loves — or bring home both."
      />

      <section className="relative overflow-hidden py-16 sm:py-24">
        <div aria-hidden data-parallax="0.6" className="pointer-events-none absolute -left-40 top-0 size-[30rem] rounded-full bg-spice-500/10 blur-3xl" />
        <div aria-hidden data-parallax="0.9" className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-garlic-500/10 blur-3xl" />
        <div className="container-page relative">
          <div data-reveal-stagger className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-10">
            {products.map((p, i) => (
              <FlavourCard key={p.id} product={p} priority={i === 0} />
            ))}
          </div>

          <ul data-reveal-stagger className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
            {perks.map((perk) => (
              <li key={perk.title} className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5">
                <span className="grid size-11 place-items-center rounded-2xl bg-leaf-600/10 text-leaf-700">{perk.icon}</span>
                <h2 className="mt-3 text-sm font-semibold text-cocoa-900">{perk.title}</h2>
                <p className="mt-1 text-xs leading-5 text-cocoa-600 sm:text-sm">{perk.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="border-y border-cocoa-800/10 bg-cream-200/60 py-5 font-display text-xl font-semibold text-cocoa-700 sm:text-2xl">
        <Marquee items={USES} reverse />
      </div>
      <ScrollMotion />
    </>
  );
}
