# Halmessso — Everyday goods, well made

A clean, demo e-commerce storefront built with Next.js 16 (App Router, Turbopack), React 19, TypeScript and Tailwind CSS v4. No external image hosts, no mock APIs — everything is local and self-contained.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Screens

| Route | Screen |
| --- | --- |
| `/` | Home — hero, featured products, categories, value props, testimonial |
| `/products` | Catalog — category filter tabs + sort + product grid |
| `/products/[slug]` | Product detail — gallery, features, qty + add to cart, related items |
| `/cart` | Cart page — line items, promo code (`HALMESSO10`, 10% off), totals |
| `/checkout` | Checkout — contact, shipping, payment (demo), order confirmation |
| `/login`, `/signup` | Demo auth (stored in localStorage) |
| `/account` | Profile card + last placed order |

Cart drawer slides in from the header with a free-shipping progress bar.

## Clean architecture

Dependencies point inward — UI never imports the data layer directly:

```
src/
  domain/        entities.ts, product-repository.ts   # types + repository interface (no framework imports)
  data/          catalog.ts, static-product-repository.ts  # static catalog adapter
  application/   catalog.ts, cart.ts                       # use-cases: list/get products, cart math, totals
  lib/           local-store.ts, cart.tsx, auth.tsx, format.ts  # client state (useSyncExternalStore + localStorage)
  components/    header, footer, product-card, cart-drawer, ...   # presentation
  app/           routes (server components + small client islands)
```

- **domain** — `Product`, `CartLine`, `ProductRepository` interface. Zero dependencies.
- **data** — `StaticProductRepository` implements the interface from an in-memory catalog. Swap it for an API/DB adapter without touching UI.
- **application** — single entry points (`listProducts`, `getProductBySlug`, `computeTotals`, `getDetailedCartLines`) that the UI consumes.
- **lib** — React context for cart/session, backed by a shared `useSyncExternalStore` localStorage helper (SSR-safe, no hydration mismatch).
- **presentation** — server components by default; client islands only where interactivity is needed.

## Demo notes

- Payments are not processed — any card details work on `/checkout`.
- Promo code `HALMESSO10` applies 10% off; free shipping over $75.
- Cart and demo session persist in `localStorage`.
