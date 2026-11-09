import type { Product } from "@/domain/entities";
import type { ProductRepository } from "@/domain/product-repository";
import { CATALOG } from "./catalog";

const FEATURED_IDS = [
  "p-sprat-powder",
  "p-sprat-chilli",
  "p-sprat-garlic",
  "p-sprat-masala",
];

/** Static catalog implementation — swap for an API/DB adapter later. */
export class StaticProductRepository implements ProductRepository {
  list(): Product[] {
    return CATALOG;
  }

  bySlug(slug: string): Product | null {
    return CATALOG.find((p) => p.slug === slug) ?? null;
  }

  featured(limit = 4): Product[] {
    return CATALOG.filter((p) => FEATURED_IDS.includes(p.id)).slice(0, limit);
  }

  related(slug: string, limit = 3): Product[] {
    const current = this.bySlug(slug);
    if (!current) return [];
    return CATALOG.filter(
      (p) => p.category === current.category && p.slug !== slug,
    ).slice(0, limit);
  }
}
