import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { CaseStudyTextBlock } from "@/sections/featured-project/types";

interface NarrativeBlockProps {
  block: CaseStudyTextBlock;
}

export function NarrativeBlock({ block }: NarrativeBlockProps): ReactElement {
  return (
    <section aria-labelledby={`${block.id}-title`}>
      <SectionLabel className="text-accent">{block.label}</SectionLabel>
      <h3
        id={`${block.id}-title`}
        className="mt-4 max-w-[var(--measure-copy)] text-2xl font-semibold leading-tight text-ink text-balance md:text-3xl"
      >
        {block.title}
      </h3>
      <p className="mt-5 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground">
        {block.body}
      </p>
    </section>
  );
}

