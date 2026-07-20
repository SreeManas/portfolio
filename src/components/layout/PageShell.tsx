import type { PropsWithChildren, ReactElement } from "react";

import { SkipLink } from "@/components/ui/SkipLink";

export function PageShell({ children }: PropsWithChildren): ReactElement {
  return (
    <div className="min-h-dvh bg-canvas text-ink antialiased">
      <SkipLink targetId="main-content">Skip to content</SkipLink>
      {children}
    </div>
  );
}

