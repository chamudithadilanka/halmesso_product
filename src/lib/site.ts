export const SITE = {
  name: "Haalmasso+",
  tagline: "Small Fish. Strong Health.",
  description:
    "Haalmasso+ natural nutritional seasoning powder — made from Sri Lankan sprats. Masala and Garlic flavours, 100% natural, no MSG, no artificial flavours.",
  /** Set NEXT_PUBLIC_SITE_URL in production so canonical/OG URLs are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Contact" },
] as const;

/** localStorage keys — kept in one place so pages never drift apart. */
export const STORAGE_KEYS = {
  cart: "haalmasso:cart",
  promo: "haalmasso:promo",
  user: "haalmasso:user",
  orders: "haalmasso:orders",
} as const;
