"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/logo";

const inputClass =
  "h-12 w-full rounded-xl border border-brand-golden-sand/60 bg-transparent px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-brand-herbal";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(email.trim());
    router.push("/account");
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <div className="text-center">
        <Logo className="text-4xl" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Welcome back</h1>
        <p className="mt-1 text-sm text-zinc-500">Sign in to your HALMASSO+ account. Demo — any credentials work.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
        <input required type="email" autoComplete="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        <input required type="password" autoComplete="current-password" placeholder="Password" aria-label="Password" className={inputClass} />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-1.5 text-zinc-500"><input type="checkbox" className="accent-brand-herbal" /> Remember me</label>
          <a href="#" className="font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Forgot password?</a>
        </div>
        <button type="submit" className="mt-1 h-12 w-full rounded-full bg-brand-dark-green text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-zinc-900 hover:underline dark:text-zinc-50">Create an account</Link>
      </p>
    </main>
  );
}
