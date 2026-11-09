/**
 * HALMASSO+ wordmark — chunky rounded letters in dark cocoa with a
 * leaf-green superscript "+", matching the packaging.
 */
export default function Logo({
  className = "",
  plusClassName = "",
  variant = "default",
}: {
  className?: string;
  plusClassName?: string;
  variant?: "default" | "on-light";
}) {
  return (
    <span
      className={`select-none whitespace-nowrap font-[family-name:var(--font-fredoka)] font-bold leading-none tracking-[-0.02em] ${variant === "on-light" ? "text-brand-dark-green" : "text-brand-dark-green dark:text-brand-warm-cream"} ${className}`}
      aria-label="HALMASSO+"
    >
      HALMASSO
      <span
        aria-hidden
        className={`align-super font-semibold text-[0.52em] leading-none ${variant === "on-light" ? "text-brand-herbal" : "text-brand-herbal dark:text-brand-fresh-leaf"} ${plusClassName}`}
      >
        +
      </span>
    </span>
  );
}
