"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { RollText } from "./roll-text";

const { href, fileName } = site.resume;

const ResumeContext = createContext<((from: HTMLElement) => void) | null>(null);

/** Desktop gets the in-page viewer; touch and small screens just open the PDF. */
function wantsModal() {
  return window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const show = useCallback((from: HTMLElement) => {
    returnFocus.current = from;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <ResumeContext.Provider value={show}>
      {children}
      <AnimatePresence>{open && <ResumeModal onClose={close} />}</AnimatePresence>
    </ResumeContext.Provider>
  );
}

/** Every "Resume" link on the site. Without JS (or on touch) it's a plain new-tab link to the PDF. */
export function ResumeLink({ className, children, onNavigate }: { className?: string; children: ReactNode; onNavigate?: () => void }) {
  const show = useContext(ResumeContext);
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (!show || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || !wantsModal()) return;
    e.preventDefault();
    show(e.currentTarget);
  }
  return (
    <a href={href} target="_blank" rel="noopener" onClick={onClick} className={className} aria-haspopup="dialog">
      {children}
    </a>
  );
}

function BarLink({ label, ...rest }: { label: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} className="roll-hover rounded-md px-2.5 py-1.5 font-mono text-[12.5px] text-ink-soft transition-colors hover:text-ink">
      <RollText text={label} mode="hover" />
    </a>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  // Browsers without a built-in PDF viewer get download/open buttons instead of an empty frame.
  const [canEmbed] = useState(() => typeof navigator === "undefined" || navigator.pdfViewerEnabled !== false);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
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
    <div className="fixed inset-0 z-[70] grid place-items-center" role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <motion.div
        className="absolute inset-0 bg-[oklch(0.1_0_0/0.45)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease }}
        className="relative flex h-[90vh] w-[90vw] max-w-[1280px] flex-col overflow-hidden rounded-2xl bg-bg ring-1 ring-line"
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line pr-2 pl-5">
          <h2 id="resume-title" className="truncate text-[15px] font-medium text-ink">
            Resume <span className="text-ink-faint">— {site.name}</span>
          </h2>
          <div className="flex items-center">
            <BarLink label="Download" href={href} download={fileName} />
            <BarLink label="Open in new tab ↗" href={href} target="_blank" rel="noopener" />
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="roll-hover ml-1 rounded-md px-2.5 py-1.5 font-mono text-[12.5px] text-ink transition-colors"
            >
              <RollText text="Close" mode="hover" />
            </button>
          </div>
        </div>
        <div className="relative flex-1 bg-surface">
          {canEmbed ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center" aria-hidden>
                  <div className="h-[86%] w-[min(640px,70%)] animate-pulse rounded-md bg-bg/70 ring-1 ring-line motion-reduce:animate-none" />
                </div>
              )}
              <iframe
                src={`${href}#view=FitH`}
                title={`Resume of ${site.name} (PDF)`}
                // Kept out of the tab order: the browser's PDF viewer swallows keys (Esc, Tab) once focused,
                // which would trap keyboard users. Download / Open in new tab cover keyboard access.
                tabIndex={-1}
                onLoad={() => setLoaded(true)}
                className={cn("absolute inset-0 size-full transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
              />
            </>
          ) : (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="text-lg text-ink">Your browser can&rsquo;t show PDFs inline.</p>
                <div className="mt-5 flex justify-center gap-2">
                  <a href={href} download={fileName} className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg">
                    Download
                  </a>
                  <a href={href} target="_blank" rel="noopener" className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-ink ring-1 ring-line-strong">
                    Open in new tab ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
