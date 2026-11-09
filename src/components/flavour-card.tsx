import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/domain/entities";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "./add-to-cart-button";
import TiltCard from "./motion/tilt-card";

export const FLAVOUR_STYLES = {
  masala: {
    tint: "bg-spice-100",
    page: "bg-gradient-to-b from-spice-100/60 to-cream-100",
    text: "text-spice-700",
    chip: "bg-spice-500 text-cream-50",
    glow: "from-spice-500/30",
    ring: "hover:shadow-spice-700/20",
  },
  garlic: {
    tint: "bg-garlic-100",
    page: "bg-gradient-to-b from-garlic-100/60 to-cream-100",
    text: "text-garlic-700",
    chip: "bg-garlic-500 text-cream-50",
    glow: "from-garlic-500/30",
    ring: "hover:shadow-garlic-700/20",
  },
} as const;

export default function FlavourCard({
  product,
  priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const s = FLAVOUR_STYLES[product.flavour];
  const href = `/products/${product.slug}`;

  return (
    <TiltCard max={5} className="h-full rounded-[2rem]">
      <article className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border border-cocoa-800/10 bg-cream-50 shadow-sm transition-shadow duration-500 hover:shadow-2xl ${s.ring}`}>
        <Link href={href} className={`relative block aspect-[4/3.6] overflow-hidden ${s.tint}`} aria-label={`${product.name} — view details`}>
          <div aria-hidden className={`absolute inset-0 bg-gradient-to-t ${s.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            preload={priority}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {product.badge && (
            <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm ${s.chip}`}>
              {product.badge}
            </span>
          )}
        </Link>

        <div className={`flex flex-1 flex-col ${compact ? "gap-3 p-5" : "gap-4 p-6 sm:p-8"}`}>
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${s.text}`}>{product.flavourName} flavour · {product.netWeight}</p>
            <h3 className={`mt-1.5 font-display font-semibold leading-tight text-cocoa-900 ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>
              <Link href={href} className="hover:underline hover:decoration-2 hover:underline-offset-4">{product.name}</Link>
            </h3>
            <p className="mt-1.5 text-sm text-cocoa-600">{product.tagline}</p>
          </div>

          {!compact && (
            <ul className="flex flex-wrap gap-2">
              {product.pairings.slice(0, 4).map((p) => (
                <li key={p} className="rounded-full border border-cocoa-800/10 bg-cream-100 px-3 py-1 text-xs font-medium text-cocoa-700">{p}</li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-cocoa-800/10 pt-4">
            <p className="text-2xl font-semibold tabular-nums text-cocoa-900">{formatPrice(product.price)}</p>
            <div className="flex gap-2">
              {!compact && (
                <Link href={href} className="inline-flex h-11 items-center rounded-full border border-cocoa-800/20 px-5 text-sm font-semibold text-cocoa-800 transition hover:bg-cocoa-800/5">
                  Details
                </Link>
              )}
              <AddToCartButton productId={product.id} label="Add" className="h-11 px-5 text-sm" />
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
