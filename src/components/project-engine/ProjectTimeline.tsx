import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { ProjectTimeline as ProjectTimelineData } from "@/project-engine/types";

interface ProjectTimelineProps {
  timeline: ProjectTimelineData;
}

export function ProjectTimeline({
  timeline,
}: ProjectTimelineProps): ReactElement {
  return (
    <section aria-labelledby={`${timeline.id}-label`}>
      <SectionLabel id={`${timeline.id}-label`} className="text-accent">
        {timeline.label}
      </SectionLabel>
      <ol
        className="mt-5 divide-y divide-border border-y border-border"
      >
        {timeline.items.map((item) => {
          const links = item.links ?? [];

          return (
            <li key={item.id} className="grid gap-4 py-5 sm:grid-cols-[7rem_1fr]">
              <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                <time dateTime={item.date}>{item.date}</time>
              </p>
              <div>
                <h3 className="text-base font-semibold leading-7 text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
                {links.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {links.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          className="underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
