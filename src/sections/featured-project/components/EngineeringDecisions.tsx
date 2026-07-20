import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { CaseStudyDecision } from "@/sections/featured-project/types";

interface EngineeringDecisionsProps {
  label: string;
  decisions: readonly CaseStudyDecision[];
}

export function EngineeringDecisions({
  label,
  decisions,
}: EngineeringDecisionsProps): ReactElement {
  return (
    <section aria-labelledby="engineering-decisions-title">
      <SectionLabel className="text-accent">{label}</SectionLabel>
      <div id="engineering-decisions-title" className="mt-5">
        <dl className="divide-y divide-border border-y border-border">
          {decisions.map((item) => (
            <div key={item.id} className="grid gap-5 py-6 md:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                  Decision
                </dt>
                <dd className="mt-2 text-base font-semibold leading-7 text-ink">
                  {item.decision}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                  Reason
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.reason}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                  Tradeoff
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.tradeoff}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

