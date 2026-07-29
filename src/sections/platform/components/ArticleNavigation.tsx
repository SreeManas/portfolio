import type { ReactElement } from "react";

import type { EngineeringArticle } from "@/notes/types";

interface ArticleNavigationProps {
  previousArticle?: EngineeringArticle;
  nextArticle?: EngineeringArticle;
}

export function ArticleNavigation({ previousArticle, nextArticle }: ArticleNavigationProps): ReactElement | null {
  if (!previousArticle && !nextArticle) return null;

  return (
    <nav className="mt-16 flex flex-col sm:flex-row justify-between gap-6 border-t border-border pt-10" aria-label="Article navigation">
      {previousArticle ? (
        <a 
          href={`/notes/${previousArticle.slug}`}
          className="flex-1 group relative flex flex-col justify-center border border-border/60 bg-paper p-6 rounded-panel shadow-sm hover:shadow-md hover:-translate-y-[2px] hover:border-border transition-all duration-200 ease-out focus-visible:outline-accent"
        >
          <div className="flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Previous</span>
          </div>
          <span className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-4">
            {previousArticle.title}
          </span>
          <div className="mt-auto flex flex-wrap items-center gap-3 font-mono text-[0.625rem] text-muted-foreground uppercase tracking-widest">
            <span className="px-1.5 py-0.5 rounded-sm bg-accent/5 text-accent/80 border border-accent/10">{previousArticle.category}</span>
            <span>{previousArticle.readingTime}</span>
            <span className="hidden lg:inline">&middot;</span>
            <span className="hidden lg:inline">{previousArticle.date}</span>
          </div>
        </a>
      ) : (
        <div className="flex-1" />
      )}

      {nextArticle ? (
        <a 
          href={`/notes/${nextArticle.slug}`}
          className="flex-1 group relative flex flex-col justify-center border border-border/60 bg-paper p-6 rounded-panel shadow-sm hover:shadow-md hover:-translate-y-[2px] hover:border-border transition-all duration-200 ease-out focus-visible:outline-accent sm:items-end text-left sm:text-right"
        >
          <div className="flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            <span>Next</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <span className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-4">
            {nextArticle.title}
          </span>
          <div className="mt-auto flex flex-wrap items-center gap-3 font-mono text-[0.625rem] text-muted-foreground uppercase tracking-widest sm:justify-end">
            <span className="hidden lg:inline">{nextArticle.date}</span>
            <span className="hidden lg:inline">&middot;</span>
            <span>{nextArticle.readingTime}</span>
            <span className="px-1.5 py-0.5 rounded-sm bg-accent/5 text-accent/80 border border-accent/10">{nextArticle.category}</span>
          </div>
        </a>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
