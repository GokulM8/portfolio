import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { SelectedWork } from "@/components/selected-work";
import { StackCard } from "@/components/stack-card";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to work
      </a>
      <Nav />
      <main className="mx-auto flex max-w-[1180px] flex-col gap-4 px-2 py-2 sm:px-4 sm:py-4">
      <Hero />
      <SelectedWork />
      {/* Phase 2 placeholder: About, Experience, Hackathons, Skills, Contact land here */}
      <StackCard still id="about" className="grid min-h-[60vh] place-items-center p-10 text-center">
        <p className="font-display text-3xl text-ink-soft">About, Experience &amp; Contact come next.</p>
      </StackCard>
      </main>
    </>
  );
}
