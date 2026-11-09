"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { computeTotals, FREE_SHIPPING_THRESHOLD } from "@/application/cart";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useStored } from "@/lib/local-store";
import { STORAGE_KEYS } from "@/lib/site";
import QuantityStepper from "./quantity-stepper";
import { BagIcon, CloseIcon, TrashIcon } from "./icons";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, itemCount, subtotal, setQuantity, removeFromCart } = useCart();
  const { value: promo } = useStored(STORAGE_KEYS.promo);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const totals = computeTotals(subtotal, promo || null);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  // Focus management, Escape to close, focus trap and scroll lock.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [isOpen, closeCart]);

  return (
    <div inert={!isOpen} className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      <div
        aria-hidden
        onClick={closeCart}
        className={`absolute inset-0 bg-cocoa-950/50 backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-cream-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-cocoa-800/10 px-5 py-4">
          <h2 id="cart-title" className="font-display text-xl font-semibold text-cocoa-900">
            Your cart {itemCount > 0 && <span className="text-cocoa-500">· {itemCount}</span>}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid size-10 place-items-center rounded-full text-cocoa-600 transition hover:bg-cocoa-800/5 hover:text-cocoa-900"
          >
            <CloseIcon className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-cream-200 text-cocoa-500">
              <BagIcon className="size-7" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-cocoa-900">Your cart is empty</p>
              <p className="mt-1 text-sm text-cocoa-500">Masala or garlic — or both? Pick a flavour to get started.</p>
            </div>
            <Link href="/products" onClick={closeCart} className="inline-flex h-11 items-center rounded-full bg-cocoa-800 px-6 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
              Shop flavours
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-cocoa-800/10 px-5 py-3">
              <p className="text-xs text-cocoa-600">
                {remaining > 0 ? (
                  <>Add <span className="font-semibold text-cocoa-900">{formatPrice(remaining)}</span> more for free delivery</>
                ) : (
                  <span className="font-semibold text-leaf-700">You&apos;ve unlocked free delivery ✓</span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-200">
                <div className="h-full rounded-full bg-gradient-to-r from-leaf-600 to-gold transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-cocoa-800/10 overflow-y-auto overscroll-contain px-5">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <Link href={`/products/${product.slug}`} onClick={closeCart} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-cream-200">
                    <Image src={product.image} alt={product.imageAlt} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/products/${product.slug}`} onClick={closeCart} className="text-sm font-semibold leading-snug text-cocoa-900 hover:underline">
                          {product.name}
                        </Link>
                        <p className="text-xs text-cocoa-500">{product.netWeight} · {formatPrice(product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="-mr-2 -mt-1 grid size-9 shrink-0 place-items-center rounded-full text-cocoa-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper size="sm" value={quantity} min={1} onChange={(q) => setQuantity(product.id, q)} />
                      <span className="text-sm font-semibold tabular-nums text-cocoa-900">{formatPrice(lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-cocoa-800/10 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <dl className="space-y-1.5 text-sm text-cocoa-600">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd></div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-leaf-700"><dt>Promo ({promo})</dt><dd className="tabular-nums">−{formatPrice(totals.discount)}</dd></div>
                )}
                <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd></div>
                <div className="flex justify-between border-t border-cocoa-800/10 pt-2 text-base font-semibold text-cocoa-900"><dt>Total</dt><dd className="tabular-nums">{formatPrice(totals.total)}</dd></div>
              </dl>
              <Link href="/checkout" onClick={closeCart} className="mt-4 flex h-12 items-center justify-center rounded-full bg-cocoa-800 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
                Checkout →
              </Link>
              <Link href="/cart" onClick={closeCart} className="mt-2 flex h-11 items-center justify-center rounded-full text-sm font-semibold text-cocoa-700 transition hover:bg-cocoa-800/5">
                View cart &amp; add promo code
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
