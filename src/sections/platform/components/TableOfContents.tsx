import { useEffect, useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents(): ReactElement | null {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 1. Gather all H2 and H3 elements inside the main content area
    const elements = Array.from(document.querySelectorAll("article h2[id], article h3[id]"));
    
    if (elements.length === 0) return;

    const tocItems = elements.map(el => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName.toLowerCase() === "h2" ? 2 : 3
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(tocItems);

    // 2. Set up Intersection Observer for active section tracking
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find all intersecting entries
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // If multiple items are intersecting, pick the one closest to the top of the viewport
        const sortedEntries = intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        // Also update URL hash without jumping
        const id = sortedEntries[0].target.id;
        setActiveId(id);
        
        if (window.location.hash !== `#${id}`) {
          window.history.replaceState(null, "", `${window.location.pathname}#${id}`);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-100px 0px -60% 0px", // Trigger when heading is near the top
      threshold: 1.0
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Apply offset for any fixed headers if they exist in the future
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Update hash manually since smooth scroll takes time
      window.history.pushState(null, "", `${window.location.pathname}#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of Contents" className="pr-4 pb-10">
      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/80 mb-6">
        On this page
      </h4>
      <ul className="space-y-4 relative border-l border-border/60 ml-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li 
              key={item.id} 
              className={cn(
                "relative transition-all duration-200 ease-out",
                item.level === 3 ? "ml-4" : "ml-0"
              )}
            >
              {isActive && (
                <div 
                  className="absolute -left-[1px] top-0 bottom-0 w-[3px] bg-accent rounded-full transform -translate-x-1/2 shadow-sm" 
                  aria-hidden="true" 
                />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={cn(
                  "block pl-4 py-1 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-accent rounded",
                  isActive 
                    ? "text-accent bg-accent/5 -ml-1 pl-5" 
                    : "text-muted-foreground hover:text-ink"
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
