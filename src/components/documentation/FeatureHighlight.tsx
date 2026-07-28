import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FeatureHighlightProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  reverse?: boolean;
  callout?: ReactNode;
  className?: string;
}

export function FeatureHighlight({
  title,
  description,
  image,
  imageAlt,
  caption,
  reverse = false,
  callout,
  className,
}: FeatureHighlightProps): ReactElement {
  return (
    <section
      className={cn(
        "border border-border bg-paper p-6 md:p-8 my-8 rounded-panel shadow-sm",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-8 items-center lg:grid-cols-2",
          reverse && "lg:grid-flow-dense",
        )}
      >
        <div className={cn(reverse && "lg:col-start-2")}>
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
            Feature Highlight
          </span>
          <h3 className="mt-3 text-2xl font-semibold text-ink text-balance">{title}</h3>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>

          {callout ? <div className="mt-6">{callout}</div> : null}
        </div>

        {image ? (
          <div className={cn(reverse && "lg:col-start-1")}>
            <figure className="border border-border bg-canvas rounded-control overflow-hidden">
              <img src={image} alt={imageAlt || title} className="h-auto w-full object-cover" />
              {caption ? (
                <figcaption className="border-t border-border bg-paper px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        ) : null}
      </div>
    </section>
  );
}
