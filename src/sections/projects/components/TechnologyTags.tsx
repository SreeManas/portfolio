import type { ReactElement } from "react";

interface TechnologyTagsProps {
  technologies: readonly string[];
}

export function TechnologyTags({
  technologies,
}: TechnologyTagsProps): ReactElement {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-control border border-border px-2.5 py-1 font-mono text-[0.6875rem] uppercase leading-5 text-muted-foreground"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}
