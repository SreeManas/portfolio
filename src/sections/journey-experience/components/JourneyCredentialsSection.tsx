import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyCredentialsSectionProps {
  content: JourneyExperienceContent["credentials"];
}

export function JourneyCredentialsSection({
  content,
}: JourneyCredentialsSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-credentials-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-credentials-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {content.items.map((item) => (
              <li
                key={item.id}
                className="grid gap-4 py-7 sm:grid-cols-[minmax(0,0.28fr)_minmax(0,0.44fr)_minmax(0,0.14fr)_auto] sm:items-center sm:gap-6"
              >
                <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                  {item.provider}
                </p>
                <h3 className="text-lg font-semibold leading-7 text-ink md:text-xl">
                  {item.title}
                </h3>
                <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                  {item.year}
                </p>
                <p className="inline-flex items-center gap-2 font-mono text-xs uppercase leading-6 text-accent">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent"
                  />
                  {item.status}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
