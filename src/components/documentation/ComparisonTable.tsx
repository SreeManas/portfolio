import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface ComparisonFeature {
  name: string;
  optionA: string | boolean;
  optionB: string | boolean;
  notes?: string;
}

export interface ComparisonTableData {
  title?: string;
  optionAName: string;
  optionBName: string;
  recommendedOption?: "A" | "B";
  features: ComparisonFeature[];
}

interface ComparisonTableProps {
  data: ComparisonTableData;
  className?: string;
}

function renderValue(val: string | boolean): ReactElement {
  if (typeof val === "boolean") {
    return val ? (
      <span className="text-emerald-700 font-bold">✓ Yes</span>
    ) : (
      <span className="text-muted-foreground">✕ No</span>
    );
  }
  return <span className="text-ink">{val}</span>;
}

export function ComparisonTable({ data, className }: ComparisonTableProps): ReactElement {
  return (
    <figure
      aria-label={data.title || "Architecture Comparison Table"}
      className={cn("border border-border bg-paper p-6 md:p-8 rounded-panel shadow-sm overflow-x-auto", className)}
    >
      {data.title ? (
        <figcaption className="border-b border-border pb-5 mb-6">
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
            Architecture Comparison
          </span>
          <h3 className="mt-2.5 text-xl font-semibold text-ink">{data.title}</h3>
        </figcaption>
      ) : null}

      <table className="w-full border-collapse text-sm text-left">
        <thead>
          <tr className="border-b border-border bg-canvas/60 font-mono text-xs uppercase text-muted-foreground">
            <th className="p-3.5 font-semibold">Feature / Metric</th>
            <th
              className={cn(
                "p-3.5 font-semibold",
                data.recommendedOption === "A" && "text-accent bg-accent/5 border-x border-accent/40",
              )}
            >
              {data.optionAName} {data.recommendedOption === "A" ? "(Recommended ★)" : ""}
            </th>
            <th
              className={cn(
                "p-3.5 font-semibold",
                data.recommendedOption === "B" && "text-accent bg-accent/5 border-x border-accent/40",
              )}
            >
              {data.optionBName} {data.recommendedOption === "B" ? "(Recommended ★)" : ""}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 font-mono text-xs">
          {data.features.map((feature, idx) => (
            <tr key={idx} className="hover:bg-canvas/30 transition-colors">
              <td className="p-3.5 font-semibold text-ink">
                {feature.name}
                {feature.notes ? (
                  <p className="font-sans text-[0.6875rem] font-normal text-muted-foreground mt-0.5">
                    {feature.notes}
                  </p>
                ) : null}
              </td>
              <td
                className={cn(
                  "p-3.5",
                  data.recommendedOption === "A" && "bg-accent/5 border-x border-accent/20 font-semibold",
                )}
              >
                {renderValue(feature.optionA)}
              </td>
              <td
                className={cn(
                  "p-3.5",
                  data.recommendedOption === "B" && "bg-accent/5 border-x border-accent/20 font-semibold",
                )}
              >
                {renderValue(feature.optionB)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
