"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/domain/entities";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "./add-to-cart-button";
import QuantityStepper from "./quantity-stepper";

/** Quantity + add to cart, with a sticky bar on mobile once the main button scrolls away. */
export default function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={anchorRef} className="flex flex-wrap items-center gap-3">
        <QuantityStepper size="lg" value={quantity} onChange={setQuantity} />
        <AddToCartButton
          productId={product.id}
          quantity={quantity}
          label={`Add to cart · ${formatPrice(product.price * quantity)}`}
          className="h-12 min-w-[14rem] flex-1 px-6 text-sm"
        />
      </div>

      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-cocoa-800/10 bg-cream-50/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-12px_rgba(58,29,14,0.3)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-xl">
            <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-cocoa-900">{product.flavourName} flavour</p>
            <p className="text-xs text-cocoa-600">{formatPrice(product.price)} · {product.netWeight}</p>
          </div>
          <AddToCartButton productId={product.id} quantity={quantity} label="Add" className="h-11 px-5 text-sm" />
        </div>
      </div>
    </>
  );
}
