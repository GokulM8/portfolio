import { useId, type CSSProperties, type ReactNode } from "react";
import type { CoverId, Project } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Generative covers, drawn in code. Shared system: 4:3, theme tokens (light + dark), one accent,
 * a dot-grid texture and a mono label. Hover motion lives in globals.css (.cover-host:hover .cv-*),
 * runs only on hover-capable pointers, and is off under prefers-reduced-motion.
 */

const W = 400;
const H = 300;
const ink = "var(--ink)";
const accent = "var(--accent)";

/** Deterministic pseudo-random numbers, so covers render identically on server and client. */
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

/** Mono corner label for a project's cover. */
export const coverLabel = (p: Project) => (p.status === "in-progress" ? "In progress" : p.categories.join(" · "));

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function SafePulse({ uid }: { uid: string }) {
  // flat → heartbeat → a smooth risk curve that climbs to the top right
  const ecg = "M24 196 H92 L104 196 L112 172 L122 226 L134 128 L146 214 L156 196 H178";
  const risk = "M178 196 C222 196 238 188 262 168 C292 142 316 104 376 70";
  return (
    <>
      <defs>
        <mask id={`${uid}-draw`}>
          <rect className="cv-draw" x="0" y="0" width={W} height={H} fill="white" />
        </mask>
        <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.22" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${risk} V260 H178 Z`} fill={`url(#${uid}-area)`} />
      <path d="M24 260 H376" stroke={ink} strokeOpacity="0.18" />
      <g mask={`url(#${uid}-draw)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={ecg} stroke={ink} strokeWidth="2.5" />
        <path d={risk} stroke={accent} strokeWidth="3" />
      </g>
      <circle cx="376" cy="70" r="5" fill={accent} />
      <circle cx="376" cy="70" r="12" fill={accent} opacity="0.18" className="cv-pulse" />
    </>
  );
}

function RuralLink() {
  // dot-field "map": a soft landmass of dots, with 8 connected nodes on top
  const dots: ReactNode[] = [];
  for (let x = 20; x < W; x += 14)
    for (let y = 20; y < H; y += 14) {
      const dx = (x - 210) / 170;
      const dy = (y - 150) / 115;
      const inside = dx * dx + dy * dy + 0.25 * Math.sin(x / 31) * Math.cos(y / 23) < 1;
      if (inside) dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={ink} opacity="0.22" />);
    }
  const nodes: [number, number][] = [
    [96, 112], [150, 78], [214, 120], [282, 86], [318, 158], [250, 196], [168, 200], [118, 168],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [2, 5], [2, 6], [1, 7]];
  return (
    <>
      {dots}
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={ink} strokeOpacity="0.45" strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" fill={accent} opacity="0.16" className="cv-pulse" style={v({ "--i": i })} />
          <circle cx={x} cy={y} r="5" fill={i === 2 ? accent : "var(--surface)"} stroke={i === 2 ? accent : ink} strokeWidth="2" />
        </g>
      ))}
    </>
  );
}

function SmartPark() {
  // two rows of slots; filled ones are cars, one highlighted slot is free
  const filled = new Set([0, 1, 3, 6, 8, 9, 11]);
  const highlight = 4;
  const slots: ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const x = 40 + col * 54;
    const y = row === 0 ? 54 : 172;
    slots.push(
      <g key={i}>
        <rect x={x} y={y} width="46" height="74" rx="5" fill="none" stroke={ink} strokeOpacity="0.3" strokeWidth="1.5" />
        {filled.has(i) && <rect x={x + 9} y={y + 10} width="28" height="54" rx="8" fill={ink} opacity="0.75" />}
        {i === highlight && (
          <>
            <rect x={x} y={y} width="46" height="74" rx="5" fill={accent} opacity="0.16" className="cv-blink" />
            <rect x={x} y={y} width="46" height="74" rx="5" fill="none" stroke={accent} strokeWidth="2.5" />
            <rect x={x + 9} y={y + 10} width="28" height="54" rx="8" fill={accent} className="cv-park" />
          </>
        )}
      </g>,
    );
  }
  return (
    <>
      <path d="M24 150 H376" stroke={ink} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="10 10" />
      {slots}
    </>
  );
}

function ArchLens() {
  // layered dependency graph: modules in 4 layers, one highlighted dependency path
  const layers = [[200], [120, 280], [80, 170, 250, 330], [110, 200, 290]];
  const ys = [56, 120, 184, 248];
  const pos = layers.map((xs, l) => xs.map((x) => [x, ys[l]] as [number, number]));
  const edges: [number, number, number, number][] = [];
  for (let l = 0; l < pos.length - 1; l++)
    pos[l].forEach((_, a) => pos[l + 1].forEach((__, b) => (a + b + l) % 2 === 0 && edges.push([l, a, l + 1, b])));
  const hot = new Set(["0-0-1-0", "1-0-2-1", "2-1-3-1"]);
  return (
    <>
      {edges.map(([l1, a, l2, b]) => {
        const [x1, y1] = pos[l1][a];
        const [x2, y2] = pos[l2][b];
        const isHot = hot.has(`${l1}-${a}-${l2}-${b}`);
        return (
          <path
            key={`${l1}-${a}-${b}`}
            d={`M${x1} ${y1 + 12} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2 - 12}`}
            fill="none"
            stroke={isHot ? accent : ink}
            strokeOpacity={isHot ? 1 : 0.3}
            strokeWidth={isHot ? 2.5 : 1.5}
            className={isHot ? "cv-blink" : undefined}
          />
        );
      })}
      {pos.flatMap((row, l) =>
        row.map(([x, y], i) => (
          <g key={`${l}-${i}`} className="cv-drift" style={v({ "--dx": "0px", "--dy": `${l % 2 ? 3 : -3}px` })}>
            <rect x={x - 26} y={y - 12} width="52" height="24" rx="6" fill="var(--surface)" stroke={ink} strokeOpacity="0.6" strokeWidth="1.5" />
            <rect x={x - 16} y={y - 2} width={l === 0 ? 32 : 20 + ((i * 7) % 12)} height="4" rx="2" fill={ink} opacity="0.35" />
          </g>
        )),
      )}
    </>
  );
}

function DeepFake({ uid }: { uid: string }) {
  // triangle face-mesh on the left, dissolving into an audio waveform on the right
  // jittered grid inside a face-shaped oval, each cell split into two triangles
  const r = rng(7);
  const cols = 9;
  const rows = 12;
  const cx = 128;
  const cy = 150;
  const grid: ([number, number] | null)[][] = [];
  for (let j = 0; j <= rows; j++) {
    const line: ([number, number] | null)[] = [];
    for (let i = 0; i <= cols; i++) {
      const u = i / cols - 0.5;
      const w = j / rows - 0.5;
      const taper = 1 - Math.max(0, w) * 0.55; // narrower towards the chin
      const x = cx + u * 150 * taper + (r() - 0.5) * 8;
      const y = cy + w * 200 + (r() - 0.5) * 8;
      const inside = (u * u) / 0.25 + (w * w) / 0.25 <= 1.02;
      line.push(inside ? [x, y] : null);
    }
    grid.push(line);
  }
  const tris: string[] = [];
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const [a, b2, c, d] = [grid[j][i], grid[j][i + 1], grid[j + 1][i], grid[j + 1][i + 1]];
      if (a && b2 && d) tris.push(`M${a[0]} ${a[1]} L${b2[0]} ${b2[1]} L${d[0]} ${d[1]} Z`);
      if (a && c && d) tris.push(`M${a[0]} ${a[1]} L${d[0]} ${d[1]} L${c[0]} ${c[1]} Z`);
    }
  const bars = Array.from({ length: 22 }, (_, i) => 14 + Math.abs(Math.sin(i * 1.7) * 52) + (i % 3) * 6);
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.3" stopColor="white" />
          <stop offset="0.6" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-mesh`}>
          <rect width={W} height={H} fill={`url(#${uid}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${uid}-mesh)`}>
        {tris.map((d, i) => (
          <path key={i} d={d} fill={i % 11 === 0 ? accent : "none"} fillOpacity="0.3" stroke={ink} strokeOpacity="0.38" strokeWidth="0.9" strokeLinejoin="round" />
        ))}
      </g>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={196 + i * 8.4}
          y={150 - h / 2}
          width="4"
          height={h}
          rx="2"
          fill={i > 14 ? accent : ink}
          opacity={0.25 + (i / bars.length) * 0.75}
          className="cv-bar"
          style={v({ "--i": i, "--s": 0.35 + ((i * 37) % 50) / 100 })}
        />
      ))}
    </>
  );
}

