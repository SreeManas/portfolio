import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { CaseStudyTextBlock } from "@/sections/featured-project/types";

interface StatusBlockProps {
  block: CaseStudyTextBlock;
}

export function StatusBlock({ block }: StatusBlockProps): ReactElement {
  return (
    <section aria-labelledby={`${block.id}-title`}>
      <SectionLabel className="text-accent">{block.label}</SectionLabel>
      <h3
        id={`${block.id}-title`}
        className="mt-4 text-lg font-semibold leading-7 text-ink"
      >
        {block.title}
      </h3>
      <p className="mt-3 max-w-[var(--measure-note)] text-sm leading-6 text-muted-foreground">
        {block.body}
      </p>
    </section>
  );
}

