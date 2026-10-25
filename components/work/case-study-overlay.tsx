"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/site";
import { ease, layoutTransition } from "@/lib/motion";
import { BrowserFrame } from "./browser-frame";
import { CaseStudyBody } from "./case-study-body";

/** The expanded state of a project card, shared-layout animated from the card itself. */
export function CaseStudyOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lenis?.stop();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby={`cs-title-${project.slug}`}>
      <motion.div
        className="absolute inset-0 bg-[oklch(0.15_0.01_60/0.35)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        onClick={onClose}
      />
      <div className="absolute inset-0 overflow-y-auto overscroll-contain" data-lenis-prevent onClick={(e) => e.target === e.currentTarget && onClose()}>
        <motion.article
          layoutId={`card-${project.slug}`}
          transition={layoutTransition}
          style={{ borderRadius: 28 }}
          className="surface relative mx-auto my-2 max-w-[1100px] overflow-hidden bg-card sm:my-6"
        >
          <div className="px-5 pt-6 pb-12 sm:px-10 sm:pt-10 lg:px-14">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[13px] text-ink-faint">{project.category}</p>
                <motion.h2
                  id={`cs-title-${project.slug}`}
                  layoutId={`title-${project.slug}`}
                  transition={layoutTransition}
                  className="mt-3 w-fit font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-ink"
                >
                  {project.title}
                </motion.h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-card-2 text-ink-soft ring-1 ring-line transition-colors hover:text-ink"
                aria-label="Close case study"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="mt-5 max-w-2xl text-lg text-pretty text-ink-soft"
            >
              {project.summary}
            </motion.p>
            <BrowserFrame project={project} priority className="mt-10" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <CaseStudyBody project={project} />
            </motion.div>
          </div>
        </motion.article>
      </div>
    </div>,
    document.body,
  );
}
