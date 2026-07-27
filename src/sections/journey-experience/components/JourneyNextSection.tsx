import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyNextSectionProps {
  content: JourneyExperienceContent["next"];
}

export function JourneyNextSection({
  content,
}: JourneyNextSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-next-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <div>
              <SectionLabel>{content.label}</SectionLabel>
              <h2
                id="journey-next-title"
                className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
              >
                {content.title}
              </h2>
              <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                {content.introduction}
              </p>
            </div>

            <ol className="divide-y divide-border border-y border-border">
              {content.items.map((item, index) => (
                <li key={item.id} className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                  <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold leading-7 text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
