import type { ChangeEvent, ReactElement, RefObject } from "react";
import { motion } from "framer-motion";

import { CommandGroup } from "@/command-palette/components/CommandGroup";
import { CommandItem } from "@/command-palette/components/CommandItem";
import { CommandPaletteFooter } from "@/command-palette/components/CommandPaletteFooter";
import { SearchGlyph } from "@/command-palette/components/SearchGlyph";
import type { CommandGroupView } from "@/command-palette/lib/grouping";
import type {
  CommandDefinition,
  CommandPaletteContent,
  CommandSearchResult,
} from "@/command-palette/types";
import { Kbd } from "@/components/ui/Kbd";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";

interface CommandPalettePanelProps {
  content: CommandPaletteContent;
  groups: readonly CommandGroupView[];
  noResultSuggestions: readonly CommandSearchResult[];
  query: string;
  shortcutHint: string;
  selectedCommandId: string | undefined;
  inputRef: RefObject<HTMLInputElement | null>;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onExecute: (command: CommandDefinition) => void;
  onToggleFavorite: (command: CommandDefinition) => void;
  favoriteCommandIds: readonly CommandDefinition["id"][];
  onHover: (index: number) => void;
  getCommandIndex: (command: CommandDefinition) => number;
}

const panelTransition = {
  duration: 0.16,
  ease: [0.16, 1, 0.3, 1],
} as const;

export function CommandPalettePanel({
  content,
  groups,
  noResultSuggestions,
  query,
  shortcutHint,
  selectedCommandId,
  inputRef,
  onQueryChange,
  onClose,
  onExecute,
  onToggleFavorite,
  favoriteCommandIds,
  onHover,
  getCommandIndex,
}: CommandPalettePanelProps): ReactElement {
  const hasResults = groups.length > 0;
  const hasNoResultSuggestions = noResultSuggestions.length > 0;

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.target.value);
  }

  const isSearching = query.trim().length > 0;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
      className="relative flex w-full max-w-[44rem] flex-col overflow-hidden rounded-[0.75rem] border border-border bg-paper shadow-[0_1.5rem_5rem_rgb(24_22_17_/_0.28)]"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={panelTransition}
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
    >
      <VisuallyHidden id="command-palette-title">
        {content.title}
      </VisuallyHidden>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border px-4 py-3">
        <SearchGlyph />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleQueryChange}
          aria-label={content.inputLabel}
          aria-controls="command-palette-results"
          aria-activedescendant={
            selectedCommandId ? `command-option-${selectedCommandId}` : undefined
          }
          placeholder={content.placeholder}
          className="min-w-0 bg-transparent text-base leading-7 text-ink outline-none placeholder:text-muted-foreground"
        />
        <Kbd>{shortcutHint}</Kbd>
      </div>

      <div
        id="command-palette-results"
        role="listbox"
        aria-label={isSearching ? content.resultsLabel : content.emptyLabel}
        className="max-h-[min(28rem,calc(100dvh-14rem))] overflow-y-auto px-2 pb-2 pt-1"
      >
        {hasResults ? (
          groups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              className="border-t border-border/70 pt-2 first:border-t-0 first:pt-0"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.14,
                delay: groupIndex * 0.018,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <CommandGroup
                group={group}
                isSearching={isSearching}
                selectedCommandId={selectedCommandId}
                favoriteCommandIds={favoriteCommandIds}
                getCommandIndex={getCommandIndex}
                onExecute={onExecute}
                onToggleFavorite={onToggleFavorite}
                onHover={onHover}
                favoriteLabel={content.personalization.favoriteLabel}
                unfavoriteLabel={content.personalization.unfavoriteLabel}
              />
            </motion.div>
          ))
        ) : (
          <div className="px-3 py-10">
            <p className="text-sm font-medium leading-6 text-ink">
              {content.noResultsTitle}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {content.noResultsDescription}
            </p>
            {hasNoResultSuggestions ? (
              <div className="mt-6">
                <div className="mb-2 flex items-center gap-3">
                  <h3 className="shrink-0 font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground">
                    {content.noResultsSuggestionLabel}
                  </h3>
                  <div aria-hidden="true" className="h-px flex-1 bg-border" />
                </div>
                <ul className="space-y-1">
                  {noResultSuggestions.map((result) => (
                    <CommandItem
                      key={result.command.id}
                      result={result}
                      isSearching={false}
                      isSelected={selectedCommandId === result.command.id}
                      isFavorite={favoriteCommandIds.includes(result.command.id)}
                      canFavorite={result.command.personalizable !== false}
                      onSelect={() => onExecute(result.command)}
                      onToggleFavorite={() => onToggleFavorite(result.command)}
                      onHover={() => onHover(getCommandIndex(result.command))}
                      favoriteLabel={content.personalization.favoriteLabel}
                      unfavoriteLabel={content.personalization.unfavoriteLabel}
                    />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="sr-only"
      >
        {content.closeLabel}
      </button>

      <CommandPaletteFooter
        shortcuts={content.footerShortcuts}
      />
    </motion.div>
  );
}
