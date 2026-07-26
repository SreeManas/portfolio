import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/sections/projects/components/ProjectCard";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { projectsContent } from "@/content/projects";

export function ProjectsPage(): ReactElement {
  const featuredProject = projectsContent.projects.find((project) => project.featured);
  const upcomingProjects = projectsContent.projects.filter(
    (project) => !project.featured,
  );

  return (
    <main
      id="main-content"
      aria-labelledby="projects-page-title"
      className="min-h-dvh bg-canvas"
    >
      <section className="border-b border-border py-[var(--section-space)]">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-24">
            <header>
              <a
                href="/"
                className="font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Back to Home
              </a>
              <SectionLabel className="mt-10">Projects</SectionLabel>
              <h1
                id="projects-page-title"
                className="mt-5 max-w-[20rem] font-display text-4xl leading-none text-ink text-balance md:text-6xl"
              >
                Engineering work, collected as case studies.
              </h1>
              <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
                A focused index for projects that are ready to be inspected, with reserved space for future work that is still forming.
              </p>
            </header>

            <div>
              <SectionLabel>Featured Project</SectionLabel>
              {featuredProject ? (
                <div className="mt-5">
                  <ProjectCard project={featuredProject} featured />
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-space)]">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-24">
            <header>
              <SectionLabel>Upcoming Projects</SectionLabel>
              <h2 className="mt-5 max-w-[18rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl">
                Reserved for work that has not earned a case study yet.
              </h2>
            </header>

            <div className="grid gap-5 md:grid-cols-2">
              {upcomingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
