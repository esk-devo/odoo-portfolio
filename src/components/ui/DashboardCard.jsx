import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Calculator, Check } from "lucide-react";
import useFinePointer from "../../hooks/useFinePointer";
import { hero } from "../../data/content";

const STRIP = { purple: "bg-primary", teal: "bg-teal", gold: "bg-accent-gold" };
const PILL = {
  teal: "bg-teal-soft text-teal-tx",
  purple: "bg-purple-soft text-primary-tx",
};
const SPRING = { stiffness: 150, damping: 18, mass: 0.6 };

// Glass "Accounting Dashboard" mock with 3D mouse tilt (desktop mouse only).
export default function DashboardCard() {
  const d = hero.dashboard;
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const tilt = fine && !reduce;
  const ref = useRef(null);

  // Mouse position inside the card: -0.5 … 0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), SPRING);

  const onMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[480px] pb-16 pt-12 lg:py-0"
      style={{ perspective: 1200 }}
    >
      <motion.figure
        aria-label={d.ariaLabel}
        style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative m-0"
      >
        {/* Soft purple/teal glow behind the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 55% at 25% 30%, rgba(113,75,103,0.16), transparent 70%), radial-gradient(55% 55% at 85% 80%, rgba(0,160,157,0.18), transparent 70%)",
          }}
        />

        {/* Card */}
        <div className="relative rounded-3xl border border-glass-bd bg-glass p-4 shadow-[0_24px_60px_-20px_rgba(31,41,55,0.25)] backdrop-blur-xl dark:border-border dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:p-[22px]">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white">
                <Calculator size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base font-semibold leading-tight tracking-[-0.02em] text-text sm:text-[17px]">
                  {d.title}
                </p>
                <p className="text-sm text-subtle">{d.subtitle}</p>
              </div>
            </div>
            <span className="mt-2 flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-teal" />
            </span>
          </div>

          {/* Chart */}
          <div className="mt-4 rounded-2xl border border-border bg-surface p-4" aria-hidden="true">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[13px] text-subtle">
              <span>{d.chartTitle}</span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-[2px] bg-primary" />
                  {d.legend[0]}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-[2px] bg-teal" />
                  {d.legend[1]}
                </span>
              </span>
            </div>
            <div className="mt-4 flex h-[110px] items-end justify-between gap-2.5 sm:h-[118px] sm:gap-3.5">
              {d.bars.map(([rev, exp], i) => (
                <div key={i} className="flex h-full flex-1 items-end gap-1 sm:gap-[3px]">
                  <Bar height={rev} color="bg-primary" delay={0.35 + i * 0.07} reduce={reduce} />
                  <Bar height={exp} color="bg-teal" delay={0.4 + i * 0.07} reduce={reduce} />
                </div>
              ))}
            </div>
          </div>

          {/* Journal rows */}
          <ul className="mt-4 space-y-2.5">
            {d.rows.map((row) => (
              <li
                key={row.label}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 sm:px-3.5"
              >
                <span className={`h-7 w-1 shrink-0 rounded-full ${STRIP[row.strip]}`} aria-hidden="true" />
                <span className="flex-1 text-[15px] text-text">{row.label}</span>
                <span className={`rounded-full px-2.5 py-1 text-[13px] font-semibold ${PILL[row.pill]}`}>
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Floating chip: journal entry (top-left) */}
        <motion.div
          aria-hidden="true"
          style={tilt ? { z: 50 } : undefined}
          className="absolute -top-10 left-0 flex items-center gap-3 rounded-2xl border border-glass-bd bg-glass p-2.5 pr-4 shadow-[0_12px_30px_-10px_rgba(31,41,55,0.25)] backdrop-blur-xl dark:border-border lg:-left-14 lg:-top-[51px]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-teal-soft text-teal">
            <Check size={18} strokeWidth={2.25} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-text">{d.chipJournal.title}</span>
            <span className="block text-[13px] text-subtle">{d.chipJournal.text}</span>
          </span>
        </motion.div>

        {/* Floating chip: Sale → Delivery → Invoice (bottom-right) */}
        <motion.div
          aria-hidden="true"
          style={tilt ? { z: 70 } : undefined}
          className="absolute -bottom-14 right-0 flex items-center gap-2 rounded-2xl border border-glass-bd bg-glass p-2 shadow-[0_12px_30px_-10px_rgba(31,41,55,0.25)] backdrop-blur-xl dark:border-border sm:gap-3 lg:-bottom-[55px] lg:-right-[51px]"
        >
          {d.chipFlow.map((step, i) => {
            const last = i === d.chipFlow.length - 1;
            return (
              <span key={step} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`rounded-lg px-2.5 py-1.5 text-sm font-semibold sm:px-3 ${
                    last ? "bg-teal-soft text-teal-tx" : "bg-purple-soft text-primary-tx"
                  }`}
                >
                  {step}
                </span>
                {!last && <span className="h-0.5 w-3 rounded-full bg-teal sm:w-4" />}
              </span>
            );
          })}
        </motion.div>
      </motion.figure>
    </div>
  );
}

// One chart bar; grows from 0 the first time it scrolls into view.
function Bar({ height, color, delay, reduce }) {
  const cls = `w-full rounded-t-[4px] ${color}`;
  if (reduce) return <div className={cls} style={{ height: `${height}%` }} />;
  return (
    <motion.div
      className={cls}
      initial={{ height: 0 }}
      whileInView={{ height: `${height}%` }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
