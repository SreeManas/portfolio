import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Callout } from "@/components/documentation/Callout";
import type { ProblemStatementData } from "@/content/projects/types";

interface ProblemSectionProps {
  data: ProblemStatementData;
}

export function ProblemSection({ data }: ProblemSectionProps): ReactElement | null {
  if (data.visible === false) return null;

  return (
    <section id={data.id} aria-labelledby={`${data.id}-title`}>
      <SectionLabel className="text-accent">{data.label}</SectionLabel>
      <h2
        id={`${data.id}-title`}
        className="mt-4 max-w-[var(--measure-copy)] text-2xl font-semibold leading-tight text-ink text-balance md:text-3xl"
      >
        {data.title}
      </h2>

      <p className="mt-5 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground">
        {data.problem}
      </p>

      {data.calloutData ? (
        <Callout type={data.calloutData.type} title={data.calloutData.title}>
          {data.calloutData.message}
        </Callout>
      ) : null}

      {data.targetUsers ? (
        <div className="mt-6 font-mono text-xs text-muted-foreground">
          <span className="uppercase text-ink font-semibold">Target Audience: </span>
          <span>{data.targetUsers}</span>
        </div>
      ) : null}

      {data.painPoints && data.painPoints.length > 0 ? (
        <div className="mt-6 border-y border-border py-4">
          <p className="font-mono text-xs uppercase text-muted-foreground">
            Pain Points & Constraints
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
            {data.painPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span aria-hidden="true" className="text-muted-foreground">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.breakdown ? (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="border border-border bg-paper p-5">
            <p className="font-mono text-xs uppercase text-accent font-semibold">
              Problem
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">{data.breakdown.problem}</p>
          </div>
          <div className="border border-border bg-paper p-5">
            <p className="font-mono text-xs uppercase text-accent font-semibold">
              Impact
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">{data.breakdown.impact}</p>
          </div>
          <div className="border border-border bg-paper p-5">
            <p className="font-mono text-xs uppercase text-accent font-semibold">
              Opportunity
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">{data.breakdown.opportunity}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
