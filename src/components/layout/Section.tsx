import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

type SectionWidth = "narrow" | "content" | "wide" | "full";
type SectionTone = "default" | "quiet" | "paper";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  eyebrow?: string;
  title?: string;
  description?: string;
  width?: SectionWidth;
  tone?: SectionTone;
  actions?: ReactNode;
}

const toneClassName: Record<SectionTone, string> = {
  default: "bg-canvas",
  quiet: "bg-muted",
  paper: "bg-paper",
};

export function Section({
  eyebrow,
  title,
  description,
  width = "content",
  tone = "default",
  actions,
  className,
  children,
  ...props
}: SectionProps): ReactElement {
  const hasHeader = eyebrow || title || description || actions;

  return (
    <section
      className={cn(
        "border-border/70 border-t py-[var(--section-space)]",
        toneClassName[tone],
        className,
      )}
      {...props}
    >
      <Container size={width}>
        {hasHeader ? (
          <header className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)] lg:items-end">
            <div className="max-w-[var(--measure-copy)]">
              {eyebrow ? (
                <p className="mb-4 font-mono text-xs uppercase text-muted-foreground">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="font-display text-3xl leading-tight text-ink text-balance md:text-5xl">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-5 max-w-[var(--measure-copy)] text-base leading-8 text-muted-foreground md:text-lg">
                  {description}
                </p>
              ) : null}
            </div>
            {actions ? (
              <div className="flex items-start gap-3 lg:justify-end">
                {actions}
              </div>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

