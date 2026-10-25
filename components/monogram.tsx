/** "GM" monogram. Drawn in currentColor, so it has a light and a dark variant for free. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="currentColor" />
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-inter-tight), system-ui, sans-serif"
        fontWeight="650"
        fontSize="16"
        letterSpacing="-0.8"
        fill="var(--bg)"
      >
        GM
      </text>
    </svg>
  );
}
