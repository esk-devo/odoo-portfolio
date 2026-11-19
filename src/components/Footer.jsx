import React from "react";
import { siteData } from "../data/siteData";

export default function Footer() {
  const { footer, person } = siteData;
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#1B1B3A] py-10 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-display font-bold text-white/[0.04] leading-none select-none"
        style={{ fontSize: "clamp(80px, 18vw, 220px)" }}
      >
        {person.name.split(" ")[0].toUpperCase()}
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
        <div>{footer.copyright.replace("Shady Elagamy", person.name)}</div>
        <div className="text-white/50">
          Built by{" "}
          <a
            href="https://eskdev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            eskdev
          </a>
        </div>
      </div>
    </footer>
  );
}
