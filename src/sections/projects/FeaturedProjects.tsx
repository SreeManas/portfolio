import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { projectsContent } from "@/content/projects";
import { motionTiming } from "@/lib/motion";
import { ProjectRecordItem } from "@/sections/projects/components/ProjectRecordItem";

export function FeaturedProjects(): ReactElement {
  return (
    <Section
      id={projectsContent.id}
      aria-labelledby="featured-projects-title"
      width="wide"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-24">
          <header>
            <SectionLabel>{projectsContent.label}</SectionLabel>
            <h2
              id="featured-projects-title"
              className="mt-5 max-w-[18rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {projectsContent.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
              {projectsContent.introduction}
            </p>
          </header>

          <ol className="divide-y divide-border border-y border-border">
            {projectsContent.projects.map((project) => (
              <ProjectRecordItem
                key={project.id}
                project={project}
                metadataLabels={projectsContent.metadataLabels}
              />
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
