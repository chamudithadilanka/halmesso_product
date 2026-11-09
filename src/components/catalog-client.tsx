"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  type Category,
  type Product,
} from "@/domain/entities";
import ProductCard from "./product-card";

type Filter = "all" | Category;
type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  rating: "Top rated",
};

export default function CatalogClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const counts = useMemo(() => {
    const map: Record<Filter, number> = { all: products.length, apparel: 0, home: 0, accessories: 0, pantry: 0 };
    for (const p of products) map[p.category] += 1;
    return map;
  }, [products]);

  const visible = useMemo(() => {
    const filtered = filter === "all" ? [...products] : products.filter((p) => p.category === filter);
    switch (sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, filter, sort]);

  const filters: Filter[] = ["all", "pantry", "apparel", "home", "accessories"];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`h-9 rounded-full px-4 text-[13px] font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-brand-dark-green text-brand-pure-white"
                  : "border border-black/[.1] text-zinc-600 hover:border-zinc-400 dark:border-white/[.14] dark:text-zinc-300"
              }`}
            >
              {f === "all" ? "All" : CATEGORY_LABELS[f]}
              <span className="ml-1.5 text-[11px] opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-500">
          <span className="hidden sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-full border border-black/[.1] bg-transparent px-3 text-[13px] font-medium text-zinc-800 outline-none dark:border-white/[.14] dark:text-zinc-100"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-20 text-center text-sm text-zinc-500">Nothing here yet — try another category.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
