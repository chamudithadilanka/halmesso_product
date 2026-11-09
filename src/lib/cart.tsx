"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/domain/entities";
import {
  getDetailedCartLines,
  type DetailedCartLine,
} from "@/application/cart";
import { parseJson, useStored, writeStored } from "./local-store";

const CART_KEY = "halmessso-cart";

type CartContextValue = {
  lines: DetailedCartLine[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function parseLines(raw: string): CartLine[] {
  const parsed = parseJson<CartLine[]>(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (line): line is CartLine =>
      typeof line?.productId === "string" &&
      typeof line?.quantity === "number" &&
      line.quantity > 0,
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { value: raw, hydrated } = useStored(CART_KEY);
  const [isOpen, setIsOpen] = useState(false);

  const rawLines = useMemo(() => parseLines(raw), [raw]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const setLines = useCallback(
    (updater: (current: CartLine[]) => CartLine[]) => {
      writeStored(CART_KEY, JSON.stringify(updater(parseLines(raw))));
    },
    [raw],
  );

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      setLines((current) => {
        const existing = current.find((l) => l.productId === productId);
        if (existing) {
          return current.map((l) =>
            l.productId === productId
              ? { ...l, quantity: Math.min(l.quantity + quantity, 99) }
              : l,
          );
        }
        return [...current, { productId, quantity }];
      });
      setIsOpen(true);
    },
    [setLines],
  );

  const removeFromCart = useCallback(
    (productId: string) =>
      setLines((current) => current.filter((l) => l.productId !== productId)),
    [setLines],
  );

  const setQuantity = useCallback(
    (productId: string, quantity: number) =>
      setLines((current) =>
        quantity <= 0
          ? current.filter((l) => l.productId !== productId)
          : current.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
      ),
    [setLines],
  );

  const clearCart = useCallback(() => writeStored(CART_KEY, "[]"), []);

  // Lock body scroll while the drawer is open (external system → fine in an effect).
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = useMemo<CartContextValue>(() => {
    const lines = getDetailedCartLines(rawLines);
    return {
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
    };
  }, [
    rawLines,
    hydrated,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
