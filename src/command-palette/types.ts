export type CommandCategory =
  | "navigation"
  | "project"
  | "action"
  | "external"
  | "theme";

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
      type: "disabled";
    };

export interface CommandDefinition {
  id: string;
  title: string;
  category: CommandCategory;
  action: CommandAction;
  keywords: readonly string[];
  shortcut?: string;
  disabled?: boolean;
  disabledReason?: string;
  suggestionGroup?: string;
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
  placeholder: string;
  shortcutHint: {
    mac: string;
    default: string;
  };
  emptyLabel: string;
  noResultsTitle: string;
  noResultsDescription: string;
  mobileTriggerLabel: string;
  categories: readonly CommandCategoryDefinition[];
  suggestionGroups: readonly CommandSuggestionGroup[];
  commands: readonly CommandDefinition[];
}

export interface CommandSearchResult {
  command: CommandDefinition;
  score: number;
}
