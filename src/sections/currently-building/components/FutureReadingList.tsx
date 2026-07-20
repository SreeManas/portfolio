import type { ReactElement } from "react";

import type { FutureReadingItem } from "@/sections/currently-building/types";

interface FutureReadingListProps {
  items: readonly FutureReadingItem[];
}

export function FutureReadingList({
  items,
}: FutureReadingListProps): ReactElement {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <li key={item.id} className="py-4 text-sm leading-6 text-ink">
          {item.href ? (
            <a
              href={item.href}
              className="underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-dossier hover:decoration-current"
            >
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );
}

