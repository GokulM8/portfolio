"use client";

import { AnimatePresence, LayoutGroup } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";
import { RevealItem } from "../reveal";
import { CaseStudyOverlay } from "./case-study-overlay";
import { ProjectCard } from "./project-card";

/**
 * Bento grid of project cards. Opening a card pushes /work/[slug] onto history and expands it in place
 * (shared layoutId); Back or Close collapses it. A hard load of /work/[slug] renders the standalone page.
 */
export function WorkGrid({ projects }: { projects: readonly Project[] }) {
  const pathname = usePathname();
  const openSlug = pathname.startsWith("/work/") ? pathname.split("/")[2] : null;
  const open = projects.find((p) => p.slug === openSlug) ?? null;
  const returnFocus = useRef<HTMLElement | null>(null);

  const onOpen = useCallback((slug: string, from: HTMLElement) => {
    returnFocus.current = from;
    window.history.pushState(null, "", `/work/${slug}`);
  }, []);

  const onClose = useCallback(() => window.history.back(), []);

  useEffect(() => {
    if (!open && returnFocus.current) {
      returnFocus.current.focus({ preventScroll: true });
      returnFocus.current = null;
    }
  }, [open]);

  const [featured, ...others] = projects;

  return (
    <LayoutGroup>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
        <RevealItem className="md:col-span-2 lg:row-span-2">
          <ProjectCard project={featured} featured onOpen={onOpen} />
        </RevealItem>
        {others.map((p) => (
          <RevealItem key={p.slug} className={cn("lg:col-start-3")}>
            <ProjectCard project={p} onOpen={onOpen} />
          </RevealItem>
        ))}
      </div>
      <AnimatePresence>{open && <CaseStudyOverlay key={open.slug} project={open} onClose={onClose} />}</AnimatePresence>
    </LayoutGroup>
  );
}
