import { useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  content: ReactNode;
}

export interface DocumentationTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export function DocumentationTabs({
  tabs,
  defaultTabId,
  className,
}: DocumentationTabsProps): ReactElement {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || tabs[0]?.id || "",
  );

  const activeTab = tabs.find((t) => t.id === activeTabId);

  const handleKeyDown = (e: React.KeyboardEvent, index: number): void => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      if (tabs[nextIndex]) setActiveTabId(tabs[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      if (tabs[prevIndex]) setActiveTabId(tabs[prevIndex].id);
    }
  };

  return (
    <div className={cn("border border-border bg-paper rounded-panel overflow-hidden shadow-sm", className)}>
      {/* Tab Navigation List */}
      <div
        role="tablist"
        aria-label="Documentation Tabs"
        className="flex overflow-x-auto border-b border-border bg-canvas/60"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`tabpanel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-r border-border border-b-2 transition-all whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                isActive
                  ? "border-b-accent text-ink bg-paper"
                  : "border-b-transparent text-muted-foreground hover:text-ink hover:bg-paper/50",
              )}
            >
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="font-mono text-[0.625rem] px-1.5 py-0.2 border border-accent/40 text-accent font-semibold">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      {activeTab ? (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className="p-6 md:p-8 focus-visible:outline-none"
        >
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );
}
