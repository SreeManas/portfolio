import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import { ProjectDecision } from "@/components/project-engine/ProjectDecision";
import type { ProjectDecisionGroup } from "@/project-engine/types";

interface ProjectDecisionListProps {
  group: ProjectDecisionGroup;
}

export function ProjectDecisionList({
  group,
}: ProjectDecisionListProps): ReactElement {
  return (
    <section aria-labelledby={`${group.id}-label`}>
      <SectionLabel id={`${group.id}-label`} className="text-accent">
        {group.label}
      </SectionLabel>
      <div className="mt-5">
        <dl className="divide-y divide-border border-y border-border">
          {group.items.map((item) => (
            <ProjectDecision
              key={item.id}
              item={item}
              labels={group.labels}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
