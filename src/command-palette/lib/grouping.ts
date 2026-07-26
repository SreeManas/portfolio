import type {
  CommandDefinition,
  CommandPaletteContent,
  CommandRegistry,
  CommandSearchResult,
} from "@/command-palette/types";
import { createSuggestionResult } from "@/command-palette/lib/search";
import { maxMostUsedCommands } from "@/command-palette/lib/personalization";

export interface CommandGroupView {
  id: string;
  label: string;
  results: readonly CommandSearchResult[];
  emptyLabel?: string;
}

function getResultsByIds(
  commandIds: readonly string[],
  registry: CommandRegistry,
  options: {
    metaById?: ReadonlyMap<CommandDefinition["id"], string>;
    excludeIds?: ReadonlySet<CommandDefinition["id"]>;
  } = {},
): readonly CommandSearchResult[] {
  return commandIds.flatMap((commandId) => {
    if (options.excludeIds?.has(commandId)) {
      return [];
    }

    const command = registry.commandById.get(commandId);
    return command ? [createSuggestionResult(command, options.metaById?.get(commandId))] : [];
  });
}

function rememberGroupCommands(
  commandIds: Set<CommandDefinition["id"]>,
  group: CommandGroupView,
): CommandGroupView {
  group.results.forEach((result) => {
    commandIds.add(result.command.id);
  });

  return group;
}

export function getPersonalizedCommandGroups(
  content: CommandPaletteContent,
  registry: CommandRegistry,
  options: {
    favoriteCommandIds: readonly CommandDefinition["id"][];
    recentCommandIds: readonly CommandDefinition["id"][];
    usageCounts: ReadonlyMap<CommandDefinition["id"], number>;
  },
): readonly CommandGroupView[] {
  const usedCommandIds = new Set<CommandDefinition["id"]>();
  const usageMeta = new Map(
    [...options.usageCounts.entries()].map(([commandId, count]) => [
      commandId,
      `(${count})`,
    ]),
  );

  const pinnedGroup = rememberGroupCommands(usedCommandIds, {
    id: "pinned",
    label: content.personalization.pinnedLabel,
    emptyLabel: content.personalization.pinnedEmptyLabel,
    results: getResultsByIds(options.favoriteCommandIds, registry),
  });

  const recentGroup = rememberGroupCommands(usedCommandIds, {
    id: "recent",
    label: content.personalization.recentLabel,
    emptyLabel: content.personalization.recentEmptyLabel,
    results: getResultsByIds(options.recentCommandIds, registry, {
      excludeIds: usedCommandIds,
    }),
  });

  const mostUsedCommandIds = [...options.usageCounts.entries()]
    .sort((first, second) => {
      if (second[1] !== first[1]) {
        return second[1] - first[1];
      }

      return first[0].localeCompare(second[0]);
    })
    .map(([commandId]) => commandId)
    .slice(0, maxMostUsedCommands);

  const mostUsedGroup = rememberGroupCommands(usedCommandIds, {
    id: "most-used",
    label: content.personalization.mostUsedLabel,
    emptyLabel: content.personalization.mostUsedEmptyLabel,
    results: getResultsByIds(mostUsedCommandIds, registry, {
      metaById: usageMeta,
    }),
  });

  const hasPersonalizedCommands =
    pinnedGroup.results.length > 0 ||
    recentGroup.results.length > 0 ||
    mostUsedGroup.results.length > 0;

  const onboardingCommandIds = content.suggestionGroups.flatMap(
    (group) => group.commandIds,
  );
  const onboardingGroup = rememberGroupCommands(usedCommandIds, {
    id: "onboarding",
    label: content.personalization.onboardingLabel,
    results: hasPersonalizedCommands
      ? []
      : getResultsByIds(onboardingCommandIds, registry, {
          excludeIds: usedCommandIds,
        }),
  });

  return [pinnedGroup, recentGroup, mostUsedGroup, onboardingGroup].filter(
    (group) => group.emptyLabel || group.results.length > 0,
  );
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
