"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import CartDrawer from "./cart-drawer";
import Logo from "./logo";
import ScrollProgressLine from "./scroll-progress";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/products/halmesso-plus-sprat-seasoning-powder", label: "Shop" },
];

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/products") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { itemCount, hydrated, isOpen, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation — adjust during render (no effect needed).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <>
        <header className="sticky top-0 z-40 border-b border-brand-golden-sand/45 bg-brand-pure-white shadow-[0_1px_0_rgba(25,60,30,0.08)] relative">
          <ScrollProgressLine />
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-2 sm:px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="HALMASSO+ home">
              <Logo variant="on-light" className="text-[1.6rem]" />
            </Link>

            {/* Nav */}
            <nav className="hidden items-center gap-10 sm:flex" aria-label="Primary">
              {NAV.map((item) => {
                const active = isNavActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`primary-nav-link py-2 text-base font-semibold ${active ? "text-brand-dark-green" : "text-brand-olive hover:text-brand-dark-green"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/account"
                aria-label="Account"
                className="nav-action hidden rounded-full p-2.5 text-brand-dark-green hover:bg-brand-golden-sand/25 min-[400px]:block"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} ${itemCount === 1 ? "item" : "items"}` : ""}`}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                className="nav-action relative grid size-10 shrink-0 place-items-center rounded-full text-brand-dark-green hover:bg-brand-golden-sand/25"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.875a4.5 4.5 0 00-9 0V10.5m-3 0h15l-1.125 9.563a2.25 2.25 0 01-2.225 1.937H9.85a2.25 2.25 0 01-2.225-1.937L6.5 10.5z" />
                </svg>
                {hydrated && itemCount > 0 && (
                  <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-brand-pure-white bg-brand-herbal px-1 text-[10px] font-bold leading-none text-brand-pure-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="nav-action rounded-full p-2.5 text-brand-dark-green hover:bg-brand-golden-sand/25 sm:hidden"
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div
              id="mobile-nav"
              className="mobile-nav-panel border-t border-brand-golden-sand/45 bg-brand-pure-white sm:hidden"
            >
              <nav className="mx-auto flex max-w-[1440px] flex-col px-2 py-2 sm:px-4" aria-label="Mobile">
                {NAV.map((item, index) => {
                  const active = isNavActive(item.href, pathname);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`mobile-nav-item border-b border-brand-golden-sand/35 py-4 text-base font-semibold last:border-0 focus-visible:bg-brand-golden-sand/25 ${active ? "bg-brand-golden-sand/20 text-brand-dark-green" : "text-brand-olive"}`}
                      style={{ animationDelay: `${index * 45}ms` }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/account"
                  className="mobile-nav-item py-4 text-base font-semibold text-brand-olive min-[400px]:hidden"
                  style={{ animationDelay: `${NAV.length * 45}ms` }}
                >
                  Account
                </Link>
              </nav>
            </div>
          )}
        </header>

        <CartDrawer />
      </>
      );
}
