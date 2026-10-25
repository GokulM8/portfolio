import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Portrait } from "./portrait";
import { ResumeLink } from "./resume-viewer";
import { RollText } from "./roll-text";

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="mx-auto max-w-[1200px] px-4 pt-16 pb-20 sm:px-8 sm:pt-28 sm:pb-28">
      <div className="fade-in flex items-center gap-3" style={d(0)}>
        <Portrait size={48} priority />
        <div className="text-sm leading-tight">
          <p className="font-medium text-ink">{site.name}</p>
          <p className="mt-1 flex items-center gap-1.5 font-mono text-[12px] text-ink-faint">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {site.status}
          </p>
        </div>
      </div>

      <RollText
        as="h1"
        mode="load"
        text={site.hero.greeting}
        className="mt-10 block text-[clamp(3.5rem,15vw,13rem)] leading-none font-semibold tracking-[-0.04em] text-ink sm:mt-14"
      />

      <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:mt-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <p className="fade-in max-w-xl text-lg text-pretty text-ink-soft sm:text-xl" style={d(0.35)}>
          {site.hero.intro}
        </p>
        <dl className="fade-in grid grid-cols-2 gap-x-6 gap-y-5 text-[15px]" style={d(0.45)}>
          <div>
            <dt className="font-mono text-[12px] text-ink-faint">Focus</dt>
            <dd className="mt-1 text-ink">Applied ML, health-tech</dd>
          </div>
          <div>
            <dt className="font-mono text-[12px] text-ink-faint">Based in</dt>
            <dd className="mt-1 text-ink">{site.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[12px] text-ink-faint">Studying</dt>
            <dd className="mt-1 text-ink">CS at VIT-AP, 2024–28</dd>
          </div>
          <div>
            <dt className="font-mono text-[12px] text-ink-faint">Elsewhere</dt>
            <dd className="mt-1 flex items-center gap-3 text-ink">
              <ResumeLink className="underline decoration-line-strong underline-offset-4 hover:decoration-ink">Resume</ResumeLink>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink" aria-label="LinkedIn">
                <LinkedinIcon className="size-4" />
              </a>
              <a href={site.socials.github} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink" aria-label="GitHub">
                <GithubIcon className="size-4" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
