import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import AuthShell from "@/components/auth-shell";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false },
};

export default function SignupPage() {
  return (
    <AuthShell title="Create your account" subtitle="Save your details, track your orders and reorder your favourite flavour in seconds.">
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
