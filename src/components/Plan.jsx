import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { planSection, plan } from "../data/content";

const DURATION = 0.5; // seconds per bar
const STEP_DELAY = 0.12; // seconds between bars
const FADE_MASK = "[mask-image:linear-gradient(to_right,#000_70%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_70%,transparent)]";

// Purple / teal cycle; gold only for the highlighted phase (Go-live).
// Dark mode uses the lighter purple token so the bar stays visible on the dark surface.
function barColor(step, i) {
  if (step.highlight) return "bg-accent-gold";
  return i % 2 === 0 ? "bg-primary dark:bg-primary-tx" : "bg-teal";
}

const pct = (value) => `${value * 100}%`;

// Gantt-style staircase: phase i starts in column i of N and spans one column.
// Shows order only, not duration. N is plan.length; nothing is hard-coded.
export default function Plan() {
  const reduce = useReducedMotion();
  const N = plan.length;

  return (
    <section id="plan" aria-labelledby="plan-title" className="bg-bg py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionHeading id="plan-title" eyebrow={planSection.eyebrow} title={planSection.title} align="center" />
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">{planSection.subtitle}</p>
        </Reveal>

        <div className="mt-12 rounded-3xl border border-border bg-surface p-5 sm:mt-14 sm:p-8">
          <ol>
            {plan.map((step, i) => {
              const span = step.ongoing ? N - i : 1; // Support runs to the end of the track
              return (
                <li
                  key={step.key}
                  className="grid gap-3 py-3 first:pt-0 last:pb-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-center sm:gap-6"
                >
                  <p className="text-start font-display text-base font-semibold tracking-[-0.02em] text-text">
                    {step.title}
                    <span className="sr-only">
                      {" "}
                      ({planSection.stepLabel} {i + 1} {planSection.ofLabel} {N})
                    </span>
                  </p>

                  <div className="relative h-8 sm:h-10">
                    <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-border" />
                    <motion.span
                      aria-hidden="true"
                      className={`absolute inset-y-2.5 origin-left rounded-full sm:inset-y-3.5 ${barColor(step, i)} ${
                        step.ongoing ? FADE_MASK : ""
                      }`}
                      style={{ insetInlineStart: pct(i / N), width: pct(span / N) }}
                      {...(reduce
                        ? {}
                        : {
                            initial: { scaleX: 0 },
                            whileInView: { scaleX: 1 },
                            viewport: { once: true, amount: 0.3 },
                            transition: { duration: DURATION, delay: i * STEP_DELAY },
                          })}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
