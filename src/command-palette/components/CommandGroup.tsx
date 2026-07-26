import type { ReactElement } from "react";

import { CommandItem } from "@/command-palette/components/CommandItem";
import type { CommandGroupView } from "@/command-palette/lib/grouping";
import type {
  CommandCategoryDefinition,
  CommandDefinition,
} from "@/command-palette/types";

interface CommandGroupProps {
  group: CommandGroupView;
  categories: readonly CommandCategoryDefinition[];
  selectedCommandId: string | undefined;
  getCommandIndex: (command: CommandDefinition) => number;
  onExecute: (command: CommandDefinition) => void;
  onHover: (index: number) => void;
}

export function CommandGroup({
  group,
  categories,
  selectedCommandId,
  getCommandIndex,
  onExecute,
  onHover,
}: CommandGroupProps): ReactElement {
  const categoryLabels = new Map(
    categories.map((category) => [category.id, category.label] as const),
  );

  return (
    <section aria-labelledby={`command-group-${group.id}`}>
      <h3
        id={`command-group-${group.id}`}
        className="px-3 pb-2 pt-4 font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground"
      >
        {group.label}
      </h3>
      <ul className="space-y-1">
        {group.commands.map((command) => {
          const commandIndex = getCommandIndex(command);

          return (
            <CommandItem
              key={command.id}
              command={command}
              categoryLabel={categoryLabels.get(command.category) ?? command.category}
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
