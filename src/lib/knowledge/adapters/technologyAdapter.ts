import type { KnowledgeEntity, EntityUrn } from "../core/types";
import type { Technology } from "@/content/technologies/types";

export function technologyToKnowledgeEntity(tech: Technology): KnowledgeEntity {
  const urn: EntityUrn = `urn:technology:${tech.slug}`;

  return {
    schemaVersion: "1.0.0",
    urn,
    type: "technology",
    slug: tech.slug,
    title: tech.name,
    description: tech.description,
    url: `/technology/${tech.slug}`,
    tags: [],
    technologies: tech.relatedTechnologies, // Other technologies this one is related to
    categories: [tech.category],
  };
}
