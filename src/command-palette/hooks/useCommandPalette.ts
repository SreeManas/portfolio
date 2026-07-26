import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  CommandDefinition,
  CommandPaletteContent,
  CommandRegistry,
  CommandSearchResult,
} from "@/command-palette/types";
import { executeCommandAction } from "@/command-palette/lib/actions";
import {
  formatPlatformShortcut,
  getVisitorPlatform,
} from "@/command-palette/lib/platform";
import {
  createSuggestionResult,
  searchCommands,
} from "@/command-palette/lib/search";

interface UseCommandPaletteResult {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  query: string;
  setQuery: (query: string) => void;
  visibleResults: readonly CommandSearchResult[];
  hasSearchMatches: boolean;
  selectedCommandId: string | undefined;
  selectedIndex: number;
  executeCommand: (command: CommandDefinition) => void;
  setSelectedIndex: (index: number) => void;
  shortcutHint: string;
  showFirstVisitHint: boolean;
  toastMessage: string | undefined;
}

const usageStorageKey = "portfolio.commandPalette.usage.v1";
const openedStorageKey = "portfolio.commandPalette.opened.v1";

function readUsageCounts(): Map<CommandDefinition["id"], number> {
  try {
    const storedValue = window.localStorage.getItem(usageStorageKey);

    if (!storedValue) {
      return new Map();
    }

    const parsedValue = JSON.parse(storedValue) as Record<string, number>;
    return new Map(Object.entries(parsedValue));
  } catch {
    return new Map();
  }
}

function writeUsageCounts(
  usageCounts: ReadonlyMap<CommandDefinition["id"], number>,
): void {
  try {
    window.localStorage.setItem(
      usageStorageKey,
      JSON.stringify(Object.fromEntries(usageCounts)),
    );
  } catch {
    // Local storage may be unavailable in restricted browser modes.
  }
}

function hasOpenedBefore(): boolean {
  try {
    return window.localStorage.getItem(openedStorageKey) === "true";
  } catch {
    return false;
  }
}

function rememberOpened(): void {
  try {
    window.localStorage.setItem(openedStorageKey, "true");
  } catch {
    // Local storage may be unavailable in restricted browser modes.
  }
}

function getSuggestionResults(
  content: CommandPaletteContent,
  registry: CommandRegistry,
): readonly CommandSearchResult[] {
  return content.suggestionGroups.flatMap((group) =>
    group.commandIds.flatMap((commandId) => {
      const command = registry.commandById.get(commandId);
      return command ? [createSuggestionResult(command)] : [];
    }),
  );
}

function getNoResultSuggestionResults(
  content: CommandPaletteContent,
  registry: CommandRegistry,
): readonly CommandSearchResult[] {
  return content.noResultsSuggestionCommandIds.flatMap((commandId) => {
    const command = registry.commandById.get(commandId);
    return command ? [createSuggestionResult(command)] : [];
  });
}

export function useCommandPalette(
  content: CommandPaletteContent,
  registry: CommandRegistry,
): UseCommandPaletteResult {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [platform] = useState(() => getVisitorPlatform());
  const [hasOpened, setHasOpened] = useState(() => hasOpenedBefore());
  const [usageCounts, setUsageCounts] = useState(() => readUsageCounts());
  const [toastMessage, setToastMessage] = useState<string>();
  const toastTimeoutRef = useRef<number | undefined>(undefined);

  const shortcutHint = useMemo(
    () =>
      formatPlatformShortcut(
        platform === "macos"
          ? content.shortcutHint.mac
          : content.shortcutHint.default,
        platform,
      ),
    [content.shortcutHint.default, content.shortcutHint.mac, platform],
  );

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return getSuggestionResults(content, registry);
    }

    return searchCommands(registry.commands, query, usageCounts);
  }, [content, query, registry, usageCounts]);
  const hasSearchMatches = !query.trim() || searchResults.length > 0;
  const visibleResults = hasSearchMatches
    ? searchResults
    : getNoResultSuggestionResults(content, registry);

  const safeSelectedIndex =
    visibleResults.length > 0
      ? Math.min(selectedIndex, visibleResults.length - 1)
      : 0;
  const selectedCommand = visibleResults[safeSelectedIndex]?.command;

  const showToast = useCallback((message: string) => {
    setToastMessage(message);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(undefined);
    }, 1800);
  }, []);

  const markOpened = useCallback(() => {
    setHasOpened(true);
    rememberOpened();
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen((current) => (current ? current : true));
    markOpened();
  }, [markOpened]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const updateQuery = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
    setSelectedIndex(0);
  }, []);

  const executeCommand = useCallback(
    (command: CommandDefinition) => {
      if (command.disabled) {
        return;
      }

      void executeCommandAction(command.action, { onSuccess: showToast })
        .then((didExecute) => {
          if (!didExecute) {
            return;
          }

          setUsageCounts((currentUsageCounts) => {
            const nextUsageCounts = new Map(currentUsageCounts);
            nextUsageCounts.set(
              command.id,
              (nextUsageCounts.get(command.id) ?? 0) + 1,
            );
            writeUsageCounts(nextUsageCounts);
            return nextUsageCounts;
          });
          closePalette();
        })
        .catch((error: unknown) => {
          console.error("Command execution failed", error);
        });
    },
    [closePalette, showToast],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isShortcut =
        event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);

      if (isShortcut) {
        event.preventDefault();

        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }

        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) =>
          visibleResults.length > 0 ? (current + 1) % visibleResults.length : 0,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) =>
          visibleResults.length > 0
            ? (current - 1 + visibleResults.length) % visibleResults.length
            : 0,
        );
        return;
      }

      if (event.key === "Enter" && selectedCommand) {
        event.preventDefault();
        executeCommand(selectedCommand);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        if (visibleResults[0]) {
          updateQuery(visibleResults[0].command.title);
          setSelectedIndex(0);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closePalette,
    executeCommand,
    isOpen,
    openPalette,
    selectedCommand,
    updateQuery,
    visibleResults,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    openPalette,
    closePalette,
    query,
    setQuery: updateQuery,
    visibleResults,
    hasSearchMatches,
    selectedCommandId: selectedCommand?.id,
    selectedIndex: safeSelectedIndex,
    executeCommand,
    setSelectedIndex,
    shortcutHint,
    showFirstVisitHint: !hasOpened && !isOpen,
    toastMessage,
  };
}
