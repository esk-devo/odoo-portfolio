import React from "react";

// Infinite horizontal marquee. Pauses on hover. Disabled under reduced motion.
export default function Marquee({ items = [], speed = 30 }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative group">
      <div
        className="flex gap-8 whitespace-nowrap py-3 animate-[marquee_var(--speed)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--speed": speed + "s" }}
      >
        {doubled.map((it, i) => (
          <span key={i} className="text-text-muted text-sm font-medium">{it}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_var\\(--speed\\)_linear_infinite\\] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
