// Small 22×15 country flags drawn with SVG (no emoji, no external images).
// Decorative: the country name is always shown as text next to it.
const FLAGS = {
  // Egypt: red / white / black horizontal stripes
  EG: (
    <>
      <rect width="22" height="5" y="0" fill="#CE1126" />
      <rect width="22" height="5" y="5" fill="#FFFFFF" />
      <rect width="22" height="5" y="10" fill="#000000" />
    </>
  ),
  // Saudi Arabia: green field with a simplified white bar
  SA: (
    <>
      <rect width="22" height="15" fill="#006C35" />
      <rect x="6" y="6.5" width="10" height="2" rx="1" fill="#FFFFFF" />
    </>
  ),
};

export default function Flag({ code, className = "" }) {
  const shapes = FLAGS[code];
  if (!shapes) return null;
  return (
    <svg
      viewBox="0 0 22 15"
      width="22"
      height="15"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 dark:ring-white/15 ${className}`}
    >
      {shapes}
    </svg>
  );
}
