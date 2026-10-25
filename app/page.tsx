import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <a href="#projects" className="sr-only z-[60] rounded-md bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects projects={site.projects} />
        {/* Phase 2: About (tabs), Hackathons, Writing, Contact */}
      </main>
    </>
  );
}
