// One source of truth for motion. Every animated component reads from here.
import type { Transition } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise reveals: once, triggered slightly before the element is fully in view. */
export const reveal = {
  duration: 0.45,
  y: 16,
  stagger: 0.04,
  viewport: { once: true, margin: "0px 0px -12% 0px" },
} as const;

/** Rolling letters (the CSS in globals.css mirrors these). */
export const roll = { duration: 0.5, stagger: 0.025 } as const;

/** Cursor-following project preview. */
export const followSpring = { stiffness: 300, damping: 30, mass: 0.6 } as const;

/** Layout animations: list/grid toggle, filtering, tab indicator. */
export const layoutSpring: Transition = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 };

export const fade: Transition = { duration: 0.25, ease };
