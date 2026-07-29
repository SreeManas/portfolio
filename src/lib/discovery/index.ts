import { 
  discoverRelated, 
  getEntity, 
  getEntitiesByTechnology,
  type EntityUrn, 
  type RelationshipMatch,
  type KnowledgeEntityType 
} from "@/lib/knowledge";

/**
 * Returns generic relationships for any entity.
 * This is the primary discovery entry point that remains agnostic to the entity type.
 */
export function discoverForEntity(urn: EntityUrn, limit = 6): RelationshipMatch[] {
  return discoverRelated(urn, {
    limit,
    weights: {
      project: 6,
      series: 5,
      technology: 4,
      tag: 3,
      category: 2,
      difficulty: 1,
    }
  });
}

/**
 * Returns entities that share similarities (tags, technologies, projects).
 * Implements the "Similarity Strategy".
 */
export function getRelatedKnowledge(urn: EntityUrn, limit = 4): RelationshipMatch[] {
  return discoverForEntity(urn, limit);
}

/**
 * Returns entities optimized for learning progression.
 * Implements the "Progression Strategy".
 * Heavily weights series continuation and category alignment.
 */
export function getContinueLearning(urn: EntityUrn, limit = 4): RelationshipMatch[] {
  const entity = getEntity(urn);
  
  return discoverRelated(urn, {
    limit,
    // Only recommend articles for continue learning by default if looking at an article
    types: entity?.type === "article" ? ["article"] : undefined,
    weights: {
      series: 15,     // Series continuation is the highest priority
      category: 8,    // Staying in the same category is next best
      difficulty: 5,  // Matching difficulty is good
      technology: 2,
      project: 2,
      tag: 1,
    }
  });
}

/**
 * Returns entities related to a project, acting as an entry point to the ecosystem.
 */
export function getProjectConnections(urn: EntityUrn, limit = 6): RelationshipMatch[] {
  return discoverRelated(urn, {
    limit,
    weights: {
      project: 10, // Explicitly prioritize entities associated with this project
      technology: 4,
      tag: 3,
      series: 2,
      category: 2,
      difficulty: 1
    }
  });
}

export interface TechnologySummary {
  technology: string;
  totalCount: number;
  breakdown: Record<KnowledgeEntityType, number>;
}

/**
 * Summarizes a technology by querying the knowledge engine and aggregating counts.
 */
export function getTechnologySummary(technology: string): TechnologySummary {
  const entities = getEntitiesByTechnology(technology);
  
  const breakdown: Record<KnowledgeEntityType, number> = {
    article: 0,
    project: 0,
    journey: 0,
    technology: 0
  };

  for (const entity of entities) {
    breakdown[entity.type]++;
  }

  return {
    technology,
    totalCount: entities.length,
    breakdown
  };
}
