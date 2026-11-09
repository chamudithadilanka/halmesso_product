import type { Metadata } from "next";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/application/cart";
import PageHero from "@/components/page-hero";
import { formatPrice } from "@/lib/format";
import ScrollMotion from "@/components/motion/scroll-motion";

export const metadata: Metadata = {
  title: "Delivery & returns",
  description: "Delivery charges, timelines and our returns policy for Haalmasso+ orders.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  const sections = [
    {
      title: "Delivery charges",
      body: [
        `Orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)} ship free.`,
        `Smaller orders have a flat delivery charge of ${formatPrice(SHIPPING_FLAT_RATE)}.`,
      ],
    },
    {
      title: "Delivery times",
      body: [
        "Orders are usually dispatched within 24 hours.",
        "Most deliveries arrive within 2–4 business days. Our courier will call your mobile number before delivery.",
      ],
    },
    {
      title: "Payment",
      body: ["Pay with cash on delivery, or by card at checkout."],
    },
    {
      title: "Damaged or wrong items",
      body: [
        "If a pack arrives damaged, opened or isn't what you ordered, contact us within 7 days of delivery with your order number and a photo. We'll replace it or refund you.",
        "For food safety reasons we can't accept returns of opened packs that arrived in good condition.",
      ],
    },
  ];

  return (
    <>
      <PageHero eyebrow="Help" title="Delivery & returns" />
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <div data-reveal-stagger className="space-y-6">
          {sections.map((s) => (
            <section key={s.title} className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-cocoa-900">{s.title}</h2>
              <div className="mt-3 space-y-2 leading-7 text-cocoa-700">
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 text-center text-cocoa-600">
          Still have a question? <Link href="/contact" className="font-semibold text-cocoa-900 underline underline-offset-2">Contact us</Link>
        </p>
      </div>
      <ScrollMotion />
    </>
  );
}
