import { useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface ApiFlowStep {
  id: string;
  title: string;
  sublabel?: string;
  description?: string;
  status?: "success" | "pending" | "error";
  details?: readonly string[];
}

export interface ApiFlowData {
  title?: string;
  description?: string;
  steps: ApiFlowStep[];
  direction?: "horizontal" | "vertical";
}

interface ApiFlowProps {
  data: ApiFlowData;
  className?: string;
}

export function ApiFlow({ data, className }: ApiFlowProps): ReactElement {
  const [activeStepId, setActiveStepId] = useState<string>(data.steps[0]?.id ?? "");
  const activeStep = data.steps.find((s) => s.id === activeStepId);
  const isHorizontal = (data.direction ?? "horizontal") === "horizontal";

  return (
    <figure
      aria-label={data.title || "API Request Flow"}
      className={cn("border border-border bg-paper p-6 md:p-8 rounded-panel shadow-sm", className)}
    >
      {data.title ? (
        <figcaption className="border-b border-border pb-5 mb-6">
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
            Execution Flow
          </span>
          <h3 className="mt-2.5 text-xl font-semibold text-ink">{data.title}</h3>
          {data.description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{data.description}</p>
          ) : null}
        </figcaption>
      ) : null}

      <div
        className={cn(
          "grid gap-4",
          isHorizontal
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            : "grid-cols-1",
        )}
      >
        {data.steps.map((step, index) => {
          const isActive = step.id === activeStepId;
          return (
            <div key={step.id} className="relative flex flex-col justify-between">
              <button
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className={cn(
                  "w-full text-left p-4 border rounded-control transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                  isActive
                    ? "border-accent bg-accent/5 shadow-sm"
                    : "border-border bg-canvas/40 hover:border-accent/40",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-accent">
                    0{index + 1}
                  </span>
                  {step.status ? (
                    <span
                      className={cn(
                        "font-mono text-[0.625rem] font-semibold uppercase px-1.5 py-0.2 border",
                        step.status === "success"
                          ? "border-emerald-600/30 text-emerald-700 bg-emerald-500/10"
                          : step.status === "error"
                            ? "border-red-600/30 text-red-700 bg-red-500/10"
                            : "border-amber-600/30 text-amber-700 bg-amber-500/10",
                      )}
                    >
                      {step.status}
                    </span>
                  ) : null}
                </div>

                <h4 className="mt-3 text-sm font-semibold text-ink">{step.title}</h4>
                {step.sublabel ? (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {step.sublabel}
                  </p>
                ) : null}
              </button>

              {index < data.steps.length - 1 && isHorizontal ? (
                <div
                  aria-hidden="true"
                  className="hidden lg:flex items-center justify-center my-2 text-accent font-bold text-lg"
                >
                  →
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {activeStep ? (
        <div className="mt-6 border-t border-border pt-4 bg-canvas/40 p-4 border border-border/80 rounded-control">
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-accent font-semibold">
            Step Details: {activeStep.title}
          </span>
          {activeStep.description ? (
            <p className="mt-2 text-xs leading-6 text-ink">{activeStep.description}</p>
          ) : null}
          {activeStep.details && activeStep.details.length > 0 ? (
            <ul className="mt-3 space-y-1.5 font-mono text-xs text-muted-foreground border-t border-border/50 pt-2.5">
              {activeStep.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}
