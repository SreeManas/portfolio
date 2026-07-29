import type { KnowledgeEntity, EntityUrn } from "../core/types";
import type { EngineeringArticle } from "@/notes/types";

export function articleToKnowledgeEntity(article: EngineeringArticle): KnowledgeEntity {
  const urn: EntityUrn = `urn:article:${article.slug}`;
  
  return {
    schemaVersion: "1.0.0",
    urn,
    type: "article",
    slug: article.slug,
    title: article.title,
    description: article.summary,
    url: `/notes/${article.slug}`,
    tags: article.tags,
    technologies: article.relatedTechnologies || [],
    categories: [article.category],
    series: article.series?.name,
    projectAssociation: article.relatedProjects?.[0], // Simplify for now
    date: article.date,
    updatedAt: article.lastUpdated,
    readingTime: article.readingTime,
    difficulty: article.difficulty,
    status: article.status,
    featured: article.featured,
  };
}
