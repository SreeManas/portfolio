import { useState, type ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { ComparisonTable } from "@/components/documentation/ComparisonTable";
import type { DecisionsData, EngineeringDecisionItem } from "@/content/projects/types";

interface DecisionsSectionProps {
  data: DecisionsData;
}

function DecisionCard({ item }: { item: EngineeringDecisionItem }): ReactElement {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <article className="border border-border bg-paper p-6 md:p-8 rounded-panel shadow-sm transition-all duration-200">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 font-medium text-accent">
            Decision: {item.decision}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} decision details`}
          className="font-mono text-xs font-semibold uppercase text-muted-foreground hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {isOpen ? "[ − ]" : "[ + ]"}
        </button>
      </header>

      {isOpen ? (
        <dl className="mt-6 divide-y divide-border/60 border-t border-border/60 pt-4 space-y-4 text-sm leading-6">
          <div className="pt-3">
            <dt className="font-mono text-xs uppercase text-muted-foreground font-semibold">Reason</dt>
            <dd className="mt-1 text-ink">{item.reason}</dd>
          </div>

          {item.alternativesConsidered ? (
            <div className="pt-3">
              <dt className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                Alternatives Considered
              </dt>
              <dd className="mt-1 text-muted-foreground">{item.alternativesConsidered}</dd>
            </div>
          ) : null}

          <div className="pt-3">
            <dt className="font-mono text-xs uppercase text-muted-foreground font-semibold">Trade-offs</dt>
            <dd className="mt-1 text-muted-foreground">{item.tradeoffs}</dd>
          </div>

          {item.outcome ? (
            <div className="pt-3">
              <dt className="font-mono text-xs uppercase text-muted-foreground font-semibold">Outcome</dt>
              <dd className="mt-1 text-ink">{item.outcome}</dd>
            </div>
          ) : null}

          {item.lessons ? (
            <div className="pt-3">
              <dt className="font-mono text-xs uppercase text-accent font-semibold">Lessons</dt>
              <dd className="mt-1 text-ink">{item.lessons}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </article>
  );
}

export function DecisionsSection({ data }: DecisionsSectionProps): ReactElement | null {
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

      {data.comparisonData ? (
        <div className="mt-8">
          <ComparisonTable data={data.comparisonData} />
        </div>
      ) : null}

      <div className="mt-8 space-y-6">
        {data.items.map((item) => (
          <DecisionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
