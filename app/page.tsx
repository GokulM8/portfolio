import { About } from "@/components/about";
import { Contact, Footer } from "@/components/contact";
import { Hackathons } from "@/components/hackathons";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects/projects";
import { Writing } from "@/components/writing";
import { site } from "@/content/site";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Machine Learning Engineer",
  description: site.description,
  image: `${site.url}${site.hero.portrait.src}`,
  address: { "@type": "PostalAddress", addressLocality: "Vijayawada", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: site.about.academic.school },
  knowsAbout: ["Machine learning", "Applied AI", "Health-tech", "Data science"],
  sameAs: [site.socials.linkedin, site.socials.github],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <a href="#projects" className="sr-only z-[60] rounded-md bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects projects={site.projects} />
        <Hackathons />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
