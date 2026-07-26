import type { ReactElement } from "react";

import { Kbd } from "@/components/ui/Kbd";
import { cn } from "@/lib/cn";
import type { CommandDefinition } from "@/command-palette/types";

interface CommandItemProps {
  command: CommandDefinition;
  categoryLabel: string;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

export function CommandItem({
  command,
  categoryLabel,
  isSelected,
  onSelect,
  onHover,
}: CommandItemProps): ReactElement {
  const hint = command.disabled ? command.disabledReason : command.shortcut;

  return (
    <li
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
          "grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-panel px-3 py-3 text-left transition-colors duration-150 ease-dossier",
          isSelected ? "bg-muted text-ink" : "text-ink hover:bg-muted/70",
          command.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
      >
        <span>
          <span className="block text-sm font-medium leading-5">
            {command.title}
          </span>
          <span className="mt-1 block font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground">
            {categoryLabel}
          </span>
        </span>
        {hint ? <Kbd>{hint}</Kbd> : null}
      </button>
    </li>
  );
}
