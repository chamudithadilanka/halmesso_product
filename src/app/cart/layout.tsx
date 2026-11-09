import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function Layout({ children }: LayoutProps<"/cart">) {
  return children;
}
