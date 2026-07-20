import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { currentlyBuildingContent } from "@/content/currentlyBuilding";
import { motionTiming } from "@/lib/motion";
import { FutureReadingList } from "@/sections/currently-building/components/FutureReadingList";
import { ProgressList } from "@/sections/currently-building/components/ProgressList";

export function CurrentlyBuilding(): ReactElement {
  return (
    <Section
      id={currentlyBuildingContent.id}
      aria-labelledby="currently-building-title"
      width="content"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="max-w-[var(--measure-copy)]">
          <h2
            id="currently-building-title"
            className="font-display text-4xl leading-none text-ink text-balance md:text-6xl"
          >
            {currentlyBuildingContent.title}
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:gap-12">
            <div>
              <SectionLabel>{currentlyBuildingContent.focusLabel}</SectionLabel>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {currentlyBuildingContent.focus}
              </p>
            </div>
            <div>
              <SectionLabel>{currentlyBuildingContent.systemLabel}</SectionLabel>
              <p className="mt-4 font-display text-3xl leading-tight text-ink">
                {currentlyBuildingContent.system}
              </p>
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <SectionLabel className="text-accent">
              {currentlyBuildingContent.stageLabel}
            </SectionLabel>
            <div className="mt-5">
              <ProgressList stages={currentlyBuildingContent.stages} />
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <EditorialDivider />
            <div className="mt-8">
              <SectionLabel className="text-accent">
                {currentlyBuildingContent.futureReadingLabel}
              </SectionLabel>
              <div className="mt-5">
                <FutureReadingList
                  items={currentlyBuildingContent.futureReading}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

