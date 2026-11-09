"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed external store.
 * Uses useSyncExternalStore so server output ("") and the first client
 * render agree — React re-renders with the real value after hydration.
 */

const EMPTY = "";
const listeners = new Set<() => void>();
const cache = new Map<string, string>();

function onStorage(event: StorageEvent) {
  // Another tab changed storage: drop our cached copy so we re-read it.
  if (event.key === null) cache.clear();
  else cache.delete(event.key);
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

const subscribeNoop = () => () => {};
const serverSnapshot = () => EMPTY;

/** Read the current value synchronously (always fresh, never a stale closure). */
export function readStored(key: string): string {
  if (typeof window === "undefined") return EMPTY;
  let cached = cache.get(key);
  if (cached === undefined) {
    try {
      cached = window.localStorage.getItem(key) ?? EMPTY;
    } catch {
      cached = EMPTY; // storage blocked (private mode / disabled cookies)
    }
    cache.set(key, cached);
  }
  return cached;
}

export function writeStored(key: string, value: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Quota exceeded or storage blocked — keep working in memory.
  }
  cache.set(key, value ?? EMPTY);
  for (const listener of listeners) listener();
}

export function useStored(key: string): { value: string; hydrated: boolean } {
  const getSnapshot = useCallback(() => readStored(key), [key]);
  const value = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const hydrated = useHydrated();
  return { value, hydrated };
}

/** False during SSR and the hydration render, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

export function parseJson<T>(raw: string): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
