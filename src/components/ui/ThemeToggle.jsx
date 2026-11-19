import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle({ compact = false }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const reduce = useReducedMotion();

  const handleKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={toggle}
      onKeyDown={handleKey}
      className="relative inline-flex items-center justify-center -m-1.5 p-1.5 focus-visible:outline-none"
    >
      <span
        className="relative block rounded-full border border-border bg-surface/60 backdrop-blur-md overflow-hidden"
        style={{
          width: 64,
          height: 32,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.06) 100%)",
        }}
      >
        {/* sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.35) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.12) 100%)",
          }}
        />
        <motion.span
          animate={{ x: dark ? 32 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0 left-0 h-8 w-8 rounded-full border border-border bg-surface/80 backdrop-blur-md shadow-sm flex items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center text-text"
              >
                <Moon size={16} strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center text-gold"
              >
                <Sun size={16} strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>
    </button>
  );
}
