import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyHackathonsSectionProps {
  content: JourneyExperienceContent["hackathons"];
}

export function JourneyHackathonsSection({
  content,
}: JourneyHackathonsSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-hackathons-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-hackathons-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 -mx-[var(--layout-gutter)] px-[var(--layout-gutter)] md:mx-0 md:px-0">
          <ul className="flex list-none gap-5 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
            {content.items.map((item, index) => (
              <li
                key={item.id}
                className="min-w-[min(100%,22rem)] shrink-0 snap-start md:min-w-0"
              >
                <Reveal
                  distance={12}
                  transition={{
                    duration: motionTiming.standard,
                    delay: Math.min(index * 0.05, 0.12),
                  }}
                >
                  <article className="group flex h-full flex-col border border-border bg-paper p-6 transition-all duration-200 ease-dossier hover:-translate-y-1 hover:shadow-soft md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                        <time dateTime={item.date}>{item.date}</time>
                      </p>
                      <span
                        aria-hidden="true"
                        className="font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 ease-dossier group-hover:translate-x-1 group-hover:text-ink"
                      >
                        →
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-3xl leading-tight text-ink text-balance">
                      {item.event}
                    </h3>
                    <p className="mt-3 font-mono text-xs uppercase leading-6 text-accent">
                      {item.achievement}
                    </p>

                    {item.technologies.length > 0 ? (
                      <ul
                        aria-label="Technologies"
                        className="mt-6 flex flex-wrap gap-2"
                      >
                        {item.technologies.map((technology) => (
                          <li
                            key={technology}
                            className="rounded-control border border-border px-2.5 py-1 font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-6 font-mono text-xs uppercase leading-6 text-muted-foreground">
                        Stack details reserved until published with the project
                      </p>
                    )}

                    <p className="mt-auto border-t border-border pt-5 text-base leading-7 text-muted-foreground">
                      <span className="font-mono text-xs uppercase text-ink">
                        Lesson
                      </span>
                      <span className="mt-2 block">{item.lesson}</span>
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
