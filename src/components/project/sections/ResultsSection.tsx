import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { MetricsGrid } from "@/components/documentation/MetricsGrid";
import type { ResultsData } from "@/content/projects/types";

interface ResultsSectionProps {
  data: ResultsData;
}

export function ResultsSection({ data }: ResultsSectionProps): ReactElement | null {
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

      {data.summary ? (
        <p className="mt-5 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground">
          {data.summary}
        </p>
      ) : null}

      {data.metricsData && data.metricsData.length > 0 ? (
        <div className="mt-8">
          <MetricsGrid metrics={data.metricsData} />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {data.metrics.map((metric) => (
            <div
              key={metric.id}
              className="card-interactive border border-border bg-paper p-6"
            >
              <p className="font-display text-4xl text-accent">{metric.value}</p>
              <p className="mt-2 text-base font-semibold text-ink">{metric.label}</p>
              {metric.description ? (
                <p className="mt-1.5 text-xs text-muted-foreground">{metric.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {data.userImpact ? (
        <div className="mt-8 border-l-2 border-accent bg-paper p-5">
          <p className="font-mono text-xs uppercase text-accent font-semibold">User Impact</p>
          <p className="mt-2 text-base leading-7 text-ink">{data.userImpact}</p>
        </div>
      ) : null}
    </section>
  );
}