function BuyerSegmentation() {
  // scatter of points in 4 clusters, each inside a soft hull
  const clusters: { cx: number; cy: number; rx: number; ry: number; hot?: boolean }[] = [
    { cx: 112, cy: 98, rx: 58, ry: 42 },
    { cx: 270, cy: 86, rx: 62, ry: 38, hot: true },
    { cx: 150, cy: 214, rx: 66, ry: 40 },
    { cx: 296, cy: 212, rx: 50, ry: 44 },
  ];
  const r = rng(11);
  return (
    <>
      {clusters.map((c, k) => (
        <g key={k} className="cv-drift" style={v({ "--dx": `${k % 2 ? -4 : 4}px`, "--dy": `${k < 2 ? 3 : -3}px` })}>
          <ellipse cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill={c.hot ? accent : ink} opacity={c.hot ? 0.14 : 0.06} />
          {Array.from({ length: 16 }, (_, i) => {
            const a = r() * Math.PI * 2;
            const d = Math.sqrt(r()) * 0.82;
            return (
              <circle
                key={i}
                cx={c.cx + Math.cos(a) * d * c.rx}
                cy={c.cy + Math.sin(a) * d * c.ry}
                r="3.2"
                fill={c.hot ? accent : ink}
                opacity={c.hot ? 0.95 : 0.55}
              />
            );
          })}
        </g>
      ))}
    </>
  );
}

