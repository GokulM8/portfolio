"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useMemo, useRef, useState, type PointerEvent } from "react";
import type { Category, Project } from "@/content/site";
import { ease, layoutSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Cover, coverLabel } from "../covers";
import { SectionHeading, sectionClass } from "../section-heading";
import { ProjectDialog } from "./project-dialog";

type Filter = "All" | Category;
type View = "list" | "grid";

const filters: Filter[] = ["All", "ML", "Full-stack"];

/** A segmented control whose active pill slides between options (shared layoutId). */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  id,
  render = (o) => o,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  id: string;
  render?: (o: T) => string;
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-0.5 rounded-full p-0.5 ring-1 ring-line">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "relative rounded-full px-3 py-1.5 text-[13px] transition-colors duration-200",
            value === o ? "text-bg" : "text-ink-soft hover:text-ink",
          )}
        >
          {value === o && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-ink" transition={layoutSpring} />}
          <span className="relative">{render(o)}</span>
        </button>
      ))}
    </div>
  );
}

function StatusTag({ project }: { project: Project }) {
  if (project.status === "in-progress")
    return <span className="rounded-full px-2 py-0.5 font-mono text-[10.5px] text-ink-faint ring-1 ring-line-strong">In progress</span>;
  if (project.status === "live")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-ink-faint">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Live
      </span>
    );
  return null;
}

export function Projects({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<View>("list");
  const [open, setOpen] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter, projects],
  );
  // Desktop-only row hover: mouse pointers only, so touch never triggers it.
  const hoverRow = (slug: string) => (e: PointerEvent) => e.pointerType === "mouse" && setHovered(slug);

  const openProject = (p: Project, el: HTMLElement) => {
    returnFocus.current = el;
    setHovered(null);
    setOpen(p);
  };
  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
  }, []);

  const itemMotion = reduce
    ? {}
    : {
        layout: true,
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
        transition: { ...layoutSpring, opacity: { duration: 0.25, ease } },
      };

  return (
    <section id="projects" aria-labelledby="projects-title" className={sectionClass}>
      <SectionHeading id="projects-title" title="Projects" count={visible.length}>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented id="filter" label="Filter projects by category" options={filters} value={filter} onChange={setFilter} />
          <Segmented
            id="view"
            label="Layout"
            options={["list", "grid"] as const}
            value={view}
            onChange={setView}
            render={(o) => (o === "list" ? "List" : "Grid")}
          />
        </div>
      </SectionHeading>

      <LayoutGroup>
        <motion.ul
          layout={!reduce}
          transition={layoutSpring}
          className={view === "list" ? "flex flex-col" : "mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li key={p.slug} {...itemMotion} className={view === "list" ? "border-b border-line" : ""}>
                {view === "list" ? (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(e) => openProject(p, e.currentTarget)}
                    onPointerEnter={hoverRow(p.slug)}
                    onFocus={() => setHovered(null)}
                    className={cn(
                      "grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-5 text-left transition-opacity duration-[250ms] ease-[var(--ease-out-expo)] sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_9rem_1.5rem] sm:py-6",
                      hovered && hovered !== p.slug && "opacity-50",
                    )}
                  >
                    <span className="hidden font-mono text-[12.5px] text-ink-faint tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "flex items-center gap-3 transition-transform duration-[250ms] ease-[var(--ease-out-expo)]",
                        hovered === p.slug && "translate-x-1.5",
                      )}
                    >
                      <span className="text-2xl font-medium tracking-[-0.03em] text-ink sm:text-[28px]">{p.title}</span>
                      <StatusTag project={p} />
                    </span>
                    <span
                      className={cn(
                        "order-last col-span-2 text-ink-soft transition-transform duration-[250ms] ease-[var(--ease-out-expo)] sm:order-none sm:col-span-1",
                        hovered === p.slug && "sm:translate-x-1.5",
                      )}
                    >
                      {p.oneLiner}
                    </span>
                    <span className="hidden justify-self-end font-mono text-[12px] text-ink-faint md:inline">{p.categories.join(", ")}</span>
                    <ArrowUpRight
                      className={cn(
                        "size-5 justify-self-end text-ink opacity-0 transition-[opacity,transform] duration-[250ms] ease-[var(--ease-out-expo)]",
                        hovered === p.slug && "translate-x-0.5 -translate-y-0.5 opacity-100",
                      )}
                      aria-hidden
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(e) => openProject(p, e.currentTarget)}
                    className="cover-host block w-full text-left"
                  >
                    <Cover id={p.slug} label={coverLabel(p)} />
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <span className="text-xl font-medium tracking-[-0.03em] text-ink">{p.title}</span>
                    </div>
                    <p className="mt-1 text-ink-soft">{p.oneLiner}</p>
                    <div className="mt-2">
                      <StatusTag project={p} />
                    </div>
                  </button>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <AnimatePresence>{open && <ProjectDialog key={open.slug} project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
