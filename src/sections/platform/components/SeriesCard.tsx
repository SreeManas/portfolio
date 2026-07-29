import type { ReactElement } from "react";
import type { ArticleSeries } from "@/notes/types";

interface SeriesCardProps {
  series: ArticleSeries;
  articleCount: number;
  description: string;
  topic: string;
}

export function SeriesCard({ series, articleCount, description, topic }: SeriesCardProps): ReactElement {
  return (
    <div className="card-interactive group flex flex-col border border-border bg-paper p-6 rounded-panel shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5 rounded-none bg-accent/5">
          {topic}
        </span>
        <span className="font-mono text-[0.625rem] text-muted-foreground uppercase">
          {articleCount} {articleCount === 1 ? 'Part' : 'Parts'}
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink group-hover:text-accent transition-colors">
        {series.name}
      </h3>
      
      <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-2">
        {description}
      </p>

      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-canvas rounded-full overflow-hidden border border-border/50">
            <div className="h-full bg-accent/40 rounded-full w-[25%]" />
          </div>
          <span className="font-mono text-[0.625rem] font-semibold uppercase text-muted-foreground whitespace-nowrap">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}
