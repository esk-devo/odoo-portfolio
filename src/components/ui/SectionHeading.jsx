// Eyebrow ("01 — About me") + H2, shared by every redesigned section.
// `size="lg"` = the bigger Contact title.
export default function SectionHeading({ id, eyebrow, title, align = "left", size = "md", className = "" }) {
  const titleSize = size === "lg" ? "text-[clamp(32px,4.4vw,48px)] leading-[1.08]" : "text-[clamp(30px,4.2vw,44px)] leading-[1.1]";
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-teal-tx sm:text-sm">{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 font-display font-bold tracking-[-0.03em] text-text ${titleSize}`}
      >
        {title}
      </h2>
    </div>
  );
}
