// One source of truth for motion. Every animated component reads from here.
import type { Transition } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const reveal = {
  duration: 0.5,
  y: 20,
  stagger: 0.05,
  viewport: { once: true, margin: "0px 0px -15% 0px" },
} as const;

/** Hover, tap and pointer-follow interactions. */
export const springOptions = { stiffness: 400, damping: 30 } as const;
export const spring: Transition = { type: "spring", ...springOptions };

/** Card → case-study shared layout transition. */
export const layoutTransition: Transition = { duration: 0.55, ease };

export const lenisOptions = {
  lerp: 0.13,
  smoothWheel: true,
  syncTouch: false, // native scrolling on touch devices
} as const;

/** Stacking section cards: scale range as the next card slides over. */
export const stack = { scaleTo: 0.94, fadeTo: 0 } as const;
