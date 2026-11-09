import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-[7rem] font-bold leading-none text-cocoa-800 sm:text-[10rem]">
        4<span className="text-plus">+</span>4
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-cocoa-900">This one swam away.</h1>
      <p className="mt-2 max-w-sm text-cocoa-600">We couldn&apos;t find the page you were looking for.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-7 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">Go home</Link>
        <Link href="/products" className="inline-flex h-12 items-center rounded-full border border-cocoa-800/20 px-7 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">Shop flavours</Link>
      </div>
    </div>
  );
}
