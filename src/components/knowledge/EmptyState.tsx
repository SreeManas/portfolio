import type { ReactElement } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  title = "No related knowledge discovered yet.",
  message = "This section will populate automatically as more entities are connected to the ecosystem.",
  actionHref = "/notes",
  actionLabel = "Explore Engineering Notes →",
}: EmptyStateProps): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 bg-paper/50 rounded-panel text-center">
      <h3 className="font-display text-lg font-semibold text-ink mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {message}
      </p>
      {actionHref && actionLabel && (
        <a
          href={actionHref}
          className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent hover:text-ink transition-colors"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
