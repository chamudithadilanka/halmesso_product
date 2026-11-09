"use client";

import Link from "next/link";
import type { Product } from "@/domain/entities";
import { CATEGORY_LABELS } from "@/domain/entities";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import ProductVisual from "./product-visual";
import RatingStars from "./rating-stars";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-golden-sand/30 bg-brand-pure-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-dark-green/10 dark:border-brand-warm-cream/15 dark:bg-brand-dark-green dark:hover:shadow-black/40">
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-[4/5] overflow-hidden"
      >
        <ProductVisual
          product={product}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.compareAtPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-herbal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-pure-white">
            Sale
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {CATEGORY_LABELS[product.category]}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="text-[15px] font-medium leading-snug text-zinc-900 hover:underline underline-offset-2 dark:text-zinc-50"
        >
          {product.name}
        </Link>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-dark-green px-3.5 text-[13px] font-medium text-brand-pure-white transition-colors hover:bg-brand-olive"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1.3 10.4a2 2 0 01-2 1.6H8.3a2 2 0 01-2-1.6L5 9z" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
