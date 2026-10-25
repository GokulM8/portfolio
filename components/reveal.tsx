"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ease, reveal } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: reveal.stagger } },
};

const item: Variants = {
  hidden: { opacity: 0, y: reveal.y },
  show: { opacity: 1, y: 0, transition: { duration: reveal.duration, ease } },
};

type Props = { children: ReactNode; className?: string; as?: "div" | "ul" | "li" };

// Always the same markup on server and client (branching on reduced motion here caused a hydration
// mismatch that left items at opacity 0). Reduced motion and no-JS are handled in CSS via [data-reveal].

/** Fades and rises its RevealItem children in, one after another, just before they're fully on screen. */
export function Reveal({ children, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag data-reveal className={className} variants={container} initial="hidden" whileInView="show" viewport={reveal.viewport}>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag data-reveal className={className} variants={item}>
      {children}
    </Tag>
  );
}
