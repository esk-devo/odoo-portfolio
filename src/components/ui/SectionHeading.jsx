// Eyebrow ("01 — About me") + H2, shared by every redesigned section.
export default function SectionHeading({ id, eyebrow, title, align = "left", className = "" }) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-teal-tx sm:text-sm">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 font-display text-[clamp(30px,4.2vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] text-text"
      >
        {title}
      </h2>
    </div>
  );
}
