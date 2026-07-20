import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

interface EditorialQuoteProps extends ComponentPropsWithoutRef<"blockquote"> {
  lines: readonly string[];
}

export function EditorialQuote({
  lines,
  className,
  ...props
}: EditorialQuoteProps): ReactElement {
  return (
    <blockquote
      className={cn(
        "border-l border-accent pl-5 font-display text-2xl leading-tight text-ink text-balance md:text-3xl",
        className,
      )}
      {...props}
    >
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </blockquote>
  );
}

