import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { experienceSection, experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-bg py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[884px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="experience-title" eyebrow={experienceSection.eyebrow} title={experienceSection.title} />
        </Reveal>

        <ol className="relative mt-10 sm:mt-12">
          {/* Vertical line */}
          <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-border" />

          {experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="relative pb-7 pl-9 last:pb-0 sm:pb-9 sm:pl-10">
              {/* Dot (outside Reveal so it stays on the line) */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full ${
                  job.current ? "bg-teal ring-[5px] ring-teal-soft" : "bg-primary"
                }`}
              />
              <Reveal delay={i * 0.08} y={16}>
                <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-lg font-semibold tracking-[-0.02em] text-text sm:text-xl">
                  <span>
                    {job.role} — {job.company}
                  </span>
                  {job.current && (
                    <span className="rounded-full bg-teal-soft px-2.5 py-0.5 font-sans text-[13px] font-semibold tracking-normal text-teal-tx">
                      {experienceSection.currentLabel}
                    </span>
                  )}
                </h3>
                <p className="mt-2 max-w-[700px] text-base leading-relaxed text-muted">{job.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
