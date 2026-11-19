import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import useFinePointer from "../../hooks/useFinePointer";

const SPRING = { stiffness: 170, damping: 20, mass: 0.6 };

// Card that tilts toward the mouse (max ~6°), lifts 6px, gets a purple-tinted
// shadow and a soft glare that follows the cursor.
// Touch devices and reduced motion: no tilt/lift/glare — only the shadow changes on hover.
// `as` = "div" | "article" | "a" (extra props like href are passed through).
export default function TiltCard({ as = "div", className = "", children, max = 6, glare = true, ...rest }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const tilt = fine && !reduce;
  const Comp = motion[as] || motion.div;
  const ref = useRef(null);

  // Cursor position inside the card (0…1) and hover amount (0…1)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const y = useSpring(useTransform(hover, [0, 1], [0, -6]), SPRING);
  const glareOpacity = useSpring(hover, SPRING);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(300px circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 60%)`;

  const onMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    hover.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  const shadow =
    "shadow-[0_1px_2px_rgba(31,41,55,0.04)] transition-shadow duration-300 hover:shadow-[0_22px_45px_-18px_rgba(113,75,103,0.38)] dark:hover:shadow-[0_22px_45px_-18px_rgba(0,0,0,0.7)]";

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX, rotateY, y, transformPerspective: 900 } : undefined}
      className={`relative ${shadow} ${className}`}
      {...rest}
    >
      {children}
      {tilt && glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </Comp>
  );
}
