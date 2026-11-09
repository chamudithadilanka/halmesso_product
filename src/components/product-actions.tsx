"use client";

import { useState } from "react";
import type { Product } from "@/domain/entities";
import { useCart } from "@/lib/cart";

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-full border border-black/[.1] dark:border-white/[.14]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 text-lg text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >−</button>
          <span className="w-8 text-center font-semibold tabular-nums">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-4 text-lg text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >+</button>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product.id, quantity)}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-dark-green px-6 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.875a4.5 4.5 0 00-9 0V10.5m-3 0h15l-1.125 9.563a2.25 2.25 0 01-2.225 1.937H9.85a2.25 2.25 0 01-2.225-1.937L6.5 10.5z" />
          </svg>
          Add to cart
        </button>
      </div>

      <p className="text-[11px] text-zinc-400">
        Free shipping over $75 · 30-day returns · 2-year warranty on goods built to last
      </p>
    </div>
  );
}
