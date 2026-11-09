"use client";

import { MAX_LINE_QUANTITY } from "@/application/cart";
import { MinusIcon, PlusIcon } from "./icons";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = MAX_LINE_QUANTITY,
  size = "md",
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const dims = {
    sm: "h-9 [&_button]:w-9 [&_output]:w-7 text-sm",
    md: "h-11 [&_button]:w-11 [&_output]:w-8 text-sm",
    lg: "h-12 [&_button]:w-12 [&_output]:w-9 text-base",
  }[size];

  return (
    <div role="group" aria-label={label} className={`inline-flex items-center rounded-full border border-cocoa-800/15 bg-cream-50 ${dims}`}>
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-full place-items-center rounded-full text-cocoa-700 transition-colors hover:bg-cocoa-800/5 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <MinusIcon className="size-4" />
      </button>
      <output aria-live="polite" className="text-center font-semibold tabular-nums text-cocoa-900">
        {value}
      </output>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-full place-items-center rounded-full text-cocoa-700 transition-colors hover:bg-cocoa-800/5 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
