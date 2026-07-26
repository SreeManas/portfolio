import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  CommandDefinition,
  CommandPaletteContent,
} from "@/command-palette/types";
import { executeCommandAction } from "@/command-palette/lib/actions";
import { searchCommands } from "@/command-palette/lib/search";

interface UseCommandPaletteResult {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  query: string;
  setQuery: (query: string) => void;
  visibleCommands: readonly CommandDefinition[];
  selectedCommandId: string | undefined;
  selectedIndex: number;
  executeCommand: (command: CommandDefinition) => void;
  setSelectedIndex: (index: number) => void;
  shortcutHint: string;
  toastMessage: string | undefined;
}

function isMacPlatform(): boolean {
  return /mac|iphone|ipad|ipod/i.test(window.navigator.platform);
}

function getSuggestionCommands(
  content: CommandPaletteContent,
): readonly CommandDefinition[] {
  const commandMap = new Map(
    content.commands.map((command) => [command.id, command] as const),
  );

  return content.suggestionGroups.flatMap((group) =>
    group.commandIds.flatMap((commandId) => {
      const command = commandMap.get(commandId);
      return command ? [command] : [];
    }),
  );
}

export function useCommandPalette(
  content: CommandPaletteContent,
): UseCommandPaletteResult {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shortcutHint] = useState(() =>
    isMacPlatform() ? content.shortcutHint.mac : content.shortcutHint.default,
  );
  const [toastMessage, setToastMessage] = useState<string>();
  const toastTimeoutRef = useRef<number | undefined>(undefined);

  const visibleCommands = useMemo(() => {
    if (!query.trim()) {
      return getSuggestionCommands(content);
    }

    return searchCommands(content.commands, query).map((result) => result.command);
  }, [content, query]);

  const safeSelectedIndex =
    visibleCommands.length > 0
      ? Math.min(selectedIndex, visibleCommands.length - 1)
      : 0;
  const selectedCommand = visibleCommands[safeSelectedIndex];

  const showToast = useCallback((message: string) => {
    setToastMessage(message);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(undefined);
    }, 1800);
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen((current) => (current ? current : true));
  }, []);

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

      void executeCommandAction(command.action, { onSuccess: showToast }).then(
        (didExecute) => {
          if (didExecute) {
            closePalette();
          }
        },
      );
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
          visibleCommands.length > 0 ? (current + 1) % visibleCommands.length : 0,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) =>
          visibleCommands.length > 0
            ? (current - 1 + visibleCommands.length) % visibleCommands.length
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

        if (visibleCommands[0]) {
          updateQuery(visibleCommands[0].title);
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
    visibleCommands,
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
    visibleCommands,
    selectedCommandId: selectedCommand?.id,
    selectedIndex: safeSelectedIndex,
    executeCommand,
    setSelectedIndex,
    shortcutHint,
    toastMessage,
  };
}
