import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Package, ShoppingCart, Calculator, BarChart3 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { flowSection, flow } from "../data/content";

const ICONS = { sales: TrendingUp, inventory: Package, purchase: ShoppingCart, accounting: Calculator, reports: BarChart3 };
const STEP = 0.25; // seconds between steps lighting up
const EASE = [0.22, 1, 0.36, 1];

function nodeClass(step) {
  if (step.highlight) return "border-primary bg-primary text-white ring-[10px] ring-purple-soft";
  if (step.tone === "teal") return "border-teal bg-surface text-teal-tx";
  return "border-primary bg-surface text-primary-tx dark:border-primary-tx";
}

// Static 5-step flow. Vertical (line on the left) below 1024px, horizontal on desktop.
// When it scrolls into view each connector draws in and the next step lights up.
export default function HowItConnects() {
  const reduce = useReducedMotion();

  const node = {
    hidden: { opacity: 0.3, scale: 0.85 },
    show: (i) => ({ opacity: 1, scale: 1, transition: { duration: 0.45, delay: i * STEP, ease: EASE } }),
  };
  const text = {
    hidden: { opacity: 0, y: 8 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * STEP + 0.05, ease: EASE } }),
  };
  const lineX = {
    hidden: { scaleX: 0 },
    show: (i) => ({ scaleX: 1, transition: { duration: STEP, delay: i * STEP + 0.15, ease: "linear" } }),
  };
  const lineY = {
    hidden: { scaleY: 0 },
    show: (i) => ({ scaleY: 1, transition: { duration: STEP, delay: i * STEP + 0.15, ease: "linear" } }),
  };

  return (
    <section id="process" aria-labelledby="process-title" className="bg-bg-2 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionHeading id="process-title" eyebrow={flowSection.eyebrow} title={flowSection.title} align="center" />
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">{flowSection.subtitle}</p>
        </Reveal>

        <motion.ol
          {...(reduce
            ? { initial: false, animate: "show" } // reduced motion: final state straight away
            : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.35 } })}
          className="mx-auto mt-12 max-w-[420px] sm:mt-14 lg:grid lg:max-w-none lg:grid-cols-5"
        >
          {flow.map((step, i) => {
            const Icon = ICONS[step.key];
            const last = i === flow.length - 1;
            return (
              <li
                key={step.key}
                className="relative flex gap-5 pb-9 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
              >
                {/* Connector to the next step: track + teal fill that draws in */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[27px] top-7 h-full w-0.5 lg:left-1/2 lg:top-9 lg:h-0.5 lg:w-full"
                  >
                    <span className="absolute inset-0 bg-border" />
                    <motion.span
                      custom={i}
                      variants={lineY}
                      className="absolute inset-0 origin-top bg-[linear-gradient(180deg,#00A09D,rgba(0,160,157,0.25))] lg:hidden"
                    />
                    <motion.span
                      custom={i}
                      variants={lineX}
                      className="absolute inset-0 hidden origin-left bg-[linear-gradient(90deg,#00A09D,rgba(0,160,157,0.25))] lg:block"
                    />
                  </span>
                )}

                <motion.span
                  custom={i}
                  variants={node}
                  aria-hidden="true"
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 lg:h-[72px] lg:w-[72px] ${nodeClass(step)}`}
                >
                  <Icon size={22} />
                </motion.span>

                <motion.div custom={i} variants={text} className="pt-2.5 lg:pt-5">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-text">{step.title}</h3>
                  <p className="mt-1.5 text-base leading-snug text-muted lg:mt-2 lg:text-[15px]">{step.text}</p>
                </motion.div>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
