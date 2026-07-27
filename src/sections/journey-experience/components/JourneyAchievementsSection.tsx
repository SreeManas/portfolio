import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyAchievementsSectionProps {
  content: JourneyExperienceContent["achievements"];
}

export function JourneyAchievementsSection({
  content,
}: JourneyAchievementsSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-achievements-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-achievements-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <li key={item.id}>
                <Reveal
                  distance={12}
                  transition={{
                    duration: motionTiming.standard,
                    delay: Math.min(index * 0.04, 0.16),
                  }}
                >
                  <article className="group h-full border border-border bg-paper p-6 transition-all duration-200 ease-dossier hover:-translate-y-1 hover:shadow-soft md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-xs uppercase leading-6 text-accent">
                        {item.context}
                      </p>
                      <span
                        aria-hidden="true"
                        className="font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 ease-dossier group-hover:translate-x-1 group-hover:text-ink"
                      >
                        →
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-ink text-balance">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      {item.detail}
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
