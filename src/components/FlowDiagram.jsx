import React, { useState } from "react";
import Reveal from "./ui/Reveal";
import { siteData } from "../data/siteData";

export default function FlowDiagram() {
  const { flow } = siteData;
  const [active, setActive] = useState(0);
  const nodes = flow.nodes;

  return (
    <section id="flow" className="scroll-mt-24 py-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{flow.title}</h2>
            <p className="mt-2 text-text-muted">{flow.subtitle}</p>
          </div>
        </Reveal>

        {/* Desktop horizontal */}
        <div className="hidden md:block mt-12">
          <svg viewBox="0 0 900 160" className="w-full h-auto" aria-hidden="true">
            {nodes.map((n, i) => {
              if (i === nodes.length - 1) return null;
              const x1 = 90 + i * 180;
              const x2 = 90 + (i + 1) * 180;
              const y = 60;
              return (
                <g key={i}>
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--border)" strokeWidth="2" />
                  <circle r="4" fill="var(--gold)">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                      path={`M ${x1} ${y} L ${x2} ${y}`}
                    />
                  </circle>
                </g>
              );
            })}
            {nodes.map((n, i) => {
              const x = 90 + i * 180;
              const y = 60;
              return (
                <g key={n.name} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                  <circle cx={x} cy={y} r="26" fill="var(--surface)" stroke={active === i ? "var(--gold)" : "var(--border)"} strokeWidth="2" />
                  <text x={x} y={y + 4} textAnchor="middle" fill="var(--text)" fontSize="12" fontFamily="Inter, sans-serif">
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="text-center text-text-muted mt-4 min-h-[1.5rem]">{nodes[active].description}</p>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden mt-10 flex flex-col items-center gap-2">
          {nodes.map((n, i) => (
            <React.Fragment key={n.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`w-full max-w-xs rounded-2xl border px-4 py-3 text-center transition ${
                  active === i ? "border-gold text-text bg-gold/10" : "border-border text-text-muted bg-surface"
                }`}
              >
                <div className="font-display font-semibold">{n.name}</div>
                {active === i && <div className="text-xs mt-1 text-text-muted">{n.description}</div>}
              </button>
              {i < nodes.length - 1 && (
                <div className="h-6 w-0.5 bg-text/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gold animate-[flowdown_1.6s_linear_infinite]" />
                </div>
              )}
            </React.Fragment>
          ))}
          <style>{`@keyframes flowdown { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }`}</style>
        </div>
      </div>
    </section>
  );
}
