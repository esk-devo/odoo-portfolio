import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Linkedin,
  Github,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { focusRing } from "./ui/focus";
import { profile, contactSection, contactForm } from "../data/content";
import useContactForm from "../hooks/useContactForm";

const cardBase = `flex items-center rounded-2xl border border-border bg-surface text-text transition-colors hover:border-primary/40 hover:bg-purple-soft ${focusRing}`;

// Shared look of the form card and the success card (light + dark).
const formCard =
  "rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_60px_-28px_rgba(31,41,55,0.25)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)] sm:p-8";

const buttonClass = `rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(113,75,103,0.6)] transition-colors hover:bg-primary-hover disabled:opacity-60 ${focusRing}`;

export default function Contact() {
  const form = contactForm;
  const { status, message, submit, reset } = useContactForm();
  const formRef = useRef(null);
  // Time the form appeared; humans need more than 3s to fill it.
  const mountedAt = useRef(Date.now());
  // Form height at submit, so the success card keeps the same height (no layout jump).
  const [cardHeight, setCardHeight] = useState(null);
  // Name + email captured at submit (the form is unmounted after the flip).
  const [sent, setSent] = useState({ name: "", email: "" });
  // True only when flipping back from the success card, to focus the first field.
  const returning = useRef(false);
  // The check badge ("send another") becomes active 2s after a success.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status !== "success") {
      setReady(false);
      return;
    }
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, [status]);

  // One face at a time: out 0 -> 90, in -90 -> 0. Reduced motion = fade only.
  const reduceMotion = useReducedMotion();
  const flip = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { rotateY: -90 },
        animate: { rotateY: 0 },
        exit: { rotateY: 90 },
        transition: { duration: 0.22, ease: "easeOut" },
      };

  // Stable callback refs run once on mount, so focus moves only when a face appears.
  const focusOnMount = useCallback(
    (el) => el?.focus({ preventScroll: true }),
    [],
  );
  const setFormRef = useCallback((el) => {
    formRef.current = el;
    if (el && returning.current) {
      returning.current = false;
      el.querySelector(`#${contactForm.fields[0].id}`)?.focus({
        preventScroll: true,
      });
    }
  }, []);

  function handleSendAnother() {
    returning.current = true;
    setCardHeight(null);
    reset();
  }

  const firstName = sent.name.trim().split(/\s+/)[0];
  const successTitle = firstName
    ? form.successTitle.replace("{name}", firstName)
    : form.success;

  // ---- Form behaviour: unchanged (rebuilt in step 12) ----
  async function handleSubmit(e) {
    e.preventDefault();
    const el = formRef.current;
    const formData = new FormData(el);
    const tooFast = Date.now() - mountedAt.current < 3000;
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      // Too fast = bot: reuse the honeypot path (fake success, nothing sent).
      botcheck: tooFast ? "too-fast" : formData.get("website"),
    };
    setCardHeight(el.offsetHeight);
    setSent({ name: payload.name || "", email: payload.email || "" });
    // On success the form unmounts and comes back empty, so no el.reset() needed.
    await submit(payload);
  }

  // Static label above each field (linked with htmlFor/id); placeholder stays as a hint.
  const fieldClass =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-text placeholder:text-subtle transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 dark:focus:border-primary-tx dark:focus:ring-primary-tx/25";
  const labelClass = "mb-2 block text-[15px] font-semibold text-text";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-bg-2 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1264px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,513px)_minmax(0,1fr)] lg:gap-12 lg:px-8">
        {/* Left: heading + channel cards (first on mobile) */}
        {/* lg: heading at the top, cards at the bottom, lined up with the form */}
        <Reveal className="min-w-0 lg:flex lg:flex-col lg:justify-between">
          <SectionHeading
            id="contact-title"
            eyebrow={contactSection.eyebrow}
            title={contactSection.title}
            size="lg"
          />

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10">
            {/* WhatsApp — the number is only in the link, never shown */}
            <li className="col-span-2">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex min-h-20 items-center gap-4 rounded-2xl bg-teal px-5 py-4 text-white shadow-[0_14px_30px_-14px_rgba(0,160,157,0.7)] transition-[filter] hover:brightness-95 ${focusRing}`}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20"
                  aria-hidden="true"
                >
                  <MessageCircle size={22} />
                </span>
                {/* 19px bold = WCAG "large text", so white on #00A09D passes contrast */}
                <span className="flex-1 text-[19px] font-bold">
                  {contactSection.whatsapp}
                </span>
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>

            {/* Email */}
            <li className="col-span-2">
              <a
                href={`mailto:${profile.email}`}
                className={`${cardBase} min-h-20 gap-4 px-5 py-4`}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-soft text-primary-tx"
                  aria-hidden="true"
                >
                  <Mail size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[17px] font-semibold">
                    {contactSection.email}
                  </span>
                  <span className="block text-[15px] text-muted [overflow-wrap:anywhere]">
                    {profile.email}
                  </span>
                </span>
              </a>
            </li>

            {/* LinkedIn + GitHub — side by side at every width */}
            {[
              {
                href: profile.linkedin,
                label: contactSection.linkedin,
                Icon: Linkedin,
              },
              {
                href: profile.github,
                label: contactSection.github,
                Icon: Github,
              },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardBase} min-h-[52px] gap-2.5 px-4 py-3 sm:gap-3 sm:px-5`}
                >
                  <Icon size={20} aria-hidden="true" className="shrink-0" />
                  <span className="text-base font-semibold sm:text-[17px]">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: existing form — same fields and behaviour, new colours only */}
        <Reveal delay={0.1} className="min-w-0 lg:h-full">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                {...flip}
                style={{
                  transformPerspective: 1200,
                  minHeight: cardHeight ?? undefined,
                }}
                className={`${formCard} flex flex-col items-center justify-center text-center lg:h-full`}
              >
                {/* The check badge is the "send another message" button (active after 2s). */}
                <motion.button
                  type="button"
                  onClick={handleSendAnother}
                  disabled={!ready}
                  aria-label={form.sendAnother}
                  title={form.sendAnother}
                  whileHover={
                    ready && !reduceMotion ? { scale: 1.06 } : undefined
                  }
                  whileTap={
                    ready && !reduceMotion ? { scale: 0.94 } : undefined
                  }
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full ${ready ? "cursor-pointer" : "cursor-default"} ${focusRing}`}
                >
                  {/* Soft ring: 3 pulses once ready, then stops */}
                  {ready && !reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full border border-teal"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: 2, ease: "easeOut" }}
                    />
                  )}
                  <motion.span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center rounded-full bg-teal-soft text-teal-tx"
                    animate={
                      ready && !reduceMotion
                        ? { scale: [1, 1.08, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: ready && !reduceMotion ? 2 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <CheckCircle2 size={28} />
                  </motion.span>
                </motion.button>
                <h3
                  ref={focusOnMount}
                  tabIndex={-1}
                  className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-text focus:outline-none sm:text-2xl"
                >
                  {successTitle}
                </h3>
                {sent.email && (
                  <p className="mt-3 max-w-md text-base text-muted [overflow-wrap:anywhere]">
                    {form.successText.replace("{email}", sent.email)}
                  </p>
                )}
                {ready && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-base text-muted"
                  >
                    {form.sendAnotherHint}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={setFormRef}
                onSubmit={handleSubmit}
                {...flip}
                style={{ transformPerspective: 1200 }}
                className={`flex flex-col gap-5 ${formCard} lg:h-full`}
              >
                {/* Short fields side by side from sm; Message spans both and grows on lg */}
                <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-rows-[auto_auto_1fr]">
                  {contactForm.fields.map((f) => (
                    <div
                      key={f.name}
                      className={
                        f.type === "textarea"
                          ? "flex flex-col sm:col-span-2"
                          : undefined
                      }
                    >
                      <label htmlFor={f.id} className={labelClass}>
                        {f.label}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea
                          id={f.id}
                          name={f.name}
                          required={f.required}
                          rows={5}
                          placeholder={f.placeholder}
                          className={`${fieldClass} min-h-32 flex-1 resize-none`}
                        />
                      ) : (
                        <input
                          id={f.id}
                          name={f.name}
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          autoComplete={f.autoComplete}
                          inputMode={f.inputMode}
                          className={fieldClass}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {/* honeypot */}
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full ${buttonClass}`}
                >
                  {status === "sending" ? form.sending : form.submit}
                </button>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-700 dark:text-red-400"
                    >
                      {message || form.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
