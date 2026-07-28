import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface MetricItemData {
  id: string;
  label: string;
  value: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: string;
}

interface MetricsGridProps {
  metrics: MetricItemData[];
  title?: string;
  className?: string;
}

export function MetricsGrid({ metrics, title, className }: MetricsGridProps): ReactElement {
  return (
    <div className={cn("space-y-4", className)}>
      {title ? (
        <h3 className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="card-interactive border border-border bg-paper p-6 rounded-panel shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                {metric.label}
              </span>
              {metric.trend ? (
                <span
                  className={cn(
                    "font-mono text-[0.625rem] font-semibold uppercase px-1.5 py-0.5 border",
                    metric.trend === "up" && "border-emerald-600/30 text-emerald-700 bg-emerald-500/10",
                    metric.trend === "down" && "border-red-600/30 text-red-700 bg-red-500/10",
                    metric.trend === "neutral" && "border-border text-muted-foreground bg-canvas",
                  )}
                >
                  {metric.trend === "up" ? "↑ " : metric.trend === "down" ? "↓ " : "• "}
                  {metric.trendValue || metric.trend}
                </span>
              ) : null}
            </div>

            <p className="mt-3 font-display text-4xl text-accent font-semibold">
              {metric.value}
            </p>

            {metric.description ? (
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {metric.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
