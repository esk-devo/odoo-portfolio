import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { siteData } from "../data/siteData";
import useContactForm from "../hooks/useContactForm";

export default function Contact() {
  const { contact, links } = siteData;
  const { status, message, submit, reset } = useContactForm();
  const formRef = useRef(null);

  const channels = contact.channels.map((c) => {
    let href = c.href;
    if (c.label === "Email") href = links.email;
    if (c.label === "LinkedIn") href = links.linkedin;
    if (c.label === "WhatsApp") href = links.whatsapp;
    return { ...c, href };
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    };
    const ok = await submit(payload);
    if (ok) form.reset();
  }

  const fieldClass =
    "peer w-full rounded-xl border border-border bg-surface/60 px-4 pt-5 pb-2 text-text placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary-soft/40 focus:border-primary-soft/40 transition";

  return (
    <section id="contact" className="scroll-mt-24 py-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">{contact.title}</h2>
            <p className="mt-2 text-text-muted">{contact.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Reveal>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 shadow-xl shadow-black/30 space-y-5"
            >
              {/* name */}
              <div className="relative">
                <input name="name" type="text" required placeholder=" " className={fieldClass} />
                <label className="pointer-events-none absolute start-4 top-3.5 text-text-muted text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  {contact.form.namePlaceholder}
                </label>
              </div>
              {/* email */}
              <div className="relative">
                <input name="email" type="email" required placeholder=" " className={fieldClass} />
                <label className="pointer-events-none absolute start-4 top-3.5 text-text-muted text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  {contact.form.emailPlaceholder}
                </label>
              </div>
              {/* message */}
              <div className="relative">
                <textarea name="message" required rows={5} placeholder=" " className={fieldClass + " resize-none"} />
                <label className="pointer-events-none absolute start-4 top-3.5 text-text-muted text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  {contact.form.messagePlaceholder}
                </label>
              </div>
              {/* honeypot */}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-primary px-5 py-3 font-medium text-white shadow-lg shadow-primary/30 hover:shadow-primary-soft/40 transition disabled:opacity-60"
              >
                {status === "sending" ? contact.form.sending : contact.form.submit}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-accent"
                  >
                    {message || contact.form.success}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-400"
                  >
                    {message || contact.form.error}
                  </motion.p>
                )}
              </AnimatePresence>
              {status === "success" && (
                <button type="button" onClick={reset} className="text-xs text-text-muted underline">
                  Send another
                </button>
              )}
            </motion.form>
          </Reveal>

          {/* Channels */}
          <div className="flex flex-col gap-4 justify-center">
            {channels.map((c, i) => {
              const Icon = Icons[c.icon] || Icons.Circle;
              return (
                <Reveal key={c.label} delay={i * 0.08}>
                  <TiltCard className="rounded-2xl bg-surface border border-border p-5 shadow-sm flex items-center gap-4">
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 w-full"
                    >
                      <div className="w-11 h-11 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className="font-medium text-text">{c.label}</span>
                    </a>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
