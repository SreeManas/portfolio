import type { ReactElement } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { LessonsData } from "@/content/projects/types";

interface LessonsSectionProps {
  data: LessonsData;
}

export function LessonsSection({ data }: LessonsSectionProps): ReactElement | null {
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

      <ol className="mt-8 divide-y divide-border border-y border-border">
        {data.reflections.map((reflection, index) => (
          <li key={index} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
            <span className="font-mono text-xs font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-base leading-7 text-ink">{reflection}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
