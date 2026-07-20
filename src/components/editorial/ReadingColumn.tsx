import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

export function ReadingColumn({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">): ReactElement {
  return (
    <div
      className={cn(
        "max-w-[var(--measure-copy)] space-y-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9",
        className,
      )}
      {...props}
    />
  );
}

