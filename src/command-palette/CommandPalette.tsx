import { useCallback, useEffect, useMemo, useRef, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CommandPalettePanel } from "@/command-palette/components/CommandPalettePanel";
import { CommandToast } from "@/command-palette/components/CommandToast";
import { MobileCommandTrigger } from "@/command-palette/components/MobileCommandTrigger";
import {
  getNoResultSuggestions,
  groupCommandResults,
} from "@/command-palette/lib/grouping";
import { useCommandPalette } from "@/command-palette/hooks/useCommandPalette";
import { commandRegistry } from "@/command-palette/registry";
import { commandPaletteContent } from "@/content/commandPalette";
import type { CommandDefinition } from "@/command-palette/types";

const backdropTransition = {
  duration: 0.16,
  ease: [0.16, 1, 0.3, 1],
} as const;

export function CommandPalette(): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen,
    openPalette,
    closePalette,
    query,
    setQuery,
    visibleResults,
    personalizedGroups,
    hasSearchMatches,
    selectedCommandId,
    executeCommand,
    toggleFavorite,
    favoriteCommandIds,
    setSelectedIndex,
    shortcutHint,
    showFirstVisitHint,
    toastMessage,
  } = useCommandPalette(commandPaletteContent, commandRegistry);

  const groups = useMemo(
    () =>
      !query.trim()
        ? personalizedGroups
        : hasSearchMatches
        ? groupCommandResults(
            commandPaletteContent,
            commandRegistry,
            query,
            visibleResults,
          )
        : [],
    [hasSearchMatches, personalizedGroups, query, visibleResults],
  );

  const noResultSuggestions = useMemo(
    () =>
      hasSearchMatches
        ? getNoResultSuggestions(commandPaletteContent, commandRegistry)
        : visibleResults,
    [hasSearchMatches, visibleResults],
  );

  const getCommandIndex = useCallback(
    (command: CommandDefinition) =>
      visibleResults.findIndex((item) => item.command.id === command.id),
    [visibleResults],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isOpen]);

  return (
    <>
      <MobileCommandTrigger
        label={commandPaletteContent.mobileTriggerLabel}
        onOpen={openPalette}
      />

      {showFirstVisitHint ? (
        <div className="fixed bottom-5 right-5 z-30 hidden max-w-[18rem] rounded-panel border border-border bg-paper px-4 py-3 text-sm leading-6 text-muted-foreground shadow-soft md:block">
          {commandPaletteContent.firstVisitHintTemplate.replace(
            "{shortcut}",
            shortcutHint,
          )}
        </div>
      ) : null}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-start bg-ink/45 px-4 py-20 backdrop-blur-sm sm:place-items-center sm:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onMouseDown={closePalette}
          >
            <CommandPalettePanel
              content={commandPaletteContent}
              groups={groups}
              noResultSuggestions={noResultSuggestions}
              query={query}
              shortcutHint={shortcutHint}
              selectedCommandId={selectedCommandId}
              inputRef={inputRef}
              onQueryChange={setQuery}
              onClose={closePalette}
              onExecute={executeCommand}
              onToggleFavorite={toggleFavorite}
              favoriteCommandIds={favoriteCommandIds}
              onHover={setSelectedIndex}
              getCommandIndex={getCommandIndex}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={backdropTransition}
          >
            <CommandToast message={toastMessage} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
