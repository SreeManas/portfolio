import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

import type { EngineeringArticle } from "@/notes/types";
import { NoteTags } from "@/sections/notes/components/NoteTags";

interface NoteCardProps {
  note: EngineeringArticle;
  featured?: boolean;
}

export function NoteCard({
  note,
  featured = false,
}: NoteCardProps): ReactElement {
  return (
    <a
      href={`/notes/${note.slug}`}
      className={cn(
        "group block h-full border border-border bg-paper p-6 transition-all duration-200 ease-dossier hover:-translate-y-1 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-8",
        featured && "md:p-10",
      )}
    >
      <article>
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-xs uppercase leading-6 text-accent">
            {note.category}
          </p>
          <span
            aria-hidden="true"
            className="font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 ease-dossier group-hover:translate-x-1 group-hover:text-ink"
          >
            →
          </span>
        </div>

        <div className={cn("mt-8", featured && "md:mt-12")}>
          <h3
            className={cn(
              "font-display leading-none text-ink text-balance",
              featured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
            )}
          >
            {note.title}
          </h3>
          <p
            className={cn(
              "mt-5 max-w-[var(--measure-copy)] text-muted-foreground",
              featured
                ? "text-lg leading-8 md:text-xl md:leading-9"
                : "text-base leading-7",
            )}
          >
            {note.summary}
          </p>
        </div>

        <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground">
          <div className="flex gap-2">
            <dt className="sr-only">Reading time</dt>
            <dd>{note.readingTime}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Published</dt>
            <dd>
              <time dateTime={note.date}>{note.date}</time>
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <NoteTags tags={note.tags} />
        </div>
      </article>
    </a>
  );
}
