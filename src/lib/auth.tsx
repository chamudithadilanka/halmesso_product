"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { parseJson, useStored, writeStored } from "./local-store";

const USER_KEY = "halmessso-user";

export type DemoUser = {
  name: string;
  email: string;
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
  const local = email.split("@")[0] ?? "friend";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** Demo-only auth: stores the user in localStorage. Not real security. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { value: raw, hydrated } = useStored(USER_KEY);

  const user = useMemo(() => parseJson<DemoUser>(raw), [raw]);

  const signIn = useCallback(
    (email: string) =>
      writeStored(USER_KEY, JSON.stringify({ name: nameFromEmail(email), email })),
    [],
  );
  const signUp = useCallback(
    (name: string, email: string) =>
      writeStored(USER_KEY, JSON.stringify({ name: name.trim(), email })),
    [],
  );
  const signOut = useCallback(() => writeStored(USER_KEY, null), []);

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
