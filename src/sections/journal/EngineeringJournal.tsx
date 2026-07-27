import type { ReactElement } from "react";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { journalContent } from "@/content/journal";
import { motionTiming } from "@/lib/motion";
import { JournalEntryList } from "@/sections/journal/components/JournalEntryList";

export function EngineeringJournal(): ReactElement {
  return (
    <Section
      id={journalContent.id}
      aria-labelledby="journal-title"
      width="content"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="max-w-[var(--measure-copy)]">
          <h2
            id="journal-title"
            className="font-display text-4xl leading-none text-ink text-balance md:text-6xl"
          >
            {journalContent.title}
          </h2>
          <p className="mt-6 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            {journalContent.introduction}
          </p>
        </div>

        <JournalEntryList
          entries={journalContent.entries}
          ordering={journalContent.ordering}
        />

        <a
          href="/notes"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 transition-colors duration-200 ease-dossier hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Open knowledge hub
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </Section>
  );
}

