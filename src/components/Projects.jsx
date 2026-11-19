import { Wrench, Truck, HeartPulse, UtensilsCrossed, Building2, ArrowUpRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";
import Flag from "./ui/Flag";
import { focusRing } from "./ui/focus";
import { projectsSection, projects, countries } from "../data/content";

const ICONS = {
  wrench: Wrench,
  truck: Truck,
  "heart-pulse": HeartPulse,
  utensils: UtensilsCrossed,
  building: Building2,
};
const TONES = ["bg-purple-soft text-primary-tx", "bg-teal-soft text-teal-tx"];

// 5 projects + 1 CTA card = 6 → 3×2 desktop, 2×3 tablet, 1 column mobile (always even).
export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-bg py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow={projectsSection.eyebrow}
            title={projectsSection.title}
            className="max-w-[600px]"
          />
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <li key={p.name}>
                <Reveal delay={(i % 3) * 0.08} y={18} className="h-full">
                  <TiltCard
                    as="article"
                    className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${TONES[i % 2]}`}
                      >
                        <Icon size={22} />
                      </span>
                      <span className="flex items-center gap-2 pt-1 text-[15px] text-subtle">
                        <Flag code={p.country} />
                        {countries[p.country]}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-text">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-base text-muted">{p.industry}</p>

                    {/* mt-auto pushes the pills to the bottom so they line up across a row */}
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${p.name} — Odoo modules`}>
                      {p.modules.map((m) => (
                        <li key={m} className="rounded-lg bg-bg-2 px-2.5 py-1 text-[13px] font-semibold text-muted">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}

          {/* CTA card */}
          <li>
            <Reveal delay={0.16} y={18} className="h-full">
              <TiltCard
                as="a"
                href="#contact"
                className={`group flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-dashed border-primary bg-purple-soft p-6 sm:p-7 dark:border-primary-tx ${focusRing}`}
              >
                <p className="max-w-[220px] font-display text-[22px] font-semibold leading-snug tracking-[-0.02em] text-text">
                  {projectsSection.ctaTitle}
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-base font-semibold text-primary-tx">
                  {projectsSection.ctaLink}
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </TiltCard>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
