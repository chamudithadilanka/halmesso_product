"use client";

import { useMemo } from "react";
import type { Order } from "@/domain/entities";
import { STORAGE_KEYS } from "./site";
import { parseJson, readStored, useStored, writeStored } from "./local-store";

const MAX_STORED_ORDERS = 20;

function parseOrders(raw: string): Order[] {
  const parsed = parseJson<unknown>(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (o): o is Order => typeof o?.id === "string" && Array.isArray(o?.lines),
  );
}

export function saveOrder(order: Order) {
  const current = parseOrders(readStored(STORAGE_KEYS.orders));
  writeStored(
    STORAGE_KEYS.orders,
    JSON.stringify([order, ...current].slice(0, MAX_STORED_ORDERS)),
  );
}

export function useOrders(): { orders: Order[]; hydrated: boolean } {
  const { value, hydrated } = useStored(STORAGE_KEYS.orders);
  const orders = useMemo(() => parseOrders(value), [value]);
  return { orders, hydrated };
}

/** Generated in an event handler only (keeps render pure). */
export function createOrderId(): string {
  const stamp = Date.now().toString(36).slice(-4).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `HM-${stamp}${rand}`;
}
