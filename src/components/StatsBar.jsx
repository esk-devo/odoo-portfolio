import Counter from "./ui/Counter";
import { stats } from "../data/content";

// 4 stats in one rounded card: 2×2 on mobile/tablet, one row on desktop.
// The 1px gaps over a border-coloured background draw the dividers.
export default function StatsBar() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-border bg-border shadow-[0_1px_2px_rgba(31,41,55,0.04)] lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse gap-1 bg-surface px-4 py-5 sm:px-7 sm:py-6">
          <dt className="text-base leading-snug text-muted">{s.label}</dt>
          <dd className="font-display text-[28px] font-bold leading-none tracking-[-0.03em] text-primary-tx sm:text-[32px]">
            <Counter value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
