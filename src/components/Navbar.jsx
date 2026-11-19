import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteData } from "../data/siteData";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ui/ThemeToggle";

const nav = siteData.nav.filter((n) => ["#about", "#services", "#cases"].includes(n.href));

export default function Navbar() {
  const { person } = siteData;
  const { theme } = useTheme();
  const dark = theme === "dark";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [active, setActive] = useState("#about");
  const [progress, setProgress] = useState(0);
  const pillRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!reduce) setHidden(y > lastY && y > 80);
      else setHidden(false);
      setLastY(y);
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(isFinite(pct) ? pct : 0);
      let current = nav[0]?.href || "#about";
      nav.forEach((n) => {
        const el = document.querySelector(n.href);
        if (el && el.getBoundingClientRect().top <= 120) current = n.href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, reduce, nav]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPillMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = pillRef.current?.getBoundingClientRect();
    if (!r) return;
    pillRef.current.style.setProperty("--mx", (e.clientX - r.left) + "px");
    pillRef.current.style.setProperty("--my", (e.clientY - r.top) + "px");
  };

  return (
    <>
      <header className="fixed z-[100] left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[760px]" style={{ top: "calc(1rem + env(safe-area-inset-top))" }}>
        <motion.div
          ref={pillRef}
          onMouseMove={onPillMove}
          animate={reduce ? {} : { y: hidden ? -120 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
          className={`relative rounded-full border border-border backdrop-blur-xl backdrop-saturate-[1.4] overflow-hidden ${
            dark
              ? "bg-[rgba(11,11,26,0.55)] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              : "bg-white/65 shadow-[0_8px_30px_rgba(15,23,42,0.10)]"
          }`}
          style={{
            background: dark
              ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 40%, rgba(11,11,26,0.55) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)",
          }}
        >
          {/* spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full hidden md:block"
            style={{
              background:
                "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(217,178,111,0.18), transparent 70%)",
            }}
          />
          <nav aria-label="Primary" className="relative flex items-center justify-between gap-2 px-3 py-2">
            {/* left */}
            <a href="#hero" className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-xs">
                {person.initials}
              </span>
              <span className="hidden lg:inline font-display font-semibold text-text text-sm">{person.name}</span>
            </a>

            {/* center links (desktop) */}
            <ul className="hidden md:flex items-center gap-1 relative">
              {nav.map((item) => (
                <li key={item.href} className="relative">
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-text/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <a
                    href={item.href}
                    className={`relative z-10 block px-3 py-1.5 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active === item.href ? "text-text" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* theme toggle (desktop) */}
            <span className="hidden md:inline-flex items-center">
              <ThemeToggle />
            </span>

            {/* right: contact pill (desktop) */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-soft transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Contact
            </a>

            {/* mobile hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden relative w-11 h-11 rounded-full bg-text/10 flex items-center justify-center text-text focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={() => setOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <X size={22} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <Menu size={22} strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>

          {/* progress line */}
          <div className="absolute bottom-0 start-0 end-0 h-[2px] overflow-hidden">
            <div className="h-full bg-gold/70" style={{ width: progress + "%" }} />
          </div>
        </motion.div>
      </header>

      {/* mobile overlay + panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2 }}
              className={`fixed z-[100] left-1/2 -translate-x-1/2 top-[calc(4.5rem+env(safe-area-inset-top))] w-[calc(100%-24px)] max-w-[760px] rounded-3xl border border-border backdrop-blur-xl backdrop-saturate-[1.4] shadow-2xl overflow-hidden md:hidden ${dark ? "bg-[rgba(11,11,26,0.75)]" : "bg-white/80"}`}
            >
              <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
                <ul className="flex flex-col gap-1">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : i * 0.05 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center min-h-[48px] px-4 rounded-2xl text-lg font-display font-medium text-text hover:bg-text/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center justify-center min-h-[48px] rounded-2xl bg-primary text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
