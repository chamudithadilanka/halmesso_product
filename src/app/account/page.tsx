"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { parseJson, useStored } from "@/lib/local-store";

type LastOrder = { id: string; total: number; itemCount: number; placedAt: string };

export default function AccountPage() {
  const { user, hydrated, signOut } = useAuth();
  const { itemCount } = useCart();
  const { value: orderRaw } = useStored("halmessso-last-order");
  const lastOrder = useMemo(() => parseJson<LastOrder>(orderRaw), [orderRaw]);

  if (!hydrated) {
    return <main className="mx-auto w-full max-w-6xl px-4 py-24 text-center text-sm text-zinc-400">Loading account…</main>;
  }

  if (!user) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-14 w-14 text-zinc-300 dark:text-zinc-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
        </svg>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Sign in to your account</h1>
          <p className="mt-1 text-sm text-zinc-500">Track orders, save your details, and check out faster.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="flex h-11 items-center rounded-full bg-brand-dark-green px-7 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">Sign in</Link>
          <Link href="/signup" className="flex h-11 items-center rounded-full border border-black/[.12] px-7 text-sm font-semibold text-zinc-800 transition-colors hover:bg-black/[.04] dark:border-white/[.16] dark:text-zinc-100 dark:hover:bg-white/[.05]">Create account</Link>
        </div>
      </main>
    );
  }

  const initials = user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">My account</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Profile card */}
        <section className="rounded-2xl border border-brand-golden-sand/35 bg-brand-warm-cream p-6 lg:col-span-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-herbal text-xl font-semibold text-brand-pure-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</p>
              <p className="truncate text-sm text-zinc-500">{user.email}</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-black/[.06] pt-6 text-sm dark:border-white/[.08]">
            <div><dt className="text-zinc-400">Items in cart</dt><dd className="mt-0.5 text-xl font-semibold tabular-nums">{itemCount}</dd></div>
            <div><dt className="text-zinc-400">Member since</dt><dd className="mt-0.5 text-xl font-semibold">2026</dd></div>
          </dl>
          <button
            type="button"
            onClick={signOut}
            className="mt-6 h-11 w-full rounded-full border border-black/[.12] text-sm font-medium text-zinc-700 transition-colors hover:bg-black/[.04] dark:border-white/[.14] dark:text-zinc-200 dark:hover:bg-white/[.05]"
          >
            Sign out
          </button>
        </section>

        {/* Orders */}
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Order history</h2>
            <Link href="/products" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200">Continue shopping →</Link>
          </div>

          {lastOrder ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/[.06] p-4 dark:border-white/[.08] sm:p-5">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-emerald-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Order {lastOrder.id} — Delivered soon</p>
                  <p className="text-xs text-zinc-400">{new Date(lastOrder.placedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {lastOrder.itemCount} item{lastOrder.itemCount === 1 ? "" : "s"}</p>
                </div>
              </div>
              <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{formatPrice(lastOrder.total)}</span>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-black/[.12] p-10 text-center dark:border-white/[.14]">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">No orders yet</p>
              <p className="mt-1 text-xs text-zinc-400">Your placed orders will appear here after checkout.</p>
              <Link href="/products" className="mt-4 inline-flex h-11 items-center rounded-full bg-brand-dark-green px-6 text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
                Start shopping
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
