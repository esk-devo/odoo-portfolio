import React from "react";

// Fixed, low-cost ambient background: blurred blobs + faint grid.
export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -start-32 w-[420px] h-[420px] rounded-full bg-gold/10 dark:bg-gold/20 blur-3xl animate-[drift_18s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 -end-40 w-[520px] h-[520px] rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl animate-[drift_24s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-0 start-1/4 w-[480px] h-[480px] rounded-full bg-primary-soft/8 dark:bg-primary-soft/15 blur-3xl animate-[drift_30s_ease-in-out_infinite]" />
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--text) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--text) 40%, transparent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
