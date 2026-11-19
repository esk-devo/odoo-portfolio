import React from "react";
import Reveal from "./ui/Reveal";
import { siteData } from "../data/siteData";

export default function Skills() {
  const { skills } = siteData;
  return (
    <section id="skills" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{skills.title}</h2>
            <p className="mt-2 text-text-muted">{skills.subtitle}</p>
          </div>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.items.map((s, i) => (
            <Reveal key={s} delay={i * 0.04}>
              <div className="rounded-2xl bg-surface border border-border px-5 py-4 text-text text-sm shadow-sm hover:border-gold/40 transition">
                {s}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
