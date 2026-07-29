import type { KnowledgeEntity, EntityUrn } from "../core/types";

export class KnowledgeIndexer {
  private tagIndex = new Map<string, Set<EntityUrn>>();
  private techIndex = new Map<string, Set<EntityUrn>>();
  private categoryIndex = new Map<string, Set<EntityUrn>>();
  private seriesIndex = new Map<string, Set<EntityUrn>>();
  private projectIndex = new Map<string, Set<EntityUrn>>();

  public indexEntity(entity: KnowledgeEntity) {
    // Index tags
    entity.tags.forEach((tag) => {
      const lowerTag = tag.toLowerCase();
      if (!this.tagIndex.has(lowerTag)) this.tagIndex.set(lowerTag, new Set());
      this.tagIndex.get(lowerTag)!.add(entity.urn);
    });

    // Index technologies
    entity.technologies.forEach((tech) => {
      const lowerTech = tech.toLowerCase();
      if (!this.techIndex.has(lowerTech)) this.techIndex.set(lowerTech, new Set());
      this.techIndex.get(lowerTech)!.add(entity.urn);
    });

    // Index categories
    entity.categories.forEach((cat) => {
      const lowerCat = cat.toLowerCase();
      if (!this.categoryIndex.has(lowerCat)) this.categoryIndex.set(lowerCat, new Set());
      this.categoryIndex.get(lowerCat)!.add(entity.urn);
    });

    // Index series
    if (entity.series) {
      const lowerSeries = entity.series.toLowerCase();
      if (!this.seriesIndex.has(lowerSeries)) this.seriesIndex.set(lowerSeries, new Set());
      this.seriesIndex.get(lowerSeries)!.add(entity.urn);
    }

    // Index project
    if (entity.projectAssociation) {
      const lowerProject = entity.projectAssociation.toLowerCase();
      if (!this.projectIndex.has(lowerProject)) this.projectIndex.set(lowerProject, new Set());
      this.projectIndex.get(lowerProject)!.add(entity.urn);
    }
  }

  public clear() {
    this.tagIndex.clear();
    this.techIndex.clear();
    this.categoryIndex.clear();
    this.seriesIndex.clear();
    this.projectIndex.clear();
  }

  public getByTag(tag: string): Set<EntityUrn> {
    return this.tagIndex.get(tag.toLowerCase()) ?? new Set();
  }

  public getByTechnology(tech: string): Set<EntityUrn> {
    return this.techIndex.get(tech.toLowerCase()) ?? new Set();
  }

  public getByCategory(category: string): Set<EntityUrn> {
    return this.categoryIndex.get(category.toLowerCase()) ?? new Set();
  }

  public getBySeries(series: string): Set<EntityUrn> {
    return this.seriesIndex.get(series.toLowerCase()) ?? new Set();
  }

  public getByProject(project: string): Set<EntityUrn> {
    return this.projectIndex.get(project.toLowerCase()) ?? new Set();
  }
}
