import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { focusRing } from "./ui/focus";
import { profile, contactSection } from "../data/content";
// LEGACY — only the form copy still comes from siteData until the form rebuild (step 12).
import { siteData } from "../data/siteData";
import useContactForm from "../hooks/useContactForm";

const cardBase = `flex items-center rounded-2xl border border-border bg-surface text-text transition-colors hover:border-primary/40 hover:bg-purple-soft ${focusRing}`;

export default function Contact() {
  const form = siteData.contact.form;
  const { status, message, submit, reset } = useContactForm();
  const formRef = useRef(null);

  // ---- Form behaviour: unchanged (rebuilt in step 12) ----
  async function handleSubmit(e) {
    e.preventDefault();
    const el = formRef.current;
    const formData = new FormData(el);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    };
    const ok = await submit(payload);
    if (ok) el.reset();
  }

  const fieldClass =
    "peer w-full rounded-xl border border-border bg-bg px-4 pt-5 pb-2 text-text placeholder-transparent transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 dark:focus:border-primary-tx dark:focus:ring-primary-tx/25";
  const labelClass =
    "pointer-events-none absolute start-4 top-3.5 text-sm text-muted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary-tx peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-bg-2 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1264px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,513px)_minmax(0,1fr)] lg:gap-12 lg:px-8">
        {/* Left: heading + channel cards (first on mobile) */}
        <Reveal className="min-w-0">
          <SectionHeading id="contact-title" eyebrow={contactSection.eyebrow} title={contactSection.title} size="lg" />

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10">
            {/* WhatsApp — the number is only in the link, never shown */}
            <li className="col-span-2">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex min-h-20 items-center gap-4 rounded-2xl bg-teal px-5 py-4 text-white shadow-[0_14px_30px_-14px_rgba(0,160,157,0.7)] transition-[filter] hover:brightness-95 ${focusRing}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20" aria-hidden="true">
                  <MessageCircle size={22} />
                </span>
                {/* 19px bold = WCAG "large text", so white on #00A09D passes contrast */}
                <span className="flex-1 text-[19px] font-bold">{contactSection.whatsapp}</span>
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>

            {/* Email */}
            <li className="col-span-2">
              <a href={`mailto:${profile.email}`} className={`${cardBase} min-h-20 gap-4 px-5 py-4`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-soft text-primary-tx" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[17px] font-semibold">{contactSection.email}</span>
                  <span className="block text-[15px] text-muted [overflow-wrap:anywhere]">{profile.email}</span>
                </span>
              </a>
            </li>

            {/* LinkedIn + GitHub — side by side at every width */}
            {[
              { href: profile.linkedin, label: contactSection.linkedin, Icon: Linkedin },
              { href: profile.github, label: contactSection.github, Icon: Github },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardBase} min-h-[52px] gap-2.5 px-4 py-3 sm:gap-3 sm:px-5`}
                >
                  <Icon size={20} aria-hidden="true" className="shrink-0" />
                  <span className="text-base font-semibold sm:text-[17px]">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: existing form — same fields and behaviour, new colours only */}
        <Reveal delay={0.1} className="min-w-0 lg:pt-2">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_60px_-28px_rgba(31,41,55,0.25)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)] sm:p-8"
          >
            <div className="relative">
              <input name="name" type="text" required placeholder=" " className={fieldClass} />
              <label className={labelClass}>{form.namePlaceholder}</label>
            </div>
            <div className="relative">
              <input name="email" type="email" required placeholder=" " className={fieldClass} />
              <label className={labelClass}>{form.emailPlaceholder}</label>
            </div>
            <div className="relative">
              <textarea name="message" required rows={5} placeholder=" " className={`${fieldClass} resize-none`} />
              <label className={labelClass}>{form.messagePlaceholder}</label>
            </div>
            {/* honeypot */}
            <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(113,75,103,0.6)] transition-colors hover:bg-primary-hover disabled:opacity-60 ${focusRing}`}
            >
              {status === "sending" ? form.sending : form.submit}
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-teal-tx">
                  {message || form.success}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-700 dark:text-red-400">
                  {message || form.error}
                </motion.p>
              )}
            </AnimatePresence>
            {status === "success" && (
              <button type="button" onClick={reset} className={`rounded text-sm text-muted underline ${focusRing}`}>
                Send another
              </button>
            )}
          </motion.form>
        </Reveal>
      </div>
    </section>
  );
}
