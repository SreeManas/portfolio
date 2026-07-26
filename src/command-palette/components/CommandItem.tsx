import { useEffect, useRef, type ReactElement } from "react";

import { cn } from "@/lib/cn";
import type { CommandDefinition } from "@/command-palette/types";

interface CommandItemProps {
  command: CommandDefinition;
  isSearching: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

export function CommandItem({
  command,
  isSearching,
  isSelected,
  onSelect,
  onHover,
}: CommandItemProps): ReactElement {
  const itemRef = useRef<HTMLLIElement>(null);

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
      <button
        type="button"
        disabled={command.disabled}
        onMouseEnter={onHover}
        onMouseDown={(event) => {
          event.preventDefault();
          onSelect();
        }}
        className={cn(
          "grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-panel border px-3 py-3 text-left transition-all duration-150 ease-dossier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          isSelected
            ? "border-border bg-muted text-ink shadow-[inset_0_0_0_1px_rgb(24_22_17_/_0.04)]"
            : "border-transparent text-ink hover:border-border/70 hover:bg-muted/55",
          command.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
      >
        <span className="min-w-0">
          <span className="block text-sm font-medium leading-5">
            {command.title}
          </span>
          <span className="mt-1 block text-sm leading-5 text-muted-foreground">
            {command.description}
          </span>
          {isSearching && command.aliases.length > 0 ? (
            <span className="mt-1 block truncate font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground/80">
              {command.aliases.join(" • ")}
            </span>
          ) : null}
        </span>
        <span className="flex min-w-8 justify-end font-mono text-sm leading-6 text-muted-foreground">
          {command.indicator}
        </span>
      </button>
    </li>
  );
}
