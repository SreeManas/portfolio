import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

export function Kbd({
  className,
  ...props
}: ComponentPropsWithoutRef<"kbd">): ReactElement {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-6 min-w-6 items-center justify-center rounded-[0.3125rem] border border-border bg-paper px-1.5 font-mono text-[0.6875rem] leading-none text-muted-foreground shadow-[0_1px_0_var(--dossier-color-border)]",
        className,
      )}
      {...props}
    />
  );
}

