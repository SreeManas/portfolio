import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { RoadmapData, RoadmapItem } from "@/content/projects/types";

interface RoadmapSectionProps {
  data: RoadmapData;
}

function getStatusBadgeStyle(status: RoadmapItem["status"]): string {
  switch (status) {
    case "Completed":
      return "border-emerald-600/30 text-emerald-700 bg-emerald-500/10";
    case "In Progress":
      return "border-accent/40 text-accent bg-accent/10";
    case "Planned":
      return "border-border text-muted-foreground bg-canvas";
    case "Research":
      return "border-purple-600/30 text-purple-700 bg-purple-500/10";
  }
}

export function RoadmapSection({ data }: RoadmapSectionProps): ReactElement | null {
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

      <div className="mt-8 relative border-l border-border pl-6 space-y-8">
        {data.items.map((item) => (
          <div key={item.id} className="relative">
            <span className="absolute -left-[1.875rem] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-canvas" />
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-muted-foreground uppercase">{item.period}</span>
              <span
                className={`font-mono text-[0.625rem] font-semibold uppercase tracking-wider px-2 py-0.5 border ${getStatusBadgeStyle(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