function CareTransition() {
  // four pipeline stages joined by a Sankey-style band that narrows as cases move through
  const stages = [
    { x: 40, top: 60, h: 180 },
    { x: 150, top: 80, h: 140 },
    { x: 260, top: 96, h: 108 },
    { x: 350, top: 110, h: 80 },
  ];
  const w = 14;
  return (
    <>
      {stages.slice(0, -1).map((s, i) => {
        const n = stages[i + 1];
        const x1 = s.x + w;
        const x2 = n.x;
        const mx = (x1 + x2) / 2;
        return (
          <path
            key={i}
            d={`M${x1} ${s.top} C${mx} ${s.top} ${mx} ${n.top} ${x2} ${n.top} L${x2} ${n.top + n.h} C${mx} ${n.top + n.h} ${mx} ${s.top + s.h} ${x1} ${s.top + s.h} Z`}
            fill={accent}
            opacity={0.12 + i * 0.06}
            className="cv-blink"
            style={v({ "--i": i })}
          />
        );
      })}
      {/* a small outflow peeling off at stage 2 */}
      <path d={`M${150 + w} 200 C 205 200 205 262 260 262 L260 270 C 205 270 205 220 ${150 + w} 220 Z`} fill={ink} opacity="0.12" />
      {stages.map((s, i) => (
        <rect key={i} x={s.x} y={s.top} width={w} height={s.h} rx="3" fill={i === stages.length - 1 ? accent : ink} opacity={i === stages.length - 1 ? 1 : 0.8} />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={60} cy={118 + i * 30} r="3" fill={accent} className="cv-flow" style={v({ "--i": i, "--len": "280px" })} />
      ))}
    </>
  );
}

const motifs: Record<CoverId, (p: { uid: string }) => ReactNode> = {
  safepulse: SafePulse,
  "rurallink-ai": RuralLink,
  "smart-park": SmartPark,
  "archlens-ai": ArchLens,
  "deepfake-shield": DeepFake,
  "buyer-segmentation": BuyerSegmentation,
  "care-transition": CareTransition,
};

export function Cover({ id, label, className }: { id: CoverId; label: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const Motif = motifs[id];
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-xl bg-surface ring-1 ring-line", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id={`${uid}-grid`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill={ink} opacity="0.16" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill={`url(#${uid}-grid)`} />
        <Motif uid={uid} />
      </svg>
      <span className="absolute top-3 left-3.5 font-mono text-[10.5px] tracking-[0.08em] text-ink-faint uppercase">{label}</span>
    </div>
  );
}
