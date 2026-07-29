import type { ReactElement } from "react";
import { cn } from "@/lib/cn";
import type { EngineeringArticle } from "@/notes/types";

interface ArticleCardProps {
  article: EngineeringArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps): ReactElement {
  return (
    <a
      href={`/notes/${article.slug}`}
      className={cn(
        "card-interactive group block border border-border bg-paper rounded-panel shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent overflow-hidden flex flex-col relative transition-all duration-300 ease-dossier hover:-translate-y-1 hover:shadow-soft hover:border-accent/30",
        featured ? "md:p-10 p-6 sm:p-8" : "p-5 md:p-7 h-full",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5 rounded-none bg-accent/5">
          {article.category}
        </span>
        <span className="font-mono text-[0.625rem] font-medium text-muted-foreground tracking-wide uppercase">
          {article.date} • {article.readingTime}
        </span>
      </div>

      <h3
        className={cn(
          "mt-5 font-display font-semibold text-ink group-hover:text-accent transition-colors text-balance",
          featured ? "text-3xl md:text-5xl leading-tight max-w-4xl" : "text-xl md:text-2xl leading-snug",
        )}
      >
        {article.title}
      </h3>
      
      {article.subtitle && featured ? (
        <p className="mt-3 text-xl font-medium text-ink/80 max-w-3xl leading-relaxed">{article.subtitle}</p>
      ) : null}

      <p
        className={cn(
          "text-muted-foreground",
          featured ? "mt-4 text-lg leading-8 max-w-3xl" : "mt-3 text-sm leading-relaxed line-clamp-3",
        )}
      >
        {article.summary}
      </p>

      <div className="mt-auto pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.625rem] uppercase font-medium tracking-wide text-muted-foreground border border-border/60 px-2 py-0.5 rounded-none bg-canvas"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="font-mono text-[0.625rem] uppercase font-medium tracking-wide text-muted-foreground border border-border/60 px-2 py-0.5 rounded-none bg-canvas">
                +{article.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300">
            Read
            <span aria-hidden="true" className="ml-1.5 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
