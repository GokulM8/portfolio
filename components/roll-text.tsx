"use client";

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type Mode = "load" | "view" | "hover";

/**
 * Text split into letters that roll up from a stack.
 * - load: rolls in on page load (pure CSS, plays before hydration)
 * - view: rolls in once when scrolled into view
 * - hover: rolls to a second copy on hover/focus of the closest `.roll-hover` ancestor
 */
export function RollText({
  text,
  mode,
  as: Tag = "span",
  className,
}: {
  text: string;
  mode: Mode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mode !== "view" || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-inview", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const copies = mode === "hover" ? 2 : 1;
  let i = 0;

  return (
    <Tag ref={ref} className={cn(mode === "load" && "roll-in-load", mode === "view" && "roll-in-view", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, w, words) => (
          <span key={w}>
            <span className="roll-word">
              {[...word].map((ch) => {
                const idx = i++;
                return (
                  <span key={idx} className="roll-char">
                    <span className="roll-stack" style={{ ["--i" as string]: idx }}>
                      {Array.from({ length: copies }, (_, c) => (
                        <span key={c}>{ch}</span>
                      ))}
                    </span>
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
