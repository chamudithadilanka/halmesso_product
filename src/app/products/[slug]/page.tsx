import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, listProducts } from "@/application/catalog";
import { CATEGORY_LABELS } from "@/domain/entities";
import { formatPrice } from "@/lib/format";
import ProductVisual from "@/components/product-visual";
import ProductCard from "@/components/product-card";
import ProductActions from "@/components/product-actions";
import RatingStars from "@/components/rating-stars";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/application/cart";

export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-zinc-400" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/products" className="hover:text-zinc-700 dark:hover:text-zinc-200">Shop</Link></li>
          <li aria-hidden>/</li>
          <li className="text-zinc-600 dark:text-zinc-300">{product.name}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Artwork */}
        <div className="overflow-hidden rounded-3xl border border-black/[.06] dark:border-white/[.08]">
          <ProductVisual product={product} className="aspect-[4/5] w-full lg:aspect-auto lg:h-full lg:min-h-[560px]" />
        </div>

        {/* Purchase panel */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              {CATEGORY_LABELS[product.category]}
            </span>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1.5 text-zinc-500 dark:text-zinc-400">{product.tagline}</p>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} className="mt-3" />
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-zinc-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="mb-1 rounded-full bg-brand-fresh-leaf/20 px-2 py-0.5 text-[11px] font-semibold text-brand-olive">
                  Save {formatPrice(product.compareAtPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="leading-7 text-zinc-600 dark:text-zinc-300">{product.description}</p>

          <ul className="flex flex-col gap-1.5">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden>
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 01.04 1.41l-7.5 8a1 1 0 01-1.45 0l-4-4.5a1 1 0 011.42-1.4l3.25 3.6 6.78-7.11a1 1 0 011.46.04z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <ProductActions product={product} />

          {/* Shipping & returns disclosure */}
          <div className="divide-y divide-black/[.06] rounded-2xl border border-black/[.06] text-sm dark:divide-white/[.08] dark:border-white/[.08]">
            {[
              { title: "Shipping", body: `Free over ${formatPrice(FREE_SHIPPING_THRESHOLD)}. ${formatPrice(SHIPPING_FLAT_RATE)} otherwise — dispatched within 24h, delivered in 2–4 business days.` },
              { title: "Returns", body: "30 days, no questions asked. Free return label included in every order." },
              { title: "Guarantee", body: "Lifetime repair guarantee on canvas, leather goods and stitching." },
            ].map((row) => (
              <details key={row.title} className="group px-4">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-medium text-zinc-800 dark:text-zinc-100">
                  {row.title}
                  <span aria-hidden className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-3 leading-6 text-zinc-500 dark:text-zinc-400">{row.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {product.category === "pantry" ? "Try the other flavour" : "Pairs well with"}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
