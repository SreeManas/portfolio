import type { KnowledgeEntity, EntityUrn, KnowledgeEntityType } from "../core/types";
import { KnowledgeIndexer } from "./indexer";

class MemoryStore {
  private entities = new Map<EntityUrn, KnowledgeEntity>();
  private typeIndex = new Map<KnowledgeEntityType, Set<EntityUrn>>();
  private indexer = new KnowledgeIndexer();

  public register(entity: KnowledgeEntity | KnowledgeEntity[]) {
    const toRegister = Array.isArray(entity) ? entity : [entity];

    toRegister.forEach((e) => {
      this.entities.set(e.urn, e);

      if (!this.typeIndex.has(e.type)) {
        this.typeIndex.set(e.type, new Set());
      }
      this.typeIndex.get(e.type)!.add(e.urn);

      this.indexer.indexEntity(e);
    });
  }

  public clear() {
    this.entities.clear();
    this.typeIndex.clear();
    this.indexer.clear();
  }

  public get(urn: EntityUrn): KnowledgeEntity | undefined {
    return this.entities.get(urn);
  }

  public getAll(): readonly KnowledgeEntity[] {
    return Array.from(this.entities.values());
  }

  public getByType(type: KnowledgeEntityType): readonly KnowledgeEntity[] {
    const urns = this.typeIndex.get(type);
    if (!urns) return [];
    
    const result: KnowledgeEntity[] = [];
    urns.forEach((urn) => {
      const entity = this.entities.get(urn);
      if (entity) result.push(entity);
    });
    
    return result;
  }

  public getIndexer(): KnowledgeIndexer {
    return this.indexer;
  }
}

// Singleton instance
export const store = new MemoryStore();
