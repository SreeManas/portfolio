import type { ReactElement } from "react";

import type { ProjectRecord } from "@/sections/projects/types";

interface ProjectRecordItemProps {
  project: ProjectRecord;
  metadataLabels: {
    status: string;
    category: string;
    year: string;
  };
}

export function ProjectRecordItem({
  project,
  metadataLabels,
}: ProjectRecordItemProps): ReactElement {
  return (
    <li className="py-8 md:py-9">
      <article
        data-project-slug={project.slug}
        data-project-featured={project.featured ? "true" : undefined}
        className="grid gap-5 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:gap-12"
      >
        <div>
          <h3 className="text-2xl font-semibold leading-tight text-ink text-balance">
            {project.title}
          </h3>
        </div>

        <div>
          <p className="max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground">
            {project.shortDescription}
          </p>
          <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">
                {metadataLabels.status}
              </dt>
              <dd className="mt-1 text-ink">{project.status}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">
                {metadataLabels.category}
              </dt>
              <dd className="mt-1 text-ink">{project.category}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">
                {metadataLabels.year}
              </dt>
              <dd className="mt-1 text-ink">{project.year}</dd>
            </div>
          </dl>
        </div>
      </article>
    </li>
  );
}
