import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
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
          <RevealItem as="li" key={p.title} className="flex flex-col border-b border-line py-8">
            <p className="flex gap-3 text-sm text-ink-faint">
              <span>{p.kind}</span>
              {p.date && <span className="tabular-nums">{p.date}</span>}
            </p>
            <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink sm:text-[28px]">{p.title}</h3>
            <p className="mt-2 line-clamp-3 max-w-lg sm:line-clamp-2 text-[15px] text-ink-soft">{p.summary}</p>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex w-fit items-center gap-1 text-[15px] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
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
