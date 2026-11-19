import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { ui } from "../../data/content";
import { focusRing } from "./focus";

// Round 44px icon button: moon in light mode, sun in dark mode.
export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const reduce = useReducedMotion();
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? ui.toLight : ui.toDark}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-text transition-colors hover:bg-purple-soft ${focusRing} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={hidden}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={hidden}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="flex"
          aria-hidden="true"
        >
          {dark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
