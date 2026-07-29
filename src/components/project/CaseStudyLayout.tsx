import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { TableOfContents, type TocItem } from "@/components/navigation/TableOfContents";
import type { ProjectCaseStudy } from "@/content/projects/types";

import { ArchitectureSection } from "./sections/ArchitectureSection";
import { ChallengesSection } from "./sections/ChallengesSection";
import { DecisionsSection } from "./sections/DecisionsSection";
import { ExecutiveSummarySection } from "./sections/ExecutiveSummarySection";
import { HeroSection } from "./sections/HeroSection";
import { LessonsSection } from "./sections/LessonsSection";
import { ProblemSection } from "./sections/ProblemSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { ResultsSection } from "./sections/ResultsSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { SolutionSection } from "./sections/SolutionSection";
import { TechStackSection } from "./sections/TechStackSection";

import { getProjectConnections } from "@/lib/discovery";
import type { EntityUrn } from "@/lib/knowledge";
import { KnowledgeSection } from "@/components/knowledge/KnowledgeSection";
import { EmptyState } from "@/components/knowledge/EmptyState";
import { ReadingCompanionSidebar, SidebarWidget } from "@/components/navigation/ReadingCompanionSidebar";

interface CaseStudyLayoutProps {
  project: ProjectCaseStudy;
}

export function CaseStudyLayout({ project }: CaseStudyLayoutProps): ReactElement {
  // Dynamically compute active TOC items from visible project sections
  const tocItems: TocItem[] = [];

  if (project.executiveSummary && project.executiveSummary.visible !== false) {
    tocItems.push({ id: project.executiveSummary.id, label: project.executiveSummary.label });
  }

  if (project.problem && project.problem.visible !== false) {
    tocItems.push({ id: project.problem.id, label: project.problem.label });
  }

  if (project.solution && project.solution.visible !== false) {
    tocItems.push({ id: project.solution.id, label: project.solution.label });
  }

  if (project.architecture && project.architecture.visible !== false) {
    tocItems.push({ id: project.architecture.id, label: project.architecture.label });
  }

  if (project.techStack && project.techStack.visible !== false) {
    tocItems.push({ id: project.techStack.id, label: project.techStack.label });
  }

  if (project.decisions && project.decisions.visible !== false) {
    tocItems.push({ id: project.decisions.id, label: project.decisions.label });
  }

  if (project.challenges && project.challenges.visible !== false) {
    tocItems.push({ id: project.challenges.id, label: project.challenges.label });
  }

  if (project.results && project.results.visible !== false) {
    tocItems.push({ id: project.results.id, label: project.results.label });
  }

  if (project.lessons && project.lessons.visible !== false) {
    tocItems.push({ id: project.lessons.id, label: project.lessons.label });
  }

  if (project.roadmap && project.roadmap.visible !== false) {
    tocItems.push({ id: project.roadmap.id, label: project.roadmap.label });
  }

  if (project.resources && project.resources.visible !== false) {
    tocItems.push({ id: project.resources.id, label: project.resources.label });
  }

  const urn: EntityUrn = `urn:project:${project.id}`;
  const connections = getProjectConnections(urn, 6);

  return (
    <main
      id="main-content"
      aria-labelledby="case-study-title"
      className="min-h-dvh bg-canvas"
    >
      <HeroSection data={project.hero} />

      <section className="py-[var(--section-space)]">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)] lg:gap-20">
            <article className="space-y-14 md:space-y-16">
              {project.executiveSummary ? (
                <ExecutiveSummarySection data={project.executiveSummary} />
              ) : null}

              {project.problem ? <ProblemSection data={project.problem} /> : null}

              {project.solution ? <SolutionSection data={project.solution} /> : null}

              {project.architecture ? (
                <ArchitectureSection data={project.architecture} />
              ) : null}

              {project.techStack ? <TechStackSection data={project.techStack} /> : null}

              {project.decisions ? <DecisionsSection data={project.decisions} /> : null}

              {project.challenges ? <ChallengesSection data={project.challenges} /> : null}

              {project.results ? <ResultsSection data={project.results} /> : null}

              {project.lessons ? <LessonsSection data={project.lessons} /> : null}

              {project.roadmap ? <RoadmapSection data={project.roadmap} /> : null}

              {project.resources ? <ResourcesSection data={project.resources} /> : null}
              
              <div className="pt-10 border-t border-border">
                <KnowledgeSection 
                  title="Project Connections"
                  items={connections}
                  emptyState={
                    <EmptyState 
                      title="No connections discovered yet."
                      message="Related engineering notes and journey entries will appear here."
                    />
                  }
                />
              </div>
            </article>

            <ReadingCompanionSidebar>
              {tocItems.length > 0 ? (
                <TableOfContents title="Case Study" items={tocItems} className="mb-10" />
              ) : null}
              
              {connections.length > 0 && (
                <SidebarWidget title="Related Notes">
                  <ul className="space-y-4">
                    {connections.slice(0, 3).map(match => (
                      <li key={match.entity.urn}>
                        <a 
                          href={match.entity.url} 
                          className="group block"
                        >
                          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-1 block group-hover:text-accent transition-colors">
                            {match.entity.type}
                          </span>
                          <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors leading-snug line-clamp-2">
                            {match.entity.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </SidebarWidget>
              )}
            </ReadingCompanionSidebar>
          </div>
        </Container>
      </section>
    </main>
  );
}
