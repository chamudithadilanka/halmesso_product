import type { Product } from "@/domain/entities";
import type { ProductRepository } from "@/domain/product-repository";
import { CATALOG } from "./catalog";

/** Static catalog implementation — swap for an API/DB adapter later. */
export class StaticProductRepository implements ProductRepository {
  list(): Product[] {
    return CATALOG;
  }

  bySlug(slug: string): Product | null {
    return CATALOG.find((p) => p.slug === slug) ?? null;
  }

  byId(id: string): Product | null {
    return CATALOG.find((p) => p.id === id) ?? null;
  }

  related(slug: string, limit = 3): Product[] {
    return CATALOG.filter((p) => p.slug !== slug).slice(0, limit);
  }
}
