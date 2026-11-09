"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { NAV_LINKS } from "@/lib/site";
import CartDrawer from "./cart-drawer";
import Logo from "./logo";
import { BagIcon, CloseIcon, MenuIcon, UserIcon } from "./icons";

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { itemCount, hydrated, isOpen, openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on navigation — adjust during render (no effect needed).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Scroll progress bar + "scrolled" shadow, written straight to the DOM.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressRef.current?.style.setProperty("--progress", p.toFixed(4));
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Mobile menu: Escape closes, page behind doesn't scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const close = () => window.matchMedia("(min-width: 768px)").matches && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [menuOpen]);

  const cartLabel = `Open cart${hydrated && itemCount > 0 ? `, ${itemCount} ${itemCount === 1 ? "item" : "items"}` : ""}`;

  return (
    <>
      <a href="#main" className="sr-only z-[70] rounded-full bg-cocoa-800 px-4 py-2 text-sm font-semibold text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-3">
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || menuOpen
            ? "border-cocoa-800/10 bg-cream-50/90 shadow-[0_8px_30px_-12px_rgba(58,29,14,0.25)] backdrop-blur-md"
            : "border-transparent bg-cream-100"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="Haalmasso+ home" className="rounded-lg">
            <Logo className="text-[1.6rem]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href, pathname) ? "page" : undefined}
                className="nav-link text-[15px] font-semibold text-cocoa-600 transition-colors hover:text-cocoa-900 aria-[current=page]:text-cocoa-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/account"
              aria-label="My account"
              aria-current={pathname === "/account" ? "page" : undefined}
              className="hidden size-11 place-items-center rounded-full text-cocoa-800 transition hover:bg-cocoa-800/5 sm:grid"
            >
              <UserIcon className="size-[22px]" />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={cartLabel}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              className="relative grid size-11 place-items-center rounded-full text-cocoa-800 transition hover:bg-cocoa-800/5"
            >
              <BagIcon className="size-[22px]" />
              {hydrated && itemCount > 0 && (
                <span aria-hidden className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-cream-50 bg-spice-500 px-1 text-[10px] font-bold leading-none text-cream-50">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="grid size-11 place-items-center rounded-full text-cocoa-800 transition hover:bg-cocoa-800/5 md:hidden"
            >
              {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>

        <div ref={progressRef} aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-[2px]" />

        {menuOpen && (
          <div id="mobile-nav" className="panel-in absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cocoa-800/10 bg-cream-50 md:hidden">
            <nav aria-label="Mobile" className="container-page flex flex-col py-4">
              {[...NAV_LINKS, { href: "/account", label: "My account" }].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href, pathname) ? "page" : undefined}
                  className="panel-in flex items-center justify-between border-b border-cocoa-800/10 py-4 font-display text-2xl font-semibold text-cocoa-700 aria-[current=page]:text-spice-500"
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  {item.label}
                  <span aria-hidden className="text-lg text-cocoa-300">→</span>
                </Link>
              ))}
              <p className="mt-8 font-script text-2xl text-cocoa-500">Small fish. Strong health.</p>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
