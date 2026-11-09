"use client";

import Link from "next/link";
import { CheckIcon, UserIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { formatDate, formatPrice } from "@/lib/format";
import { useOrders } from "@/lib/orders";

export default function AccountPage() {
  const { user, hydrated, signOut } = useAuth();
  const { itemCount } = useCart();
  const { orders } = useOrders();

  if (!hydrated) {
    return (
      <div className="container-page py-16" aria-busy="true">
        <div className="h-10 w-52 animate-pulse rounded-full bg-cream-200" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="h-72 animate-pulse rounded-3xl bg-cream-200 lg:col-span-4" />
          <div className="h-72 animate-pulse rounded-3xl bg-cream-200 lg:col-span-8" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-page flex max-w-md flex-1 flex-col items-center justify-center gap-5 py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-cream-200 text-cocoa-500">
          <UserIcon className="size-9" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold text-cocoa-900">Sign in to your account</h1>
          <p className="mt-2 text-cocoa-600">See your orders and check out faster.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/login" className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-7 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">Sign in</Link>
          <Link href="/signup" className="inline-flex h-12 items-center rounded-full border border-cocoa-800/20 px-7 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">Create account</Link>
        </div>
      </div>
    );
  }

  const initials = user.name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "H";

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-4xl font-semibold text-cocoa-900">Hello, {user.name.split(" ")[0]}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <section className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-6 lg:col-span-4 lg:self-start">
          <div className="flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-spice-500 to-garlic-500 font-display text-xl font-semibold text-cream-50">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-cocoa-900">{user.name}</p>
              <p className="truncate text-sm text-cocoa-500">{user.email}</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-cocoa-800/10 pt-6 text-sm">
            <div><dt className="text-cocoa-500">In cart</dt><dd className="mt-0.5 text-xl font-semibold tabular-nums text-cocoa-900">{itemCount}</dd></div>
            <div><dt className="text-cocoa-500">Member since</dt><dd className="mt-0.5 text-base font-semibold text-cocoa-900">{user.joinedAt ? formatDate(user.joinedAt) : "—"}</dd></div>
          </dl>
          <button type="button" onClick={signOut} className="mt-6 h-11 w-full rounded-full border border-cocoa-800/20 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">
            Sign out
          </button>
        </section>

        <section className="lg:col-span-8" aria-labelledby="orders-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="orders-heading" className="font-display text-2xl font-semibold text-cocoa-900">Your orders</h2>
            <Link href="/products" className="text-sm font-semibold text-cocoa-600 hover:text-cocoa-900">Shop again →</Link>
          </div>

          {orders.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {orders.map((order) => (
                <li key={order.id} className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-leaf-600/10 text-leaf-700"><CheckIcon className="size-5" /></span>
                      <div>
                        <p className="font-semibold text-cocoa-900">{order.id}</p>
                        <p className="text-xs text-cocoa-500">{formatDate(order.placedAt)} · {order.payment === "cod" ? "Cash on delivery" : "Card"}</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold tabular-nums text-cocoa-900">{formatPrice(order.total)}</span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2 border-t border-cocoa-800/10 pt-3">
                    {order.lines.map((l) => (
                      <li key={l.productId} className="rounded-full bg-cream-200/70 px-3 py-1 text-xs font-medium text-cocoa-700">{l.quantity} × {l.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-3xl border border-dashed border-cocoa-800/20 p-10 text-center">
              <p className="font-semibold text-cocoa-900">No orders yet</p>
              <p className="mt-1 text-sm text-cocoa-500">Orders you place will appear here.</p>
              <Link href="/products" className="mt-5 inline-flex h-11 items-center rounded-full bg-cocoa-800 px-6 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">Start shopping</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
