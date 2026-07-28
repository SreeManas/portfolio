import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import { cn } from "@/lib/cn";
import type { ProjectTextBlock } from "@/project-engine/types";

interface ProjectSectionProps {
  block: ProjectTextBlock;
  density?: "narrative" | "compact";
}

export function ProjectSection({
  block,
  density = "narrative",
}: ProjectSectionProps): ReactElement {
  const isCompact = density === "compact";

  return (
    <section id={block.id} aria-labelledby={`${block.id}-title`}>
      <SectionLabel className="text-accent">{block.label}</SectionLabel>
      <h3
        id={`${block.id}-title`}
        className={cn(
          "mt-4 text-ink text-balance",
          isCompact
            ? "text-lg font-semibold leading-7"
            : "max-w-[var(--measure-copy)] text-2xl font-semibold leading-tight md:text-3xl",
        )}
      >
        {block.title}
      </h3>
      <p
        className={cn(
          "text-muted-foreground",
          isCompact
            ? "mt-3 max-w-[var(--measure-note)] text-sm leading-6"
            : "mt-5 max-w-[var(--measure-copy)] text-lg leading-8",
        )}
      >
        {block.body}
      </p>
    </section>
  );
}
