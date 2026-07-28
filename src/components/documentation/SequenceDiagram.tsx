import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface SequenceActor {
  id: string;
  label: string;
  sublabel?: string;
}

export interface SequenceMessage {
  id: string;
  from: string;
  to: string;
  label: string;
  type?: "request" | "response" | "async";
  note?: string;
}

export interface SequenceDiagramData {
  title?: string;
  description?: string;
  actors: SequenceActor[];
  messages: SequenceMessage[];
}

interface SequenceDiagramProps {
  data: SequenceDiagramData;
  className?: string;
}

export function SequenceDiagram({ data, className }: SequenceDiagramProps): ReactElement {
  return (
    <figure
      aria-label={data.title || "Sequence Diagram"}
      className={cn("border border-border bg-paper p-6 md:p-8 rounded-panel shadow-sm overflow-x-auto", className)}
    >
      {data.title ? (
        <figcaption className="border-b border-border pb-5 mb-6">
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
            Sequence Trajectory
          </span>
          <h3 className="mt-2.5 text-xl font-semibold text-ink">{data.title}</h3>
          {data.description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{data.description}</p>
          ) : null}
        </figcaption>
      ) : null}

      <div className="min-w-[36rem] space-y-6">
        {/* Actors Header */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${data.actors.length}, 1fr)` }}>
          {data.actors.map((actor) => (
            <div
              key={actor.id}
              className="border border-border bg-canvas/80 p-3.5 text-center rounded-control"
            >
              <p className="font-semibold text-sm text-ink">{actor.label}</p>
              {actor.sublabel ? (
                <p className="font-mono text-[0.6875rem] text-muted-foreground mt-0.5">
                  {actor.sublabel}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {/* Message Trajectory Timeline */}
        <div className="space-y-3 py-2 border-y border-border/60">
          {data.messages.map((msg, index) => {
            const fromIndex = data.actors.findIndex((a) => a.id === msg.from);
            const toIndex = data.actors.findIndex((a) => a.id === msg.to);
            const isReturn = msg.type === "response";

            return (
              <div
                key={msg.id}
                className="border border-border/60 bg-canvas/40 p-3.5 rounded-control transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-sm text-ink">{msg.label}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span>{data.actors[fromIndex]?.label || msg.from}</span>
                    <span className="text-accent font-bold">
                      {isReturn ? "⤺" : "➔"}
                    </span>
                    <span>{data.actors[toIndex]?.label || msg.to}</span>
                  </div>
                </div>

                {msg.note ? (
                  <p className="mt-2 text-xs text-muted-foreground border-t border-border/40 pt-2 italic">
                    Note: {msg.note}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
