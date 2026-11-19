// Infinite horizontal marquee (CSS only).
// - The list is rendered twice and the track slides 0 → -50% for a seamless loop.
// - The second copy is aria-hidden so screen readers read every item once.
// - Pauses on hover. With reduced motion: no movement, the copy is hidden and
//   the row scrolls sideways instead.
export default function Marquee({ items, renderItem, getKey, label }) {
  const list = (copy) => (
    <ul
      aria-label={copy ? undefined : label}
      aria-hidden={copy ? true : undefined}
      className={`flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 ${copy ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((item) => (
        <li key={getKey(item)} className="shrink-0">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee-mask group overflow-hidden motion-reduce:overflow-x-auto">
      <div className="flex w-max animate-marquee py-1 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
