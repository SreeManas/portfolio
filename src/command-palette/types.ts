export type CommandCategory =
  | "navigation"
  | "project"
  | "skill"
  | "note"
  | "journey"
  | "action"
  | "external"
  | "future-ai";

export type CommandAction =
  | {
      type: "scroll";
      targetId: string;
    }
  | {
      type: "open";
      href: string;
    }
  | {
      type: "download";
      href: string;
      filename?: string;
    }
  | {
      type: "mailto";
      href: string;
    }
  | {
      type: "copy";
      value: string;
      successMessage: string;
    }
  | {
      type: "copy-current-url";
      successMessage: string;
    }
  | {
      type: "copy-url";
      href: string;
      successMessage: string;
    }
  | {
      type: "disabled";
    };

export type SearchableField = "title" | "description" | "alias";

export interface CommandHighlightRange {
  start: number;
  end: number;
}

export interface CommandHighlights {
  title: readonly CommandHighlightRange[];
  description: readonly CommandHighlightRange[];
  aliases: readonly string[];
}

export interface CommandDefinition {
  id: string;
  title: string;
  description: string;
  category: CommandCategory;
  action: CommandAction;
  keywords: readonly string[];
  aliases: readonly string[];
  indicator: string;
  priority?: number;
  shortcut?: string;
  disabled?: boolean;
  disabledReason?: string;
}

export interface CommandCategoryDefinition {
  id: CommandCategory;
  label: string;
}

export interface CommandSuggestionGroup {
  id: string;
  label: string;
  commandIds: readonly CommandDefinition["id"][];
}

export interface CommandPaletteContent {
  title: string;
  inputLabel: string;
  resultsLabel: string;
  closeLabel: string;
  placeholder: string;
  shortcutHint: {
    mac: string;
    default: string;
  };
  emptyLabel: string;
  noResultsTitle: string;
  noResultsDescription: string;
  noResultsSuggestionLabel: string;
  noResultsSuggestionCommandIds: readonly CommandDefinition["id"][];
  mobileTriggerLabel: string;
  firstVisitHintTemplate: string;
  footerShortcuts: readonly {
    id: string;
    keys: string;
    label: string;
  }[];
  categories: readonly CommandCategoryDefinition[];
  suggestionGroups: readonly CommandSuggestionGroup[];
}

export interface CommandSearchResult {
  command: CommandDefinition;
  score: number;
  matchField: SearchableField | "content" | "suggestion";
  highlights: CommandHighlights;
}

export interface CommandRegistry {
  commands: readonly CommandDefinition[];
  commandById: ReadonlyMap<CommandDefinition["id"], CommandDefinition>;
}
