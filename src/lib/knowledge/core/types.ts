export type KnowledgeEntityType = "article" | "project" | "journey" | "technology";

export type EntityUrn = `urn:${KnowledgeEntityType}:${string}`;

export interface KnowledgeEntity {
  /**
   * Version of the schema, allowing future non-breaking evolution
   */
  schemaVersion: "1.0.0";
  
  /**
   * Global unique identifier (e.g. urn:article:lightweight-spa-routing)
   */
  urn: EntityUrn;
  
  /**
   * Discriminator type for UI logic
   */
  type: KnowledgeEntityType;
  
  /**
   * The original slug representing the entity
   */
  slug: string;

  /**
   * Display Title
   */
  title: string;

  /**
   * Short description or summary
   */
  description: string;

  /**
   * The canonical URL route to this entity
   */
  url: string;

  // Normalized metadata for intersection/scoring calculations
  tags: readonly string[];
  technologies: readonly string[];
  categories: readonly string[];
  
  // Optional hierarchical/relational metadata
  series?: string;
  projectAssociation?: string;

  // Presentation metadata (Generic enough for any entity)
  date?: string;
  updatedAt?: string;
  readingTime?: string;
  difficulty?: string;
  status?: string;
  featured?: boolean;
}

export interface RelationshipReasons {
  sharedTechnologies: string[];
  sharedTags: string[];
  sharedCategories: string[];
  sharedSeries?: string;
  sharedProject?: string;
}

export interface RelationshipMatch {
  entity: KnowledgeEntity;
  score: number;
  reasons: RelationshipReasons;
}

export interface DiscoveryConfig {
  types?: KnowledgeEntityType[];
  limit?: number;
  weights?: {
    project?: number;     // default +6
    series?: number;      // default +5
    technology?: number;  // default +4
    tag?: number;         // default +3
    category?: number;    // default +2
    difficulty?: number;  // default +1
  };
  excludeUrns?: EntityUrn[];
}
