import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { ProjectDecisionList } from "@/components/project-engine/ProjectDecisionList";
import { ProjectDecisionPipeline } from "@/components/project-engine/ProjectDecisionPipeline";
import { ProjectSection } from "@/components/project-engine/ProjectSection";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { TechnologyTags } from "@/sections/projects/components/TechnologyTags";
import { ProjectStatusBadge } from "@/sections/projects/components/ProjectStatusBadge";
import { medrouterProject } from "@/content/projects";
import type { ProjectCaseStudy } from "@/project-engine/types";

export function MedrouterProjectPage(): ReactElement {
  const project: ProjectCaseStudy = medrouterProject;

  return (
    <main
      id="main-content"
      aria-labelledby="medrouter-page-title"
      className="min-h-dvh bg-canvas"
    >
      <section className="border-b border-border py-[var(--section-space)]">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)] lg:gap-20">
            <header className="max-w-[var(--measure-copy)]">
              <a
                href="/projects"
                className="font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Back to Projects
              </a>
              <div className="mt-10">
                <ProjectStatusBadge status={project.status} />
              </div>
              <p className="mt-8 font-mono text-xs uppercase leading-6 text-muted-foreground">
                {project.category} / {project.year}
              </p>
              <h1
                id="medrouter-page-title"
                className="mt-5 font-display text-5xl leading-none text-ink text-balance md:text-7xl"
              >
                {project.title}
              </h1>
              <p className="mt-7 text-xl leading-9 text-muted-foreground md:text-2xl md:leading-10">
                {project.tagline}
              </p>
            </header>

            <aside aria-label="Project metadata" className="lg:pt-32">
              <dl className="divide-y divide-border border-y border-border">
                {project.metadata.map((item) => (
                  <div key={item.id} className="py-4">
                    <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-space)]">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)] lg:gap-20">
            <article className="space-y-14 md:space-y-16">
              <ProjectSection block={project.overview} />
              <ProjectSection block={project.problem} />
              <ProjectSection block={project.solution} />

              <section aria-labelledby="technology-stack-title">
                <SectionLabel className="text-accent">Technology Stack</SectionLabel>
                <h2
                  id="technology-stack-title"
                  className="mt-4 max-w-[var(--measure-copy)] text-2xl font-semibold leading-tight text-ink text-balance md:text-3xl"
                >
                  Tools currently represented in the project architecture.
                </h2>
                <div className="mt-5">
                  <TechnologyTags technologies={project.technologies} />
                </div>
              </section>

              <ProjectDecisionPipeline pipeline={project.decisionPipeline} />

              <ProjectDecisionList group={project.engineeringDecisions} />

              <div className="grid gap-10 border-y border-border py-8 md:grid-cols-2 md:gap-12">
                <ProjectSection block={project.display.status} density="compact" />
                <ProjectSection block={project.futureWork} density="compact" />
              </div>

              <section aria-labelledby="project-links-title">
                <SectionLabel className="text-accent">Links</SectionLabel>
                <h2
                  id="project-links-title"
                  className="mt-4 text-lg font-semibold leading-7 text-ink"
                >
                  Project references
                </h2>
                {project.links.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {project.links.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          className="underline-offset-4 hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 max-w-[var(--measure-note)] text-sm leading-6 text-muted-foreground">
                    Repository and demo links will be added when they are ready to share.
                  </p>
                )}
              </section>
            </article>

            <nav
              aria-label="Case study sections"
              className="hidden lg:block lg:sticky lg:top-10 lg:h-fit"
            >
              <SectionLabel>Case Study</SectionLabel>
              <ol className="mt-5 space-y-3 font-mono text-xs uppercase leading-6 text-muted-foreground">
                <li>Overview</li>
                <li>Problem Statement</li>
                <li>Solution</li>
                <li>Technology Stack</li>
                <li>Key Features</li>
                <li>Engineering Challenges</li>
                <li>Future Roadmap</li>
              </ol>
            </nav>
          </div>
        </Container>
      </section>
    </main>
  );
}
