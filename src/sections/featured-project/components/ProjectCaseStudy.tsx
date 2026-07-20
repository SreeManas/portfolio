import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { ArchitecturePreview } from "@/sections/featured-project/components/ArchitecturePreview";
import { DecisionPipeline } from "@/sections/featured-project/components/DecisionPipeline";
import { EngineeringDecisions } from "@/sections/featured-project/components/EngineeringDecisions";
import { EvidenceRail } from "@/sections/featured-project/components/EvidenceRail";
import { NarrativeBlock } from "@/sections/featured-project/components/NarrativeBlock";
import { ProjectHeader } from "@/sections/featured-project/components/ProjectHeader";
import { StatusBlock } from "@/sections/featured-project/components/StatusBlock";
import type { CaseStudyContent } from "@/sections/featured-project/types";

interface ProjectCaseStudyProps {
  content: CaseStudyContent;
}

export function ProjectCaseStudy({
  content,
}: ProjectCaseStudyProps): ReactElement {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(16rem,0.3fr)] lg:gap-16">
      <article>
        <ProjectHeader
          label={content.label}
          name={content.name}
          summary={content.summary}
        />

        <div className="mt-14 space-y-14 md:mt-16 md:space-y-16">
          {content.narrativeBlocks.map((block) => (
            <NarrativeBlock key={block.id} block={block} />
          ))}

          <ArchitecturePreview preview={content.architecturePreview} />

          <DecisionPipeline
            label={content.pipeline.label}
            steps={content.pipeline.steps}
          />

          <EngineeringDecisions
            label={content.decisions.label}
            decisions={content.decisions.items}
          />

          <div className="grid gap-10 border-y border-border py-8 md:grid-cols-2 md:gap-12">
            <StatusBlock block={content.status} />
            <StatusBlock block={content.futureWork} />
          </div>

          <EditorialDivider />
        </div>
      </article>

      <EvidenceRail items={content.evidenceRail} />
    </div>
  );
}

