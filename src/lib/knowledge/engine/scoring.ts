import type { RelationshipMatch, DiscoveryConfig, EntityUrn } from "../core/types";
import { store } from "../store/memoryStore";
import { calculateIntersection } from "./intersection";

const DEFAULT_WEIGHTS = {
  project: 6,
  series: 5,
  technology: 4,
  tag: 3,
  category: 2,
  difficulty: 1,
};

export function getRelatedEntities(sourceUrn: string, config?: DiscoveryConfig): RelationshipMatch[] {
  const source = store.get(sourceUrn as EntityUrn);
  if (!source) return [];

  const weights = { ...DEFAULT_WEIGHTS, ...config?.weights };
  const allEntities = store.getAll();
  const matches: RelationshipMatch[] = [];

  // Allowed types
  const allowedTypes = new Set(config?.types);
  const excludeUrns = new Set(config?.excludeUrns);
  excludeUrns.add(source.urn); // Always exclude self

  for (const target of allEntities) {
    if (excludeUrns.has(target.urn)) continue;
    if (allowedTypes.size > 0 && !allowedTypes.has(target.type)) continue;

    const reasons = calculateIntersection(source, target);
    let score = 0;

    score += reasons.sharedTechnologies.length * weights.technology;
    score += reasons.sharedTags.length * weights.tag;
    score += reasons.sharedCategories.length * weights.category;
    
    if (reasons.sharedSeries) {
      score += weights.series;
    }
    
    if (reasons.sharedProject) {
      score += weights.project;
    }

    if (source.difficulty && target.difficulty && source.difficulty === target.difficulty) {
      score += weights.difficulty;
    }

    if (score > 0) {
      matches.push({ entity: target, score, reasons });
    }
  }

  // Sort descending by score, then tie-break deterministically by title
  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.entity.title.localeCompare(b.entity.title);
  });

  return config?.limit ? matches.slice(0, config.limit) : matches;
}
