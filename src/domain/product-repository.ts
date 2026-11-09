import type { Product } from "./entities";

/**
 * Domain boundary: the UI and use-cases depend on this interface,
 * never on where products actually come from (static file today,
 * an API or database tomorrow).
 */
export interface ProductRepository {
  list(): Product[];
  bySlug(slug: string): Product | null;
  featured(limit?: number): Product[];
  related(slug: string, limit?: number): Product[];
}
