import type { ReactElement } from "react";
import type { KnowledgeEntity } from "@/lib/knowledge";
import { BackLink } from "@/components/ui/BackLink";

interface KnowledgeBreadcrumbsProps {
  entity: KnowledgeEntity;
  baseHref: string;
  baseLabel: string;
}

export function KnowledgeBreadcrumbs({ entity, baseHref, baseLabel }: KnowledgeBreadcrumbsProps): ReactElement {
  // If the entity has no categories, fall back to simple backlink
  if (entity.categories.length === 0) {
    return <BackLink href={baseHref}>{baseLabel}</BackLink>;
  }

  // Use the primary category for breadcrumbs
  const primaryCategory = entity.categories[0];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
      <a 
        href={baseHref}
        className="transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-accent"
      >
        {baseLabel}
      </a>
      
      <span className="opacity-50" aria-hidden="true">/</span>
      
      {/* 
        In the future (FP9C.3), this will be a real link: /category/${primaryCategory.toLowerCase()}
        For now it acts as a visual breadcrumb context.
      */}
      <span className="font-medium text-ink">
        {primaryCategory}
      </span>
    </nav>
  );
}
