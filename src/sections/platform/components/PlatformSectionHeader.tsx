import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { cn } from "@/lib/cn";

interface PlatformSectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function PlatformSectionHeader({
  label,
  title,
  description,
  action,
  className,
}: PlatformSectionHeaderProps): ReactElement {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="max-w-2xl">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base max-w-prose">
            {description}
          </p>
        )}
      </div>
      
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="group flex items-center font-mono text-xs font-semibold uppercase tracking-wider text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {action.label}
          <span aria-hidden="true" className="ml-1.5 transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      )}
    </div>
  );
}
