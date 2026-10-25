"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { stack } from "@/lib/motion";
import { cn } from "@/lib/utils";

const GAP = 16;

/**
 * A rounded section card that sticks once its bottom reaches the viewport bottom,
 * then eases back (scale + fade) while the next card slides over it.
 * Scroll-linked straight from useScroll: Lenis already smooths the scroll, so no springs here.
 */
export function StackCard({
  id,
  children,
  className,
  label,
  still = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
  /** Last card: stays put instead of easing back. */
  still?: boolean;
}) {
  const sentinel = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [top, setTop] = useState(GAP);
  const [range, setRange] = useState<[number, number]>([0, 1]);
  const { scrollY } = useScroll();
  const active = !reduce && !still;

  useEffect(() => {
    if (!active || !sentinel.current || !card.current) return;
    const measure = () => {
      if (!sentinel.current || !card.current) return;
      const vh = window.innerHeight;
      const h = card.current.offsetHeight;
      const docTop = sentinel.current.getBoundingClientRect().top + window.scrollY;
      const stickTop = Math.min(GAP, vh - h - GAP);
      const start = docTop - stickTop;
      setTop(stickTop);
      setRange([start, start + Math.max(h + stickTop, 1)]);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  // will-change only while this card is actually easing back; write only when it flips
  const promoted = useRef(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const animating = v > range[0] - 200 && v < range[1] + 200;
    if (!card.current || animating === promoted.current) return;
    promoted.current = animating;
    card.current.style.willChange = animating ? "transform, opacity" : "auto";
  });

  const scale = useTransform(scrollY, range, [1, stack.scaleTo]);
  const opacity = useTransform(scrollY, [range[0], range[0] + (range[1] - range[0]) * 0.55, range[1]], [1, 0.9, stack.fadeTo]);

  const base = cn("surface-card relative rounded-[28px] sm:rounded-[32px]", className);

  if (!active) {
    return (
      <section id={id} aria-label={label} className={base}>
        {children}
      </section>
    );
  }

  return (
    <>
      <div ref={sentinel} aria-hidden />
      <motion.section ref={card} id={id} aria-label={label} className={cn(base, "sticky origin-top")} style={{ top, scale, opacity }}>
        {children}
      </motion.section>
    </>
  );
}
