"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <form onSubmit={onSubmit} className="mt-7 max-w-sm">
      <label htmlFor="newsletter-email" className="text-xs font-semibold uppercase tracking-[0.16em] text-cream-100/60">
        Recipes &amp; offers, now and then
      </label>
      {subscribed ? (
        <p role="status" className="mt-3 text-sm font-medium text-gold">Thanks — you&apos;re on the list ✓</p>
      ) : (
        <div className="mt-3 flex rounded-full border border-cream-100/20 bg-cream-100/5 p-1 focus-within:border-gold">
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-cream-50 outline-none placeholder:text-cream-100/40"
          />
          <button type="submit" className="h-10 shrink-0 rounded-full bg-gold px-5 text-sm font-semibold text-cocoa-950 transition hover:bg-cream-50">
            Join
          </button>
        </div>
      )}
    </form>
  );
}
