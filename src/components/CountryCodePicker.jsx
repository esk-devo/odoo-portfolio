import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Flag from "./ui/Flag";

// Custom dropdown for the phone country code. A native <select> can't show flags,
// so this is a button + listbox. The button shows flag + dial code; the list adds the name.
export default function CountryCodePicker({ value, onChange, options, label, id }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0); // index of the focused option while open
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);
  const reduce = useReducedMotion();

  const listId = `${id}-listbox`;
  const currentIndex = Math.max(0, options.findIndex((o) => o.code === value));
  const current = options[currentIndex];

  function openList() {
    setActive(currentIndex);
    setOpen(true);
  }

  function closeList(returnFocus) {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  function choose(i) {
    onChange(options[i].code);
    closeList(true);
  }

  // Keyboard: move focus to the active option whenever it changes while open.
  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  // Close on a click or tap outside the picker.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Arrow keys on the closed button open the list (Enter and Space already click it).
  function onButtonKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openList();
    }
  }

  function onListKeyDown(e) {
    const n = options.length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => (a + 1) % n);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => (a - 1 + n) % n);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(n - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        closeList(true);
        break;
      case "Tab":
        closeList(false);
        break;
      default:
    }
  }

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.15 },
      };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${label}: ${current.dial} ${current.name}`}
        onClick={() => (open ? closeList(false) : openList())}
        onKeyDown={onButtonKeyDown}
        className="flex w-[7.5rem] items-center gap-2 rounded-xl border border-border bg-bg py-3 ps-3 pe-2.5 text-base text-text transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 dark:focus:border-primary-tx dark:focus:ring-primary-tx/25"
      >
        <Flag code={current.code} />
        <span className="tabular-nums">{current.dial}</span>
        <ChevronDown size={16} aria-hidden="true" className="ms-auto shrink-0 text-muted" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="list"
            id={listId}
            role="listbox"
            aria-labelledby={id}
            onKeyDown={onListKeyDown}
            {...motionProps}
            className="absolute start-0 top-full z-20 mt-2 max-h-64 min-w-64 overflow-y-auto rounded-xl border border-border bg-surface p-1.5 shadow-[0_18px_40px_-16px_rgba(31,41,55,0.3)] dark:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
          >
            {options.map((o, i) => {
              const selected = o.code === value;
              return (
                <div
                  key={o.code}
                  ref={(el) => (itemRefs.current[i] = el)}
                  role="option"
                  aria-selected={selected}
                  tabIndex={-1}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-base text-text outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary dark:focus-visible:ring-primary-tx ${
                    selected ? "bg-purple-soft" : "hover:bg-bg-2"
                  }`}
                >
                  <Flag code={o.code} />
                  <span className="w-14 tabular-nums font-medium">{o.dial}</span>
                  <span className="text-muted">{o.name}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
