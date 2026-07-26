import type {
  CommandDefinition,
  CommandPaletteContent,
} from "@/command-palette/types";

export interface CommandGroupView {
  id: string;
  label: string;
  commands: readonly CommandDefinition[];
}

export function groupCommands(
  content: CommandPaletteContent,
  query: string,
  visibleCommands: readonly CommandDefinition[],
): readonly CommandGroupView[] {
  const commandMap = new Map(
    visibleCommands.map((command) => [command.id, command] as const),
  );

  if (!query.trim()) {
    return content.suggestionGroups
      .map((group) => ({
        id: group.id,
        label: group.label,
        commands: group.commandIds.flatMap((commandId) => {
          const command = commandMap.get(commandId);
          return command ? [command] : [];
        }),
      }))
      .filter((group) => group.commands.length > 0);
  }

  return content.categories
    .map((category) => ({
      id: category.id,
      label: category.label,
      commands: visibleCommands.filter(
        (command) => command.category === category.id,
      ),
    }))
    .filter((group) => group.commands.length > 0);
}
