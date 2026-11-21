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
    // UAE: green / white / black stripes, red band on the hoist side
  AE: (
    <>
      <rect width="22" height="5" y="0" fill="#00732F" />
      <rect width="22" height="5" y="5" fill="#FFFFFF" />
      <rect width="22" height="5" y="10" fill="#000000" />
      <rect width="5.5" height="15" fill="#FF0000" />
    </>
  ),
  // Qatar: white / maroon (simplified, no serrated edge)
  QA: (
    <>
      <rect width="6.5" height="15" fill="#FFFFFF" />
      <rect x="6.5" width="15.5" height="15" fill="#8A1538" />
    </>
  ),
  // Kuwait: green / white / red stripes, black band on the hoist side
  KW: (
    <>
      <rect width="22" height="5" y="0" fill="#007A3D" />
      <rect width="22" height="5" y="5" fill="#FFFFFF" />
      <rect width="22" height="5" y="10" fill="#CE1126" />
      <rect width="5.5" height="15" fill="#000000" />
    </>
  ),
  // Bahrain: red field, white band on the hoist side
  BH: (
    <>
      <rect width="22" height="15" fill="#CE1126" />
      <rect width="5.5" height="15" fill="#FFFFFF" />
    </>
  ),
  // Oman: white / red / green stripes, red band on the hoist side
  OM: (
    <>
      <rect width="22" height="5" y="0" fill="#FFFFFF" />
      <rect width="22" height="5" y="5" fill="#DB161B" />
      <rect width="22" height="5" y="10" fill="#008000" />
      <rect width="5.5" height="15" fill="#DB161B" />
    </>
  ),
  // Jordan: black / white / green stripes, red triangle on the hoist side
  JO: (
    <>
      <rect width="22" height="5" y="0" fill="#000000" />
      <rect width="22" height="5" y="5" fill="#FFFFFF" />
      <rect width="22" height="5" y="10" fill="#007A3D" />
      <polygon points="0,0 8,7.5 0,15" fill="#CE1126" />
    </>
  ),
  // Iraq: red / white / black stripes, green hint
  IQ: (
    <>
      <rect width="22" height="5" y="0" fill="#CE1126" />
      <rect width="22" height="5" y="5" fill="#FFFFFF" />
      <rect width="22" height="5" y="10" fill="#000000" />
      <rect width="4" height="5" y="5" fill="#007A3D" />
    </>
  ),
  // Yemen: red / white / black stripes
  YE: (
    <>
      <rect width="22" height="5" y="0" fill="#CE1126" />
      <rect width="22" height="5" y="5" fill="#FFFFFF" />
      <rect width="22" height="5" y="10" fill="#000000" />
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
