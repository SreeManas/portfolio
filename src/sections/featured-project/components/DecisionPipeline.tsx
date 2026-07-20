import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { CaseStudyPipelineStep } from "@/sections/featured-project/types";

interface DecisionPipelineProps {
  label: string;
  steps: readonly CaseStudyPipelineStep[];
}

export function DecisionPipeline({
  label,
  steps,
}: DecisionPipelineProps): ReactElement {
  return (
    <section aria-labelledby="decision-pipeline-title">
      <SectionLabel className="text-accent">{label}</SectionLabel>
      <ol
        id="decision-pipeline-title"
        className="mt-5 divide-y divide-border border-y border-border"
      >
        {steps.map((step, index) => (
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

