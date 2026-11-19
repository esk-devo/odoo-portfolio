import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// 3D tilt card with cursor-following spotlight. Touch devices get a simple press.
export default function TiltCard({ children, className = "", max = 6 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [touch, setTouch] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sy = useSpring(ry, { stiffness: 150, damping: 18 });

  React.useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const onMove = (e) => {
    if (touch || reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    el.style.setProperty("--mx", (px * 100) + "%");
    el.style.setProperty("--my", (py * 100) + "%");
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    if (ref.current) {
      ref.current.style.setProperty("--mx", "50%");
      ref.current.style.setProperty("--my", "50%");
    }
  };

  if (touch || reduce) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={className}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      {children}
      {/* spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), var(--glow), transparent 70%)",
        }}
      />
      {/* brighter border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-gold/20"
      />
    </motion.div>
  );
}
