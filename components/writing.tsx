import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Cover } from "./covers";
import { Reveal, RevealItem } from "./reveal";
import { SectionHeading, sectionClass } from "./section-heading";

/** Papers now, posts later: every entry in site.writing becomes a card. Empty dates/links stay hidden. */
export function Writing() {
  const posts = site.writing;
  return (
    <section id="writing" aria-labelledby="writing-title" className={sectionClass}>
      <SectionHeading id="writing-title" title="Writing" count={posts.length} />
      <Reveal as="ul" className="grid sm:grid-cols-2 sm:gap-x-10">
        {posts.map((p) => (
          <RevealItem as="li" key={p.title} className="cover-host flex flex-col border-b border-line py-8">
            <Cover id={p.cover} label={p.kind} />
            {p.date && <p className="mt-5 font-mono text-[12px] text-ink-faint tabular-nums">{p.date}</p>}
            <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-ink sm:text-[28px]">{p.title}</h3>
            <p className="mt-2 line-clamp-3 max-w-lg text-ink-soft sm:line-clamp-2">{p.summary}</p>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex w-fit items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {p.kind}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                <span className="sr-only">: {p.title}</span>
              </a>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
