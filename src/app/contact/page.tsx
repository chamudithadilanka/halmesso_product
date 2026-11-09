import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import PageHero from "@/components/page-hero";
import ScrollMotion from "@/components/motion/scroll-motion";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions about Haalmasso+, an order, or stocking our seasoning? Send us a message.",
  alternates: { canonical: "/contact" },
};

const TOPICS = [
  { title: "Orders & delivery", body: "Where's my order, changing an address, or a damaged pack." },
  { title: "Product questions", body: "Ingredients, allergens, storage and how to use it." },
  { title: "Wholesale & retail", body: "Want to stock Haalmasso+ in your shop? Let's talk." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." description="Send us a message and we'll get back to you within one business day." />
      <section className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 data-reveal="up" className="font-display text-2xl font-semibold text-cocoa-900">How can we help?</h2>
          <ul data-reveal-stagger className="mt-6 space-y-3">
            {TOPICS.map((t) => (
              <li key={t.title} className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-5">
                <h3 className="font-semibold text-cocoa-900">{t.title}</h3>
                <p className="mt-1 text-sm leading-6 text-cocoa-600">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="up" className="rounded-3xl border border-cocoa-800/10 bg-cream-50 p-6 sm:p-8 lg:col-span-7">
          <ContactForm />
        </div>
      </section>
      <ScrollMotion />
    </>
  );
}
