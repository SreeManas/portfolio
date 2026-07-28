import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { ApiFlow } from "@/components/documentation/ApiFlow";
import { SequenceDiagram } from "@/components/documentation/SequenceDiagram";
import { Callout } from "@/components/documentation/Callout";
import type { SolutionOverviewData } from "@/content/projects/types";

interface SolutionSectionProps {
  data: SolutionOverviewData;
}

export function SolutionSection({ data }: SolutionSectionProps): ReactElement | null {
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
        {data.architectureSummary}
      </p>

      {data.calloutData ? (
        <Callout type={data.calloutData.type} title={data.calloutData.title}>
          {data.calloutData.message}
        </Callout>
      ) : null}

      {data.designPhilosophy ? (
        <div className="mt-6 border-l-2 border-accent bg-paper p-4 text-sm leading-6 text-ink italic">
          "{data.designPhilosophy}"
        </div>
      ) : null}

      {data.apiFlowData ? (
        <div className="mt-8">
          <ApiFlow data={data.apiFlowData} />
        </div>
      ) : null}

      {data.sequenceData ? (
        <div className="mt-8">
          <SequenceDiagram data={data.sequenceData} />
        </div>
      ) : null}

      {data.majorSystems && data.majorSystems.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {data.majorSystems.map((system, index) => (
            <div key={index} className="border border-border p-5 bg-paper">
              <h3 className="text-base font-semibold text-ink">{system.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {system.description}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {data.workflow && data.workflow.length > 0 ? (
        <div className="mt-8">
          <p className="font-mono text-xs uppercase text-muted-foreground">
            System Workflow Steps
          </p>
          <ol className="mt-4 divide-y divide-border border-y border-border">
            {data.workflow.map((step, index) => (
              <li
                key={index}
                className="grid gap-2 py-3.5 sm:grid-cols-[3rem_1fr] sm:items-center"
              >
                <span className="font-mono text-xs font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
