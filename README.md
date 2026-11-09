# Haalmasso+ — Small Fish. Strong Health.

Storefront for Haalmasso+ natural nutritional seasoning powder (Masala & Garlic), made from Sri Lankan sprats.
Built with Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript, Tailwind CSS v4,
**three.js** (3D hero) and **GSAP + ScrollTrigger/SplitText** (scroll animations).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical, Open Graph, sitemap and JSON-LD URLs are absolute.

## Pages

| Route | Screen |
| --- | --- |
| `/` | 3D hero (pouch flips Masala → Garlic on scroll), ticker, flavours, benefits, horizontal "sea to spoon" steps, uses, CTA |
| `/products` | Both flavours with 3D-tilt cards |
| `/products/[slug]` | Product detail, quantity + add to cart, sticky mobile buy bar, how to use / storage / delivery, cross-sell |
| `/about` | Story, benefits, process, FAQ |
| `/cart`, `/checkout` | Promo code (`HAALMASSO10`, 10% off), cash on delivery or card (demo), Sri Lankan phone validation |
| `/login`, `/signup`, `/account` | Demo auth + order history (localStorage) |
| `/contact`, `/shipping`, `/privacy` | Support pages |

## Motion system

- `components/home/hero-scene.ts` — pure three.js scene (pouch with real pack textures, sprat school, spice dust, leaves). Lazy-loaded; static image fallback when WebGL is unavailable.
- `components/motion/scroll-motion.tsx` — declarative GSAP animations. Add attributes to any element (server components included):
  `data-reveal="up|down|left|right|zoom|fade"`, `data-reveal-delay`, `data-reveal-stagger`, `data-split`, `data-parallax="0.3"`.
  Render `<ScrollMotion />` as the **last child of a page** so it runs after that page has hydrated.
- Everything respects `prefers-reduced-motion`.

## Architecture

```
src/
  domain/       entities + repository interface (no framework code)
  data/         static catalog (the two products) + repository adapter
  application/  use-cases: catalog lookups, cart math, promo codes, totals
  lib/          client state (cart, auth, orders on a useSyncExternalStore localStorage store), site config, gsap
  content/      shared brand copy (benefits, process, FAQ)
  components/   UI + motion
  app/          routes
```

## Demo limitations

Payments, accounts, the contact form and newsletter are front-end only — nothing is sent to a server.
Replace with real services before launch.
