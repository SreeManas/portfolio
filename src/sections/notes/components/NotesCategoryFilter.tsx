import type { ReactElement } from "react";

import { cn } from "@/lib/cn";
import type { NoteCategory } from "@/notes/types";

interface NotesCategoryFilterProps {
  categories: readonly NoteCategory[];
  selected: NoteCategory | "All";
  onSelect: (category: NoteCategory | "All") => void;
}

export function NotesCategoryFilter({
  categories,
  selected,
  onSelect,
}: NotesCategoryFilterProps): ReactElement {
  const options: readonly (NoteCategory | "All")[] = ["All", ...categories];

  return (
    <div
      role="group"
      aria-label="Filter notes by category"
      className="flex flex-wrap gap-2"
    >
      {options.map((category) => {
        const isSelected = category === selected;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(category)}
            className={cn(
              "rounded-control border px-3 py-1.5 font-mono text-[0.6875rem] uppercase leading-5 transition-colors duration-200 ease-dossier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
              isSelected
                ? "border-ink bg-ink text-canvas"
                : "border-border bg-paper text-muted-foreground hover:border-ink/40 hover:text-ink",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
