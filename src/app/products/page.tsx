import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/application/catalog";
import ProductCard from "@/components/product-card";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Choose your Halmesso+ flavour — real sprats, zero additives, big nourishment.",
};

export default function ProductsPage() {
  const products = listProducts().filter((p) => p.category === "pantry");

  return (
    <main>
      {/* Hero strip */}
      <section className="border-b border-brand-golden-sand/40 bg-brand-dark-green py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-fresh-leaf">
              Halmesso+ · Two flavours
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-fredoka)] text-4xl font-semibold leading-tight text-brand-warm-cream sm:text-5xl lg:text-6xl">
              Pick your flavour.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-brand-warm-cream/70">
              Real sprats, 100% natural, zero additives — now in two bold
              varieties. Same goodness, your choice of taste.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product cards — large 2-column layout */}
      <section className="bg-brand-warm-cream py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 120} variant="fade-up">
                {/* Full-height flavour card */}
                <div className="group flex flex-col overflow-hidden rounded-3xl border border-brand-golden-sand/35 bg-brand-pure-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-dark-green/12">
                  {/* Artwork */}
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={product.name}
                    className="relative block aspect-[3/2] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${product.palette[0]} 0%, ${product.palette[1]} 100%)`,
                    }}
                  >
                    {/* Glyph */}
                    <span
                      className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-fredoka)] text-[7rem] font-semibold leading-none opacity-[0.14] select-none transition-transform duration-700 ease-out group-hover:scale-110"
                      aria-hidden
                    >
                      {product.glyph}
                    </span>
                    {/* Badge */}
                    <span className="absolute left-4 top-4 rounded-full bg-brand-dark-green/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-warm-cream backdrop-blur-sm">
                      {index === 0 ? "Original" : "New Flavour"}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-herbal">
                        Halmesso+ · Sprat Seasoning
                      </p>
                      <h2 className="mt-1.5 font-[family-name:var(--font-fredoka)] text-2xl font-semibold leading-snug text-brand-dark-green sm:text-3xl">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-sm italic text-brand-olive">
                        &ldquo;{product.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-sm leading-7 text-brand-olive">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-1.5">
                      {product.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-brand-dark-green"
                        >
                          <span
                            aria-hidden
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-herbal"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Price + CTA */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-brand-golden-sand/40 pt-5">
                      <div>
                        <span className="text-2xl font-semibold text-brand-dark-green">
                          Rs.{product.price * 50 /* demo LKR conversion */}
                        </span>
                        <span className="ml-1.5 text-sm text-brand-olive">
                          / 100 g pack
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-full border border-brand-dark-green px-6 text-sm font-semibold text-brand-dark-green transition-colors hover:bg-brand-dark-green hover:text-brand-pure-white"
                        >
                          Learn more
                        </Link>
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-full bg-brand-dark-green px-6 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive"
                        >
                          Shop now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tagline strip */}
          <Reveal delay={240} variant="fade-in">
            <div className="mt-14 rounded-2xl border border-brand-golden-sand/40 bg-brand-golden-sand/15 px-6 py-8 text-center sm:mt-16 sm:px-10 sm:py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-herbal">
                Why Halmesso+
              </p>
              <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-brand-dark-green sm:text-3xl">
                Real sprats. Big flavour. Zero additives.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-brand-olive">
                Every pack is made from locally caught sprats — naturally rich in
                protein, calcium and omega-3. Good for the whole family, every
                single day.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
