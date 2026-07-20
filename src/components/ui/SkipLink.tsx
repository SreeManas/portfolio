import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

interface SkipLinkProps extends ComponentPropsWithoutRef<"a"> {
  targetId: string;
}

export function SkipLink({
  targetId,
  className,
  children,
  ...props
}: SkipLinkProps): ReactElement {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "fixed left-4 top-4 z-50 -translate-y-16 rounded-control border border-border bg-paper px-4 py-2 text-sm font-medium text-ink shadow-soft transition-transform duration-200 ease-dossier focus:translate-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

