import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ResourcesData } from "@/content/projects/types";

interface ResourcesSectionProps {
  data: ResourcesData;
}

export function ResourcesSection({ data }: ResourcesSectionProps): ReactElement | null {
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {data.items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="group card-interactive block border border-border bg-paper p-6 rounded-panel shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
                {item.type}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-sm text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink"
              >
                →
              </span>
            </div>

            <h3 className="mt-3 text-base font-semibold text-ink group-hover:text-accent">
              {item.title}
            </h3>

            {item.description ? (
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
