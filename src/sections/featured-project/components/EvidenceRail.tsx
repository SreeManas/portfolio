import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import type { CaseStudyEvidenceItem } from "@/sections/featured-project/types";

interface EvidenceRailProps {
  items: readonly CaseStudyEvidenceItem[];
}

export function EvidenceRail({ items }: EvidenceRailProps): ReactElement {
  return (
    <aside aria-label="Case study evidence" className="lg:sticky lg:top-10">
      <SectionLabel className="text-accent">Evidence Rail</SectionLabel>
      <dl className="mt-5 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <div key={item.id} className="py-4">
            <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-ink">
              {item.href ? (
                <a
                  href={item.href}
                  className="underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-dossier hover:decoration-current"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

