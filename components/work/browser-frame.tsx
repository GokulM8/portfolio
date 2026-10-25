"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/content/site";
import { layoutTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Same `sizes` everywhere so the card and the expanded view load the same image candidate.
export const SHOT_SIZES = "(min-width: 1180px) 1100px, 100vw";

function host(url?: string) {
  return url ? new URL(url).host.replace(/^www\./, "") : "";
}

/** Minimal browser chrome around a product screenshot. */
export function BrowserFrame({
  project,
  className,
  priority,
  zoomOnHover = false,
  bleed = false,
  grow = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
  /** Runs off the card's right and bottom edges: only the top-left corner is rounded. */
  bleed?: boolean;
  /** Fill the remaining height of a flex parent instead of keeping a 16:10 ratio. */
  grow?: boolean;
}) {
  const r = 14;
  return (
    <motion.div
      layoutId={`shot-${project.slug}`}
      transition={layoutTransition}
      className={cn("flex flex-col overflow-hidden bg-card ring-1 ring-line-strong", grow && "h-full", className)}
      style={{
        borderTopLeftRadius: r,
        borderTopRightRadius: bleed ? 0 : r,
        borderBottomLeftRadius: bleed ? 0 : r,
        borderBottomRightRadius: bleed ? 0 : r,
      }}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-card-2/70 px-3">
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
        {project.live && (
          <span className="mx-auto truncate rounded-full bg-bg/80 px-3 py-0.5 text-[11px] text-ink-faint">{host(project.live)}</span>
        )}
      </div>
      <div className={cn("relative overflow-hidden bg-card-2", grow ? "min-h-[200px] flex-1" : "aspect-[16/10]")}>
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={SHOT_SIZES}
            priority={priority}
            className={cn(
              "object-cover object-top",
              zoomOnHover && "transition-transform duration-500 ease-[var(--ease-calm)] group-hover:scale-[1.03]",
            )}
          />
        ) : (
          <div className="grid h-full place-items-center">
            <p className="font-display text-2xl text-ink-faint">Preview coming soon</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
