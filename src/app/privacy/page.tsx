import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ScrollMotion from "@/components/motion/scroll-motion";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Haalmasso+ store handles your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Help" title="Privacy" description="Plain-language summary of what this store does with your information." />
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <div className="space-y-8 leading-7 text-cocoa-700">
          <section data-reveal="up">
            <h2 className="font-display text-2xl font-semibold text-cocoa-900">What we store</h2>
            <p className="mt-2">
              Your cart, sign-in details and order history are stored in your own browser (localStorage) so the store
              works between visits. They are not sent to a server and you can clear them at any time by signing out
              or clearing your browser data.
            </p>
          </section>
          <section data-reveal="up">
            <h2 className="font-display text-2xl font-semibold text-cocoa-900">Payments</h2>
            <p className="mt-2">
              Card details entered at checkout are never stored or transmitted. Cash on delivery requires only your
              delivery address and phone number.
            </p>
          </section>
          <section data-reveal="up">
            <h2 className="font-display text-2xl font-semibold text-cocoa-900">Contact</h2>
            <p className="mt-2">Questions about your data? Reach us through the contact page.</p>
          </section>
        </div>
      </div>
      <ScrollMotion />
    </>
  );
}
