// Strict Public Facade for the Knowledge Engine
// Do NOT export internal stores, indexers, or engine logic.

export type { 
  KnowledgeEntity, 
  KnowledgeEntityType, 
  EntityUrn, 
  DiscoveryConfig, 
  RelationshipMatch, 
  RelationshipReasons 
} from "./core/types";

export { 
  getEntity, 
  getAllEntities, 
  getEntitiesByType, 
  getEntitiesByTag, 
  getEntitiesByTechnology, 
  discoverRelated 
} from "./api";

export { initializeKnowledgeRegistry } from "./registry";
