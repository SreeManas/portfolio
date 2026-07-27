import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { JourneyFilterBar } from "@/sections/journey-experience/components/JourneyFilterBar";
import { JourneyTimeline } from "@/sections/journey-experience/components/JourneyTimeline";
import { motionEase, motionTiming } from "@/lib/motion";
import type {
  JourneyExperienceContent,
  JourneyFilter,
} from "@/journey/types";

interface JourneyTimelineSectionProps {
  content: JourneyExperienceContent["timeline"];
}

export function JourneyTimelineSection({
  content,
}: JourneyTimelineSectionProps): ReactElement {
  const [filter, setFilter] = useState<JourneyFilter>("All");
  const prefersReducedMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    if (filter === "All") {
      return content.items;
    }

    return content.items.filter((item) => item.category === filter);
  }, [content.items, filter]);

  return (
    <section
      aria-labelledby="journey-timeline-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-timeline-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <div className="mt-10">
            <JourneyFilterBar
              filters={content.filters}
              selected={filter}
              onSelect={setFilter}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{
                duration: motionTiming.standard,
                ease: motionEase,
              }}
            >
              <JourneyTimeline items={filteredItems} />
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
}
