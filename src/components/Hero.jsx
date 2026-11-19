import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, MapPin } from "lucide-react";
import { siteData } from "../data/siteData";
import MagneticButton from "./ui/MagneticButton";

const ROTATOR_WORDS = ["Implementation", "Training", "Support"];

export default function Hero() {
  const { person, hero, links } = siteData;
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const decoRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  const portraitModules = import.meta.glob("../assets/shady.png", { eager: true });
  const portraitSrc =
    portraitModules["../assets/shady.png"]?.default ||
    (typeof person.avatar === "string" && person.avatar ? person.avatar : "");

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATOR_WORDS.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const hero = heroRef.current;
    const deco = decoRef.current;
    if (!hero || !deco) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (reduce) return;

    let raf = 0;
    let mx = 0;
    let my = 0;
    let sy = 0;

    const update = () => {
      deco.style.transform = `translate3d(${mx * 12}px, ${my * 12 + sy * 0.15}px, 0)`;
      raf = 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onMouseMove = (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      schedule();
    };
    const onScroll = () => {
      sy = window.scrollY;
      schedule();
    };

    hero.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const chips = ["Accounting", "ERP Implementation", "Go-live support"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="scroll-mt-24 relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24"
    >
      <div
        ref={decoRef}
        aria-hidden="true"
        className="pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block outline-text font-display font-bold leading-none select-none"
        style={{ fontSize: "clamp(140px, 20vw, 280px)", opacity: 0.1 }}
      >
        ODOO
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {person.openToWork && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-text/5 px-3 py-1 text-xs font-medium text-text-muted backdrop-blur">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                </span>
                {hero.badge}
              </span>
            )}

            <h1 className="mt-6 font-display font-bold tracking-tight text-text" style={{ fontSize: "clamp(40px, 7vw, 88px)", lineHeight: 1.02 }}>
              {hero.title}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-text-muted">{hero.subtitle}</p>

            <p className="mt-5 text-text-muted max-w-xl leading-relaxed">
              {hero.oneLiner.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-text font-medium">{reduce ? ROTATOR_WORDS[0] : ROTATOR_WORDS[wordIndex]}</span>
              {!reduce && <span className="text-gold">.</span>}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
              <MapPin size={16} />
              <span>{person.location}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href={links.cv}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition"
              >
                <Download size={18} />
                {hero.ctaPrimary}
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-text/5 backdrop-blur px-5 py-3 font-medium text-text hover:bg-text/10 transition"
              >
                <Mail size={18} />
                {hero.ctaSecondary}
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute inset-0 m-auto w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-gold/20 to-accent/30 blur-3xl" />
            <div className="relative w-56 sm:w-72" style={{ aspectRatio: "4 / 5" }}>
              {chips.map((c, i) => (
                <motion.span
                  key={c}
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  className="absolute z-20 rounded-full border border-border bg-text/10 backdrop-blur px-3 py-1 text-xs text-text shadow-lg"
                  style={{
                    top: i === 0 ? "-6%" : i === 1 ? "92%" : "46%",
                    [i === 1 ? "insetInlineStart" : "insetInlineEnd"]: i === 1 ? "-4%" : "-6%",
                  }}
                >
                  {c}
                </motion.span>
              ))}

              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-surface to-surface-2 shadow-2xl shadow-gold/20 flex items-end justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent" />
                {portraitSrc ? (
                  <img
                    src={portraitSrc}
                    alt={person.name}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-contain object-bottom"
                  />
                ) : (
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <span className="font-display font-bold text-6xl text-gold/70">{person.initials}</span>
                  </div>
                )}
              </div>
              {/* glow behind frame */}
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-gold/20 to-accent/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
