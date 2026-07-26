import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ProjectPipeline } from "@/project-engine/types";

interface ProjectDecisionPipelineProps {
  pipeline: ProjectPipeline;
}

export function ProjectDecisionPipeline({
  pipeline,
}: ProjectDecisionPipelineProps): ReactElement {
  return (
    <section aria-labelledby={`${pipeline.id}-label`}>
      <SectionLabel id={`${pipeline.id}-label`} className="text-accent">
        {pipeline.label}
      </SectionLabel>
      <ol
        className="mt-5 divide-y divide-border border-y border-border"
      >
        {pipeline.steps.map((step, index) => (
          <li key={step.id} className="grid gap-3 py-4 sm:grid-cols-[4rem_1fr]">
            <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="text-base leading-7 text-ink">{step.label}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
