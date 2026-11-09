import type { Product } from "@/domain/entities";

/**
 * Generative product artwork — a layered gradient with a tonal monogram.
 * Keeps the demo fully self-contained (no external image hosts).
 */
export default function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [from, to] = product.palette;
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 20% 15%, ${from} 0%, ${to} 90%)`,
      }}
    >
      {/* decorative ring */}
      <div className="absolute -right-[18%] -top-[18%] aspect-square w-[70%] rounded-full border border-black/10" />
      <div className="absolute -bottom-[25%] -left-[15%] aspect-square w-[60%] rounded-full bg-white/20 blur-2xl" />
      {/* monogram */}
      <span
        className="absolute inset-0 flex items-center justify-center font-sans font-semibold tracking-tight text-black/15 select-none"
        style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
      >
        {product.glyph}
      </span>
    </div>
  );
}
