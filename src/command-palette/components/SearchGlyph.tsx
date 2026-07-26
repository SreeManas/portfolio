import type { ReactElement } from "react";

export function SearchGlyph(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-4 text-muted-foreground"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m21 21-4.2-4.2m1.2-5.3a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
