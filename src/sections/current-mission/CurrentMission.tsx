import type { ReactElement } from "react";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { EditorialQuote } from "@/components/editorial/EditorialQuote";
import { ReadingColumn } from "@/components/editorial/ReadingColumn";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { currentMissionContent } from "@/content/currentMission";
import { motionTiming } from "@/lib/motion";

export function CurrentMission(): ReactElement {
  return (
    <Section
      id={currentMissionContent.id}
      aria-labelledby="current-mission-title"
      width="wide"
      className="border-t-0"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-24">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <SectionLabel>{currentMissionContent.label}</SectionLabel>
            <h2
              id="current-mission-title"
              className="mt-5 max-w-[16rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {currentMissionContent.statement}
            </h2>
          </div>

          <div>
            <ReadingColumn>
              {currentMissionContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </ReadingColumn>

            <EditorialQuote
              lines={currentMissionContent.quote}
              className="mt-12 md:mt-14"
            />

            <div className="mt-12 md:mt-14">
              <SectionLabel className="text-accent">
                {currentMissionContent.exploringLabel}
              </SectionLabel>
              <ul className="mt-5 flex flex-wrap gap-y-3 text-sm leading-6 text-ink">
                {currentMissionContent.exploring.map((item) => (
                  <li
                    key={item}
                    className="border-l border-border px-4 first:border-l-0 first:pl-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 md:mt-16">
              <EditorialDivider />
              <p className="mt-5 max-w-[var(--measure-note)] text-sm leading-6 text-muted-foreground">
                {currentMissionContent.transition}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
