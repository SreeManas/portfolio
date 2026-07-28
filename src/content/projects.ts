import { medrouterProject } from "./projects/medrouter";
import type { ProjectCaseStudy, ProjectRoute } from "./projects/types";
import type { ProjectsContent } from "@/sections/projects/types";

export { medrouterProject };
export * from "./projects/types";

function createPlaceholderProject(
  project: Pick<
    ProjectCaseStudy,
    | "id"
    | "slug"
    | "title"
    | "tagline"
    | "category"
    | "status"
    | "year"
    | "technologies"
  >,
): ProjectCaseStudy {
  const route: ProjectRoute = {
    path: `/projects/${project.slug}`,
    enabled: false,
  };

  return {
    ...project,
    featured: false,
    route,
    hero: {
      title: project.title,
      tagline: project.tagline,
      status: project.status,
      year: project.year,
      category: project.category,
      technologies: project.technologies,
      links: [],
    },
  };
}

export const projectCaseStudies: readonly ProjectCaseStudy[] = [
  medrouterProject,
  createPlaceholderProject({
    id: "under-development",
    slug: "under-development",
    title: "🚧 Under Development",
    tagline:
      "Building the next flagship AI project. This space is intentionally reserved for future engineering work. Case study coming soon.",
    category: "AI Systems",
    status: "Coming Soon",
    year: "2026",
    technologies: ["AI Systems", "Product Architecture", "Evaluation"],
  }),
  createPlaceholderProject({
    id: "experimental-project",
    slug: "experimental-project",
    title: "🧪 Experimental Project",
    tagline:
      "Currently exploring AI systems, developer tools and scalable software architecture. A full case study will be published once the project reaches production quality.",
    category: "Developer Tools",
    status: "Prototype",
    year: "2026",
    technologies: ["AI Systems", "Developer Tooling", "Architecture"],
  }),
];

export const projectRouteManifest = projectCaseStudies.map((project) => ({
  id: project.id,
  slug: project.slug,
  path: project.route.path,
  enabled: project.route.enabled,
  title: project.title,
}));

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies.find((project) => project.slug === slug);
}

export const projectsContent = {
  id: "projects",
  label: "FEATURED PROJECTS",
  title: "Selected engineering work.",
  introduction:
    "A structured index for projects that are ready to be inspected, with reserved space for future work that is still forming.",
  metadataLabels: {
    status: "Status",
    category: "Category",
    year: "Year",
  },
  projects: projectCaseStudies,
} satisfies ProjectsContent;
