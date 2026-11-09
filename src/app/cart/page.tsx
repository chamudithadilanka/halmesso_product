"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { computeTotals, FREE_SHIPPING_THRESHOLD, getPromoRate, normalizePromoCode } from "@/application/cart";
import { BagIcon, TrashIcon } from "@/components/icons";
import QuantityStepper from "@/components/quantity-stepper";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useStored, writeStored } from "@/lib/local-store";
import { STORAGE_KEYS } from "@/lib/site";

export default function CartPage() {
  const { lines, itemCount, subtotal, hydrated, setQuantity, removeFromCart } = useCart();
  const { value: promoRaw } = useStored(STORAGE_KEYS.promo);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  const promo = getPromoRate(promoRaw) !== null ? promoRaw : null;
  const promoRate = getPromoRate(promo);
  const totals = computeTotals(subtotal, promo);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyPromo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = normalizePromoCode(promoInput);
    if (!code) return;
    if (getPromoRate(code) === null) {
      setPromoError("That code isn't valid. Check the spelling and try again.");
      return;
    }
    writeStored(STORAGE_KEYS.promo, code);
    setPromoInput("");
    setPromoError(null);
  };

  if (!hydrated) {
    return (
      <div className="container-page py-16" aria-busy="true">
        <div className="h-10 w-56 animate-pulse rounded-full bg-cream-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="h-64 animate-pulse rounded-3xl bg-cream-200 lg:col-span-7" />
          <div className="h-64 animate-pulse rounded-3xl bg-cream-200 lg:col-span-5" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-1 flex-col items-center justify-center gap-5 py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-cream-200 text-cocoa-500">
          <BagIcon className="size-9" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold text-cocoa-900">Your cart is empty</h1>
          <p className="mt-2 text-cocoa-600">Pick a flavour — masala, garlic, or both.</p>
        </div>
        <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-8 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
          Shop flavours
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-4xl font-semibold text-cocoa-900">
        Your cart <span className="text-cocoa-500">· {itemCount} {itemCount === 1 ? "pack" : "packs"}</span>
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <ul className="divide-y divide-cocoa-800/10 border-y border-cocoa-800/10 lg:col-span-7">
          {lines.map(({ product, quantity, lineTotal }) => (
            <li key={product.id} className="flex gap-4 py-5 sm:gap-6">
              <Link href={`/products/${product.slug}`} className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-cream-200 sm:size-32">
                <Image src={product.image} alt={product.imageAlt} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/products/${product.slug}`} className="font-semibold leading-snug text-cocoa-900 hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-cocoa-500">{product.netWeight} · {formatPrice(product.price)} each</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="-mr-2 grid size-10 shrink-0 place-items-center rounded-full text-cocoa-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <TrashIcon className="size-[18px]" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <QuantityStepper value={quantity} onChange={(q) => setQuantity(product.id, q)} />
                  <span className="text-lg font-semibold tabular-nums text-cocoa-900">{formatPrice(lineTotal)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold text-cocoa-900">Order summary</h2>

            {remaining > 0 && (
              <p className="mt-3 rounded-2xl bg-cream-200/70 px-4 py-3 text-sm text-cocoa-700">
                Add <strong>{formatPrice(remaining)}</strong> more for free delivery.
              </p>
            )}

            {promo ? (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-leaf-600/30 bg-leaf-600/10 px-4 py-3 text-sm">
                <span className="font-semibold text-leaf-700">{promo} applied — {Math.round((promoRate ?? 0) * 100)}% off</span>
                <button type="button" onClick={() => writeStored(STORAGE_KEYS.promo, null)} className="text-xs font-semibold text-cocoa-600 underline-offset-2 hover:text-cocoa-900 hover:underline">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={applyPromo} className="mt-4" noValidate>
                <label htmlFor="promo" className="mb-1.5 block text-sm font-medium text-cocoa-800">Promo code</label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    name="promo"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError(null);
                    }}
                    autoComplete="off"
                    autoCapitalize="characters"
                    aria-invalid={promoError ? true : undefined}
                    aria-describedby={promoError ? "promo-error" : undefined}
                    className="h-11 min-w-0 flex-1 rounded-2xl border border-cocoa-800/15 bg-cream-100 px-4 text-sm uppercase text-cocoa-900 outline-none focus:border-leaf-600 focus:ring-4 focus:ring-leaf-600/15"
                  />
                  <button type="submit" className="h-11 shrink-0 rounded-2xl bg-cocoa-800 px-5 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
                    Apply
                  </button>
                </div>
                {promoError && <p id="promo-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">{promoError}</p>}
              </form>
            )}

            <dl className="mt-5 space-y-2.5 text-sm text-cocoa-700">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-leaf-700"><dt>Discount</dt><dd className="tabular-nums">−{formatPrice(totals.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd></div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-cocoa-800/10 pt-4 text-lg font-semibold text-cocoa-900">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(totals.total)}</span>
            </div>

            <Link href="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-full bg-cocoa-800 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
              Proceed to checkout →
            </Link>
            <Link href="/products" className="mt-2 flex h-11 items-center justify-center rounded-full text-sm font-semibold text-cocoa-600 transition hover:bg-cocoa-800/5 hover:text-cocoa-900">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
