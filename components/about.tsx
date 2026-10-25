"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/content/site";
import { ease, layoutSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ResumeLink } from "./resume-viewer";
import { SectionHeading, sectionClass } from "./section-heading";

const tabs = ["Academic", "Stack", "Info"] as const;
type Tab = (typeof tabs)[number];

const row = "grid gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]";

function Academic() {
  const a = site.about.academic;
  return (
    <div>
      <div className={row}>
        <p className="font-mono text-[12.5px] text-ink-faint tabular-nums">{a.period}</p>
        <div>
          <p className="text-2xl font-medium tracking-[-0.03em] text-ink sm:text-[28px]">{a.degree}</p>
          <p className="mt-1 text-ink-soft">{a.school}</p>
        </div>
      </div>
      <div className={row}>
        <p className="font-mono text-[12.5px] text-ink-faint">Focus</p>
        <p className="max-w-xl text-ink-soft">{a.focus}</p>
      </div>
    </div>
  );
}

function Stack() {
  return (
    <div>
      {site.about.stack
        .filter((t) => t.items.length > 0)
        .map((t) => (
          <div key={t.tier} className={row}>
            <p className="font-mono text-[12.5px] text-ink-faint">{t.tier}</p>
            <ul className="flex flex-wrap items-center gap-2">
              {t.items.map((i) => (
                <li key={i} className="rounded-full px-3 py-1 font-mono text-[12.5px] text-ink ring-1 ring-line-strong">
                  {i}
                </li>
              ))}
              {t.upNext.length > 0 && (
                <li className="flex flex-wrap items-center gap-2">
                  <span className="ml-1 font-mono text-[11px] tracking-[0.08em] text-ink-faint uppercase">Up next</span>
                  {t.upNext.map((i) => (
                    <span key={i} className="rounded-full border border-dashed border-line-strong px-3 py-1 font-mono text-[12.5px] text-ink-faint">
                      {i}
                    </span>
                  ))}
                </li>
              )}
            </ul>
          </div>
        ))}
    </div>
  );
}

function Info() {
  return (
    <dl>
      {site.about.info.map((i) => (
        <div key={i.label} className={row}>
          <dt className="font-mono text-[12.5px] text-ink-faint">{i.label}</dt>
          <dd className="text-lg text-ink">{i.value}</dd>
        </div>
      ))}
      <div className={row}>
        <dt className="font-mono text-[12.5px] text-ink-faint">Resume</dt>
        <dd>
          <ResumeLink className="text-lg text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">View resume</ResumeLink>
        </dd>
      </div>
    </dl>
  );
}

const panels: Record<Tab, () => React.ReactNode> = { Academic, Stack, Info };

/** About, as an ARIA tablist: arrow keys / Home / End move between tabs; a sliding underline marks the active one. */
export function About() {
  const [active, setActive] = useState<Tab>("Academic");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const Panel = panels[active];

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = tabs.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(tabs[next]);
    refs.current[next]?.focus();
  }

  return (
    <section id="about" aria-labelledby="about-title" className={sectionClass}>
      <SectionHeading id="about-title" title="About" />

      <div role="tablist" aria-label="About" className="mt-8 flex gap-6 overflow-x-auto border-b border-line sm:gap-10">
        {tabs.map((t, i) => {
          const selected = active === t;
          return (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`about-tab-${t}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={selected ? `about-panel-${t}` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative shrink-0 pb-3 text-[15px] transition-colors duration-200 sm:text-base",
                selected ? "text-ink" : "text-ink-faint hover:text-ink",
              )}
            >
              {t}
              {selected && (
                <motion.span layoutId="about-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" transition={layoutSpring} />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id={`about-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`about-tab-${active}`}
          tabIndex={0}
          className="rounded-sm"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
        >
          <Panel />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
