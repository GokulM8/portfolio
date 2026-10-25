"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Download, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ease, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = site.nav.map((l) => l.href.slice(1));

export function Nav() {
  const active = useActiveSection(ids);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-5">
      <nav
        aria-label="Primary"
        className="relative flex w-full max-w-fit items-center gap-1 rounded-full bg-card/95 p-1.5 shadow-[var(--shadow-float)] ring-1 ring-line"
      >
        <a
          href="#home"
          className="grid size-9 place-items-center rounded-full bg-ink font-display text-[17px] text-bg"
          aria-label={`${site.name}, back to top`}
        >
          G
        </a>

        <ul className="hidden items-center md:flex">
          {site.nav.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {l.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-card-2"
                    transition={spring}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <span className="mx-1 hidden h-5 w-px bg-line md:block" aria-hidden />

        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          {copied ? <Check className="size-4 text-accent" aria-hidden /> : <Mail className="size-4" aria-hidden />}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy email"}</span>
          <span className="sm:hidden">{copied ? "Copied" : "Email"}</span>
          <span className="sr-only" aria-live="polite">
            {copied ? `${site.email} copied to clipboard` : ""}
          </span>
        </button>

        <a
          href={site.cv}
          download
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          <Download className="size-4" aria-hidden />
          CV
        </a>

        <button
          type="button"
          className="grid size-9 place-items-center rounded-full text-ink-soft hover:text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-nav"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease }}
              className="absolute inset-x-0 top-[calc(100%+8px)] origin-top rounded-3xl bg-card p-2 shadow-[var(--shadow-float)] ring-1 ring-line md:hidden"
            >
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-[15px]",
                      active === l.href.slice(1) ? "bg-card-2 text-ink" : "text-ink-soft",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
