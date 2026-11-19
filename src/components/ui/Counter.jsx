import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Counts up to `value` only when it is numeric. Text values render as-is.
export default function Counter({ value, duration = 1.4 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const match = String(value).match(/^[\d.]+$/);
  const isNumeric = !!match;
  const target = isNumeric ? parseFloat(match[0]) : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(target * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, reduce, isNumeric]);

  if (!isNumeric) {
    return <span ref={ref}>{value}</span>;
  }

  const formatted = Number.isInteger(target)
    ? Math.round(display)
    : display.toFixed(1);

  return <span ref={ref}>{formatted}</span>;
}
