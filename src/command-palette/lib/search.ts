import type {
  CommandDefinition,
  CommandHighlightRange,
  CommandHighlights,
  CommandSearchResult,
  SearchableField,
} from "@/command-palette/types";

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getFuzzyRanges(
  query: string,
  candidate: string,
): readonly CommandHighlightRange[] {
  const ranges: CommandHighlightRange[] = [];
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, "");
  const lowerCandidate = candidate.toLowerCase();
  let queryIndex = 0;

  if (!normalizedQuery) {
    return ranges;
  }

  for (let index = 0; index < candidate.length; index += 1) {
    const character = lowerCandidate[index];

    if (!/[a-z0-9]/.test(character)) {
      continue;
    }

    if (character === normalizedQuery[queryIndex]) {
      ranges.push({ start: index, end: index + 1 });
      queryIndex += 1;
    }

    if (queryIndex === normalizedQuery.length) {
      return ranges;
    }
  }

  return [];
}

function getContiguousRanges(
  query: string,
  candidate: string,
): readonly CommandHighlightRange[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const index = candidate.toLowerCase().indexOf(trimmedQuery.toLowerCase());

  if (index >= 0) {
    return [{ start: index, end: index + trimmedQuery.length }];
  }

  return getFuzzyRanges(trimmedQuery, candidate);
}

function scoreCandidate(
  query: string,
  candidate: string,
  field: SearchableField | "content",
): number {
  const normalizedQuery = normalize(query);
  const normalizedCandidate = normalize(candidate);

  if (!normalizedQuery || !normalizedCandidate) {
    return 0;
  }

  const fieldWeight = field === "title" ? 1 : field === "alias" ? 0.94 : 0.72;

  if (normalizedCandidate === normalizedQuery) {
    return field === "alias" ? 6500 : 7000;
  }

  if (normalizedCandidate.startsWith(normalizedQuery)) {
    return (3000 - normalizedCandidate.length * 0.2) * fieldWeight;
  }

  const index = normalizedCandidate.indexOf(normalizedQuery);

  if (index >= 0) {
    return (2200 - index * 2) * fieldWeight;
  }

  let queryIndex = 0;
  let gapPenalty = 0;

  for (let index = 0; index < normalizedCandidate.length; index += 1) {
    if (normalizedCandidate[index] === normalizedQuery[queryIndex]) {
      queryIndex += 1;
    } else if (queryIndex > 0) {
      gapPenalty += 1;
    }

    if (queryIndex === normalizedQuery.length) {
      return Math.max(800, 1600 - gapPenalty * 4) * fieldWeight;
    }
  }

  return -1;
}

function getCommandCandidates(command: CommandDefinition): readonly {
  field: SearchableField | "content";
  value: string;
}[] {
  return [
    { field: "title", value: command.title },
    { field: "description", value: command.description },
    ...command.aliases.map((alias) => ({ field: "alias" as const, value: alias })),
    ...command.keywords.map((keyword) => ({
      field: "content" as const,
      value: keyword,
    })),
  ];
}

function getHighlights(
  command: CommandDefinition,
  query: string,
): CommandHighlights {
  return {
    title: getContiguousRanges(query, command.title),
    description: getContiguousRanges(query, command.description),
    aliases: command.aliases.filter(
      (alias) => scoreCandidate(query, alias, "alias") >= 0,
    ),
  };
}

export function createSuggestionResult(
  command: CommandDefinition,
  meta?: string,
): CommandSearchResult {
  return {
    command,
    score: command.priority ?? 0,
    matchField: "suggestion",
    highlights: {
      title: [],
      description: [],
      aliases: [],
    },
    meta,
  };
}

export function searchCommands(
  commands: readonly CommandDefinition[],
  query: string,
  usageCounts: ReadonlyMap<CommandDefinition["id"], number>,
  recentCommandIds: readonly CommandDefinition["id"][],
): readonly CommandSearchResult[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return commands.map((command) => createSuggestionResult(command));
  }

  return commands
    .flatMap((command) => {
      const bestMatch = getCommandCandidates(command).reduce<{
        field: SearchableField | "content";
        score: number;
      }>(
        (best, candidate) => {
          const score = scoreCandidate(
            trimmedQuery,
            candidate.value,
            candidate.field,
          );

          return score > best.score ? { field: candidate.field, score } : best;
        },
        { field: "content", score: -1 },
      );

      if (bestMatch.score < 0) {
        return [];
      }

      const recentIndex = recentCommandIds.indexOf(command.id);
      const usageBoost = Math.min(900, (usageCounts.get(command.id) ?? 0) * 40);
      const recentBoost = recentIndex >= 0 ? Math.max(80, 420 - recentIndex * 60) : 0;
      const priorityBoost = command.priority ?? 0;

      return [
        {
          command,
          score: bestMatch.score + usageBoost + recentBoost + priorityBoost,
          matchField: bestMatch.field,
          highlights: getHighlights(command, trimmedQuery),
        },
      ];
    })
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      return first.command.title.localeCompare(second.command.title);
    });
}
