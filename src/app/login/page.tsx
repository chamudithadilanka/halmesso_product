import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import AuthShell from "@/components/auth-shell";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to see your orders and check out faster.">
      <AuthForm mode="login" />
    </AuthShell>
  );
}
