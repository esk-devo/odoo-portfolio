import React from "react";
import Reveal from "./ui/Reveal";
import { siteData } from "../data/siteData";

export default function Experience() {
  const { experience } = siteData;
  return (
    <section id="experience" className="scroll-mt-24 py-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{experience.title}</h2>
            <p className="mt-2 text-text-muted">{experience.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-10 max-w-3xl mx-auto">
          <ol className="relative ps-6">
            <div className="absolute top-0 bottom-0 start-2 w-0.5 bg-text/10" />
            {experience.items.map((e, i) => (
              <Reveal key={e.company + e.role} delay={i * 0.08}>
                <li className="relative pb-8 ps-6">
                  <div className="absolute start-0 top-1 w-4 h-4 rounded-full bg-gold -translate-x-1/2" />
                  <h3 className="font-display font-semibold text-text">{e.role}</h3>
                  <p className="text-gold text-sm">
                    {e.company}
                    {e.status ? ` · ${e.status}` : ""}
                  </p>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">{e.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
