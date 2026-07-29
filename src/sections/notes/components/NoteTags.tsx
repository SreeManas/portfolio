import type { ReactElement } from "react";

interface NoteTagsProps {
  tags: readonly string[];
}

export function NoteTags({ tags }: NoteTagsProps): ReactElement {
  return (
    <ul aria-label="Tags" className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground border border-border/60 px-2 py-0.5 rounded-none bg-canvas"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
