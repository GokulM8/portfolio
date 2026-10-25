import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/work/case-study-body";
import { SHOT_SIZES } from "@/components/work/browser-frame";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  return site.projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = find((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/work/${project.slug}` } };
}

/** Standalone case study, for direct visits and shared links. From the homepage the same content opens as an expanding overlay. */
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = find((await params).slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-[1180px] px-2 py-2 sm:px-4 sm:py-4">
      <article className="surface-card relative rounded-[28px] px-5 pt-6 pb-12 sm:rounded-[32px] sm:px-10 sm:pt-10 lg:px-14">
        <a href="/#work" className="inline-flex items-center gap-2 rounded-full px-1 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden /> All work
        </a>
        <p className="mt-10 text-[13px] text-ink-faint">{project.category}</p>
        <h1 className="mt-3 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-ink">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-pretty text-ink-soft">{project.summary}</p>
        <div className="mt-10 overflow-hidden rounded-[14px] bg-card ring-1 ring-line-strong">
          <div className="flex h-8 items-center gap-1.5 border-b border-line bg-card-2/70 px-3" aria-hidden>
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
          </div>
          <div className="relative aspect-[16/10] bg-card-2">
            {project.image ? (
              <Image src={project.image.src} alt={project.image.alt} fill sizes={SHOT_SIZES} priority className="object-cover object-top" />
            ) : (
              <p className="grid h-full place-items-center font-display text-2xl text-ink-faint">Preview coming soon</p>
            )}
          </div>
        </div>
        <CaseStudyBody project={project} />
      </article>
    </main>
  );
}
