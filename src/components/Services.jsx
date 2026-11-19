import React from "react";
import { motion } from "framer-motion";
import { Settings, Sliders, FileText, GraduationCap, LifeBuoy, Circle } from "lucide-react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { siteData } from "../data/siteData";

// Named imports only (importing all of lucide made the bundle ~1 MB).
const Icons = { Settings, Sliders, FileText, GraduationCap, LifeBuoy, Circle };

export default function Services() {
  const { services } = siteData;
  return (
    <section id="services" className="scroll-mt-24 py-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{services.title}</h2>
            <p className="mt-2 text-text-muted">{services.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.Circle;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <TiltCard className="rounded-2xl bg-surface border border-border p-6 shadow-lg shadow-black/30 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.description}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
