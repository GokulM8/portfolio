import { ArrowDown, Download } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "./button";
import { HeroIllustration } from "./hero-illustration";
import { Magnetic } from "./magnetic";
import { PauseOffscreen } from "./pause-offscreen";
import { RotatingRole } from "./rotating-role";
import { StackCard } from "./stack-card";

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

export function Hero() {
  const [first, ...rest] = site.name.split(" ");
  return (
    <StackCard id="home" label="Introduction" className="px-5 pt-36 pb-6 sm:px-10 sm:pt-52">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="fade-up inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium text-accent-ink" style={d(0)}>
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          {site.status}
        </p>

        <h1 className="mt-8 font-display text-ink">
          <span className="mask-line">
            <span style={d(0.05)} className="text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight text-ink-soft">
              Hi, I&rsquo;m
            </span>
          </span>
          <span className="mask-line mt-1 text-[clamp(4.5rem,16vw,8.75rem)] leading-[0.88] tracking-[-0.03em]">
            <span style={d(0.1)}>{first}</span>
          </span>
          <span className="mask-line text-[clamp(4.5rem,16vw,8.75rem)] leading-[0.88] tracking-[-0.03em]">
            <span style={d(0.17)} className="pr-[0.06em] italic">
              {rest.join(" ")}
            </span>
          </span>
        </h1>

        <p className="fade-up mt-9 text-[17px] text-ink sm:text-xl" style={d(0.35)}>
          <RotatingRole roles={site.roles} />
          <span className="hidden text-accent sm:inline" aria-hidden>
            {" "}·{" "}
          </span>
          <span className="sr-only">, </span>
          <span className="block text-ink-soft sm:inline">{site.tagline}</span>
        </p>
        <p className="fade-up mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-ink-faint" style={d(0.42)}>
          {site.oneLiner}
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={d(0.5)}>
          <Magnetic>
            <ButtonLink href="#work">
              View work <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href={site.cv} download variant="secondary">
              <Download className="size-4" aria-hidden /> Download CV
            </ButtonLink>
          </Magnetic>
        </div>
      </div>

      <PauseOffscreen className="fade-up mx-auto mt-14 max-w-[500px] sm:mt-20 text-ink">
        <HeroIllustration className="h-auto w-full" />
      </PauseOffscreen>

      <div className="mt-6 border-t border-line pt-7 pb-3">
        <p className="text-center text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">{site.strip.heading}</p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
          {site.strip.items.map((item) => (
            <li key={item} className="font-display text-xl text-ink-soft sm:text-[22px]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </StackCard>
  );
}
