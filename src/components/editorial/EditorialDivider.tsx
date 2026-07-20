import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

export function EditorialDivider({
  className,
  ...props
}: ComponentPropsWithoutRef<"hr">): ReactElement {
  return (
    <hr className={cn("border-0 border-t border-border", className)} {...props} />
  );
}

