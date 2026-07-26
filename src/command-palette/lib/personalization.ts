import type { CommandDefinition, CommandRegistry } from "@/command-palette/types";

export const usageStorageKey = "portfolio.commandPalette.usage.v1";
export const recentStorageKey = "portfolio.commandPalette.recent.v1";
export const favoritesStorageKey = "portfolio.commandPalette.favorites.v1";
export const maxRecentCommands = 6;
export const maxFavoriteCommands = 5;
export const maxMostUsedCommands = 5;

function readStoredValue(key: string): unknown {
  try {
    const storedValue = window.localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : undefined;
  } catch {
    return undefined;
  }
}

function writeStoredValue(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage may be unavailable in restricted browser modes.
  }
}

function removeStoredValue(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Local storage may be unavailable in restricted browser modes.
  }
}

function isKnownCommandId(
  commandId: string,
  registry: CommandRegistry,
): commandId is CommandDefinition["id"] {
  return registry.commandById.has(commandId);
}

export function readCommandIds(
  key: string,
  registry: CommandRegistry,
): CommandDefinition["id"][] {
  const storedValue = readStoredValue(key);

  if (!Array.isArray(storedValue)) {
    return [];
  }

  return storedValue.filter(
    (value): value is CommandDefinition["id"] =>
      typeof value === "string" && isKnownCommandId(value, registry),
  );
}

export function writeCommandIds(
  key: string,
  commandIds: readonly CommandDefinition["id"][],
): void {
  writeStoredValue(key, commandIds);
}

export function readUsageCounts(
  registry: CommandRegistry,
): Map<CommandDefinition["id"], number> {
  const storedValue = readStoredValue(usageStorageKey);

  if (!storedValue || typeof storedValue !== "object" || Array.isArray(storedValue)) {
    return new Map();
  }

  return new Map(
    Object.entries(storedValue)
      .filter(
        (entry): entry is [CommandDefinition["id"], number] =>
          isKnownCommandId(entry[0], registry) &&
          typeof entry[1] === "number" &&
          Number.isFinite(entry[1]) &&
          entry[1] > 0,
      )
      .map(([commandId, count]) => [commandId, Math.floor(count)]),
  );
}

export function writeUsageCounts(
  usageCounts: ReadonlyMap<CommandDefinition["id"], number>,
): void {
  writeStoredValue(usageStorageKey, Object.fromEntries(usageCounts));
}

export function clearRecentCommands(): void {
  removeStoredValue(recentStorageKey);
}

export function clearFavoriteCommands(): void {
  removeStoredValue(favoritesStorageKey);
}

export function clearUsageCounts(): void {
  removeStoredValue(usageStorageKey);
}
