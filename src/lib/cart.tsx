"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/domain/entities";
import {
  clampQuantity,
  getDetailedCartLines,
  type DetailedCartLine,
} from "@/application/cart";
import { STORAGE_KEYS } from "./site";
import { parseJson, readStored, useStored, writeStored } from "./local-store";

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
  const parsed = parseJson<unknown>(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (line): line is CartLine =>
      typeof line?.productId === "string" &&
      typeof line?.quantity === "number" &&
      line.quantity > 0,
  );
}

/** Apply an update against the *current* stored cart, not a render-time copy. */
function updateLines(updater: (current: CartLine[]) => CartLine[]) {
  const next = updater(parseLines(readStored(STORAGE_KEYS.cart)))
    .map((line) => ({ ...line, quantity: clampQuantity(line.quantity) }))
    .filter((line) => line.quantity > 0);
  writeStored(STORAGE_KEYS.cart, JSON.stringify(next));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { value: raw, hydrated } = useStored(STORAGE_KEYS.cart);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    updateLines((current) => {
      const existing = current.find((l) => l.productId === productId);
      if (!existing) return [...current, { productId, quantity }];
      return current.map((l) =>
        l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l,
      );
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    updateLines((current) => current.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    updateLines((current) =>
      current.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
    );
  }, []);

  const clearCart = useCallback(() => writeStored(STORAGE_KEYS.cart, "[]"), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = getDetailedCartLines(parseLines(raw));
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
  }, [raw, hydrated, isOpen, openCart, closeCart, addToCart, removeFromCart, setQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
