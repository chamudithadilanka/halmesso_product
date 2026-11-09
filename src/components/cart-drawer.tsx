"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/application/cart";
import ProductVisual from "./product-visual";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    itemCount,
    subtotal,
    setQuantity,
    removeFromCart,
  } = useCart();

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md transform flex-col bg-brand-warm-cream shadow-2xl transition-transform duration-300 ease-out dark:bg-brand-dark-green ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/[.06] px-4 sm:px-6 py-4 dark:border-white/[.08]">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Your cart {itemCount > 0 && <span className="text-zinc-400">· {itemCount}</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-black/[.05] hover:text-zinc-900 dark:hover:bg-white/[.06] dark:hover:text-zinc-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-14 w-14 text-zinc-300 dark:text-zinc-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1.3 10.4a2 2 0 01-2 1.6H8.3a2 2 0 01-2-1.6L5 9z" />
            </svg>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Your cart is empty</p>
              <p className="mt-1 text-sm text-zinc-500">Beautiful things await. Let&apos;s fix that.</p>
            </div>
            <Link
              href="/products"
              onClick={closeCart}
              className="rounded-full bg-brand-dark-green px-4 py-3 text-sm font-medium text-brand-pure-white transition-colors hover:bg-brand-olive sm:px-6"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-black/[.06] px-4 sm:px-6 py-3 dark:border-white/[.08]">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {remainingForFreeShipping > 0 ? (
                  <>You&apos;re <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatPrice(remainingForFreeShipping)}</span> away from free shipping</>
                ) : (
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">You&apos;ve unlocked free shipping ✓</span>
                )}
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-brand-herbal transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
              <ul className="flex flex-col divide-y divide-black/[.06] dark:divide-white/[.08]">
                {lines.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id} className="flex gap-4 py-4">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={closeCart}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded-xl"
                    >
                      <ProductVisual product={product} className="h-full w-full" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium leading-snug text-zinc-900 hover:underline dark:text-zinc-100"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-zinc-400 transition-colors hover:text-red-500"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9.5 7V5a1.5 1.5 0 011.5-1.5h2A1.5 1.5 0 0114.5 5v2M4.5 7h15" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-black/[.1] dark:border-white/[.14]">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity(product.id, quantity - 1)}
                            className="px-2.5 py-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                          >−</button>
                          <span className="w-6 text-center text-sm font-medium tabular-nums">{quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity(product.id, quantity + 1)}
                            className="px-2.5 py-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                          >+</button>
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-black/[.06] px-4 sm:px-6 py-4 dark:border-white/[.08]">
              <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-semibold text-zinc-900 dark:text-zinc-50">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">Shipping & taxes calculated at checkout</p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-brand-dark-green text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive"
              >
                Checkout →
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 flex h-11 w-full items-center justify-center rounded-full border border-black/[.1] text-sm font-medium text-zinc-700 transition-colors hover:bg-black/[.04] dark:border-white/[.14] dark:text-zinc-200 dark:hover:bg-white/[.05]"
              >
                View full cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
