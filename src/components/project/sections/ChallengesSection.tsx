import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ChallengesData } from "@/content/projects/types";

interface ChallengesSectionProps {
  data: ChallengesData;
}

export function ChallengesSection({ data }: ChallengesSectionProps): ReactElement | null {
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

      <div className="mt-8 space-y-6">
        {data.items.map((challenge) => (
          <article
            key={challenge.id}
            className="border border-border bg-paper p-6 md:p-8 rounded-panel shadow-sm"
          >
            <h3 className="text-xl font-semibold text-ink">{challenge.title}</h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="border border-border/60 bg-canvas/60 p-4 rounded-control">
                <p className="font-mono text-[0.625rem] uppercase text-accent font-semibold">Problem</p>
                <p className="mt-1.5 text-xs leading-5 text-ink">{challenge.problem}</p>
              </div>

              <div className="border border-border/60 bg-canvas/60 p-4 rounded-control">
                <p className="font-mono text-[0.625rem] uppercase text-muted-foreground font-semibold">Cause</p>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{challenge.cause}</p>
              </div>

              <div className="border border-border/60 bg-canvas/60 p-4 rounded-control">
                <p className="font-mono text-[0.625rem] uppercase text-accent font-semibold">Solution</p>
                <p className="mt-1.5 text-xs leading-5 text-ink">{challenge.solution}</p>
              </div>

              <div className="border border-border/60 bg-canvas/60 p-4 rounded-control">
                <p className="font-mono text-[0.625rem] uppercase text-muted-foreground font-semibold">Result</p>
                <p className="mt-1.5 text-xs leading-5 text-ink font-medium">{challenge.result}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
