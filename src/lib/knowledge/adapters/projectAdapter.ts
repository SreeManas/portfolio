import type { KnowledgeEntity, EntityUrn } from "../core/types";
import type { ProjectCaseStudy } from "@/content/projects/types";

export function projectToKnowledgeEntity(project: ProjectCaseStudy): KnowledgeEntity {
  const urn: EntityUrn = `urn:project:${project.slug}`;
  
  return {
    schemaVersion: "1.0.0",
    urn,
    type: "project",
    slug: project.slug,
    title: project.title,
    description: project.tagline,
    url: project.route.path,
    tags: [], // Add if project tags are introduced
    technologies: project.technologies,
    categories: [project.category],
    date: project.year,
    updatedAt: project.metadata?.lastUpdated,
    status: project.status,
    featured: project.featured,
  };
}
