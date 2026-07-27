import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { motionTiming } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyProjectsSectionProps {
  content: JourneyExperienceContent["projects"];
}

export function JourneyProjectsSection({
  content,
}: JourneyProjectsSectionProps): ReactElement {
  return (
    <section
      aria-labelledby="journey-projects-title"
      className="border-b border-border py-16 md:py-24"
    >
      <Container size="wide">
        <Reveal distance={10} transition={{ duration: motionTiming.standard }}>
          <div className="max-w-[var(--measure-copy)]">
            <SectionLabel>{content.label}</SectionLabel>
            <h2
              id="journey-projects-title"
              className="mt-5 font-display text-3xl leading-tight text-ink text-balance md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {content.introduction}
            </p>
          </div>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {content.items.map((item, index) => {
              const body = (
                <>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground">
                    <time dateTime={item.year}>{item.year}</time>
                    <span className="text-accent">{item.status}</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[var(--measure-copy)] text-base leading-7 text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 ease-dossier",
                        item.href && "group-hover:translate-x-1 group-hover:text-ink",
                      )}
                    >
                      →
                    </span>
                  </div>
                </>
              );

              return (
                <li key={item.id} className="py-8 md:py-9">
                  <Reveal
                    distance={8}
                    transition={{
                      duration: motionTiming.standard,
                      delay: Math.min(index * 0.04, 0.12),
                    }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group block rounded-control transition-colors duration-200 ease-dossier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        {body}
                      </a>
                    ) : (
                      <article>{body}</article>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
