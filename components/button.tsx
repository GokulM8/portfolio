import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-ink/90",
  secondary: "bg-card text-ink ring-1 ring-line hover:ring-ink/30",
  ghost: "text-ink-soft hover:text-ink",
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors duration-300",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
