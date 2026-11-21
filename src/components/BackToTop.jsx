import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { focusRing } from "./ui/focus";
import { ui } from "../data/content";

const SHOW_AFTER = 600; // px scrolled before the button appears

// Floating button that returns to the top. Only rendered while visible,
// so it is never in the tab order when hidden.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Same value = React skips the re-render, so scrolling costs nothing extra.
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }
    onScroll(); // handles a reload in the middle of the page
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  const motionProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 12 } };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label={ui.home}
          onClick={scrollToTop}
          {...motionProps}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-4 end-4 z-30 flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_24px_-8px_rgba(113,75,103,0.55)] transition-[translate,box-shadow,background-color] duration-200 hover:bg-primary-hover hover:shadow-[0_22px_45px_-18px_rgba(113,75,103,0.38)] motion-safe:hover:-translate-y-0.5 sm:bottom-6 sm:end-6 ${focusRing}`}
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
