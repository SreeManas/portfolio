import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { contactContent } from "@/content/contact";
import { motionTiming } from "@/lib/motion";

export function Contact(): ReactElement {
  const socialLinks = contactContent.socialLinks ?? [];
  const links = [...contactContent.links, ...socialLinks];

  return (
    <Section id={contactContent.id} aria-labelledby="contact-title" width="content">
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] md:gap-16">
          <header>
            <SectionLabel>{contactContent.label}</SectionLabel>
            <h2
              id="contact-title"
              className="mt-5 font-display text-4xl leading-none text-ink text-balance md:text-6xl"
            >
              {contactContent.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {contactContent.introduction}
            </p>
          </header>

          <div className="border-y border-border py-2 md:self-end">
            <ul>
              {links.map((link) => (
                <li
                  key={link.id}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-5 last:border-b-0"
                >
                  <span className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-right text-base leading-7 text-ink underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.href.replace(/^mailto:/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
