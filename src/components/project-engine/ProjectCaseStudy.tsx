import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { ProjectArchitecturePlaceholder } from "@/components/project-engine/ProjectArchitecturePlaceholder";
import { ProjectDecisionList } from "@/components/project-engine/ProjectDecisionList";
import { ProjectDecisionPipeline } from "@/components/project-engine/ProjectDecisionPipeline";
import { ProjectHero } from "@/components/project-engine/ProjectHero";
import { ProjectMetadata } from "@/components/project-engine/ProjectMetadata";
import { ProjectSection } from "@/components/project-engine/ProjectSection";
import type { ProjectCaseStudy as ProjectCaseStudyData } from "@/project-engine/types";

interface ProjectCaseStudyProps {
  project: ProjectCaseStudyData;
}

export function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps): ReactElement {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(16rem,0.3fr)] lg:gap-16">
      <article>
        <ProjectHero
          label={project.display.label}
          project={project}
          titleId={project.display.titleId}
        />

        <div className="mt-14 space-y-14 md:mt-16 md:space-y-16">
          {project.display.narrativeBlocks.map((block) => (
            <ProjectSection key={block.id} block={block} />
          ))}

          <ProjectArchitecturePlaceholder architecture={project.architecture} />

          <ProjectDecisionPipeline pipeline={project.decisionPipeline} />

          <ProjectDecisionList group={project.engineeringDecisions} />

          <div className="grid gap-10 border-y border-border py-8 md:grid-cols-2 md:gap-12">
            <ProjectSection block={project.display.status} density="compact" />
            <ProjectSection block={project.futureWork} density="compact" />
          </div>

          <EditorialDivider />
        </div>
      </article>

      <ProjectMetadata
        label={project.display.metadataLabel}
        items={project.metadata}
      />
    </div>
  );
}
