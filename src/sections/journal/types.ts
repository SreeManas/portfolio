export type JournalOrdering =
  | {
      mode: "manual";
    }
  | {
      mode: "date";
      direction: "ascending" | "descending";
    };

export interface JournalLink {
  label: string;
  href: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  category: string;
  title: string;
  note: string;
  tags?: readonly string[];
  links?: readonly JournalLink[];
  bodyFormat?: "plain" | "markdown";
  searchableText?: string;
}

export interface JournalContent {
  id: string;
  title: string;
  introduction: string;
  ordering: JournalOrdering;
  entries: readonly JournalEntry[];
}

