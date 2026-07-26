import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ProjectArchitectureBlock } from "@/project-engine/types";

interface ProjectArchitecturePlaceholderProps {
  architecture: ProjectArchitectureBlock;
}

export function ProjectArchitecturePlaceholder({
  architecture,
}: ProjectArchitecturePlaceholderProps): ReactElement {
  return (
    <section aria-labelledby={`${architecture.id}-title`}>
      <SectionLabel className="text-accent">{architecture.label}</SectionLabel>
      <div className="mt-5 border-y border-border py-6">
        <div className="grid min-h-[22rem] gap-8 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-end">
          <div>
            <h3
              id={`${architecture.id}-title`}
              className="font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {architecture.title}
            </h3>
            <p className="mt-5 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
              {architecture.body}
            </p>
          </div>
          <div
            aria-label={architecture.canvasLabel}
            className="grid aspect-[4/3] place-items-center border-l border-border pl-6"
          >
            <div className="h-full w-full border-y border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
