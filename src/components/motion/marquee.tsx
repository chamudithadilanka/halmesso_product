/** Infinite ticker (pure CSS). Content is duplicated once for a seamless loop. */
export default function Marquee({
  items,
  className = "",
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 whitespace-nowrap sm:gap-12">
          <span>{item}</span>
          <span aria-hidden className="text-plus">+</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
