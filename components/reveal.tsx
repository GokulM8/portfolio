"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
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

/** Rises and fades its RevealItem children in, one after another, just before they're fully on screen. */
export function Reveal({ children, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag data-reveal className={className} variants={container} initial="hidden" whileInView="show" viewport={reveal.viewport}>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag data-reveal className={className} variants={item}>
      {children}
    </Tag>
  );
}
