"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { ease, layoutSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading, sectionClass } from "./section-heading";

/** Hackathon rows that expand in place to show my roles. Rows below glide (position-only layout animation). */
export function Hackathons() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const list = site.hackathons;

  return (
    <section id="hackathons" aria-labelledby="hackathons-title" className={sectionClass}>
      <SectionHeading id="hackathons-title" title="Hackathons" count={list.length} />
      <LayoutGroup>
        <ul>
          {list.map((h, i) => {
            const isOpen = open === i;
            const panelId = `hackathon-${i}-roles`;
            return (
              <motion.li key={`${h.name}-${h.year}`} layout={reduce ? false : "position"} transition={layoutSpring} className="border-b border-line">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? panelId : undefined}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="grid flex-1 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-5 text-left sm:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,1fr)_4rem_auto] sm:py-6"
                  >
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className={cn("text-2xl tracking-[-0.035em] text-ink sm:text-[28px]", h.highlight ? "font-semibold" : "font-medium")}>{h.name}</span>
                      {h.highlight && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-faint">
                          <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Top result
                        </span>
                      )}
                    </span>
                    <span className="order-3 text-sm text-ink-faint sm:order-none">{h.level}</span>
                    <span className={cn("order-4 text-[15px] sm:order-none", h.highlight ? "text-ink" : "text-ink-soft")}>{h.result}</span>
                    <span className="order-2 text-sm text-ink-faint tabular-nums sm:order-none">{h.year}</span>
                    <Plus
                      className={cn("hidden size-4 text-ink-faint transition-transform duration-300 ease-[var(--ease-out-expo)] sm:block", isOpen && "rotate-45")}
                      aria-hidden
                    />
                  </button>
                  {/* Same-width trailing slot on every row keeps the columns aligned */}
                  <span className="flex shrink-0 justify-end sm:w-28">
                    {h.certificate && (
                      <a
                        href={h.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex shrink-0 items-center gap-1 text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                      >
                        Certificate
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                        <span className="sr-only">for {h.name} {h.year} (opens image)</span>
                      </a>
                    )}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={`${h.name} ${h.year}: my roles`}
                      initial={reduce ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease } }}
                      exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
                      className="grid gap-4 pb-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,2.8fr)] sm:gap-x-4"
                    >
                      <p className="text-sm text-ink-faint">{[h.team, h.track].filter(Boolean).join(" · ") || "My roles"}</p>
                      <ul className="flex flex-wrap gap-2">
                        {h.roles.map((r) => (
                          <li key={r} className="rounded-full px-3 py-1 text-[15px] text-ink ring-1 ring-line-strong">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </LayoutGroup>
    </section>
  );
}
