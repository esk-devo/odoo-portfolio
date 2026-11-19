import { ArrowRight, Github } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import PortraitOrbit from "./ui/PortraitOrbit";
import { focusRing } from "./ui/focus";
import { profile, about } from "../data/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip bg-bg-2 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1264px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-20 lg:px-8">
        {/* Photo: on top on mobile/tablet, left on desktop */}
        <Reveal className="px-2 pt-6 sm:px-0 lg:pt-0">
          <PortraitOrbit />
        </Reveal>

        {/* Text */}
        <Reveal delay={0.1} className="min-w-0">
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} className="max-w-[580px]" />

          <p className="mt-6 max-w-[600px] text-base leading-[1.75] text-muted sm:text-[17px]">{about.text}</p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {about.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[15px] text-text">
                {tag}
              </li>
            ))}
          </ul>

          <dl className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
            {[about.education, about.languages].map((row) => (
              <div key={row.label}>
                <dt className="text-sm text-subtle">{row.label}</dt>
                <dd className="mt-1 text-base font-semibold text-text">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className={`inline-flex h-[52px] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover ${focusRing}`}
            >
              {about.ctaPrimary}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-[52px] items-center gap-2 rounded-xl border border-border bg-surface px-6 text-base font-semibold text-text transition-colors hover:bg-purple-soft ${focusRing}`}
            >
              <Github size={18} aria-hidden="true" />
              {about.ctaGithub}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
