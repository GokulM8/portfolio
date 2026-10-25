"use client";

import { ArrowUp, Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { RollText } from "./roll-text";
import { sectionClass } from "./section-heading";

function HoverLink({ href, label, download }: { href: string; label: string; download?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="roll-hover text-xl font-medium tracking-[-0.03em] text-ink sm:text-2xl"
    >
      <RollText text={label} mode="hover" />
    </a>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <section id="contact" aria-label="Contact" className={sectionClass}>
      <div className="border-t border-line pt-16 sm:pt-24">
        <RollText
          as="h2"
          mode="view"
          text={site.contact.closing}
          className="block text-[clamp(3rem,11vw,9.5rem)] leading-none font-semibold tracking-[-0.055em] text-ink"
        />
        <p className="mt-8 max-w-md text-lg text-ink-soft">{site.contact.availability}</p>

        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-ink-faint">Email</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="text-xl font-medium tracking-[-0.03em] break-all text-ink sm:text-2xl">
                {site.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm text-ink ring-1 ring-line-strong transition-colors hover:ring-ink"
              >
                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                {copied ? "Copied" : "Copy"}
                <span className="sr-only" aria-live="polite">
                  {copied ? `${site.email} copied to clipboard` : ""}
                </span>
              </button>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <HoverLink href={site.socials.linkedin} label="LinkedIn" />
            </li>
            <li>
              <HoverLink href={site.socials.github} label="GitHub" />
            </li>
            <li>
              <HoverLink href={site.cv} label="Resume" download />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] px-4 sm:px-8">
      <div className="flex items-center justify-between border-t border-line py-8 text-sm text-ink-faint">
        <p>© 2026 {site.name}</p>
        <a href="#top" className="group inline-flex items-center gap-1.5 hover:text-ink">
          Back to top
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
