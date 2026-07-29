import type { ReactElement } from "react";
import { getTechnologyBySlug } from "@/content/technologies";
import { discoverForEntity, getTechnologySummary } from "@/lib/discovery";
import { Container } from "@/components/layout/Container";
import { KnowledgeSection } from "@/components/knowledge/KnowledgeSection";
import { EmptyState } from "@/components/knowledge/EmptyState";
import { ReadingCompanionSidebar, SidebarWidget } from "@/components/navigation/ReadingCompanionSidebar";
import { TechnologyHero } from "./components/TechnologyHero";
import { TechnologyStats } from "./components/TechnologyStats";
import { TechnologyNotFoundPage } from "./TechnologyNotFoundPage";

interface TechnologyHubPageProps {
  slug: string;
}

export function TechnologyHubPage({ slug }: TechnologyHubPageProps): ReactElement {
  const technology = getTechnologyBySlug(slug);

  if (!technology) {
    return <TechnologyNotFoundPage />;
  }

  const urn = `urn:technology:${technology.slug}` as const;
  const summary = getTechnologySummary(technology.name);
  
  // Single generic discovery call as per FP9C.1 philosophy
  const allRelationships = discoverForEntity(urn, 20);

  // Derive specialized sets from the generic engine response
  const relatedProjects = allRelationships.filter(r => r.entity.type === "project");
  const relatedArticles = allRelationships.filter(r => r.entity.type === "article");
  const relatedJourneys = allRelationships.filter(r => r.entity.type === "journey");
  const relatedTechnologies = allRelationships.filter(r => r.entity.type === "technology");

  return (
    <main
      id="main-content"
      aria-labelledby="technology-page-title"
      className="min-h-dvh bg-canvas relative pb-24"
    >
      <TechnologyHero technology={technology} />
      <TechnologyStats summary={summary} />

      <div className="py-[var(--section-space)]">
        <Container size="wide" className="flex justify-center xl:justify-between gap-12">
          
          {/* Main Content Area */}
          <div className="max-w-[var(--measure-copy)] w-full mx-auto xl:mx-0 space-y-24">
            
            <KnowledgeSection 
              title="Projects Using This Technology"
              items={relatedProjects}
              emptyState={
                <EmptyState 
                  title="No projects showcase this yet."
                  message="Projects using this technology will appear here once they are added to the portfolio."
                />
              }
            />

            <KnowledgeSection 
              title="Engineering Notes"
              items={relatedArticles}
              emptyState={
                <EmptyState 
                  title="No engineering notes reference this technology yet."
                  message="Architectural decisions and technical notes discussing this technology will automatically connect here."
                />
              }
            />

            <KnowledgeSection 
              title="Journey Entries"
              items={relatedJourneys}
              emptyState={
                <EmptyState 
                  title="No journey entries currently mention this technology."
                  message="Hackathons, learning milestones, and experiences involving this technology will appear here."
                />
              }
            />

          </div>

          {/* Sidebar */}
          <ReadingCompanionSidebar>
            {relatedTechnologies.length > 0 && (
              <SidebarWidget title="Related Technologies">
                <ul className="space-y-4">
                  {relatedTechnologies.map(match => (
                    <li key={match.entity.urn}>
                      <a 
                        href={match.entity.url} 
                        className="group block p-4 border border-border/60 bg-paper/50 rounded-panel hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200"
                      >
                        <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-1 block group-hover:text-accent transition-colors">
                          {match.reasons.sharedCategories[0] || 'Technology'}
                        </span>
                        <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                          {match.entity.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </SidebarWidget>
            )}
          </ReadingCompanionSidebar>

        </Container>
      </div>
    </main>
  );
}
