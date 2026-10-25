/** Line-art of me at a laptop. Pure-CSS loops: lamp sway and chai steam, plus a blink every 6s. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="Line drawing of Gokul working at a laptop, with a desk lamp and a cup of chai"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* wall frame */}
      <g className="text-ink-faint">
        <rect x="372" y="44" width="96" height="70" rx="8" />
        <path d="M384 102 L408 78 L422 90 L438 72 L456 102" />
      </g>
      <circle cx="444" cy="62" r="5" className="text-accent" />

      {/* desk */}
      <path d="M36 314 H484" />
      <path d="M68 314 V392 M452 314 V392" className="text-ink-faint" />

      {/* lamp */}
      <path d="M80 314 Q80 304 102 304 Q124 304 124 314" />
      <path d="M102 304 L86 236 L132 192" />
      <circle cx="86" cy="236" r="3.5" fill="var(--card)" />
      <g className="anim-sway" style={{ transformOrigin: "132px 192px" }}>
        <defs>
          <linearGradient id="lamp-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M164 218 L262 314 H150 Z" fill="url(#lamp-light)" stroke="none" />
        <path d="M124 200 L146 178 L178 208 L154 228 Z" fill="var(--card)" />
        <circle cx="132" cy="192" r="3.5" fill="var(--card)" />
      </g>


      {/* me */}
      <path d="M186 272 C188 228 214 202 252 196 M268 196 C306 202 332 228 334 272" />
      <path d="M252 196 L260 208 L268 196" />
      <path d="M253 184 V196 M267 184 V196" />
      <circle cx="260" cy="150" r="34" fill="var(--card)" />
      <path d="M226 150 C224 112 252 104 268 108 C290 112 300 130 294 150 C288 134 276 126 262 128 C248 130 236 136 226 150 Z" fill="var(--card)" />
      <path d="M244 116 C252 120 256 126 258 128 M266 112 C272 118 276 124 278 130" className="text-ink-faint" strokeWidth={1.6} />
      <path d="M226 152 Q220 156 226 164 M294 152 Q300 156 294 164" />
      <circle cx="247" cy="155" r="9" />
      <circle cx="273" cy="155" r="9" />
      <path d="M256 155 H264" />
      <circle cx="247" cy="156" r="1.8" fill="currentColor" stroke="none" className="anim-blink" />
      <circle cx="273" cy="156" r="1.8" fill="currentColor" stroke="none" className="anim-blink" />
      <path d="M253 172 Q260 177 267 172" />

      {/* laptop */}
      <rect x="176" y="214" width="168" height="92" rx="8" fill="var(--card)" />
      <circle cx="260" cy="258" r="6" fill="var(--accent)" stroke="none" />
      <path d="M156 306 H364 Q366 314 358 314 H162 Q154 314 156 306 Z" fill="var(--card)" />

      {/* chai */}
      <g className="text-accent" strokeWidth={2}>
        <path className="anim-steam" style={{ ["--d" as string]: "0s" }} d="M400 266 C396 258 404 252 400 244" />
        <path className="anim-steam" style={{ ["--d" as string]: "1s" }} d="M408 264 C404 254 412 248 408 238" />
        <path className="anim-steam" style={{ ["--d" as string]: "2s" }} d="M416 266 C412 258 420 252 416 244" />
      </g>
      <path d="M392 276 L396 311 Q397 314 400 314 H416 Q419 314 420 311 L424 276 Z" fill="var(--card)" />
      <path d="M393.5 287 H422.5" className="text-accent" />
      <path d="M424 284 C437 284 437 302 421 302" />
      <path d="M380 314 H436" />
    </svg>
  );
}
