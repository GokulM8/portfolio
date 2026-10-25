"use client";

import { motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/site";
import { ease } from "@/lib/motion";
import { GithubIcon } from "../icons";
import { Shot } from "./shot";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-line py-6 sm:grid-cols-[140px_1fr] sm:gap-8">
      <h3 className="text-sm text-ink-faint">{label}</h3>
      <div className="text-ink-soft">{children}</div>
    </div>
  );
}

function ExtLink({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? "group inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-bg"
          : "group inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-ink ring-1 ring-line-strong hover:ring-ink"
      }
    >
      {children}
    </a>
  );
}

const arrow = <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />;

/** Project detail: metrics, problem → approach → results, stack, links. */
export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const metrics = project.metrics.filter((m) => m.value).slice(0, 3);
  const titleId = `project-${project.slug}-title`;

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      // keep focus inside the dialog
      const f = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <motion.div
        className="absolute inset-0 bg-[oklch(0.1_0_0/0.4)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease }}
      />
      <div className="absolute inset-0 overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <motion.div
          ref={panel}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.35, ease }}
          className="relative mx-auto my-0 min-h-full max-w-[880px] bg-bg px-5 pt-5 pb-10 sm:my-10 sm:min-h-0 sm:rounded-2xl sm:px-10 sm:pt-8 sm:ring-1 sm:ring-line"
        >
          <div className="flex items-start justify-between gap-6">
            <p className="pt-2 text-sm text-ink-faint">
              {project.categories.join(" · ")}
              {project.year && ` · ${project.year}`}
              {project.status === "in-progress" && " · In progress"}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="grid size-10 shrink-0 place-items-center rounded-full text-ink-soft ring-1 ring-line-strong hover:text-ink"
              aria-label="Close project"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <h2 id={titleId} className="mt-4 text-[clamp(2.5rem,7vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-ink">
            {project.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">{project.oneLiner}</p>

          {project.image && <Shot project={project} sizes="(min-width: 880px) 800px, 100vw" className="mt-8 rounded-xl ring-1 ring-line" priority />}

          {metrics.length > 0 && (
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">{m.value}</dd>
                  <dd className="mt-1 text-[13px] leading-snug text-ink-faint">{m.label}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8">
            <Section label="Problem">
              <p>{project.problem}</p>
            </Section>
            <Section label="Approach">
              <ol className="grid gap-2.5">
                {project.approach.map((a, i) => (
                  <li key={a} className="grid grid-cols-[24px_1fr]">
                    <span className="text-ink-faint tabular-nums">{i + 1}.</span>
                    {a}
                  </li>
                ))}
              </ol>
            </Section>
            <Section label="Results">
              <ul className="grid gap-2.5">
                {project.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Section>
            <Section label="Stack">
              <p className="text-ink">{project.stack.join(", ")}</p>
            </Section>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-line pt-6">
            {project.live && <ExtLink href={project.live} primary>Live site {arrow}</ExtLink>}
            {project.paper && <ExtLink href={project.paper} primary>Paper {arrow}</ExtLink>}
            {project.demo && <ExtLink href={project.demo}>Dashboard {arrow}</ExtLink>}
            {project.source && (
              <ExtLink href={project.source}>
                <GithubIcon className="size-4" /> Source
              </ExtLink>
            )}
          </div>
        </motion.div>
      </div>
    </div>,
    document.body,
  );
}
