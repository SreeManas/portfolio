import type { ReactElement } from "react";

import type {
  ProjectDecisionLabels,
  ProjectDecisionRecord,
} from "@/project-engine/types";

interface ProjectDecisionProps {
  item: ProjectDecisionRecord;
  labels: ProjectDecisionLabels;
}

export function ProjectDecision({
  item,
  labels,
}: ProjectDecisionProps): ReactElement {
  return (
    <div className="grid gap-5 py-6 md:grid-cols-3">
      <div>
        <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
          {labels.decision}
        </dt>
        <dd className="mt-2 text-base font-semibold leading-7 text-ink">
          {item.decision}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
          {labels.why}
        </dt>
        <dd className="mt-2 text-sm leading-6 text-muted-foreground">
          {item.why}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
          {labels.tradeoff}
        </dt>
        <dd className="mt-2 text-sm leading-6 text-muted-foreground">
          {item.tradeoff}
        </dd>
      </div>
    </div>
  );
}
