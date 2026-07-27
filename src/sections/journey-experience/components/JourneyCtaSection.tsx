import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyCtaSectionProps {
  content: JourneyExperienceContent["cta"];
}

export function JourneyCtaSection({
  content,
}: JourneyCtaSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-cta-title"
      className="py-[var(--section-space)]"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="border border-border bg-paper px-6 py-10 transition-shadow duration-200 ease-dossier hover:shadow-soft md:px-10 md:py-14">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-cta-title"
              className="mt-5 max-w-[20rem] font-display text-3xl leading-tight text-ink text-balance md:max-w-[28rem] md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={content.primary.href}
                className="group inline-flex items-center gap-2 rounded-control border border-ink bg-ink px-4 py-3 text-sm font-medium text-canvas transition-all duration-200 ease-dossier hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {content.primary.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-dossier group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={content.secondary.href}
                className="group inline-flex items-center gap-2 rounded-control border border-border bg-canvas px-4 py-3 text-sm font-medium text-ink transition-all duration-200 ease-dossier hover:-translate-y-0.5 hover:border-ink hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {content.secondary.label}
                <span
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform duration-200 ease-dossier group-hover:translate-x-1 group-hover:text-ink"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
