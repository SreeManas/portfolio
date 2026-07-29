import type { ReactElement } from "react";
import type { KnowledgeEntity } from "@/lib/knowledge";

export function KnowledgeMeta({ entity }: { entity: KnowledgeEntity }): ReactElement | null {
  const parts = [];

  if (entity.readingTime) {
    parts.push(<span key="read">{entity.readingTime}</span>);
  }

  if (entity.date) {
    parts.push(<span key="date">{entity.date}</span>);
  }

  if (entity.difficulty) {
    parts.push(<span key="diff">{entity.difficulty}</span>);
  }

  if (parts.length === 0 && entity.categories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[0.625rem] text-muted-foreground uppercase tracking-widest mt-auto pt-4">
      {entity.categories.length > 0 && (
        <span className="px-1.5 py-0.5 rounded-sm bg-accent/5 text-accent/80 border border-accent/10">
          {entity.categories[0]}
        </span>
      )}
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 || entity.categories.length > 0 ? <span>&middot;</span> : null}
          {part}
        </span>
      ))}
    </div>
  );
}
