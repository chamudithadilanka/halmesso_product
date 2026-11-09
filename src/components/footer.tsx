import Link from "next/link";
import { listProducts } from "@/application/catalog";
import Logo from "./logo";
import NewsletterForm from "./newsletter-form";

export default function Footer() {
  const products = listProducts();
  const columns = [
    {
      heading: "Shop",
      links: [
        { label: "All flavours", href: "/products" },
        ...products.map((p) => ({ label: `${p.flavourName} flavour`, href: `/products/${p.slug}` })),
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Our story", href: "/about" },
        { label: "Contact us", href: "/contact" },
      ],
    },
    {
      heading: "Help",
      links: [
        { label: "Delivery & returns", href: "/shipping" },
        { label: "Privacy", href: "/privacy" },
        { label: "My account", href: "/account" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-cocoa-900 text-cream-100">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-spice-500/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-garlic-500/20 blur-3xl" />

      <div className="container-page relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="cream" className="text-3xl" />
            <p className="mt-3 max-w-sm text-sm leading-6 text-cream-100/70">
              Natural nutritional seasoning powder made from Sri Lankan sprats. Small fish, strong health — in every spoon.
            </p>
            <NewsletterForm />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream-100/50">{col.heading}</h2>
                <ul className="mt-4 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-block py-1.5 text-sm text-cream-100/85 transition-colors hover:text-gold">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream-100/10 pt-6 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Haalmasso+. Made in Sri Lanka.</p>
          <p className="font-script text-lg text-cream-100/70">Small fish. Strong health.</p>
        </div>
      </div>
    </footer>
  );
}
