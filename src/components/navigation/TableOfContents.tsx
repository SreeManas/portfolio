import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: readonly TocItem[];
  title?: string;
  className?: string;
}

export function TableOfContents({ items, title = "Case Study", className }: TableOfContentsProps): ReactElement {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Select topmost visible section
          const topEntry = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current,
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState(null, "", `#${id}`);
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label={`${title} sections`}
      className={className || "hidden lg:block lg:sticky lg:top-10 lg:h-fit"}
    >
      <SectionLabel>{title}</SectionLabel>
      <ol className="mt-5 space-y-3 font-mono text-xs uppercase leading-6 text-muted-foreground">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? "font-semibold text-accent border-l-2 border-accent pl-2.5 -ml-3"
                    : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
