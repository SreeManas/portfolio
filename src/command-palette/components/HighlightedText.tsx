import type { ReactElement } from "react";

import type { CommandHighlightRange } from "@/command-palette/types";

interface HighlightedTextProps {
  text: string;
  ranges: readonly CommandHighlightRange[];
}

export function HighlightedText({
  text,
  ranges,
}: HighlightedTextProps): ReactElement {
  if (ranges.length === 0) {
    return <>{text}</>;
  }

  const sortedRanges = [...ranges].sort((first, second) => first.start - second.start);
  const parts: ReactElement[] = [];
  let cursor = 0;

  sortedRanges.forEach((range, index) => {
    if (range.start > cursor) {
      parts.push(<span key={`text-${index}`}>{text.slice(cursor, range.start)}</span>);
    }

    parts.push(
      <mark
        key={`mark-${index}`}
        className="rounded-[0.1875rem] bg-accent-soft px-0.5 text-ink"
      >
        {text.slice(range.start, range.end)}
      </mark>,
    );
    cursor = range.end;
  });

  if (cursor < text.length) {
    parts.push(<span key="text-final">{text.slice(cursor)}</span>);
  }

  return <>{parts}</>;
}
