import type { ReactElement } from "react";

import { cn } from "@/lib/cn";

interface ProjectStatusBadgeProps {
  status: string;
}

function getStatusTone(status: string): string {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("featured")) {
    return "border-accent bg-accent-soft text-accent";
  }

  if (normalizedStatus.includes("soon")) {
    return "border-border bg-canvas text-muted-foreground";
  }

  if (normalizedStatus.includes("prototype")) {
    return "border-border bg-muted text-muted-foreground";
  }

  return "border-border bg-paper text-ink";
}

export function ProjectStatusBadge({
  status,
}: ProjectStatusBadgeProps): ReactElement {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-control border px-2.5 py-1 font-mono text-[0.6875rem] uppercase leading-5",
        getStatusTone(status),
      )}
    >
      {status}
    </span>
  );
}
