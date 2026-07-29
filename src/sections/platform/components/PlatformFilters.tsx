import type { ReactElement } from "react";
import type { NoteCategory, ArticleDifficulty } from "@/notes/types";
import { cn } from "@/lib/cn";

interface PlatformFiltersProps {
  categories: readonly NoteCategory[];
  activeCategory: NoteCategory | "All";
  onCategorySelect: (category: NoteCategory | "All") => void;
  tags: readonly string[];
  activeTag: string;
  onTagSelect: (tag: string) => void;
  activeDifficulty: ArticleDifficulty | "All";
  onDifficultySelect: (difficulty: ArticleDifficulty | "All") => void;
}

export function PlatformFilters({
  categories,
  activeCategory,
  onCategorySelect,
  tags,
  activeTag,
  onTagSelect,
  activeDifficulty,
  onDifficultySelect,
}: PlatformFiltersProps): ReactElement {
  return (
    <div className="space-y-6">
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => onCategorySelect("All")}
          aria-pressed={activeCategory === "All"}
          className={cn(
            "rounded-control border px-3 py-1.5 text-xs font-medium font-mono uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            activeCategory === "All"
              ? "border-accent bg-accent text-white"
              : "border-border bg-paper text-muted-foreground hover:border-border/80 hover:bg-canvas hover:text-ink",
          )}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategorySelect(category)}
            aria-pressed={activeCategory === category}
            className={cn(
              "rounded-control border px-3 py-1.5 text-xs font-medium font-mono uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              activeCategory === category
                ? "border-accent bg-accent text-white"
                : "border-border bg-paper text-muted-foreground hover:border-border/80 hover:bg-canvas hover:text-ink",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="tag-filter" className="text-xs font-mono uppercase font-semibold text-muted-foreground">Tag:</label>
          <select 
            id="tag-filter"
            value={activeTag}
            onChange={(e) => onTagSelect(e.target.value)}
            className="rounded-control border border-border bg-paper px-2 py-1 text-xs text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]"
          >
            <option value="All">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="difficulty-filter" className="text-xs font-mono uppercase font-semibold text-muted-foreground">Difficulty:</label>
          <select 
            id="difficulty-filter"
            value={activeDifficulty}
            onChange={(e) => onDifficultySelect(e.target.value as ArticleDifficulty | "All")}
            className="rounded-control border border-border bg-paper px-2 py-1 text-xs text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]"
          >
            <option value="All">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}
