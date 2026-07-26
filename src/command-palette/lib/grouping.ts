import type {
  CommandPaletteContent,
  CommandRegistry,
  CommandSearchResult,
} from "@/command-palette/types";
import { createSuggestionResult } from "@/command-palette/lib/search";

export interface CommandGroupView {
  id: string;
  label: string;
  results: readonly CommandSearchResult[];
}

function getResultsByIds(
  commandIds: readonly string[],
  registry: CommandRegistry,
): readonly CommandSearchResult[] {
  return commandIds.flatMap((commandId) => {
    const command = registry.commandById.get(commandId);
    return command ? [createSuggestionResult(command)] : [];
  });
}

export function groupCommandResults(
  content: CommandPaletteContent,
  registry: CommandRegistry,
  query: string,
  visibleResults: readonly CommandSearchResult[],
): readonly CommandGroupView[] {
  if (!query.trim()) {
    return content.suggestionGroups
      .map((group) => ({
        id: group.id,
        label: group.label,
        results: getResultsByIds(group.commandIds, registry),
      }))
      .filter((group) => group.results.length > 0);
  }

  return content.categories
    .map((category) => ({
      id: category.id,
      label: category.label,
      results: visibleResults.filter(
        (result) => result.command.category === category.id,
      ),
    }))
    .filter((group) => group.results.length > 0)
    .sort((first, second) => second.results[0].score - first.results[0].score);
}

export function getNoResultSuggestions(
  content: CommandPaletteContent,
  registry: CommandRegistry,
): readonly CommandSearchResult[] {
  return getResultsByIds(content.noResultsSuggestionCommandIds, registry);
}
