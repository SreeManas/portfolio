import type { ReactElement } from "react";

import { CommandItem } from "@/command-palette/components/CommandItem";
import type { CommandGroupView } from "@/command-palette/lib/grouping";
import type { CommandDefinition, CommandSearchResult } from "@/command-palette/types";

interface CommandGroupProps {
  group: CommandGroupView;
  isSearching: boolean;
  selectedCommandId: string | undefined;
  favoriteCommandIds: readonly CommandDefinition["id"][];
  getCommandIndex: (command: CommandDefinition) => number;
  onExecute: (command: CommandDefinition) => void;
  onToggleFavorite: (command: CommandDefinition) => void;
  onHover: (index: number) => void;
  favoriteLabel: string;
  unfavoriteLabel: string;
}

export function CommandGroup({
  group,
  isSearching,
  selectedCommandId,
  favoriteCommandIds,
  getCommandIndex,
  onExecute,
  onToggleFavorite,
  onHover,
  favoriteLabel,
  unfavoriteLabel,
}: CommandGroupProps): ReactElement {
  return (
    <section aria-labelledby={`command-group-${group.id}`}>
      <div className="flex items-center gap-3 px-3 pb-2 pt-3">
        <h3
          id={`command-group-${group.id}`}
          className="shrink-0 font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground"
        >
          {group.label}
        </h3>
        <div aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      {group.results.length > 0 ? (
        <ul className="space-y-1">
        {group.results.map((result: CommandSearchResult) => {
          const { command } = result;
          const commandIndex = getCommandIndex(command);

          return (
            <CommandItem
              key={command.id}
              result={result}
              isSearching={isSearching}
              isSelected={selectedCommandId === command.id}
              isFavorite={favoriteCommandIds.includes(command.id)}
              canFavorite={command.personalizable !== false}
              onSelect={() => onExecute(command)}
              onToggleFavorite={() => onToggleFavorite(command)}
              onHover={() => onHover(commandIndex)}
              favoriteLabel={favoriteLabel}
              unfavoriteLabel={unfavoriteLabel}
            />
          );
        })}
        </ul>
      ) : (
        <p className="px-3 pb-3 text-sm leading-6 text-muted-foreground">
          {group.emptyLabel}
        </p>
      )}
    </section>
  );
}
