import type {
  CommandDefinition,
  CommandSearchResult,
} from "@/command-palette/types";

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function scoreCandidate(query: string, candidate: string): number {
  const normalizedQuery = normalize(query);
  const normalizedCandidate = normalize(candidate);

  if (!normalizedQuery) {
    return 0;
  }

  if (normalizedCandidate === normalizedQuery) {
    return 120;
  }

  if (normalizedCandidate.startsWith(normalizedQuery)) {
    return 100 - normalizedCandidate.length;
  }

  const index = normalizedCandidate.indexOf(normalizedQuery);

  if (index >= 0) {
    return 80 - index;
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
      return 50 - gapPenalty;
    }
  }

  return -1;
}

export function searchCommands(
  commands: readonly CommandDefinition[],
  query: string,
): readonly CommandSearchResult[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return commands.map((command) => ({ command, score: 0 }));
  }

  return commands
    .map((command) => {
      const candidates = [command.title, command.category, ...command.keywords];
      const score = Math.max(
        ...candidates.map((candidate) => scoreCandidate(trimmedQuery, candidate)),
      );

      return { command, score };
    })
    .filter((result) => result.score >= 0)
    .sort((first, second) => second.score - first.score);
}
