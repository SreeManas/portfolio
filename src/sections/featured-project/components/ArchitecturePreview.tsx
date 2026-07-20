import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { CaseStudyTextBlock } from "@/sections/featured-project/types";

interface ArchitecturePreviewProps {
  preview: CaseStudyTextBlock;
}

export function ArchitecturePreview({
  preview,
}: ArchitecturePreviewProps): ReactElement {
  return (
    <section aria-labelledby={`${preview.id}-title`}>
      <SectionLabel className="text-accent">{preview.label}</SectionLabel>
      <div className="mt-5 border-y border-border py-6">
        <div className="grid min-h-[22rem] gap-8 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-end">
          <div>
            <h3
              id={`${preview.id}-title`}
              className="font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {preview.title}
            </h3>
            <p className="mt-5 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
              {preview.body}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="grid aspect-[4/3] place-items-center border-l border-border pl-6"
          >
            <div className="h-full w-full border-y border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}

