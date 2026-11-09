"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Logo from "./logo";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "All products", href: "/products" },
      { label: "Halmesso+ Sprat", href: "/products/halmesso-plus-sprat-seasoning-powder" },
      { label: "Pantry", href: "/products" },
      { label: "Apparel", href: "/products" },
      { label: "Home", href: "/products" },
      { label: "Accessories", href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Halmesso+", href: "/about" },
      { label: "Our story", href: "/about" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping & returns", href: "#" },
      { label: "Sizing guide", href: "#" },
      { label: "Care instructions", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-brand-golden-sand/35 bg-brand-warm-cream dark:border-brand-warm-cream/15 dark:bg-brand-dark-green">
      <div className="mx-auto max-w-[1440px] px-2 py-14 sm:px-4">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Logo className="text-2xl" />
            <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Considered everyday goods — built to last, fairly priced, and honest about what they are.
            </p>
            <form onSubmit={onSubscribe} className="mt-6 max-w-xs">
              <label htmlFor="newsletter" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                The Sunday Edit — weekly, no noise
              </label>
              {subscribed ? (
                <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Welcome aboard — check your inbox ✓
                </p>
              ) : (
                <div className="mt-2 flex overflow-hidden rounded-full border border-brand-golden-sand/60 focus-within:border-brand-herbal dark:border-brand-warm-cream/20">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 w-full bg-transparent px-4 text-sm outline-none placeholder:text-zinc-400"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-brand-dark-green px-4 text-sm font-medium text-brand-pure-white transition-colors hover:bg-brand-olive"
                  >
                    Join
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {col.heading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/[.06] pt-6 text-xs text-zinc-500 dark:border-white/[.08] dark:text-zinc-500 sm:flex-row">
          <p>© 2026 HALMASSO+ — Small Fish. Big Goodness.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200">Privacy</a>
            <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200">Terms</a>
            <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
