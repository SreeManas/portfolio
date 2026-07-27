import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { JourneyStatistics } from "@/sections/journey-experience/components/JourneyStatistics";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyStatisticsSectionProps {
  content: JourneyExperienceContent["statistics"];
}

export function JourneyStatisticsSection({
  content,
}: JourneyStatisticsSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-statistics-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-statistics-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <JourneyStatistics items={content.items} />
        </Reveal>
      </Container>
    </section>
  );
}
