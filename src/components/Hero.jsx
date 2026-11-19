import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Github, Linkedin, Mail } from "lucide-react";
import DashboardCard from "./ui/DashboardCard";
import StatsBar from "./StatsBar";
import { focusRing } from "./ui/focus";
import { profile, hero, ui } from "../data/content";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const [firstName, ...lastName] = profile.name.split(" ");

  // Text items fade/slide up with a small stagger; the card fades in + scales from 0.96.
  const list = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.1 } },
  };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

  const socials = [
    { href: profile.github, label: ui.github, Icon: Github, external: true },
    { href: profile.linkedin, label: ui.linkedin, Icon: Linkedin, external: true },
    { href: `mailto:${profile.email}`, label: ui.email, Icon: Mail },
  ];

  return (
    <section id="top" className="relative isolate overflow-x-clip bg-bg pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-[150px]">
      {/* Light: 64px grid · Dark: gradient only (see .hero-bg in index.css) */}
      <div aria-hidden="true" className="hero-bg pointer-events-none absolute inset-0 -z-10" />

      {/* 1200px content width (as in the design) + side padding */}
      <div className="mx-auto max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_496px] lg:gap-12">
          {/* Left: text */}
          <motion.div variants={list} initial="hidden" animate="show" className="min-w-0">
            <motion.p
              variants={item}
              className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted sm:text-[15px]"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-teal ring-4 ring-teal-soft" aria-hidden="true" />
              {profile.availability}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 font-display font-bold tracking-[-0.035em] text-text"
              style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1.02 }}
            >
              {firstName}
              <br />
              {lastName.join(" ")}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 font-display text-[clamp(18px,2.2vw,24px)] font-medium tracking-[-0.02em] text-text"
            >
              {profile.role}
            </motion.p>

            <motion.p variants={item} className="mt-4 max-w-[540px] text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className={`inline-flex h-[52px] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-[0_10px_24px_-8px_rgba(113,75,103,0.55)] transition-colors hover:bg-primary-hover ${focusRing}`}
              >
                {hero.ctaPrimary}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-[52px] items-center gap-2 rounded-xl border border-border bg-surface px-6 text-base font-semibold text-text transition-colors hover:bg-purple-soft ${focusRing}`}
              >
                <MessageCircle size={18} className="text-teal" aria-hidden="true" />
                {hero.ctaWhatsapp}
              </a>
            </motion.div>

            <motion.ul variants={item} className="mt-6 flex gap-2.5">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/60 text-text transition-colors hover:bg-purple-soft ${focusRing}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: dashboard card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.2, ease: EASE }}
            className="min-w-0 lg:pr-4"
          >
            <DashboardCard />
          </motion.div>
        </div>

        <div className="mt-10 lg:mt-24">
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
