import type { ReactElement, ReactNode } from "react";
import { SectionLabel } from "@/components/editorial/SectionLabel";

interface ReadingCompanionSidebarProps {
  children: ReactNode;
}

export function ReadingCompanionSidebar({ children }: ReadingCompanionSidebarProps): ReactElement {
  return (
    <aside className="hidden xl:block xl:sticky xl:top-10 xl:h-fit space-y-12">
      {children}
    </aside>
  );
}

interface SidebarWidgetProps {
  title: string;
  children: ReactNode;
}

export function SidebarWidget({ title, children }: SidebarWidgetProps): ReactElement {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <div className="mt-5">
        {children}
      </div>
    </div>
  );
}

export function SidebarDivider(): ReactElement {
  return <hr className="border-t border-border/60 border-dashed" aria-hidden="true" />;
}
