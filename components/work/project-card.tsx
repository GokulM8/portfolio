"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/content/site";
import { layoutTransition, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GithubIcon } from "../icons";
import { BrowserFrame } from "./browser-frame";

export function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: (slug: string, from: HTMLElement) => void;
}) {
  const metrics = project.metrics.filter((m) => m.value).slice(0, featured ? 3 : 2);

  function open(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
    e.preventDefault();
    onOpen(project.slug, e.currentTarget);
  }

  return (
    <motion.article
      layoutId={`card-${project.slug}`}
      transition={layoutTransition}
      whileHover={{ y: -4, transition: spring }}
      style={{ borderRadius: 26 }}
      className="surface hover-lift group flex h-full flex-col overflow-hidden bg-bg"
    >
      <span
        aria-hidden
        className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-card text-ink-soft ring-1 ring-line-strong transition-transform duration-300 ease-[var(--ease-calm)] group-hover:-rotate-45 sm:top-6 sm:right-6"
      >
        <ArrowRight className="size-4" />
      </span>
      <motion.div layout="position" className={cn("flex flex-col p-6 sm:p-7", featured && "sm:p-8 lg:p-10")}>
        <div className="flex items-center gap-3 pr-12 text-[13px] text-ink-faint">
          <span>{project.category}</span>
          {project.status === "live" && (
            <span className="inline-flex items-center gap-1.5 text-accent-ink">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Live
            </span>
          )}
        </div>
        <motion.h3
          layoutId={`title-${project.slug}`}
          transition={layoutTransition}
          className={cn("mt-3 w-fit font-display tracking-[-0.02em] text-ink", featured ? "text-5xl/none sm:text-6xl/none" : "text-4xl/none")}
        >
          <a
            href={`/work/${project.slug}`}
            onClick={open}
            className="rounded-sm after:absolute after:inset-0 after:z-0 after:rounded-[26px] after:content-['']"
          >
            {project.title}
            <span className="sr-only">: read the case study</span>
          </a>
        </motion.h3>
        <p className={cn("mt-4 text-pretty text-ink-soft", featured ? "max-w-lg text-base" : "max-w-sm text-[15px]")}>{project.summary}</p>

        {metrics.length > 0 && (
          <dl className={cn("flex flex-wrap gap-x-8 gap-y-4", featured ? "mt-8" : "mt-6")}>
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className={cn("font-display tracking-tight text-ink", featured ? "text-[44px]/none" : "text-[32px]/none")}>{m.value}</dd>
                <dd className="mt-1.5 text-[13px] text-ink-faint">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className={cn("relative z-10 flex flex-wrap items-center gap-2", featured ? "mt-8" : "mt-6")}>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="group/live inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-bg"
            >
              Live site
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-[var(--ease-calm)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">: {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-soft ring-1 ring-line-strong transition-colors hover:text-ink"
            >
              <GithubIcon className="size-4" /> Source
              <span className="sr-only">code for {project.title} on GitHub</span>
            </a>
          )}
        </div>
      </motion.div>

      <div className={cn("flex flex-1 flex-col pl-6 sm:pl-7", featured && "sm:pl-8 lg:pl-10")}>
        <BrowserFrame project={project} zoomOnHover bleed grow />
      </div>
    </motion.article>
  );
}
