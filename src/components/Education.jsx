import React from "react";
import { GraduationCap } from "lucide-react";
import Reveal from "./ui/Reveal";
import { siteData } from "../data/siteData";

export default function Education() {
  const { education } = siteData;
  return (
    <section id="education" className="scroll-mt-24 py-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text text-center">{education.title}</h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {education.items.map((e) => (
            <Reveal key={e.degree}>
              <div className="rounded-2xl bg-surface border border-border p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text">{e.degree}</h3>
                  <p className="text-text-muted">{e.school}</p>
                  <p className="text-sm text-text-muted mt-1">{e.status} · {e.years}</p>
                </div>
              </div>
            </Reveal>
          ))}
          {education.languages && (
            <Reveal>
              <div className="rounded-2xl bg-surface border border-border p-6 shadow-sm">
                <p className="text-sm text-text-muted">
                  <span className="text-text font-medium">Languages: </span>
                  {education.languages}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
