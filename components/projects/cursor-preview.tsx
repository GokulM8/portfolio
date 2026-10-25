"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { Project } from "@/content/site";
import { followSpring } from "@/lib/motion";
import { Shot } from "./shot";

const W = 320;
const H = 200;

/** True on devices with a precise, hover-capable pointer (no cursor preview on touch). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/**
 * A preview card that follows the cursor over the project list.
 * Pointer position goes into motion values, springs smooth it; no React state per move.
 */
export function useCursorPreview() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, followSpring);
  const sy = useSpring(y, followSpring);

  function move(e: { clientX: number; clientY: number }, snap = false) {
    const nx = Math.min(e.clientX + 28, window.innerWidth - W - 16);
    const ny = e.clientY - H / 2;
    x.set(nx);
    y.set(ny);
    if (snap) {
      sx.jump(nx);
      sy.jump(ny);
    }
  }
  return { sx, sy, move };
}

export function CursorPreview({
  projects,
  active,
  x,
  y,
}: {
  projects: readonly Project[];
  active: string | null;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40 overflow-hidden rounded-xl shadow-[0_24px_60px_-20px_oklch(0_0_0/0.35)] ring-1 ring-line-strong"
      style={{ x, y, width: W, height: H }}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : reduce ? 1 : 0.92 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {projects.map((p) => (
        <div key={p.slug} className="absolute inset-0 transition-opacity duration-200" style={{ opacity: active === p.slug ? 1 : 0 }}>
          <Shot project={p} sizes="320px" className="h-full" />
        </div>
      ))}
    </motion.div>
  );
}
