import type { ReactElement } from "react";


interface TechnologyExplorerProps {
  technologies: readonly string[];
  onSelect: (technology: string) => void;
}

export function TechnologyExplorer({ technologies, onSelect }: TechnologyExplorerProps): ReactElement {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {technologies.map((tech) => (
        <button
          key={tech}
          type="button"
          onClick={() => onSelect(tech)}
          className="group relative flex items-center justify-between border border-border bg-paper p-4 rounded-panel shadow-sm hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent text-left"
        >
          <span className="font-display font-medium text-ink group-hover:text-accent transition-colors">
            {tech}
          </span>
          <span className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true">
            →
          </span>
        </button>
      ))}
    </div>
  );
}
