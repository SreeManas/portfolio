import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

export function VisuallyHidden({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">): ReactElement {
  return (
    <span
      className={cn(
        "absolute size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]",
        className,
      )}
      {...props}
    />
  );
}

