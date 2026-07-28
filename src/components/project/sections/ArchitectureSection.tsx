import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { ArchitectureDiagram } from "@/components/documentation/ArchitectureDiagram";
import { FileTree } from "@/components/documentation/FileTree";
import type { ArchitectureSectionData } from "@/content/projects/types";

interface ArchitectureSectionProps {
  data: ArchitectureSectionData;
}

export function ArchitectureSection({ data }: ArchitectureSectionProps): ReactElement | null {
  if (data.visible === false) return null;

  return (
    <section id={data.id} aria-labelledby={`${data.id}-title`}>
      <SectionLabel className="text-accent">{data.label}</SectionLabel>
      <h2
        id={`${data.id}-title`}
        className="mt-4 max-w-[var(--measure-copy)] text-2xl font-semibold leading-tight text-ink text-balance md:text-3xl"
      >
        {data.title}
      </h2>

      <p className="mt-5 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground">
        {data.description}
      </p>

      {/* Interactive Architecture Diagram or Placeholder */}
      <div className="mt-8">
        {data.diagramData ? (
          <ArchitectureDiagram data={data.diagramData} />
        ) : data.diagramUrl ? (
          <div className="flex min-h-[16rem] items-center justify-center border border-dashed border-border bg-paper p-8 text-center">
            <img
              src={data.diagramUrl}
              alt={data.title}
              className="max-h-96 w-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex min-h-[16rem] items-center justify-center border border-dashed border-border bg-paper p-8 text-center">
            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-canvas text-accent font-mono text-lg">
                ⚙
              </div>
              <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                {data.diagramPlaceholderLabel || "Architecture Diagram Canvas Reserved"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Optional Project File Tree */}
      {data.fileTreeData && data.fileTreeData.length > 0 ? (
        <div className="mt-8">
          <FileTree data={data.fileTreeData} title="Repository Directory Tree" />
        </div>
      ) : null}

      {data.notes && data.notes.length > 0 ? (
        <ul className="mt-6 space-y-2 font-mono text-xs leading-6 text-muted-foreground">
          {data.notes.map((note, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
