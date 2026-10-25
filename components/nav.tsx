"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Monogram } from "./monogram";
import { ResumeLink } from "./resume-viewer";
import { RollText } from "./roll-text";
import { ThemeToggle } from "./theme-toggle";

const ids = site.nav.map((l) => l.href.slice(1));

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        setActive(ids.find((id) => seen.get(id)) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn("sticky top-0 z-50 border-b bg-bg/95 transition-colors", scrolled ? "border-line" : "border-transparent")}>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="text-ink" aria-label={`${site.name}, back to top`}>
          <Monogram className="size-9" />
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center lg:flex">
            {site.nav.map((l, i) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "roll-hover flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "text-ink" : "text-ink-faint hover:text-ink",
                    )}
                  >
                    <span className={cn("font-mono text-[10.5px] tabular-nums", isActive ? "text-ink" : "text-ink-faint")} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <RollText text={l.label} mode="hover" />
                  </a>
                </li>
              );
            })}
            <li className="ml-1 border-l border-line pl-1">
              <ResumeLink className="roll-hover block rounded-md px-3 py-2 font-mono text-[12.5px] text-ink">
                <RollText text="Resume" mode="hover" />
              </ResumeLink>
            </li>
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md px-3 py-2 font-mono text-[13px] text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pb-4 lg:hidden"
          >
            {site.nav.map((l, i) => (
              <li key={l.href} className="border-t border-line first:border-t-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline gap-3 py-3.5 text-2xl font-medium tracking-[-0.03em]",
                    active === l.href.slice(1) ? "text-ink" : "text-ink-soft",
                  )}
                >
                  <span className="font-mono text-xs text-ink-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="border-t border-line">
              <ResumeLink onNavigate={() => setOpen(false)} className="flex items-baseline gap-3 py-3.5 text-2xl font-medium tracking-[-0.03em] text-ink-soft">
                <span className="font-mono text-xs text-ink-faint">↗</span>
                Resume
              </ResumeLink>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
