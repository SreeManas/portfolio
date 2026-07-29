import type { ReactElement } from "react";
import type { KnowledgeEntity, RelationshipMatch } from "@/lib/knowledge";
import { KnowledgeMeta } from "./KnowledgeMeta";

interface KnowledgeCardProps {
  entity: KnowledgeEntity;
  match?: RelationshipMatch;
}

export function KnowledgeCard({ entity, match }: KnowledgeCardProps): ReactElement {
  const reasons = match?.reasons;

  return (
    <a
      href={entity.url}
      className="group flex flex-col border border-border/60 bg-paper p-6 rounded-panel shadow-sm hover:shadow-md hover:-translate-y-[2px] hover:border-border transition-all duration-200 ease-out focus-visible:outline-accent"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        <span>{entity.type}</span>
        {entity.series && (
          <span className="text-accent/80 border border-border/40 px-1.5 py-0.5 rounded-sm bg-canvas">
            {entity.series}
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-2">
        {entity.title}
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
        {entity.description}
      </p>

      {reasons && (
        <div className="mb-4 flex flex-wrap gap-2">
          {reasons.sharedProject && (
            <span className="inline-flex items-center rounded-sm bg-accent/5 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-accent border border-accent/10">
              Same Project
            </span>
          )}
          {reasons.sharedSeries && (
            <span className="inline-flex items-center rounded-sm bg-accent/5 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-accent border border-accent/10">
              Same Series
            </span>
          )}
          {reasons.sharedTechnologies.map((tech) => (
            <span key={`tech-${tech}`} className="inline-flex items-center rounded-sm bg-border/20 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground border border-border/40">
              Shared: {tech}
            </span>
          ))}
          {reasons.sharedCategories.map((cat) => (
            <span key={`cat-${cat}`} className="inline-flex items-center rounded-sm bg-border/20 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground border border-border/40">
              Shared: {cat}
            </span>
          ))}
          {reasons.sharedTags.map((tag) => (
            <span key={`tag-${tag}`} className="inline-flex items-center rounded-sm bg-border/20 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground border border-border/40">
              Tag: {tag}
            </span>
          ))}
        </div>
      )}

      <KnowledgeMeta entity={entity} />
    </a>
  );
}
