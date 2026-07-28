import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ExecutiveSummaryData } from "@/content/projects/types";

interface ExecutiveSummaryProps {
  data: ExecutiveSummaryData;
}

export function ExecutiveSummarySection({ data }: ExecutiveSummaryProps): ReactElement | null {
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
        {data.overview}
      </p>

      {data.metrics && data.metrics.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {data.metrics.map((metric, index) => (
            <div
              key={index}
              className="card-interactive border border-border bg-paper p-6 rounded-panel shadow-sm"
            >
              <p className="font-display text-4xl text-accent font-semibold">{metric.value}</p>
              <p className="mt-2 font-mono text-xs font-semibold uppercase text-ink">{metric.label}</p>
              {metric.detail ? (
                <p className="mt-1.5 text-xs text-muted-foreground">{metric.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {data.keyAchievements && data.keyAchievements.length > 0 ? (
        <div className="mt-8 border-l-2 border-accent bg-paper p-6 rounded-panel shadow-sm">
          <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5 inline-block">
            Key Highlights
          </p>
          <ul className="mt-4 space-y-2.5 text-base leading-7 text-ink">
            {data.keyAchievements.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="text-accent font-bold">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
