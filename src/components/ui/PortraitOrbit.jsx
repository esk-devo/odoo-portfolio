import shadyWebp from "../../assets/shady.webp";
import shadyPng from "../../assets/shady.png";
import { profile, about } from "../../data/content";

// "Pop-out circle" portrait: purple→teal circle, head popping out above it,
// slow dashed orbit ring with 3 dots, two floating glass chips.
// Box is 440×540 at full size (scales down); every position is in % of that box.
const ORBIT_DOTS = [
  { cls: "bg-accent-gold h-3 w-3", left: "67.9%", top: "3.3%" }, // the only gold dot
  { cls: "bg-teal h-3.5 w-3.5", left: "75%", top: "93.3%" },
  { cls: "bg-primary h-2.5 w-2.5", left: "21.3%", top: "91%" },
];

const chipBase =
  "absolute z-20 flex items-center rounded-2xl border border-glass-bd bg-glass shadow-[0_12px_30px_-10px_rgba(31,41,55,0.25)] backdrop-blur-xl motion-safe:animate-float dark:border-border";

export default function PortraitOrbit() {
  const { chipRole, chipProjects } = about;

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px]" style={{ aspectRatio: "440 / 540" }}>
      {/* Dashed orbit ring + dots (rotates slowly, behind the photo) */}
      <div
        aria-hidden="true"
        className="absolute aspect-square rounded-full border border-dashed border-subtle/40 motion-safe:animate-orbit"
        style={{ width: "113.6%", left: "-6.8%", bottom: "-3.7%" }}
      >
        {ORBIT_DOTS.map((d) => (
          <span
            key={d.left}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${d.cls}`}
            style={{ left: d.left, top: d.top }}
          />
        ))}
      </div>

      {/* Photo window: square top, round bottom → the head pops out above the circle */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: "0 0 50% 50% / 0 0 40.7% 40.7%" }}
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 aspect-square w-full rounded-full"
          style={{ background: "linear-gradient(150deg, #714B67 0%, #8E5F82 45%, #00A09D 100%)" }}
        />
        <picture>
          <source srcSet={shadyWebp} type="image/webp" />
          <img
            src={shadyPng}
            alt={profile.name}
            width={867}
            height={900}
            loading="lazy"
            decoding="async"
            className="absolute h-auto max-w-none"
            style={{ left: "-5%", bottom: "-1.85%", width: "110%" }}
          />
        </picture>
      </div>

      {/* Chip: current role (top-right) */}
      <div
        aria-hidden="true"
        className={`${chipBase} right-0 top-[13%] gap-2.5 px-3 py-2 lg:left-[74%] lg:right-auto lg:top-[15%] lg:px-3.5 lg:py-2.5`}
      >
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal ring-4 ring-teal-soft" />
        <span className="leading-tight">
          <span className="block whitespace-nowrap text-[13px] font-semibold text-text">{chipRole.title}</span>
          <span className="block whitespace-nowrap text-xs text-subtle">{chipRole.text}</span>
        </span>
      </div>

      {/* Chip: projects count (left) */}
      <div
        aria-hidden="true"
        className={`${chipBase} left-0 top-[68%] gap-2.5 px-3 py-2 [animation-delay:2.5s] lg:-left-10 lg:px-3.5 lg:py-2.5`}
      >
        <span className="font-display text-xl font-bold text-primary-tx">{chipProjects.value}</span>
        <span className="max-w-[64px] text-xs leading-tight text-subtle">{chipProjects.text}</span>
      </div>
    </div>
  );
}
