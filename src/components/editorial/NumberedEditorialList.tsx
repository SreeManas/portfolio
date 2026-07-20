import type { ReactElement } from "react";

import { cn } from "@/lib/cn";

export interface EditorialListItem {
  id: string;
  title: string;
  description: string;
}

interface NumberedEditorialListProps {
  items: readonly EditorialListItem[];
  className?: string;
}

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function NumberedEditorialList({
  items,
  className,
}: NumberedEditorialListProps): ReactElement {
  return (
    <ol className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className="grid gap-3 py-6 sm:grid-cols-[6rem_1fr] sm:gap-8 md:py-7"
        >
          <p className="font-mono text-xs uppercase leading-6 text-accent">
            {formatIndex(index)}
          </p>
          <div>
            <h3 className="text-lg font-semibold leading-7 text-ink">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

