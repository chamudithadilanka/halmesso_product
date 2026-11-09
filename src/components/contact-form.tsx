"use client";

import { useState, type FormEvent } from "react";
import FormField, { inputClass } from "./form-field";
import { CheckIcon } from "./icons";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Demo: no backend yet. Wire this to an email/API route before launch.
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-leaf-600 text-cream-50"><CheckIcon className="size-8" strokeWidth={2.4} /></span>
        <h2 className="font-display text-2xl font-semibold text-cocoa-900">Message received</h2>
        <p className="max-w-sm text-sm leading-6 text-cocoa-600">Thanks for reaching out. We&apos;ll reply to your email soon.</p>
        <button type="button" onClick={() => setSent(false)} className="text-sm font-semibold text-cocoa-700 underline underline-offset-2">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <FormField label="Name" id="c-name" name="name" autoComplete="name" required />
      <FormField label="Email" id="c-email" name="email" type="email" autoComplete="email" required />
      <FormField label="Phone" id="c-phone" name="phone" type="tel" autoComplete="tel" className="sm:col-span-2" />
      <FormField label="Message" id="c-message" name="message" required className="sm:col-span-2">
        <textarea id="c-message" name="message" required rows={5} className={`${inputClass} h-auto resize-y py-3`} />
      </FormField>
      <button type="submit" className="h-12 rounded-full bg-cocoa-800 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700 sm:col-span-2">
        Send message
      </button>
    </form>
  );
}
