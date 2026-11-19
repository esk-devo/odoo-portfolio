import React from "react";
import { Car, Truck, Stethoscope, Utensils, Package, Briefcase } from "lucide-react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { siteData } from "../data/siteData";

const Icons = { Car, Truck, Stethoscope, Utensils, Package, Briefcase };

const industryIcon = (industry) => {
  const t = (industry || "").toLowerCase();
  if (t.includes("auto")) return "Car";
  if (t.includes("logistic") || t.includes("shipping")) return "Truck";
  if (t.includes("medical") || t.includes("veterinary")) return "Stethoscope";
  if (t.includes("food") || t.includes("restaurant")) return "Utensils";
  if (t.includes("trade") || t.includes("import")) return "Package";
  return "Briefcase";
};

export default function Cases() {
  const { projects, showClientNames } = siteData;
  return (
    <section id="cases" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{projects.title}</h2>
            <p className="mt-2 text-text-muted">{projects.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.items.map((p, i) => {
            const Icon = Icons[industryIcon(p.industry)] || Icons.Briefcase;
            return (
              <Reveal key={p.name} delay={i * 0.08}>
                <TiltCard className="rounded-2xl bg-surface border border-border p-6 shadow-lg shadow-black/30 h-full flex flex-col">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      {showClientNames && <h3 className="font-display font-semibold text-text">{p.name}</h3>}
                      {!showClientNames && <h3 className="font-display font-semibold text-text">Client project</h3>}
                      <p className="text-xs text-text-muted mt-0.5">
                        {p.industry}
                        {p.country ? ` · ${p.country}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.modules.map((m) => (
                      <span key={m} className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                        {m}
                      </span>
                    ))}
                  </div>

                  {p.role && <p className="mt-3 text-sm text-text-muted">{p.role}</p>}
                  {!p.role && (
                    <p className="mt-3 text-sm text-text-muted/60 italic">Details coming soon</p>
                  )}
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
