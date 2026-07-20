import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";

interface ProjectHeaderProps {
  label: string;
  name: string;
  summary: string;
}

export function ProjectHeader({
  label,
  name,
  summary,
}: ProjectHeaderProps): ReactElement {
  return (
    <header className="max-w-[var(--measure-copy)]">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-5 font-display text-4xl leading-none text-ink text-balance md:text-6xl">
        {name}
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
        {summary}
      </p>
    </header>
  );
}

