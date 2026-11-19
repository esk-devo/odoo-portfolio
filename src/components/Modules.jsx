import React from "react";
import * as Icons from "lucide-react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { siteData } from "../data/siteData";

export default function Modules() {
  const { modules } = siteData;
  return (
    <section id="modules" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{modules.title}</h2>
            <p className="mt-2 text-text-muted">{modules.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.items.map((m, i) => {
            const Icon = Icons[m.icon] || Icons.Circle;
            return (
              <Reveal key={m.name} delay={i * 0.06}>
                <TiltCard className="rounded-2xl bg-surface border border-border p-5 flex flex-col items-center gap-3 h-full">
                  <div className="w-11 h-11 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-medium text-text">{m.name}</span>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
