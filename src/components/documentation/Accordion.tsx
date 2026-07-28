import { useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps): ReactElement {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((i) => i.defaultOpen).map((i) => i.id),
  );

  const toggleItem = (id: string): void => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-border border border-border bg-paper rounded-panel overflow-hidden shadow-sm", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <article key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-sans hover:bg-canvas/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  {item.badge ? (
                    <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider border border-accent/40 text-accent px-1.5 py-0.2">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                {item.subtitle ? (
                  <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                ) : null}
              </div>

              <span className="font-mono text-xs uppercase text-muted-foreground shrink-0 font-semibold">
                {isOpen ? "[ − ]" : "[ + ]"}
              </span>
            </button>

            {isOpen ? (
              <div
                id={`accordion-content-${item.id}`}
                className="p-5 md:p-6 border-t border-border/60 bg-canvas/30 text-sm leading-7 text-ink"
              >
                {item.content}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
