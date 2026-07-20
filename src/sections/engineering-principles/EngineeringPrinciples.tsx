import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { NumberedEditorialList } from "@/components/editorial/NumberedEditorialList";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { engineeringPrinciplesContent } from "@/content/engineeringPrinciples";
import { motionTiming } from "@/lib/motion";

export function EngineeringPrinciples(): ReactElement {
  return (
    <Section
      id={engineeringPrinciplesContent.id}
      aria-labelledby="engineering-principles-title"
      width="wide"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-24">
          <div>
            <SectionLabel>{engineeringPrinciplesContent.label}</SectionLabel>
            <h2
              id="engineering-principles-title"
              className="mt-5 max-w-[18rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {engineeringPrinciplesContent.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
              {engineeringPrinciplesContent.introduction}
            </p>
          </div>

          <div>
            <NumberedEditorialList
              items={engineeringPrinciplesContent.principles}
            />
            <div className="mt-14 md:mt-16">
              <EditorialDivider />
              <p className="mt-5 max-w-[var(--measure-note)] text-sm leading-6 text-muted-foreground">
                {engineeringPrinciplesContent.transition}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

