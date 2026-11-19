import React from "react";
import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";
import { siteData } from "../data/siteData";

export default function About() {
  const { about } = siteData;
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text text-start">{about.title}</h2>
          <p className="mt-4 text-text-muted max-w-3xl text-start leading-relaxed">{about.paragraph}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="rounded-2xl bg-surface border border-border p-5 text-center shadow-sm hover:border-primary-soft/40 transition">
                <div className="text-3xl font-display font-bold text-text">
                  <Counter value={stat.value} />
                </div>
                <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
