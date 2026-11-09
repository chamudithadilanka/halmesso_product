"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "./site";
import { parseJson, useStored, writeStored } from "./local-store";

export type DemoUser = {
  name: string;
  email: string;
  joinedAt: string;
};

type AuthContextValue = {
  user: DemoUser | null;
  hydrated: boolean;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] || "friend";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function isUser(value: unknown): value is DemoUser {
  const v = value as DemoUser | null;
  return typeof v?.name === "string" && typeof v?.email === "string";
}

/**
 * Demo-only auth: stores the profile in localStorage. There is no password
 * check and no server — replace with a real auth provider before launch.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { value: raw, hydrated } = useStored(STORAGE_KEYS.user);

  const user = useMemo(() => {
    const parsed = parseJson<unknown>(raw);
    return isUser(parsed) ? parsed : null;
  }, [raw]);

  const save = useCallback((name: string, email: string) => {
    const existing = parseJson<DemoUser>(raw);
    const joinedAt =
      existing && existing.email === email && existing.joinedAt
        ? existing.joinedAt
        : new Date().toISOString();
    writeStored(STORAGE_KEYS.user, JSON.stringify({ name, email, joinedAt }));
  }, [raw]);

  const signIn = useCallback(
    (email: string) => save(nameFromEmail(email), email.toLowerCase()),
    [save],
  );
  const signUp = useCallback(
    (name: string, email: string) => save(name.trim(), email.toLowerCase()),
    [save],
  );
  const signOut = useCallback(() => writeStored(STORAGE_KEYS.user, null), []);

  const value = useMemo(
    () => ({ user, hydrated, signIn, signUp, signOut }),
    [user, hydrated, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
