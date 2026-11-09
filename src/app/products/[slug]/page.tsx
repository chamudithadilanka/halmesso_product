import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/application/cart";
import { getProductBySlug, getRelatedProducts, listProducts } from "@/application/catalog";
import FlavourCard, { FLAVOUR_STYLES } from "@/components/flavour-card";
import { CheckIcon } from "@/components/icons";
import TiltCard from "@/components/motion/tilt-card";
import ProductPurchase from "@/components/product-purchase";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";
import ScrollMotion from "@/components/motion/scroll-motion";

export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.tagline}. ${product.description}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.image.src, width: product.image.width, height: product.image.height, alt: product.imageAlt }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 1);
  const s = FLAVOUR_STYLES[product.flavour];

  const details = [
    {
      title: "How to use",
      body: "Stir a teaspoon into rice, curries, soups, kottu, noodles or porridge while cooking or just before serving. Adjust to taste.",
    },
    {
      title: "Storage",
      body: "Keep sealed in a cool, dry place away from direct sunlight. Reseal the pouch after every use. Contains fish.",
    },
    {
      title: "Delivery",
      body: `Free delivery on orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}; ${formatPrice(SHIPPING_FLAT_RATE)} otherwise. Usually dispatched within 24 hours and delivered in 2–4 business days.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: new URL(product.image.src, SITE.url).toString(),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
      url: new URL(`/products/${product.slug}`, SITE.url).toString(),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className={`relative overflow-clip ${s.page}`}>
        <div className="container-page py-6 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-xs text-cocoa-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-cocoa-900">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/products" className="hover:text-cocoa-900">Shop</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-cocoa-800">{product.flavourName}</li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div data-reveal="zoom">
                <TiltCard max={6} className="rounded-[2rem]">
                  <div className="relative aspect-[1199/1312] overflow-hidden rounded-[2rem] shadow-2xl shadow-cocoa-900/20">
                    <Image src={product.image} alt={product.imageAlt} fill preload sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </div>
                </TiltCard>
              </div>
            </div>

            <div className="flex flex-col gap-6 pb-4">
              <div>
                <p data-reveal="up" className={`text-xs font-semibold uppercase tracking-[0.18em] ${s.text}`}>
                  Natural nutritional seasoning · {product.netWeight}
                </p>
                <h1 data-split className="mt-2 font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-5xl">
                  {product.name}
                </h1>
                <p data-reveal="up" className="mt-2 font-script text-2xl text-cocoa-600">{product.tagline}</p>
              </div>

              <p data-reveal="up" className="text-3xl font-semibold tabular-nums text-cocoa-900">
                {formatPrice(product.price)}
                {product.compareAtPrice && (
                  <span className="ml-3 text-lg font-normal text-cocoa-500 line-through">{formatPrice(product.compareAtPrice)}</span>
                )}
              </p>

              <p data-reveal="up" className="leading-7 text-cocoa-700">{product.description}</p>

              <ul data-reveal-stagger className="grid gap-2 sm:grid-cols-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-cocoa-800">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-600 text-cream-50">
                      <CheckIcon className="size-3" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div data-reveal="up">
                <ProductPurchase product={product} />
              </div>

              <div data-reveal="up">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa-500">Best with</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.pairings.map((p) => (
                    <li key={p} className="rounded-full border border-cocoa-800/10 bg-cream-50 px-3 py-1.5 text-sm font-medium text-cocoa-700">{p}</li>
                  ))}
                </ul>
              </div>

              <div data-reveal="up" className="divide-y divide-cocoa-800/10 overflow-hidden rounded-3xl border border-cocoa-800/10 bg-cream-50">
                {details.map((row, i) => (
                  <details key={row.title} open={i === 0} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 font-semibold text-cocoa-900">
                      {row.title}
                      <span aria-hidden className="grid size-7 place-items-center rounded-full bg-cream-200 text-cocoa-700 transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-6 text-cocoa-600">{row.body}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-page py-16 sm:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p data-reveal="up" className="font-script text-2xl text-spice-500 sm:text-3xl">Can&apos;t decide?</p>
              <h2 data-split className="mt-2 font-display text-4xl font-semibold leading-[1.05] text-cocoa-900 sm:text-5xl">
                Try the {related[0].flavourName.toLowerCase()} flavour too.
              </h2>
              <p data-reveal="up" className="mt-4 max-w-md leading-7 text-cocoa-600">
                Keep both on the shelf — {product.flavourName.toLowerCase()} for some dishes, {related[0].flavourName.toLowerCase()} for others.
                Two packs get you closer to free delivery.
              </p>
            </div>
            <div data-reveal="right" className="mx-auto w-full max-w-md lg:max-w-none">
              <FlavourCard product={related[0]} compact />
            </div>
          </div>
        </section>
      )}
      <ScrollMotion />
    </>
  );
}
