"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { Category, Project } from "@/content/site";
import { ease, layoutSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { RollText } from "../roll-text";
import { CursorPreview, useCursorPreview, useFinePointer } from "./cursor-preview";
import { ProjectDialog } from "./project-dialog";
import { Shot } from "./shot";

type Filter = "All" | Category;
type View = "list" | "grid";

const filters: Filter[] = ["All", "ML", "Full-stack", "Research"];

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
    return <span className="rounded-full px-2 py-0.5 text-[11px] text-ink-faint ring-1 ring-line-strong">In progress</span>;
  if (project.status === "live")
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-faint">
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
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const { sx, sy, move } = useCursorPreview();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter, projects],
  );
  const preview = fine && view === "list";

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
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <h2 id="projects-title" className="flex items-start gap-2 text-[clamp(2.75rem,8vw,6rem)] leading-none font-semibold tracking-[-0.05em] text-ink">
          <RollText text="Projects" mode="view" />
          <span className="mt-[0.35em] text-sm font-normal tracking-normal text-ink-faint tabular-nums">({String(visible.length).padStart(2, "0")})</span>
        </h2>
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
      </div>

      <LayoutGroup>
        <motion.ul
          layout={!reduce}
          transition={layoutSpring}
          className={cn(
                        view === "list" ? "flex flex-col" : "mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3",
          )}
          onPointerMove={preview ? (e) => move(e) : undefined}
          onPointerEnter={preview ? (e) => move(e, true) : undefined}
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
                    onPointerEnter={() => preview && setHovered(p.slug)}
                    onFocus={() => setHovered(null)}
                    className={cn(
                      "grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-5 text-left transition-opacity duration-300 sm:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.6fr)_auto] sm:py-6",
                      hovered && hovered !== p.slug && "opacity-35",
                    )}
                  >
                    <span className="hidden text-sm text-ink-faint tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-2xl font-medium tracking-[-0.035em] text-ink transition-transform duration-300 ease-[var(--ease-out-expo)] sm:text-[28px]",
                          hovered === p.slug && "translate-x-1.5",
                        )}
                      >
                        {p.title}
                      </span>
                      <StatusTag project={p} />
                    </span>
                    <span className="order-last col-span-2 text-[15px] text-ink-soft sm:order-none sm:col-span-1">{p.oneLiner}</span>
                    <span className="flex items-center gap-4 justify-self-end text-sm text-ink-faint">
                      <span className="hidden md:inline">{p.categories.join(", ")}</span>
                      <span className="tabular-nums">{p.year}</span>
                    </span>
                    {/* Touch devices get an inline thumbnail instead of the cursor preview (pure CSS, so it's right on first paint) */}
                    {p.image && (
                      <Shot
                        project={p}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="col-span-2 mt-3 rounded-lg ring-1 ring-line sm:col-span-4 [@media(hover:hover)_and_(pointer:fine)]:hidden"
                      />
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(e) => openProject(p, e.currentTarget)}
                    className="group/card block w-full text-left"
                  >
                    <div className="overflow-hidden rounded-xl ring-1 ring-line">
                      <div className="transition-transform duration-500 ease-[var(--ease-out-expo)] [@media(hover:hover)]:group-hover/card:scale-[1.03]">
                        <Shot project={p} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <span className="text-xl font-medium tracking-[-0.03em] text-ink">{p.title}</span>
                      <span className="text-sm text-ink-faint tabular-nums">{p.year}</span>
                    </div>
                    <p className="mt-1 text-[15px] text-ink-soft">{p.oneLiner}</p>
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

      {preview && <CursorPreview projects={projects} active={hovered} x={sx} y={sy} />}
      <AnimatePresence>{open && <ProjectDialog key={open.slug} project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
