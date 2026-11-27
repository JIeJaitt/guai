export function Cover() {
  return (
    <svg viewBox="0 0 800 280" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd4ef" />
          <stop offset="0.55" stopColor="#d7f3fb" />
          <stop offset="1" stopColor="#e7f8e4" />
        </linearGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9ed68a" />
          <stop offset="1" stopColor="#63b56c" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#sky)" />
      <circle cx="610" cy="78" r="28" fill="#ffe7a8" />
      <ellipse cx="150" cy="70" rx="46" ry="18" fill="#fff" opacity="0.9" />
      <ellipse cx="188" cy="74" rx="28" ry="14" fill="#fff" opacity="0.9" />
      <ellipse cx="430" cy="54" rx="36" ry="14" fill="#fff" opacity="0.85" />
      <path d="M0 190 C140 150 220 210 360 176 C500 142 620 200 800 160 L800 280 L0 280 Z" fill="url(#hill)" />
      <path d="M0 230 C180 200 300 250 520 214 C640 196 720 230 800 210 L800 280 L0 280 Z" fill="#57a864" />
      <path d="M250 168 L278 118" stroke="#f4f7fb" strokeWidth="1.4" />
      <polygon points="278,118 304,104 292,132" fill="#f28b82" />
      <polygon points="278,118 292,132 262,128" fill="#f7c4be" />
      <path d="M278 118 C286 132 274 146 282 160" fill="none" stroke="#f4f7fb" strokeWidth="1.2" />
    </svg>
  )
}
