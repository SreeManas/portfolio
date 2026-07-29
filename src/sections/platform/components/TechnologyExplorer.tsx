import type { ReactElement } from "react";
import { getTechnologySummary } from "@/lib/discovery";
import type { Technology } from "@/content/technologies/types";

interface TechnologyExplorerProps {
  technologies: readonly Technology[];
}

export function TechnologyExplorer({ technologies }: TechnologyExplorerProps): ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {technologies.map((tech) => {
        const summary = getTechnologySummary(tech.name);
        
        return (
          <a
            key={tech.id}
            href={`/technology/${tech.slug}`}
            className="group relative flex flex-col border border-border bg-paper p-5 rounded-panel shadow-sm hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-medium text-ink group-hover:text-accent transition-colors">
                {tech.name}
              </span>
              <span className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true">
                →
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {tech.description}
            </p>
            
            <div className="flex items-center gap-2 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground mt-auto pt-4 border-t border-border/60">
              {summary.totalCount === 0 ? (
                <span>0 Resources</span>
              ) : (
                <>
                  {summary.breakdown.article > 0 && <span>{summary.breakdown.article} Articles</span>}
                  {summary.breakdown.article > 0 && summary.breakdown.project > 0 && <span>·</span>}
                  {summary.breakdown.project > 0 && <span>{summary.breakdown.project} Projects</span>}
                  {summary.breakdown.article === 0 && summary.breakdown.project === 0 && summary.breakdown.journey > 0 && (
                     <span>{summary.breakdown.journey} Journey</span>
                  )}
                </>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
