import type { Metadata } from "next";
import { Monogram } from "@/components/monogram";
import { RollText } from "@/components/roll-text";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[1200px] flex-col px-4 sm:px-8">
      <header className="flex h-16 items-center">
        <a href="/" className="text-ink" aria-label="Home">
          <Monogram className="size-9" />
        </a>
      </header>
      <div className="flex flex-1 flex-col justify-center border-t border-line py-20">
        <RollText as="h1" mode="load" text="404" className="block text-[clamp(6rem,30vw,20rem)] leading-none font-semibold tracking-[-0.04em] text-ink" />
        <p className="mt-6 max-w-md text-lg text-ink-soft">This page doesn&rsquo;t exist, or it moved when the site was rebuilt.</p>
        <a href="/" className="roll-hover mt-10 w-fit border-b border-line-strong pb-1 text-xl font-medium tracking-[-0.03em] text-ink hover:border-ink">
          <RollText text="Back home" mode="hover" />
        </a>
      </div>
    </main>
  );
}
