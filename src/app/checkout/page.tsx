"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { computeTotals } from "@/application/cart";
import { useStored, writeStored } from "@/lib/local-store";
import ProductVisual from "@/components/product-visual";

export const LAST_ORDER_KEY = "halmessso-last-order";
const PROMO_KEY = "halmessso-promo";

type PlacedOrder = {
  id: string;
  total: number;
  itemCount: number;
  placedAt: string;
};

// Module-level factory keeps impure calls out of render (react-hooks/purity).
function buildOrder(total: number, itemCount: number): PlacedOrder {
  return {
    id: `HLM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    total,
    itemCount,
    placedAt: new Date().toISOString(),
  };
}

const inputClass =
  "h-11 w-full rounded-xl border border-brand-golden-sand/60 bg-transparent px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-brand-herbal";

export default function CheckoutPage() {
  const { lines, subtotal, hydrated, clearCart } = useCart();
  const { value: promoRaw } = useStored(PROMO_KEY);
  const [card, setCard] = useState("");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const promo = promoRaw || null;

  const totals = computeTotals(subtotal, promo);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = buildOrder(
      totals.total,
      lines.reduce((n, l) => n + l.quantity, 0),
    );
    writeStored(LAST_ORDER_KEY, JSON.stringify(order));
    writeStored(PROMO_KEY, null);
    clearCart();
    setPlaced(order);
  };

  const formatCard = (value: string) =>
    value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  if (!hydrated) {
    return <main className="mx-auto w-full max-w-6xl px-4 py-24 text-center text-sm text-zinc-400">Loading checkout…</main>;
  }

  // Confirmation state
  if (placed) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-emerald-600 dark:text-emerald-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Order placed!</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Thank you — order <span className="font-semibold text-zinc-800 dark:text-zinc-200">{placed.id}</span> is confirmed.
            A receipt was sent to your inbox (metaphorically — this is a demo).
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-brand-golden-sand/35 bg-brand-warm-cream px-8 py-4 text-sm">
          <div><dt className="text-zinc-400">Items</dt><dd className="font-semibold">{placed.itemCount}</dd></div>
          <div><dt className="text-zinc-400">Total</dt><dd className="font-semibold">{formatPrice(placed.total)}</dd></div>
        </dl>
        <Link href="/products" className="mt-2 flex h-12 items-center rounded-full bg-brand-dark-green px-8 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
          Keep browsing
        </Link>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Nothing to check out yet</h1>
        <p className="text-sm text-zinc-500">Add a few things to your cart first.</p>
        <Link href="/products" className="flex h-12 items-center rounded-full bg-brand-dark-green px-8 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
          Browse the shop
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* Form sections */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">1 · Contact</legend>
            <input required type="email" placeholder="Email address" aria-label="Email address" className={`${inputClass} mt-3`} />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">2 · Shipping address</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input required placeholder="First name" aria-label="First name" className={inputClass} />
              <input required placeholder="Last name" aria-label="Last name" className={inputClass} />
              <input required placeholder="Address" aria-label="Address" className={`${inputClass} sm:col-span-2`} />
              <input required placeholder="City" aria-label="City" className={inputClass} />
              <input required placeholder="ZIP / Postal code" aria-label="ZIP or postal code" className={inputClass} />
              <select required defaultValue="" aria-label="Country" className={`${inputClass} text-zinc-500`}>
                <option value="" disabled>Country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>France</option>
                <option>Australia</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">3 · Payment</legend>
            <p className="mt-1 text-xs text-zinc-400">Demo only — no card is charged. Use any numbers.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                required
                inputMode="numeric"
                value={card}
                onChange={(e) => setCard(formatCard(e.target.value))}
                placeholder="1234 5678 9012 3456"
                aria-label="Card number"
                className={`${inputClass} sm:col-span-2 tabular-nums`}
              />
              <input required placeholder="Name on card" aria-label="Name on card" className={`${inputClass} sm:col-span-2`} />
              <input required placeholder="MM/YY" aria-label="Expiry" pattern="(0[1-9]|1[0-2])\/\d{2}" className={inputClass} />
              <input required placeholder="CVC" aria-label="CVC" inputMode="numeric" pattern="\d{3,4}" className={inputClass} />
            </div>
          </fieldset>

          <button
            type="submit"
            className="flex h-13 w-full items-center justify-center rounded-full bg-brand-dark-green py-4 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive"
          >
            Pay {formatPrice(totals.total)}
          </button>
        </div>

        {/* Order summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-brand-golden-sand/35 bg-brand-warm-cream p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your order</h2>
            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <ProductVisual product={product} className="h-16 w-14 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{product.name}</p>
                    <p className="text-xs text-zinc-400">Qty {quantity}</p>
                  </div>
                  <span className="text-sm font-medium tabular-nums text-zinc-700 dark:text-zinc-300">{formatPrice(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-black/[.08] pt-4 text-sm text-zinc-600 dark:border-white/[.1] dark:text-zinc-300">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400"><dt>Discount ({promo})</dt><dd className="tabular-nums">−{formatPrice(totals.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd></div>
              <div className="flex justify-between border-t border-black/[.08] pt-2 text-base font-semibold text-zinc-900 dark:border-white/[.1] dark:text-zinc-50"><dt>Total</dt><dd className="tabular-nums">{formatPrice(totals.total)}</dd></div>
            </dl>
          </div>
        </aside>
      </form>
    </main>
  );
}
