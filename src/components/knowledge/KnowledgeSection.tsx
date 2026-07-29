import type { ReactElement, ReactNode } from "react";
import type { RelationshipMatch, KnowledgeEntity } from "@/lib/knowledge";
import { KnowledgeGrid } from "./KnowledgeGrid";
import { KnowledgeCard } from "./KnowledgeCard";

interface KnowledgeSectionProps {
  title: string;
  items: (RelationshipMatch | KnowledgeEntity)[];
  emptyState?: ReactNode;
}

export function KnowledgeSection({ title, items, emptyState }: KnowledgeSectionProps): ReactElement | null {
  if (items.length === 0) {
    return (
      <section aria-label={title} className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink mb-6">{title}</h2>
        {emptyState}
      </section>
    );
  }

  return (
    <section aria-label={title} className="mt-16">
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">{title}</h2>
      <KnowledgeGrid>
        {items.map((item) => {
          const isMatch = 'score' in item && 'reasons' in item;
          const entity = isMatch ? item.entity : item;
          const match = isMatch ? item : undefined;
          
          return (
            <KnowledgeCard 
              key={entity.urn} 
              entity={entity} 
              match={match} 
            />
          );
        })}
      </KnowledgeGrid>
    </section>
  );
}
