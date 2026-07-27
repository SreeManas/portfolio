export type NoteCategory =
  | "AI"
  | "React"
  | "System Design"
  | "Architecture"
  | "Backend"
  | "Learning"
  | "Experiments"
  | "Engineering";

export interface EngineeringNote {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: NoteCategory;
  tags: readonly string[];
  readingTime: string;
  date: string;
  featured: boolean;
  content: string;
}

export interface NotesContent {
  title: string;
  introduction: string;
  searchPlaceholder: string;
  categories: readonly NoteCategory[];
  notes: readonly EngineeringNote[];
}
