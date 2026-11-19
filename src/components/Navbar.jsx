import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ui/ThemeToggle";
import { focusRing } from "./ui/focus";
import { profile, nav, navCta, ui } from "../data/content";

const FOCUSABLE = 'a[href], button:not([disabled])';

// Highlights the nav link of the section crossing the middle of the screen.
function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Navbar() {
  const active = useActiveSection();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const sheetRef = useRef(null);

  // Mobile sheet: lock page scroll, trap focus, Esc closes, auto-close on desktop width.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector(FOCUSABLE)?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;
      // Trap = visible controls in the bar (logo, theme, close) + everything in the sheet.
      const items = [
        ...headerRef.current.querySelectorAll(FOCUSABLE),
        ...sheetRef.current.querySelectorAll(FOCUSABLE),
      ].filter((el) => el.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (!items.includes(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 56.25rem)");
    const onResize = (e) => e.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 z-50 px-3 sm:px-4"
        style={{ top: "calc(1rem + env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-full border border-glass-bd bg-glass py-2 pl-3 pr-2 shadow-[0_8px_30px_rgba(31,41,55,0.08)] backdrop-blur-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:pl-4">
          {/* Left: logo + name */}
          <a
            href="#top"
            aria-label={`${profile.name} — ${ui.home}`}
            className={`flex min-h-11 min-w-0 items-center gap-2.5 rounded-full pr-2 ${focusRing}`}
          >
            <Logo size={32} />
            <span className="truncate font-display text-base font-semibold tracking-[-0.02em] text-text">
              {profile.name}
            </span>
          </a>

          {/* Center: section links (desktop) */}
          <nav aria-label={ui.primaryNav} className="hidden nav:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${focusRing} ${
                        isActive ? "bg-purple-soft text-text" : "text-muted hover:text-text"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: GitHub + theme + CTA (desktop) / theme + hamburger (mobile) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.github}
              className={`hidden h-11 w-11 items-center justify-center rounded-full text-text transition-colors hover:bg-purple-soft nav:inline-flex ${focusRing}`}
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <ThemeToggle />
            <a
              href={navCta.href}
              className={`hidden h-11 items-center rounded-full bg-primary px-5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover nav:inline-flex ${focusRing}`}
            >
              {navCta.label}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text nav:hidden ${focusRing}`}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet (< 900px) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm nav:hidden"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              ref={sheetRef}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="fixed inset-x-3 z-50 mx-auto max-w-[1200px] overflow-y-auto rounded-3xl border border-border bg-surface p-3 shadow-2xl sm:inset-x-4 nav:hidden"
              style={{
                top: "calc(5.25rem + env(safe-area-inset-top))",
                maxHeight: "calc(100dvh - 6.5rem - env(safe-area-inset-top))",
              }}
            >
              <nav aria-label={ui.mobileNav}>
                <ul className="flex flex-col gap-1">
                  {nav.map((item) => {
                    const isActive = active === item.href;
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={close}
                          aria-current={isActive ? "true" : undefined}
                          className={`flex min-h-12 items-center rounded-2xl px-4 font-display text-lg font-medium text-text transition-colors hover:bg-purple-soft ${focusRing} ${
                            isActive ? "bg-purple-soft" : ""
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-2 grid gap-2 border-t border-border pt-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-base font-medium text-text transition-colors hover:bg-purple-soft ${focusRing}`}
                >
                  <Github size={20} aria-hidden="true" />
                  {ui.github}
                </a>
                <a
                  href={navCta.href}
                  onClick={close}
                  className={`flex min-h-12 items-center justify-center rounded-2xl bg-primary px-5 text-base font-semibold text-white transition-colors hover:bg-primary-hover ${focusRing}`}
                >
                  {navCta.label}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
