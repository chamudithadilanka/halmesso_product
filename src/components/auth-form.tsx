"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import FormField from "./form-field";

/** Only allow same-site relative redirects (prevents open redirects via ?next=). */
function safeNext(): string {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    setSubmitting(true);
    if (isSignup) signUp(String(form.get("name") ?? ""), email);
    else signIn(email);
    router.push(safeNext());
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        {isSignup && <FormField label="Full name" id="name" name="name" autoComplete="name" required minLength={2} />}
        <FormField label="Email" id="email" name="email" type="email" autoComplete="email" required />
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
          minLength={isSignup ? 8 : undefined}
          hint={isSignup ? "At least 8 characters." : undefined}
        />
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 h-12 rounded-full bg-cocoa-800 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700 disabled:opacity-60"
        >
          {submitting ? "One moment…" : isSignup ? "Create account" : "Sign in"}
        </button>
        <p className="rounded-2xl bg-cream-200/70 px-4 py-3 text-xs leading-5 text-cocoa-600">
          Demo store: accounts are saved in this browser only and passwords aren&apos;t checked.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-cocoa-600">
        {isSignup ? "Already have an account? " : "New to Haalmasso+? "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-cocoa-900 underline-offset-2 hover:underline">
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </>
  );
}
