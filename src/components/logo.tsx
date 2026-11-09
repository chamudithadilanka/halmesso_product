/**
 * Haalmasso+ wordmark — chunky rounded letters in cocoa with the
 * orange "+" and a small sprat mark, matching the pack.
 */
export default function Logo({
  className = "",
  tone = "cocoa",
  withMark = true,
}: {
  className?: string;
  tone?: "cocoa" | "cream";
  withMark?: boolean;
}) {
  const text = tone === "cream" ? "text-cream-50" : "text-cocoa-800";
  return (
    <span className={`inline-flex select-none items-center gap-1.5 whitespace-nowrap font-display font-bold leading-none tracking-[-0.02em] ${text} ${className}`}>
      {withMark && (
        <svg viewBox="0 0 40 24" aria-hidden className="h-[0.8em] w-auto shrink-0">
          <path d="M2 12c5-7 15-9 24-3l9-5v16l-9-5c-9 6-19 4-24-3Z" fill="currentColor" />
          <circle cx="11" cy="10.5" r="1.6" fill={tone === "cream" ? "#3a1d0e" : "#fbf3e6"} />
          <path d="M4 19c4 2 9 2.5 14 1.2" fill="none" stroke="#3f8ad8" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
      <span>
        Haalmasso
        <span aria-hidden className="ml-px align-super text-[0.62em] font-bold leading-none text-plus">+</span>
        <span className="sr-only">plus</span>
      </span>
    </span>
  );
}
