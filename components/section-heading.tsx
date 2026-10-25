import type { ReactNode } from "react";
import { RollText } from "./roll-text";

/** Section title row, matching the Projects header: rolling title, optional count, optional controls on the right. */
export function SectionHeading({ id, title, count, children }: { id: string; title: string; count?: number; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
      <h2 id={id} className="flex items-start gap-2 text-[clamp(2.75rem,8vw,6rem)] leading-none font-semibold tracking-[-0.05em] text-ink">
        <RollText text={title} mode="view" />
        {count !== undefined && (
          <span className="mt-[0.35em] text-sm font-normal tracking-normal text-ink-faint tabular-nums">({String(count).padStart(2, "0")})</span>
        )}
      </h2>
      {children}
    </div>
  );
}

/** Shared section frame: same max-width, gutters and vertical rhythm as Projects. */
export const sectionClass = "mx-auto max-w-[1200px] px-4 py-20 sm:px-8 sm:py-28";
