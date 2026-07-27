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
          className="rounded-control border border-border px-2.5 py-1 font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
