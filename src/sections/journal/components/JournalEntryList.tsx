import type { ReactElement } from "react";

import type { JournalEntry, JournalOrdering } from "@/sections/journal/types";

interface JournalEntryListProps {
  entries: readonly JournalEntry[];
  ordering: JournalOrdering;
}

function getOrderedEntries(
  entries: readonly JournalEntry[],
  ordering: JournalOrdering,
): readonly JournalEntry[] {
  if (ordering.mode === "manual") {
    return entries;
  }

  return [...entries].sort((first, second) => {
    const firstTime = new Date(first.date).getTime();
    const secondTime = new Date(second.date).getTime();

    return ordering.direction === "ascending"
      ? firstTime - secondTime
      : secondTime - firstTime;
  });
}

export function JournalEntryList({
  entries,
  ordering,
}: JournalEntryListProps): ReactElement {
  const orderedEntries = getOrderedEntries(entries, ordering);

  return (
    <ol className="mt-14 divide-y divide-border border-y border-border md:mt-16">
      {orderedEntries.map((entry) => {
        const tags = entry.tags ?? [];

        return (
          <li key={entry.id} className="py-9 md:py-10">
            <article className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <div className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                <time dateTime={entry.date}>{entry.date}</time>
                <p className="mt-1 text-accent">{entry.category}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold leading-7 text-ink">
                  {entry.title}
                </h3>
                <p className="mt-4 max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground">
                  {entry.note}
                </p>

                {tags.length > 0 ? (
                  <ul
                    aria-label="Tags"
                    className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground"
                  >
                    {tags.map((tag, index) => (
                      <li key={tag} className="flex items-center gap-3">
                        <span>{tag}</span>
                        {index < tags.length - 1 ? (
                          <span aria-hidden="true">.</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
