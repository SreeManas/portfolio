import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ProjectCaseStudy } from "@/project-engine/types";

interface ProjectHeroProps {
  label: string;
  project: ProjectCaseStudy;
  titleId: string;
}

export function ProjectHero({
  label,
  project,
  titleId,
}: ProjectHeroProps): ReactElement {
  return (
    <header className="max-w-[var(--measure-copy)]">
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={titleId}
        className="mt-5 font-display text-4xl leading-none text-ink text-balance md:text-6xl"
      >
        {project.title}
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
        {project.tagline}
      </p>
    </header>
  );
}
