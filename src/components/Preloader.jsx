import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, preloader } from "../data/content";

// Intro overlay: animated logo mark + name + role + thin progress line.
// Decorative only (aria-hidden). The page renders normally underneath.
// Geometry and tokens match Logo.jsx; gold stays only on the (29,82) node.
const ease = [0.2, 0.8, 0.2, 1];
const easeInOut = [0.4, 0, 0.2, 1];

const MIN_MS = 1900; // minimum time the preloader stays visible
const MIN_MS_REDUCED = 550;
const MAX_MS = 2500; // hard cap, must stay larger than MIN_MS

// Order: top, left, right, bottom-right, bottom-left (gold).
const OUTER = [
  [50, 16],
  [16, 41],
  [84, 41],
  [71, 82],
  [29, 82],
];
const NODE_DELAYS = [0.16, 0.21, 0.26, 0.31, 0.36];
const nodeStyle = { transformBox: "fill-box", transformOrigin: "center" };

// Resolves when web fonts are ready AND the window "load" event has fired.
function waitForPage() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  let onLoad;
  const load =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => {
          onLoad = resolve;
          window.addEventListener("load", onLoad, { once: true });
        });
  const cleanup = () => onLoad && window.removeEventListener("load", onLoad);
  return { promise: Promise.all([fonts, load]), cleanup };
}

// minMs lets the caller use a shorter run (e.g. when replaying on theme toggle).
export default function Preloader({ onDone, minMs = MIN_MS }) {
  const reduce = useReducedMotion();
  const [minDone, setMinDone] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [capped, setCapped] = useState(false);
  const [fillHeld, setFillHeld] = useState(false);

  const visibleMs = reduce ? MIN_MS_REDUCED : minMs;
  const maxMs = Math.max(MAX_MS, visibleMs + 2500);
  // Progress bar reaches 90% a little before the exit starts.
  const fillSeconds = Math.max(0.8, visibleMs / 1000 - 0.4);

  // Timers + page-ready check. Lock scroll while the overlay is mounted.
  useEffect(() => {
    let cancelled = false;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const minTimer = setTimeout(() => setMinDone(true), visibleMs);
    const capTimer = setTimeout(() => setCapped(true), maxMs);
    const page = waitForPage();
    page.promise.then(() => {
      if (!cancelled) setPageReady(true);
    });

    return () => {
      cancelled = true;
      clearTimeout(minTimer);
      clearTimeout(capTimer);
      page.cleanup();
      root.style.overflow = prevOverflow;
    };
  }, [visibleMs, maxMs]);

  // Start the exit once (min time AND page ready) or the hard cap is hit.
  const canExit = (minDone && pageReady) || capped;
  useEffect(() => {
    if (canExit) onDone();
  }, [canExit, onDone]);

  const pop = (delay, duration) =>
    reduce
      ? { initial: false }
      : {
          initial: { scale: 0.4, opacity: 0 },
          transition: { duration, delay, ease },
        };

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] isolate flex items-center justify-center bg-bg"
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.15 } }
          : { opacity: 0, y: -24, transition: { duration: 0.3, ease: easeInOut } }
      }
    >
      {/* Dark only: same gradient as the dark hero (.hero-bg in index.css) */}
      <div className="hero-bg pointer-events-none absolute inset-0 -z-10 hidden dark:block" />

      <motion.div
        className="flex flex-col items-center text-center"
        initial={reduce ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <svg viewBox="0 0 100 100" className="size-[88px] sm:size-[120px]" aria-hidden="true" focusable="false">
          {/* Lines first, so they sit behind the circles */}
          <g stroke="var(--logo-line)" strokeWidth="5" strokeLinecap="round">
            {OUTER.map(([x, y], i) => (
              <motion.line
                key={`${x}-${y}`}
                x1="50"
                y1="52"
                x2={x}
                y2={y}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.26, ease: easeInOut, delay: 0.35 + i * 0.04 },
                  opacity: { duration: 0.01, delay: 0.35 + i * 0.04 },
                }}
              />
            ))}
          </g>
          <motion.circle
            cx="50"
            cy="52"
            r="15"
            fill="var(--logo-node)"
            style={nodeStyle}
            animate={{ scale: 1, opacity: 1 }}
            {...pop(0.1, 0.22)}
          />
          {OUTER.map(([x, y], i) => {
            const gold = x === 29 && y === 82;
            return (
              <motion.circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="8"
                fill={gold ? undefined : "var(--logo-node)"}
                className={gold ? "fill-accent-gold" : undefined}
                style={nodeStyle}
                animate={{ scale: 1, opacity: 1 }}
                {...pop(NODE_DELAYS[i], 0.2)}
              />
            );
          })}
        </svg>

        <motion.p
          className="mt-6 font-display text-[24px] font-bold leading-tight tracking-[-0.03em] text-text sm:text-[30px]"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.65, ease }}
        >
          {profile.name}
        </motion.p>
        <motion.p
          className="mt-1.5 text-[14px] text-muted sm:text-[15px]"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.77, ease }}
        >
          {preloader.role}
        </motion.p>

        {!reduce && (
          <div className="mt-7 h-0.5 w-28 overflow-hidden rounded-full bg-border sm:w-40">
            {/* Fills to 90% over most of the run, then reaches 100% once the page is ready */}
            <motion.div
              className="h-full origin-left rounded-full bg-teal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: fillHeld && pageReady ? 1 : 0.9 }}
              transition={
                fillHeld
                  ? { duration: 0.15, ease: "linear" }
                  : { duration: fillSeconds, delay: 0.1, ease: "linear" }
              }
              onAnimationComplete={() => setFillHeld(true)}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}