import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { TerminalComponent } from "@/components/documentation/TerminalComponent";
import { CodeBlock } from "@/components/documentation/CodeBlock";
import type { TechStackData } from "@/content/projects/types";

interface TechStackSectionProps {
  data: TechStackData;
}

export function TechStackSection({ data }: TechStackSectionProps): ReactElement | null {
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

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="card-interactive border border-border bg-paper p-6 rounded-panel shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
              <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
                {item.category}
              </span>
            </div>

            <dl className="mt-4 space-y-3 text-xs leading-6">
              <div>
                <dt className="font-mono uppercase text-muted-foreground font-semibold">Reason Chosen</dt>
                <dd className="mt-0.5 text-ink">{item.reasonChosen}</dd>
              </div>
              <div>
                <dt className="font-mono uppercase text-muted-foreground font-semibold">Responsibility</dt>
                <dd className="mt-0.5 text-muted-foreground">{item.responsibility}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {data.codeSnippet ? (
        <div className="mt-8">
          <CodeBlock
            code={data.codeSnippet.code}
            filename={data.codeSnippet.filename}
            language={data.codeSnippet.language}
          />
        </div>
      ) : null}

      {data.terminalData ? (
        <div className="mt-8">
          <TerminalComponent data={data.terminalData} />
        </div>
      ) : null}
    </section>
  );
}
