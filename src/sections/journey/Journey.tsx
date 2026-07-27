import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { journeyContent } from "@/content/journey";
import { motionTiming } from "@/lib/motion";

export function Journey(): ReactElement {
  return (
    <Section id={journeyContent.id} aria-labelledby="journey-title" width="content">
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="max-w-[var(--measure-copy)]">
          <SectionLabel>{journeyContent.label}</SectionLabel>
          <h2
            id="journey-title"
            className="mt-5 font-display text-4xl leading-none text-ink text-balance md:text-6xl"
          >
            {journeyContent.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            {journeyContent.introduction}
          </p>
        </div>

        <ol className="mt-14 divide-y divide-border border-y border-border md:mt-16">
          {journeyContent.milestones.map((milestone) => {
            const links = milestone.links ?? [];

            return (
              <li key={milestone.id} className="py-9 md:py-10">
                <article className="grid gap-5 sm:grid-cols-[7rem_1fr] sm:gap-8">
                  <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    <time dateTime={milestone.year}>{milestone.year}</time>
                  </p>

                  <div>
                    <h3 className="text-xl font-semibold leading-7 text-ink">
                      {milestone.title}
                    </h3>
                    <p className="mt-4 max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground">
                      {milestone.description}
                    </p>

                    {links.length > 0 ? (
                      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground">
                        {links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <a
          href="/journey"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 transition-colors duration-200 ease-dossier hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Open full journey
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </Section>
  );
}
