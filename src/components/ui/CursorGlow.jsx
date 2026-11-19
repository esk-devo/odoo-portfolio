import React, { useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const SIZE = 220;
const LERP = 0.08;

export default function CursorGlow() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * LERP;
      y += (ty - y) * LERP;
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const OPACITY = dark ? 0.28 : 0.18;
  const COLOR = dark ? "rgba(168, 120, 200, 0.28)" : "rgba(113, 75, 103, 0.18)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 start-0 rounded-full -z-[5] ${dark ? "mix-blend-screen" : "mix-blend-multiply"}`}
      style={{
        width: SIZE,
        height: SIZE,
        opacity: OPACITY,
        background: `radial-gradient(circle, ${COLOR} 0%, ${COLOR.replace(/[\d.]+\)$/, "0.12)")} 40%, transparent 75%)`,
      }}
    />
  );
}
