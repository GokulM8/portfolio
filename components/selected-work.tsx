import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons";
import { Reveal, RevealItem } from "./reveal";
import { StackCard } from "./stack-card";
import { WorkGrid } from "./work/work-grid";

function LinkPill({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "relative z-10 inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-300",
        primary ? "bg-ink text-bg hover:bg-ink/85" : "text-ink-soft ring-1 ring-line-strong hover:text-ink",
      )}
    >
      {children}
    </a>
  );
}

export function SelectedWork() {
  return (
    <StackCard id="work" label="Selected work" className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
      <Reveal className="mx-auto max-w-[1100px]">
        <RevealItem>
          <p className="text-[11px] font-medium tracking-[0.16em] text-accent-ink uppercase">Selected work</p>
        </RevealItem>
        <RevealItem>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.03em] text-ink">
            A few things I&rsquo;ve <span className="italic">shipped</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-5 max-w-xl text-ink-soft">Live products first. Each one solved a real problem for real people.</p>
        </RevealItem>

        <div className="mt-12">
          <WorkGrid projects={site.projects} />
        </div>

        <div className="mt-4 sm:mt-5">
          <RevealItem className="md:col-span-2">
            <article className="surface rounded-[26px] bg-bg p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-4xl tracking-[-0.02em] text-ink">{site.research.title}</h3>
                <span className="text-[13px] text-ink-faint">Data science · Research</span>
              </div>
              <ul className="mt-6 divide-y divide-line">
                {site.research.papers.map((paper) => (
                  <li key={paper.title} className="grid gap-4 py-5 first:pt-0 last:pb-0 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
                    <div>
                      <h4 className="text-lg font-medium text-ink">{paper.title}</h4>
                      <p className="mt-1 text-[15px] text-ink-soft">{paper.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {paper.paper && (
                        <LinkPill href={paper.paper} primary>
                          Paper <ArrowUpRight className="size-4" aria-hidden />
                          <span className="sr-only">: {paper.title} on SSRN</span>
                        </LinkPill>
                      )}
                      {paper.demo && (
                        <LinkPill href={paper.demo}>
                          Dashboard <ArrowUpRight className="size-4" aria-hidden />
                        </LinkPill>
                      )}
                      {paper.source && (
                        <LinkPill href={paper.source}>
                          <GithubIcon className="size-4" /> Source
                          <span className="sr-only">code for {paper.title}</span>
                        </LinkPill>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        </div>

        <RevealItem className="mt-10">
          <div className="flex flex-col gap-4 rounded-[26px] border border-dashed border-line-strong p-5 sm:flex-row sm:items-center sm:gap-8 sm:px-7">
            <p className="shrink-0 text-xs font-medium tracking-[0.14em] text-ink-faint uppercase">In progress</p>
            <ul className="flex flex-1 flex-col gap-3 sm:flex-row sm:gap-8">
              {site.inProgress.map((p) => (
                <li key={p.title} className="text-[15px]">
                  <a href={p.source} target="_blank" rel="noreferrer" className="group text-ink hover:text-accent-ink">
                    <span className="font-medium underline decoration-line underline-offset-4 group-hover:decoration-accent">{p.title}</span>
                  </a>
                  <span className="text-ink-soft"> — {p.summary}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>
      </Reveal>
    </StackCard>
  );
}
