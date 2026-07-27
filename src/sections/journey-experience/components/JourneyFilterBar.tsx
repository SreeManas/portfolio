import type { ReactElement } from "react";

import { cn } from "@/lib/cn";
import type { JourneyFilter } from "@/journey/types";

interface JourneyFilterBarProps {
  filters: readonly JourneyFilter[];
  selected: JourneyFilter;
  onSelect: (filter: JourneyFilter) => void;
}

export function JourneyFilterBar({
  filters,
  selected,
  onSelect,
}: JourneyFilterBarProps): ReactElement {
  return (
    <div
      role="group"
      aria-label="Filter timeline milestones"
      className="flex flex-wrap gap-2"
    >
      {filters.map((filter) => {
        const isSelected = filter === selected;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(filter)}
            className={cn(
              "rounded-control border px-3 py-1.5 font-mono text-[0.6875rem] uppercase leading-5 transition-all duration-200 ease-dossier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
              isSelected
                ? "border-ink bg-ink text-canvas"
                : "border-border bg-paper text-muted-foreground hover:-translate-y-0.5 hover:border-ink/40 hover:text-ink hover:shadow-soft",
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
