import type { KnowledgeEntity, KnowledgeEntityType, DiscoveryConfig, RelationshipMatch, EntityUrn } from "./core/types";
import { store } from "./store/memoryStore";
import { getRelatedEntities } from "./engine/scoring";

/**
 * Retrieves a single KnowledgeEntity by its global URN.
 */
export function getEntity(urn: EntityUrn): KnowledgeEntity | undefined {
  return store.get(urn);
}

/**
 * Retrieves all registered KnowledgeEntities.
 */
export function getAllEntities(): readonly KnowledgeEntity[] {
  return store.getAll();
}

/**
 * Retrieves entities strictly by their type.
 */
export function getEntitiesByType(type: KnowledgeEntityType): readonly KnowledgeEntity[] {
  return store.getByType(type);
}

/**
 * Retrieves entities strictly by a specific tag.
 */
export function getEntitiesByTag(tag: string): readonly KnowledgeEntity[] {
  const urns = store.getIndexer().getByTag(tag);
  return Array.from(urns).map(urn => store.get(urn)!).filter(Boolean);
}

/**
 * Retrieves entities strictly by a specific technology.
 */
export function getEntitiesByTechnology(technology: string): readonly KnowledgeEntity[] {
  const urns = store.getIndexer().getByTechnology(technology);
  return Array.from(urns).map(urn => store.get(urn)!).filter(Boolean);
}

/**
 * Core discovery function. Returns related entities scored and sorted by relevance.
 * Explanations (reasons) are provided with every match.
 */
export function discoverRelated(urn: EntityUrn, config?: DiscoveryConfig): RelationshipMatch[] {
  return getRelatedEntities(urn, config);
}
