import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { GithubIcon } from "../icons";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="text-[11px] font-medium tracking-[0.16em] text-accent-ink uppercase md:pt-1.5">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

/** Problem → Approach → Results → What I'd do next → links. Shared by the overlay and the standalone page. */
export function CaseStudyBody({ project }: { project: Project }) {
  const { caseStudy: cs } = project;
  const metrics = project.metrics.filter((m) => m.value);
  return (
    <div className="mt-12">
      <Block label="Problem">
        <p className="max-w-2xl text-pretty font-display text-[clamp(1.5rem,3vw,2rem)] leading-snug text-ink">{cs.problem}</p>
      </Block>
      <Block label="Approach">
        <ol className="grid max-w-2xl gap-5">
          {cs.approach.map((step, i) => (
            <li key={step} className="grid grid-cols-[28px_1fr] gap-3 text-ink-soft">
              <span className="font-display text-xl leading-7 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Block>
      <Block label="Results">
        {metrics.length > 0 && (
          <dl className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-5xl leading-none tracking-tight text-ink">{m.value}</dd>
                <dd className="mt-2 text-[13px] text-ink-faint">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="grid max-w-2xl gap-3 text-ink-soft">
          {cs.results.map((r) => (
            <li key={r} className="flex gap-3">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
      </Block>
      <Block label="What I'd do next">
        <ul className="grid max-w-2xl gap-3 text-ink-soft">
          {cs.next.map((r) => (
            <li key={r} className="flex gap-3">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-ink-faint" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
      </Block>
      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-8">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="group inline-flex h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-bg">
            Live site <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        )}
        {project.source && (
          <a href={project.source} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-ink-soft ring-1 ring-line-strong hover:text-ink">
            <GithubIcon className="size-4" /> Source
          </a>
        )}
        <p className="ml-auto text-[13px] text-ink-faint">{project.stack.join("  ·  ")}</p>
      </div>
    </div>
  );
}
