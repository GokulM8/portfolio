import Image from "next/image";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

/** A project's screenshot, or a quiet typographic tile when there isn't one yet. */
export function Shot({ project, sizes, className, priority }: { project: Project; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
      {project.image ? (
        <Image src={project.image.src} alt={project.image.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      ) : (
        <div className="flex h-full flex-col justify-between p-4" aria-hidden>
          <span className="text-[11px] tracking-wide text-ink-faint uppercase">{project.status === "in-progress" ? "In progress" : project.categories.join(" · ")}</span>
          <span className="text-2xl font-semibold tracking-[-0.04em] text-ink">{project.title}</span>
        </div>
      )}
    </div>
  );
}
