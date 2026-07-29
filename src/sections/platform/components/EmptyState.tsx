import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps): ReactElement {
  return (
    <div className={cn("flex flex-col items-center justify-center border border-dashed border-border/80 bg-canvas py-16 px-6 text-center rounded-panel", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper border border-border mb-4 shadow-sm">
        <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
      
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-accent border border-accent/40 bg-accent/5 px-4 py-2 hover:bg-accent/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-control"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
