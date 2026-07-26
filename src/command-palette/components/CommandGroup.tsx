import type { ReactElement } from "react";

import { CommandItem } from "@/command-palette/components/CommandItem";
import type { CommandGroupView } from "@/command-palette/lib/grouping";
import type { CommandDefinition } from "@/command-palette/types";

interface CommandGroupProps {
  group: CommandGroupView;
  isSearching: boolean;
  selectedCommandId: string | undefined;
  getCommandIndex: (command: CommandDefinition) => number;
  onExecute: (command: CommandDefinition) => void;
  onHover: (index: number) => void;
}

export function CommandGroup({
  group,
  isSearching,
  selectedCommandId,
  getCommandIndex,
  onExecute,
  onHover,
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
      <ul className="space-y-1">
        {group.commands.map((command) => {
          const commandIndex = getCommandIndex(command);

          return (
            <CommandItem
              key={command.id}
              command={command}
              isSearching={isSearching}
              isSelected={selectedCommandId === command.id}
              onSelect={() => onExecute(command)}
              onHover={() => onHover(commandIndex)}
            />
          );
        })}
      </ul>
    </section>
  );
}
