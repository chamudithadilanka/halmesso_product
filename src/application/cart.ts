import type { CartLine, Product } from "@/domain/entities";
import { getProductById } from "./catalog";

export const FREE_SHIPPING_THRESHOLD = 3750;
export const SHIPPING_FLAT_RATE = 345;
export const MAX_LINE_QUANTITY = 99;

/** Promo code → discount rate. Codes are matched case-insensitively. */
const PROMO_CODES: Record<string, number> = { HAALMASSO10: 0.1 };

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

export function normalizePromoCode(code: string): string {
  return code.trim().toUpperCase();
}

/** Returns the discount rate for a code, or null if the code is unknown. */
export function getPromoRate(code: string | null | undefined): number | null {
  if (!code) return null;
  return PROMO_CODES[normalizePromoCode(code)] ?? null;
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(0, Math.min(MAX_LINE_QUANTITY, Math.floor(quantity)));
}

/** Join cart lines against the catalog into renderable, priced lines. */
export function getDetailedCartLines(lines: CartLine[]): DetailedCartLine[] {
  return lines.flatMap((line) => {
    const product = getProductById(line.productId);
    if (!product) return [];
    return [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }];
  });
}

export function computeTotals(subtotal: number, promoCode?: string | null): OrderTotals {
  const rate = getPromoRate(promoCode) ?? 0;
  const discount = Math.round(subtotal * rate);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
