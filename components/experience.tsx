"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { ease, layoutSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading, sectionClass } from "./section-heading";

/** Timeline of roles. A thin rail on the left draws itself (scaleY) as the list scrolls into view. */
export function Experience() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 85%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const roles = site.experience;

  return (
    <section id="experience" aria-labelledby="experience-title" className={sectionClass}>
      <SectionHeading id="experience-title" title="Experience" count={roles.length} />
      <div ref={list} className="relative pl-6 sm:pl-10">
        <span className="absolute top-0 bottom-0 left-0 w-px bg-line" aria-hidden />
        <motion.span
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-ink"
          style={{ scaleY: reduce ? 1 : scaleY }}
          aria-hidden
        />
        <LayoutGroup>
          <ol>
            {roles.map((r, i) => {
              const isOpen = open === i;
              const panelId = `role-${i}-details`;
              return (
                <motion.li key={r.company} layout={reduce ? false : "position"} transition={layoutSpring} className="relative border-b border-line">
                  <span className="absolute top-[34px] -left-6 size-[7px] -translate-x-[3px] rounded-full bg-ink sm:-left-10 sm:top-[38px]" aria-hidden />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? panelId : undefined}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="block w-full py-6 text-left sm:py-8"
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-[28px]">{r.role}</span>
                      <span className="flex items-center gap-4 font-mono text-[12.5px] text-ink-faint tabular-nums">
                        {r.period}
                        <Plus className={cn("size-4 transition-transform duration-300 ease-[var(--ease-out-expo)]", isOpen && "rotate-45")} aria-hidden />
                      </span>
                    </span>
                    <span className="mt-1 block text-lg text-ink-soft">{r.company}</span>
                    <span className="mt-4 grid max-w-2xl gap-1.5">
                      {r.summary.map((line) => (
                        <span key={line} className="flex gap-3 text-ink-soft">
                          <span className="mt-[11px] h-px w-3 shrink-0 bg-ink-faint" aria-hidden />
                          {line}
                        </span>
                      ))}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-full px-2.5 py-0.5 font-mono text-[11.5px] text-ink-soft ring-1 ring-line-strong">
                          {t}
                        </span>
                      ))}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={`${r.role} at ${r.company}: details`}
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease } }}
                        exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
                        className="grid max-w-2xl gap-4 pb-8"
                      >
                        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
                          <div>
                            <dt className="font-mono text-[11.5px] text-ink-faint">Duration</dt>
                            <dd className="mt-1 text-ink">{r.duration}</dd>
                          </div>
                          <div>
                            <dt className="font-mono text-[11.5px] text-ink-faint">Type</dt>
                            <dd className="mt-1 text-ink">Internship</dd>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <dt className="font-mono text-[11.5px] text-ink-faint">Focus areas</dt>
                            <dd className="mt-1 text-ink">{r.tags.join(", ")}</dd>
                          </div>
                        </dl>
                        {r.details.length > 0 && (
                          <ul className="grid gap-1.5">
                            {r.details.map((line) => (
                              <li key={line} className="flex gap-3 text-ink-soft">
                                <span className="mt-[11px] h-px w-3 shrink-0 bg-ink-faint" aria-hidden />
                                {line}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ol>
        </LayoutGroup>
      </div>
    </section>
  );
}
