import { useEffect, useRef, type ReactElement } from "react";

import { HighlightedText } from "@/command-palette/components/HighlightedText";
import { cn } from "@/lib/cn";
import type { CommandSearchResult } from "@/command-palette/types";

interface CommandItemProps {
  result: CommandSearchResult;
  isSearching: boolean;
  isSelected: boolean;
  isFavorite: boolean;
  canFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onHover: () => void;
  favoriteLabel: string;
  unfavoriteLabel: string;
}

export function CommandItem({
  result,
  isSearching,
  isSelected,
  isFavorite,
  canFavorite,
  onSelect,
  onToggleFavorite,
  onHover,
  favoriteLabel,
  unfavoriteLabel,
}: CommandItemProps): ReactElement {
  const itemRef = useRef<HTMLLIElement>(null);
  const { command, highlights } = result;

  useEffect(() => {
    if (!isSelected) {
      return;
    }

    itemRef.current?.scrollIntoView({ block: "nearest" });
  }, [isSelected]);

  return (
    <li
      ref={itemRef}
      id={`command-option-${command.id}`}
      role="option"
      aria-selected={isSelected}
      aria-disabled={command.disabled}
    >
      <div
        onMouseEnter={onHover}
        className={cn(
          "grid w-full grid-cols-[1fr_auto] items-stretch rounded-panel border transition-all duration-150 ease-dossier",
          isSelected
            ? "border-border bg-muted text-ink shadow-[inset_0_0_0_1px_rgb(24_22_17_/_0.04)]"
            : "border-transparent text-ink hover:border-border/70 hover:bg-muted/55",
          command.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
      >
        <button
          type="button"
          disabled={command.disabled}
          onMouseDown={(event) => {
            event.preventDefault();
            onSelect();
          }}
          className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-4 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="min-w-0">
            <span className="flex min-w-0 items-baseline gap-2 text-sm font-medium leading-5">
              <span className="min-w-0 truncate">
                <HighlightedText text={command.title} ranges={highlights.title} />
              </span>
              {result.meta ? (
                <span className="shrink-0 font-mono text-[0.6875rem] leading-5 text-muted-foreground">
                  {result.meta}
                </span>
              ) : null}
            </span>
            <span className="mt-1 block text-sm leading-5 text-muted-foreground">
              <HighlightedText
                text={command.description}
                ranges={highlights.description}
              />
            </span>
            {isSearching && highlights.aliases.length > 0 ? (
              <span className="mt-1 block truncate font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground/80">
                {highlights.aliases.join(" • ")}
              </span>
            ) : null}
          </span>
          <span className="flex min-w-8 justify-end font-mono text-sm leading-6 text-muted-foreground">
            {command.indicator}
          </span>
        </button>
        {canFavorite ? (
          <button
            type="button"
            aria-label={`${isFavorite ? unfavoriteLabel : favoriteLabel}: ${
              command.title
            }`}
            aria-pressed={isFavorite}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggleFavorite();
            }}
            className="flex w-11 items-center justify-center border-l border-border/60 font-mono text-sm leading-6 text-muted-foreground transition-colors duration-150 ease-dossier hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
          </button>
        ) : null}
      </div>
    </li>
  );
}
