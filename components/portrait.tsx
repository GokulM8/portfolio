import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** True once public/me.jpg exists (checked at build time, so the page stays static). */
export const hasPortrait = fs.existsSync(path.join(process.cwd(), "public", site.hero.portrait.src));

/**
 * Round, square-cropped portrait. Grayscale by default; on hover (desktop) the color copy underneath
 * shows through as the grayscale copy fades out (opacity only, the filter never animates).
 */
export function Portrait({ size, className, priority }: { size: number; className?: string; priority?: boolean }) {
  const { src, alt } = site.hero.portrait;
  if (!hasPortrait) {
    return (
      <span
        role="img"
        aria-label="Gokul Mallabathula"
        className={cn("grid shrink-0 place-items-center rounded-full bg-surface font-semibold tracking-[-0.04em] text-ink-soft ring-1 ring-line", className)}
        style={{ width: size, height: size, fontSize: size * 0.34 }}
      >
        GM
      </span>
    );
  }
  const img = { src, width: size, height: size, sizes: `${size}px`, className: "absolute inset-0 size-full object-cover object-center" } as const;
  return (
    <span className={cn("group/portrait relative block shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-line", className)} style={{ width: size, height: size }}>
      <Image {...img} alt={alt} priority={priority} />
      <Image
        {...img}
        alt=""
        aria-hidden
        priority={priority}
        className={cn(img.className, "grayscale transition-opacity duration-500 ease-[var(--ease-out-expo)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/portrait:opacity-0")}
      />
    </span>
  );
}
