import type { ReactElement } from "react";
import type { TechnologySummary } from "@/lib/discovery";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";

interface TechnologyStatsProps {
  summary: TechnologySummary;
}

export function TechnologyStats({ summary }: TechnologyStatsProps): ReactElement {
  return (
    <section className="py-12 border-b border-border/60">
      <Container size="narrow">
        <SectionLabel>Portfolio Usage</SectionLabel>
        
        <dl className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>
            <dt className="opacity-80">Total Resources</dt>
            <dd className="mt-2 text-2xl font-display font-medium text-ink tracking-normal">
              {summary.totalCount}
            </dd>
          </div>
          <div>
            <dt className="opacity-80">Projects</dt>
            <dd className="mt-2 text-2xl font-display font-medium text-ink tracking-normal">
              {summary.breakdown.project}
            </dd>
          </div>
          <div>
            <dt className="opacity-80">Articles</dt>
            <dd className="mt-2 text-2xl font-display font-medium text-ink tracking-normal">
              {summary.breakdown.article}
            </dd>
          </div>
          <div>
            <dt className="opacity-80">Journey Entries</dt>
            <dd className="mt-2 text-2xl font-display font-medium text-ink tracking-normal">
              {summary.breakdown.journey}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
