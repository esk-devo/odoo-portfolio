import { Calculator, Package, TrendingUp, ShoppingCart, Receipt, Users, Code } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";
import { expertiseSection, modules } from "../data/content";

const ICONS = {
  accounting: Calculator,
  inventory: Package,
  sales: TrendingUp,
  purchase: ShoppingCart,
  pos: Receipt,
  hr: Users,
  studio: Code,
};

// Icon boxes alternate purple-soft / teal-soft (the featured Accounting card has its own style).
const TONES = ["bg-purple-soft text-primary-tx", "bg-teal-soft text-teal-tx"];

// Grid: 1 col mobile · 2 cols tablet · 3 cols desktop.
// Desktop rows: [Accounting ×2][Inventory] / [Sales][Purchase][POS] / [HR][Studio ×2] — no gaps.
// Tablet: Accounting spans the full row so the 2-column grid also ends without a gap.
function spanClass(m) {
  if (m.featured) return "sm:col-span-2";
  if (m.wide) return "lg:col-span-2";
  return "";
}

export default function Expertise() {
  const regular = modules.filter((m) => !m.featured);

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="bg-bg py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionHeading
            id="expertise-title"
            eyebrow={expertiseSection.eyebrow}
            title={expertiseSection.title}
            className="max-w-[620px]"
          />
          <p className="max-w-[400px] text-base leading-relaxed text-muted sm:text-[17px] lg:pb-2">
            {expertiseSection.note}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => {
            const Icon = ICONS[m.key];
            const tone = m.featured ? "bg-white/15 text-white" : TONES[regular.indexOf(m) % 2];
            return (
              <li key={m.key} className={spanClass(m)}>
                <Reveal delay={i * 0.06} y={18} className="h-full">
                  <TiltCard
                    as="article"
                    className={`h-full rounded-[20px] border p-6 sm:p-7 ${
                      m.featured
                        ? "border-transparent bg-primary text-white"
                        : "border-border bg-surface text-text"
                    } ${m.wide ? "flex flex-col gap-5 sm:flex-row sm:items-center" : ""}`}
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`} aria-hidden="true">
                      <Icon size={22} />
                    </span>

                    <div className={m.wide ? "min-w-0" : "mt-5"}>
                      <h3
                        className={`font-display text-xl font-semibold tracking-[-0.02em] ${
                          m.featured ? "text-white" : "text-text"
                        }`}
                      >
                        {m.title}
                      </h3>
                      {m.text && (
                        <p className={`mt-3 text-base leading-relaxed ${m.featured ? "text-white/85" : "text-muted"}`}>
                          {m.text}
                        </p>
                      )}
                      {m.tags && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {m.tags.map((tag) => (
                            <li key={tag} className="rounded-full border border-border px-3 py-1 text-sm text-text">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
