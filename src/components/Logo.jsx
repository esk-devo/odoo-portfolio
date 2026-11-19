// "Node network" mark — geometry copied exactly from docs/design/shady-logo-*.svg.
// Colors come from theme tokens, so it switches automatically in dark mode.
// The node at (29,82) is the gold accent (one of the 3 allowed gold places).
const SPOKES = [
  [50, 16],
  [16, 41],
  [84, 41],
  [29, 82],
  [71, 82],
];

export default function Logo({ size = 32, className = "", title }) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {labelled && <title>{title}</title>}
      <g stroke="var(--logo-line)" strokeWidth="5" strokeLinecap="round">
        {SPOKES.map(([x, y]) => (
          <line key={`${x}-${y}`} x1="50" y1="52" x2={x} y2={y} />
        ))}
      </g>
      <g fill="var(--logo-node)">
        <circle cx="50" cy="52" r="15" />
        <circle cx="50" cy="16" r="8" />
        <circle cx="16" cy="41" r="8" />
        <circle cx="84" cy="41" r="8" />
        <circle cx="71" cy="82" r="8" />
      </g>
      <circle cx="29" cy="82" r="8" className="fill-accent-gold" />
    </svg>
  );
}
