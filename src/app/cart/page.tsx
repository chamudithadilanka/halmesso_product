"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { computeTotals } from "@/application/cart";
import { useStored, writeStored } from "@/lib/local-store";
import ProductVisual from "@/components/product-visual";

const PROMO_KEY = "halmessso-promo";

export default function CartPage() {
  const { lines, itemCount, subtotal, hydrated, setQuantity, removeFromCart } = useCart();
  const { value: promoRaw } = useStored(PROMO_KEY);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const promo = promoRaw || null;

  const totals = computeTotals(subtotal, promo);

  const applyPromo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === "HALMESSO10") {
      writeStored(PROMO_KEY, code);
      setPromoInput("");
      setPromoError(null);
    } else {
      setPromoError("That code doesn't look right — try HALMESSO10");
    }
  };

  const removePromo = () => {
    writeStored(PROMO_KEY, null);
    setPromoInput("");
  };

  if (!hydrated) {
    return <main className="mx-auto w-full max-w-6xl px-4 py-24 text-center text-sm text-zinc-400">Loading cart…</main>;
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-16 w-16 text-zinc-300 dark:text-zinc-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.875a4.5 4.5 0 00-9 0V10.5m-3 0h15l-1.125 9.563a2.25 2.25 0 01-2.225 1.937H9.85a2.25 2.25 0 01-2.225-1.937L6.5 10.5z" />
        </svg>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Your cart is empty</h1>
          <p className="mt-1 text-sm text-zinc-500">Once you add something beautiful, it will show up here.</p>
        </div>
        <Link href="/products" className="flex h-12 items-center rounded-full bg-brand-dark-green px-8 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
          Browse the shop
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Your cart <span className="text-zinc-400">· {itemCount} {itemCount === 1 ? "item" : "items"}</span>
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* Lines */}
        <ul className="flex flex-col divide-y divide-black/[.06] border-y border-black/[.06] dark:divide-white/[.08] dark:border-white/[.08] lg:col-span-7">
          {lines.map(({ product, quantity, lineTotal }) => (
            <li key={product.id} className="flex gap-3 py-4 sm:gap-5 sm:py-5">
              <Link href={`/products/${product.slug}`} className="h-24 w-20 shrink-0 sm:h-32 sm:w-28 overflow-hidden rounded-2xl">
                <ProductVisual product={product} className="h-full w-full" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/products/${product.slug}`} className="font-medium leading-snug text-zinc-900 hover:underline dark:text-zinc-50">
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-zinc-400">{product.tagline}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-black/[.1] dark:border-white/[.14]">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(product.id, quantity - 1)} className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">−</button>
                    <span className="w-7 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(product.id, quantity + 1)} className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">+</button>
                  </div>
                  <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{formatPrice(lineTotal)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-brand-golden-sand/35 bg-brand-warm-cream p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Order summary</h2>

            {/* Promo */}
            {promo ? (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-50 px-4 py-2.5 text-sm dark:border-emerald-400/20 dark:bg-emerald-950/30">
                <span className="font-medium text-emerald-700 dark:text-emerald-400">{promo} applied — 10% off</span>
                <button type="button" onClick={removePromo} className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Remove</button>
              </div>
            ) : (
              <form onSubmit={applyPromo} className="mt-4">
                <div className="flex overflow-hidden rounded-xl border border-brand-golden-sand/60 focus-within:border-brand-herbal">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code — try HALMESSO10"
                    aria-label="Promo code"
                    className="h-11 w-full bg-transparent px-4 text-sm uppercase outline-none placeholder:normal-case placeholder:text-zinc-400"
                  />
                  <button type="submit" className="shrink-0 px-4 text-sm font-semibold text-brand-dark-green hover:text-brand-herbal">Apply</button>
                </div>
                {promoError && <p className="mt-1.5 text-xs text-red-500">{promoError}</p>}
              </form>
            )}

            <dl className="mt-5 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400"><dt>Discount</dt><dd className="tabular-nums">−{formatPrice(totals.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd></div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-black/[.08] pt-4 text-lg font-semibold text-zinc-900 dark:border-white/[.1] dark:text-zinc-50">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(totals.total)}</span>
            </div>

            <Link href="/checkout" className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-brand-dark-green text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
              Proceed to checkout →
            </Link>
            <Link href="/products" className="mt-2 flex h-11 w-full items-center justify-center rounded-full text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
