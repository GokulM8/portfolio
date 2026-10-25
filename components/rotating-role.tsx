"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";

/**
 * Cross-fades through roles. All roles share one grid cell so the line never reflows,
 * and the first role is server-rendered visible, so nothing flickers if JS is slow.
 */
export function RotatingRole({ roles }: { roles: readonly string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, [reduce, roles.length]);

  return (
    <span className="grid justify-items-center align-bottom sm:inline-grid sm:justify-items-end">
      <span className="sr-only">{roles[0]}</span>
      {roles.map((r, idx) => (
        <motion.span
          key={r}
          aria-hidden
          className="col-start-1 row-start-1 whitespace-nowrap text-ink"
          initial={false}
          animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : idx === (i + roles.length - 1) % roles.length ? -8 : 8 }}
          transition={{ duration: 0.5, ease }}
        >
          {r}
        </motion.span>
      ))}
    </span>
  );
}
