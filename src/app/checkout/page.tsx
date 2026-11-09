"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { computeTotals, getPromoRate } from "@/application/cart";
import type { Order, PaymentMethod } from "@/domain/entities";
import FormField, { inputClass } from "@/components/form-field";
import { CheckIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useStored, writeStored } from "@/lib/local-store";
import { createOrderId, saveOrder } from "@/lib/orders";
import { STORAGE_KEYS } from "@/lib/site";

const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota",
  "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle",
];

const SL_PHONE = /^(?:\+94|0)?7\d{8}$/;

function formatCard(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function isExpiryValid(value: string) {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

type Errors = Partial<Record<"phone" | "card" | "expiry" | "cvc", string>>;

export default function CheckoutPage() {
  const { lines, subtotal, itemCount, hydrated, clearCart } = useCart();
  const { user } = useAuth();
  const { value: promoRaw } = useStored(STORAGE_KEYS.promo);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<Order | null>(null);

  const promo = getPromoRate(promoRaw) !== null ? promoRaw : null;
  const totals = computeTotals(subtotal, promo);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const nextErrors: Errors = {};
    const phone = get("phone").replace(/[\s-]/g, "");
    if (!SL_PHONE.test(phone)) nextErrors.phone = "Enter a Sri Lankan mobile number, e.g. 077 123 4567.";
    if (payment === "card") {
      if (card.replace(/\s/g, "").length < 15) nextErrors.card = "Enter the full card number.";
      if (!isExpiryValid(expiry)) nextErrors.expiry = "Enter a valid expiry date (MM/YY) that hasn't passed.";
      if (!/^\d{3,4}$/.test(get("cvc"))) nextErrors.cvc = "3 or 4 digits.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    const order: Order = {
      id: createOrderId(),
      placedAt: new Date().toISOString(),
      lines: lines.map((l) => ({ productId: l.product.id, name: l.product.name, quantity: l.quantity, lineTotal: l.lineTotal })),
      ...totals,
      promoCode: promo,
      payment,
      customer: {
        name: `${get("firstName")} ${get("lastName")}`.trim(),
        email: get("email"),
        phone,
        city: get("city"),
      },
    };
    saveOrder(order);
    writeStored(STORAGE_KEYS.promo, null);
    clearCart();
    setPlaced(order);
    window.scrollTo({ top: 0 });
  };

  if (!hydrated) {
    return (
      <div className="container-page py-16" aria-busy="true">
        <div className="h-10 w-48 animate-pulse rounded-full bg-cream-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="h-96 animate-pulse rounded-3xl bg-cream-200 lg:col-span-7" />
          <div className="h-72 animate-pulse rounded-3xl bg-cream-200 lg:col-span-5" />
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-page flex max-w-xl flex-1 flex-col items-center justify-center gap-6 py-20 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-leaf-600 text-cream-50 shadow-xl shadow-leaf-700/30">
          <CheckIcon className="size-10" strokeWidth={2.4} />
        </span>
        <div>
          <h1 className="font-display text-4xl font-semibold text-cocoa-900">Thank you, {placed.customer.name.split(" ")[0]}!</h1>
          <p className="mt-3 leading-7 text-cocoa-600">
            Order <strong className="text-cocoa-900">{placed.id}</strong> is confirmed.
            {placed.payment === "cod"
              ? ` Please keep ${formatPrice(placed.total)} ready — you'll pay on delivery.`
              : " Your payment was accepted (demo — no card was charged)."}
          </p>
        </div>
        <dl className="grid w-full grid-cols-3 gap-4 rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5 text-sm">
          <div><dt className="text-cocoa-500">Packs</dt><dd className="mt-1 text-lg font-semibold text-cocoa-900">{placed.lines.reduce((n, l) => n + l.quantity, 0)}</dd></div>
          <div><dt className="text-cocoa-500">Total</dt><dd className="mt-1 text-lg font-semibold text-cocoa-900">{formatPrice(placed.total)}</dd></div>
          <div><dt className="text-cocoa-500">Payment</dt><dd className="mt-1 text-lg font-semibold text-cocoa-900">{placed.payment === "cod" ? "COD" : "Card"}</dd></div>
        </dl>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/account" className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-7 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
            View my orders
          </Link>
          <Link href="/products" className="inline-flex h-12 items-center rounded-full border border-cocoa-800/20 px-7 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-1 flex-col items-center justify-center gap-5 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-cocoa-900">Nothing to check out yet</h1>
        <p className="text-cocoa-600">Add a pack or two to your cart first.</p>
        <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-8 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
          Shop flavours
        </Link>
      </div>
    );
  }

  const [firstName = "", ...rest] = (user?.name ?? "").split(" ");
  const sectionTitle = "font-display text-xl font-semibold text-cocoa-900";

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-4xl font-semibold text-cocoa-900">Checkout</h1>
      {!user && (
        <p className="mt-2 text-sm text-cocoa-600">
          Have an account? <Link href="/login?next=/checkout" className="font-semibold text-cocoa-900 underline underline-offset-2">Sign in</Link> for faster checkout.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <fieldset className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5 sm:p-7">
            <legend className="sr-only">Contact</legend>
            <h2 className={sectionTitle}>1. Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField label="Email" id="email" name="email" type="email" autoComplete="email" required defaultValue={user?.email} className="sm:col-span-2" />
              <FormField
                label="Mobile number"
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="077 123 4567"
                required
                error={errors.phone}
                hint="Our courier will call this number before delivery."
                className="sm:col-span-2"
              />
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5 sm:p-7">
            <legend className="sr-only">Delivery address</legend>
            <h2 className={sectionTitle}>2. Delivery address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField label="First name" id="firstName" name="firstName" autoComplete="given-name" required defaultValue={firstName} />
              <FormField label="Last name" id="lastName" name="lastName" autoComplete="family-name" required defaultValue={rest.join(" ")} />
              <FormField label="Address" id="address" name="address" autoComplete="street-address" placeholder="House no., street" required className="sm:col-span-2" />
              <FormField label="City / town" id="city" name="city" autoComplete="address-level2" required />
              <FormField label="District" id="district" name="district" required>
                <select id="district" name="district" required defaultValue="" autoComplete="address-level1" className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%237a4527%22><path d=%22M5.5 7.5 10 12l4.5-4.5%22 stroke=%22%237a4527%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
                  <option value="" disabled>Select district</option>
                  {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </FormField>
              <FormField label="Postal code" id="postal" name="postal" inputMode="numeric" autoComplete="postal-code" pattern="\d{5}" title="5-digit postal code" />
              <FormField label="Delivery notes" id="notes" name="notes" placeholder="Landmark, gate code…" className="sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5 sm:p-7">
            <legend className="sr-only">Payment</legend>
            <h2 className={sectionTitle}>3. Payment</h2>
            <div role="radiogroup" className="mt-4 grid gap-3 sm:grid-cols-2">
              {([
                ["cod", "Cash on delivery", "Pay the courier when your order arrives."],
                ["card", "Debit / credit card", "Demo only — no card is charged."],
              ] as const).map(([value, title, body]) => (
                <label key={value} className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${payment === value ? "border-leaf-600 bg-leaf-600/5 ring-4 ring-leaf-600/10" : "border-cocoa-800/15 hover:border-cocoa-800/30"}`}>
                  <input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="mt-1 size-4 accent-leaf-600" />
                  <span>
                    <span className="block text-sm font-semibold text-cocoa-900">{title}</span>
                    <span className="block text-xs leading-5 text-cocoa-600">{body}</span>
                  </span>
                </label>
              ))}
            </div>

            {payment === "card" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Card number"
                  id="card"
                  name="card"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  error={errors.card}
                  className="sm:col-span-2"
                />
                <FormField label="Name on card" id="ccname" name="ccname" autoComplete="cc-name" required className="sm:col-span-2" />
                <FormField label="Expiry" id="expiry" name="expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" required value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} error={errors.expiry} />
                <FormField label="CVC" id="cvc" name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} required error={errors.cvc} />
              </div>
            )}
          </fieldset>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-6 lg:sticky lg:top-24">
            <h2 className={sectionTitle}>Your order · {itemCount} {itemCount === 1 ? "pack" : "packs"}</h2>
            <ul className="mt-4 space-y-3">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-200">
                    <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
                    <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-cocoa-800 px-1 text-[10px] font-bold text-cream-50">{quantity}</span>
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-cocoa-900">{product.name}</p>
                  <span className="text-sm font-medium tabular-nums text-cocoa-700">{formatPrice(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-cocoa-800/10 pt-4 text-sm text-cocoa-700">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-leaf-700"><dt>Discount ({promo})</dt><dd className="tabular-nums">−{formatPrice(totals.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd></div>
              <div className="flex justify-between border-t border-cocoa-800/10 pt-3 text-lg font-semibold text-cocoa-900"><dt>Total</dt><dd className="tabular-nums">{formatPrice(totals.total)}</dd></div>
            </dl>
            <button type="submit" className="mt-5 flex h-13 w-full items-center justify-center rounded-full bg-cocoa-800 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
              {payment === "cod" ? `Place order · ${formatPrice(totals.total)}` : `Pay ${formatPrice(totals.total)}`}
            </button>
            <p className="mt-3 text-center text-xs text-cocoa-500">
              Demo store — orders are saved in this browser only.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
