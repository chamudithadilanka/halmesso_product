"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed external store.
 * Uses useSyncExternalStore so server output ("") and the first client
 * render agree — React re-renders with the real value after hydration,
 * with no cascading setState-in-effect.
 */

const EMPTY = "";
const listeners = new Set<() => void>();
const cache = new Map<string, string>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const subscribeNoop = () => () => {};
const SERVER_SNAPSHOT = () => EMPTY;

export function writeStored(key: string, value: string | null) {
  if (typeof window === "undefined") return;
  if (value === null) {
    window.localStorage.removeItem(key);
    cache.set(key, EMPTY);
  } else {
    window.localStorage.setItem(key, value);
    cache.set(key, value);
  }
  for (const listener of listeners) listener();
}

function readCached(key: string): string {
  let cached = cache.get(key);
  if (cached === undefined) {
    cached = window.localStorage.getItem(key) ?? EMPTY;
    cache.set(key, cached);
  }
  return cached;
}

export function useStored(key: string): { value: string; hydrated: boolean } {
  const getSnapshot = useCallback(() => readCached(key), [key]);
  const value = useSyncExternalStore(subscribe, getSnapshot, SERVER_SNAPSHOT);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  return { value, hydrated };
}

export function parseJson<T>(raw: string): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
