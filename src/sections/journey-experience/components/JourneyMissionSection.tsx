import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { JourneyIcon } from "@/sections/journey-experience/components/JourneyIcon";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyMissionSectionProps {
  content: JourneyExperienceContent["mission"];
}

export function JourneyMissionSection({
  content,
}: JourneyMissionSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-mission-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-mission-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {content.focusAreas.map((area, index) => (
              <li key={area.id}>
                <Reveal
                  distance={12}
                  transition={{
                    duration: motionTiming.standard,
                    delay: Math.min(index * 0.04, 0.16),
                  }}
                >
                  <article className="group h-full border border-border bg-paper p-6 transition-all duration-200 ease-dossier hover:-translate-y-1 hover:shadow-soft md:p-7">
                    <span className="flex size-10 items-center justify-center rounded-control border border-border text-accent transition-colors duration-200 ease-dossier group-hover:border-accent group-hover:bg-accent-soft">
                      <JourneyIcon name={area.icon} />
                    </span>
                    <h3 className="mt-6 font-display text-2xl leading-tight text-ink">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      {area.description}
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
