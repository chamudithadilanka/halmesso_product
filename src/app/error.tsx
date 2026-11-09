"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-cocoa-900">Something went wrong.</h1>
      <p className="mt-2 max-w-sm text-cocoa-600">Sorry about that. Please try again.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => retry()} className="inline-flex h-12 items-center rounded-full bg-cocoa-800 px-7 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700">
          Try again
        </button>
        <Link href="/" className="inline-flex h-12 items-center rounded-full border border-cocoa-800/20 px-7 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">Go home</Link>
      </div>
    </div>
  );
}
