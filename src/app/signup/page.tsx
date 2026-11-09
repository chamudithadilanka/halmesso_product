"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/logo";

const inputClass =
  "h-12 w-full rounded-xl border border-brand-golden-sand/60 bg-transparent px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-brand-herbal";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(name.trim(), email.trim());
    router.push("/account");
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <div className="text-center">
        <Logo className="text-4xl" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-500">Join HALMASSO+ — early access, order tracking, faster checkout.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
        <input required autoComplete="name" placeholder="Full name" aria-label="Full name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        <input required type="email" autoComplete="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        <input required type="password" autoComplete="new-password" placeholder="Password" aria-label="Password" minLength={6} className={inputClass} />
        <button type="submit" className="mt-1 h-12 w-full rounded-full bg-brand-dark-green text-sm font-semibold text-brand-pure-white transition-colors hover:bg-brand-olive">
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-zinc-900 hover:underline dark:text-zinc-50">Sign in</Link>
      </p>
    </main>
  );
}
