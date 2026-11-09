import Image from "next/image";
import type { ReactNode } from "react";
import { listProducts } from "@/application/catalog";
import Logo from "./logo";

/** Two-column auth layout: form on the left, brand panel on the right (desktop). */
export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const [masala, garlic] = listProducts();
  return (
    <div className="grid flex-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="text-3xl" />
          <h1 className="mt-8 font-display text-3xl font-semibold text-cocoa-900">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-cocoa-600">{subtitle}</p>
          {children}
        </div>
      </div>
      <div aria-hidden className="relative hidden overflow-hidden bg-cocoa-900 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(212,102,31,0.35),transparent_70%),radial-gradient(50%_50%_at_80%_80%,rgba(122,61,143,0.4),transparent_70%)]" />
        <div className="absolute left-[12%] top-[14%] w-[46%] -rotate-6 animate-float overflow-hidden rounded-3xl shadow-2xl">
          <Image src={masala.image} alt="" sizes="25vw" className="h-auto w-full" />
        </div>
        <div className="absolute bottom-[12%] right-[10%] w-[46%] rotate-6 animate-float overflow-hidden rounded-3xl shadow-2xl [animation-delay:-3s]">
          <Image src={garlic.image} alt="" sizes="25vw" className="h-auto w-full" />
        </div>
        <p className="absolute bottom-8 left-10 font-script text-3xl text-cream-50/80">Small fish. Strong health.</p>
      </div>
    </div>
  );
}
