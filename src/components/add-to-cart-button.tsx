"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { BagIcon, CheckIcon } from "./icons";

export default function AddToCartButton({
  productId,
  quantity = 1,
  label = "Add to cart",
  className = "",
}: {
  productId: string;
  quantity?: number;
  label?: string;
  className?: string;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(id);
  }, [added]);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(productId, quantity);
        setAdded(true);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-cocoa-800 font-semibold text-cream-50 transition hover:-translate-y-0.5 hover:bg-cocoa-700 active:translate-y-0 active:scale-[0.98] ${className}`}
    >
      {added ? <CheckIcon className="size-4" /> : <BagIcon className="size-4" />}
      <span aria-live="polite">{added ? "Added" : label}</span>
    </button>
  );
}
