import type { KnowledgeEntity, RelationshipReasons } from "../core/types";

function getIntersection(a: readonly string[], b: readonly string[]): string[] {
  const setB = new Set(b.map(s => s.toLowerCase()));
  return Array.from(new Set(a.map(s => s.toLowerCase()))).filter(x => setB.has(x));
}

export function calculateIntersection(source: KnowledgeEntity, target: KnowledgeEntity): RelationshipReasons {
  const reasons: RelationshipReasons = {
    sharedTechnologies: getIntersection(source.technologies, target.technologies),
    sharedTags: getIntersection(source.tags, target.tags),
    sharedCategories: getIntersection(source.categories, target.categories),
  };

  if (source.series && target.series && source.series.toLowerCase() === target.series.toLowerCase()) {
    reasons.sharedSeries = source.series;
  }

  if (source.projectAssociation && target.projectAssociation && source.projectAssociation.toLowerCase() === target.projectAssociation.toLowerCase()) {
    reasons.sharedProject = source.projectAssociation;
  }

  return reasons;
}
