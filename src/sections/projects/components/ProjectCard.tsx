import type { ReactElement } from "react";

import { ProjectStatusBadge } from "@/sections/projects/components/ProjectStatusBadge";
import { TechnologyTags } from "@/sections/projects/components/TechnologyTags";
import type { ProjectCaseStudy } from "@/content/projects/types";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  featured?: boolean;
}

export function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps): ReactElement {
  const content = (
    <>
      <div className="flex items-start justify-between gap-6">
        <ProjectStatusBadge status={project.status} />
        <span
          aria-hidden="true"
          className="font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 ease-dossier group-hover:translate-x-1 group-hover:text-ink"
        >
          →
        </span>
      </div>

      <div className={cn("mt-10", featured && "md:mt-16")}>
        <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
          {project.category} / {project.year}
        </p>
        <h3
          className={cn(
            "mt-3 font-display leading-none text-ink text-balance",
            featured ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-5 max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
          {project.tagline}
        </p>
      </div>

      <div className="mt-8">
        <TechnologyTags technologies={project.technologies} />
      </div>
    </>
  );

  const className = cn(
    "group block h-full border border-border bg-paper p-6 transition-all duration-200 ease-dossier hover:-translate-y-1 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-8",
    featured && "md:p-10",
    !project.route.enabled && "cursor-not-allowed opacity-75 hover:translate-y-0 hover:shadow-none",
  );

  if (!project.route.enabled) {
    return (
      <article className={className} aria-disabled="true">
        {content}
        <p className="mt-8 font-mono text-xs uppercase leading-6 text-muted-foreground">
          Coming Soon
        </p>
      </article>
    );
  }

  return (
    <a href={project.route.path} className={className}>
      <article>{content}</article>
    </a>
  );
}
