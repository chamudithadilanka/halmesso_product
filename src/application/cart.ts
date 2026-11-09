import type { CartLine, Product } from "@/domain/entities";
import { listProducts } from "./catalog";

export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_FLAT_RATE = 6.9;
export const PROMO_CODES: Record<string, number> = { HALMESSO10: 0.1 };

export type DetailedCartLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type OrderTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

/** Join cart lines against the catalog into renderable, priced lines. */
export function getDetailedCartLines(lines: CartLine[]): DetailedCartLine[] {
  const products = listProducts();
  return lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      return {
        product,
        quantity: line.quantity,
        lineTotal: product.price * line.quantity,
      };
    })
    .filter((line): line is DetailedCartLine => line !== null);
}

export function computeTotals(
  subtotal: number,
  promoCode?: string | null,
): OrderTotals {
  const rate = promoCode ? (PROMO_CODES[promoCode.toUpperCase()] ?? 0) : 0;
  const discount = subtotal * rate;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
    ? 0
    : SHIPPING_FLAT_RATE;
  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
  };
}
