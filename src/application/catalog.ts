import type { Product } from "@/domain/entities";
import { StaticProductRepository } from "@/data/static-product-repository";

/**
 * Application/use-case layer. The presentation layer only talks to these
 * functions; it never imports the data layer directly.
 */
const repository = new StaticProductRepository();

export function listProducts(): Product[] {
  return repository.list();
}

export function getProductBySlug(slug: string): Product | null {
  return repository.bySlug(slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return repository.featured(limit);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return repository.related(slug, limit);
}
