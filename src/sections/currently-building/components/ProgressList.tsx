import type { ReactElement } from "react";

import type { BuildStage } from "@/sections/currently-building/types";

interface ProgressListProps {
  stages: readonly BuildStage[];
}

function getStateLabel(state: BuildStage["state"]): string {
  return state;
}

export function ProgressList({ stages }: ProgressListProps): ReactElement {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {stages.map((stage, index) => (
        <li key={stage.id} className="grid gap-3 py-5 sm:grid-cols-[5rem_1fr_8rem] sm:gap-6">
          <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="text-base leading-7 text-ink">{stage.label}</p>
          <p className="font-mono text-xs uppercase leading-6 text-muted-foreground sm:text-right">
            {getStateLabel(stage.state)}
          </p>
        </li>
      ))}
    </ol>
  );
}

