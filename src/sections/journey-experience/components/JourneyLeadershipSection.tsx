import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyLeadershipSectionProps {
  content: JourneyExperienceContent["leadership"];
}

export function JourneyLeadershipSection({
  content,
}: JourneyLeadershipSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-leadership-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-leadership-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <ul className="mt-10 grid list-none gap-5 p-0 lg:grid-cols-2">
            {content.items.map((item, index) => (
              <li key={item.id}>
                <Reveal
                  distance={12}
                  transition={{
                    duration: motionTiming.standard,
                    delay: Math.min(index * 0.05, 0.12),
                  }}
                >
                  <article className="group h-full border border-border bg-paper p-6 transition-all duration-200 ease-dossier hover:-translate-y-1 hover:shadow-soft md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-xs uppercase leading-6 text-accent">
                        {item.organisation}
                      </p>
                      <span
                        aria-hidden="true"
                        className="font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 ease-dossier group-hover:translate-x-1 group-hover:text-ink"
                      >
                        →
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl leading-tight text-ink">
                      {item.role}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase leading-6 text-muted-foreground">
                      {item.duration}
                    </p>

                    <h4 className="mt-8 font-mono text-xs uppercase leading-6 text-muted-foreground">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2 text-base leading-7 text-muted-foreground">
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex gap-3">
                          <span aria-hidden="true" className="text-accent">
                            ·
                          </span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-8 border-t border-border pt-5 text-base leading-7 text-ink">
                      {item.takeaway}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
