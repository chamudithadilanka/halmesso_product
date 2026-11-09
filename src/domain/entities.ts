import type { StaticImageData } from "next/image";

export type Category = "apparel" | "home" | "accessories" | "pantry";

export const CATEGORY_LABELS: Record<Category, string> = {
  apparel: "Apparel",
  home: "Home",
  accessories: "Accessories",
  pantry: "Pantry",
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Price in whole Sri Lankan rupees. */
  price: number;
  image?: StaticImageData;
  compareAtPrice?: number;
  category: Category;
  rating: number;
  reviewCount: number;
  /** Two gradient stops used for the product artwork. */
  palette: [string, string];
  /** Short monogram shown on the artwork, e.g. "HT". */
  glyph: string;
  features: string[];
};

export type CartLine = {
  productId: string;
  quantity: number;
};
