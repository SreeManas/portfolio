import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

export function SectionLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">): ReactElement {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

