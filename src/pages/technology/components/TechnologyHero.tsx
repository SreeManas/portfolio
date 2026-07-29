import type { ReactElement } from "react";
import type { Technology } from "@/content/technologies/types";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { BackLink } from "@/components/ui/BackLink";

interface TechnologyHeroProps {
  technology: Technology;
}

export function TechnologyHero({ technology }: TechnologyHeroProps): ReactElement {
  return (
    <header className="border-b border-border py-[var(--section-space)] bg-paper">
      <Container size="narrow">
        <nav aria-label="Breadcrumb">
          <BackLink href="/notes">Back to Platform</BackLink>
        </nav>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <SectionLabel className="text-accent">{technology.category}</SectionLabel>
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground border border-border/60 px-2 py-0.5 rounded-sm bg-canvas shadow-sm">
            {technology.role}
          </span>
        </div>

        <h1
          id="technology-page-title"
          className="mt-6 font-display text-4xl leading-tight text-ink tracking-tight text-balance md:text-5xl lg:text-6xl"
        >
          {technology.name}
        </h1>

        <p className="mt-8 max-w-[var(--measure-copy)] text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
          {technology.description}
        </p>

        {technology.website && (
          <div className="mt-10">
            <a 
              href={technology.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent hover:text-ink transition-colors focus-visible:outline-accent"
            >
              Visit Official Website
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </Container>
    </header>
  );
}
