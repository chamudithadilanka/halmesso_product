import type { StaticImageData } from "next/image";

export type Flavour = "masala" | "garlic";

export type Product = {
  id: string;
  slug: string;
  /** Full product name, e.g. "Haalmasso+ Masala Flavour". */
  name: string;
  /** Flavour name on its own, e.g. "Masala". */
  flavourName: string;
  flavour: Flavour;
  tagline: string;
  description: string;
  /** Price in whole Sri Lankan rupees. */
  price: number;
  compareAtPrice?: number;
  /** Net weight printed on the pack, e.g. "50 g". */
  netWeight: string;
  image: StaticImageData;
  imageAlt: string;
  /** Short badge shown on cards, e.g. "Bestseller". */
  badge?: string;
  highlights: string[];
  /** Dishes this flavour suits best. */
  pairings: string[];
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type PaymentMethod = "cod" | "card";

export type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  placedAt: string;
  lines: OrderLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode: string | null;
  payment: PaymentMethod;
  customer: {
    name: string;
    email: string;
    phone: string;
    city: string;
  };
};
