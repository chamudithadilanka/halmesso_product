import type { MetadataRoute } from "next";
import { listProducts } from "@/application/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/about", "/contact", "/shipping", "/privacy"];
  return [
    ...pages.map((path) => ({ url: `${SITE.url}${path}`, priority: path === "" ? 1 : 0.7 })),
    ...listProducts().map((p) => ({ url: `${SITE.url}/products/${p.slug}`, priority: 0.9 })),
  ];
}
