import React, { useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import { siteData } from "../data/siteData";

export default function Process() {
  const { process } = siteData;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("process");
      if (!section) return;
      const r = section.getBoundingClientRect();
      const p = Math.min(Math.max((window.innerHeight * 0.8 - r.top) / (r.height * 0.6 + 1), 0), 1);
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="process" className="scroll-mt-24 py-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{process.title}</h2>
            <p className="mt-2 text-text-muted">{process.subtitle}</p>
          </div>
        </Reveal>

        <div className="hidden md:block mt-14">
          <div className="relative">
            <div className="absolute top-5 start-0 end-0 h-0.5 bg-text/10" />
            <div
              className="absolute top-5 start-0 h-0.5 bg-gradient-to-r from-gold to-gold transition-all"
              style={{ width: progress * 100 + "%" }}
            />
            <ol className="relative grid grid-cols-6 gap-2">
              {process.steps.map((step, idx) => {
                const lit = progress >= (idx / (process.steps.length - 1)) * 0.95 || idx === 0;
                return (
                  <li key={step.title} className="flex flex-col items-center text-center">
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                        lit
                          ? "bg-gradient-to-br from-gold to-gold text-white shadow-lg shadow-gold/40 scale-110"
                          : "bg-surface border border-border text-text-muted"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <h3 className={`mt-4 font-display font-semibold ${lit ? "text-text" : "text-text-muted"}`}>{step.title}</h3>
                    <p className="mt-1 text-xs text-text-muted max-w-[140px]">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="md:hidden mt-10">
          <ol className="relative ps-6">
            <div className="absolute top-0 bottom-0 start-2 w-0.5 bg-text/10" />
            <div
              className="absolute top-0 start-2 w-0.5 bg-gradient-to-b from-gold to-gold transition-all"
              style={{ height: progress * 100 + "%" }}
            />
            {process.steps.map((step, idx) => {
              const lit = progress >= (idx / (process.steps.length - 1)) * 0.9 || idx === 0;
              return (
                <li key={step.title} className="relative pb-8 ps-6">
                  <div
                    className={`absolute start-0 top-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      lit ? "bg-accent text-white" : "bg-surface border border-border text-text-muted"
                    }`}
                    style={{ transform: "translateX(-50%)" }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className={`font-display font-semibold ${lit ? "text-text" : "text-text-muted"}`}>{step.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
