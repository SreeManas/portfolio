import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactElement } from "react";

import { JourneyIcon } from "@/sections/journey-experience/components/JourneyIcon";
import { motionEase, motionTiming } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { JourneyTimelineItem } from "@/journey/types";

interface JourneyTimelineProps {
  items: readonly JourneyTimelineItem[];
}

export function JourneyTimeline({ items }: JourneyTimelineProps): ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();

  if (items.length === 0) {
    return (
      <p className="mt-10 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
        No milestones match this filter.
      </p>
    );
  }

  return (
    <ol className="relative mt-12 list-none p-0 md:mt-14">
      <div
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-border md:left-1/2 md:-translate-x-px"
      />

      {items.map((item, index) => {
        const isExpanded = expandedId === item.id;
        const isEven = index % 2 === 0;
        const panelId = `timeline-panel-${item.id}`;
        const buttonId = `timeline-trigger-${item.id}`;

        return (
          <li
            key={item.id}
            className={cn(
              "relative grid gap-6 pb-12 last:pb-0 md:grid-cols-2 md:gap-12 md:pb-16",
            )}
          >
            <div
              className={cn(
                "absolute top-3 left-[1.15rem] z-10 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-paper md:left-1/2",
                isExpanded && "border-accent",
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full bg-muted-foreground transition-colors duration-200 ease-dossier",
                  isExpanded && "bg-accent",
                )}
              />
            </div>

            <article
              className={cn(
                "ml-12 border border-border bg-paper p-5 transition-all duration-200 ease-dossier hover:-translate-y-0.5 hover:shadow-soft md:ml-0 md:p-7",
                isEven ? "md:col-start-1 md:mr-10 md:text-right" : "md:col-start-2 md:ml-10",
                isExpanded && "border-ink/25 shadow-soft",
              )}
            >
              <div
                className={cn(
                  "flex items-start gap-4",
                  isEven && "md:flex-row-reverse",
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-control border border-border text-accent">
                  <JourneyIcon name={item.icon} />
                </span>
                <div className={cn("min-w-0 flex-1", isEven && "md:text-right")}>
                  <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    <time dateTime={item.year}>{item.year}</time>
                    <span aria-hidden="true"> · </span>
                    <span className="text-accent">{item.category}</span>
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ink text-balance md:text-3xl">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-base leading-7 text-muted-foreground",
                      isEven && "md:ml-auto",
                      "max-w-[var(--measure-copy)]",
                    )}
                  >
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className={cn("mt-5", isEven && "md:flex md:justify-end")}>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() =>
                    setExpandedId((current) => (current === item.id ? null : item.id))
                  }
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase leading-6 text-muted-foreground transition-colors duration-200 ease-dossier hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {isExpanded ? "Hide details" : "Read details"}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "transition-transform duration-200 ease-dossier group-hover:translate-x-0.5",
                      isExpanded && "rotate-90",
                    )}
                  >
                    →
                  </span>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { height: 0, opacity: 0 }
                    }
                    animate={{ height: "auto", opacity: 1 }}
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : { height: 0, opacity: 0 }
                    }
                    transition={{
                      duration: motionTiming.standard,
                      ease: motionEase,
                    }}
                    className="overflow-hidden"
                  >
                    <p
                      className={cn(
                        "mt-4 border-t border-border pt-4 text-base leading-7 text-muted-foreground",
                        isEven && "md:ml-auto md:text-right",
                        "max-w-[var(--measure-copy)]",
                      )}
                    >
                      {item.details}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
