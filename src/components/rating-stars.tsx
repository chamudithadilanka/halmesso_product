export default function RatingStars({
  rating,
  reviewCount,
  className = "",
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  const filled = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${i < filled ? "fill-amber-400" : "fill-zinc-200 dark:fill-zinc-700"}`}
            aria-hidden
          >
            <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 15l-5.25 2.75 1-5.86L1.5 7.65l5.9-.85L10 1.5z" />
          </svg>
        ))}
      </span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount.toLocaleString()})`}
      </span>
    </span>
  );
}
