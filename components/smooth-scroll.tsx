"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { lenisOptions } from "@/lib/motion";

/** Lenis driven by Motion's frame loop, so scroll and scroll-linked values share one rAF. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduce) return;
    const update = ({ timestamp }: { timestamp: number }) => lenisRef.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root ref={lenisRef} options={{ ...lenisOptions, autoRaf: false, anchors: { offset: -88 } }}>
      {children}
    </ReactLenis>
  );
}
