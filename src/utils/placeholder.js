// Builds an SVG data-URI so the offline fallback catalogue still shows images.
const PALETTES = [
  ["#6366f1", "#8b5cf6"],
  ["#0ea5e9", "#22d3ee"],
  ["#f97316", "#facc15"],
  ["#10b981", "#84cc16"],
  ["#ec4899", "#f43f5e"],
  ["#14b8a6", "#3b82f6"],
];

export const buildPlaceholder = (label, seed = 0, variant = 0) => {
  const [from, to] = PALETTES[(seed + variant) % PALETTES.length];
  const safeLabel = String(label).replace(/[<>&"]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>
<rect width="600" height="600" fill="url(#g)"/>
<circle cx="${150 + variant * 120}" cy="${160 + variant * 40}" r="${90 + variant * 15}" fill="rgba(255,255,255,0.18)"/>
<circle cx="${470 - variant * 60}" cy="470" r="130" fill="rgba(255,255,255,0.14)"/>
<text x="300" y="315" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#fff" text-anchor="middle">${safeLabel}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
