import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Container } from "@/components/layout/Container";
import { NoteTags } from "@/sections/notes/components/NoteTags";
import type { EngineeringArticle } from "@/notes/types";
import { BackLink } from "@/components/ui/BackLink";
import { platformConfig, getAllPublishedArticles } from "@/content/notes";
import { AuthorProfileCard } from "@/sections/platform/components/AuthorProfileCard";
import { ReadingProgress } from "@/sections/platform/components/ReadingProgress";
import { TableOfContents } from "@/sections/platform/components/TableOfContents";
import { ArticleNavigation } from "@/sections/platform/components/ArticleNavigation";

import { getEntity, type EntityUrn } from "@/lib/knowledge";
import { getRelatedKnowledge, getContinueLearning } from "@/lib/discovery";
import { KnowledgeSection } from "@/components/knowledge/KnowledgeSection";
import { EmptyState } from "@/components/knowledge/EmptyState";
import { KnowledgeBreadcrumbs } from "@/components/navigation/KnowledgeBreadcrumbs";
import { ReadingCompanionSidebar, SidebarWidget } from "@/components/navigation/ReadingCompanionSidebar";

interface NoteDetailPageProps {
  note: EngineeringArticle;
}

export function NoteDetailPage({ note }: NoteDetailPageProps): ReactElement {
  // Generate URN to query Knowledge Engine
  const urn: EntityUrn = `urn:article:${note.slug}`;
  
  // Knowledge Engine Queries
  const entity = getEntity(urn);
  const relatedKnowledge = getRelatedKnowledge(urn, 6);
  const continueLearning = getContinueLearning(urn, 4);

  // Find next/prev articles for legacy navigation
  const allArticles = getAllPublishedArticles();
  const currentIndex = allArticles.findIndex(a => a.id === note.id);
  const previousArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;

  return (
    <main
      id="main-content"
      aria-labelledby="article-page-title"
      className="min-h-dvh bg-canvas relative"
    >
      <ReadingProgress targetId="article-body" />
      
      <article>
        <header className="border-b border-border py-[var(--section-space)] bg-paper">
          <Container size="narrow">
            <nav aria-label="Breadcrumb">
              {entity ? (
                <KnowledgeBreadcrumbs entity={entity} baseHref="/notes" baseLabel="Engineering Notes" />
              ) : (
                <BackLink href="/notes">Back to Platform</BackLink>
              )}
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <SectionLabel className="text-accent">{note.category}</SectionLabel>
              {note.series && (
                <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground border border-border/60 px-2 py-0.5 rounded-sm bg-canvas shadow-sm">
                  Part {note.series.order} of {note.series.name}
                </span>
              )}
            </div>

            <h1
              id="article-page-title"
              className="mt-6 font-display text-4xl leading-tight text-ink tracking-tight text-balance md:text-5xl lg:text-6xl"
            >
              {note.title}
            </h1>
            
            {note.subtitle && (
              <p className="mt-5 text-xl font-medium leading-snug text-ink/80 md:text-2xl text-balance">
                {note.subtitle}
              </p>
            )}

            <p className="mt-8 max-w-[var(--measure-copy)] text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              {note.summary}
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground border-y border-border/60 py-6">
              <div>
                <dt className="opacity-80">Published</dt>
                <dd className="mt-1.5 text-ink text-xs tracking-normal">
                  <time dateTime={note.date}>{note.date}</time>
                </dd>
              </div>
              {note.lastUpdated && (
                <div>
                  <dt className="opacity-80">Last Updated</dt>
                  <dd className="mt-1.5 text-ink text-xs tracking-normal">
                    <time dateTime={note.lastUpdated}>{note.lastUpdated}</time>
                  </dd>
                </div>
              )}
              <div>
                <dt className="opacity-80">Reading time</dt>
                <dd className="mt-1.5 text-ink text-xs tracking-normal">{note.readingTime}</dd>
              </div>
              {note.difficulty && (
                <div>
                  <dt className="opacity-80">Difficulty</dt>
                  <dd className="mt-1.5 text-ink text-xs tracking-normal">{note.difficulty}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <NoteTags tags={note.tags} />
            </div>
            
            <div className="mt-12">
              <AuthorProfileCard author={platformConfig.author} />
            </div>
          </Container>
          
          {/* Hero Image */}
          {note.heroImage && (
            <Container size={note.coverVariant === "large" ? "wide" : "narrow"}>
              <figure className="mt-12 border border-border bg-canvas overflow-hidden rounded-panel shadow-sm">
                <img src={note.heroImage} alt={note.title} className="h-auto w-full object-cover max-h-[600px]" />
              </figure>
            </Container>
          )}
        </header>

        <div className="py-[var(--section-space)] relative">
          <Container size="wide" className="flex justify-center xl:justify-between gap-12">
            
            <div className="max-w-[var(--measure-copy)] w-full mx-auto xl:mx-0">
              <EditorialDivider className="mb-10" />
              
              <div id="article-body" className="min-h-[50vh]">
                {note.content}
              </div>
              
              <EditorialDivider className="mt-16" />
              
              <KnowledgeSection 
                title="Continue Learning"
                items={continueLearning}
                emptyState={
                  <EmptyState 
                    title="You're caught up."
                    message="No direct continuation was found for this article."
                    actionHref="/notes"
                    actionLabel="Explore All Notes →"
                  />
                }
              />

              <KnowledgeSection 
                title="Related Knowledge"
                items={relatedKnowledge}
                emptyState={
                  <EmptyState 
                    title="No related knowledge found."
                    message="As more notes and projects are added to the platform, related content will appear here automatically."
                  />
                }
              />

              <div className="mt-16">
                <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} />
              </div>

              <div className="mt-12">
                <BackLink href="/notes">Back to Platform</BackLink>
              </div>
            </div>

            <ReadingCompanionSidebar>
              <TableOfContents />
              
              {relatedKnowledge.length > 0 && (
                <>
                  <SidebarWidget title="Related">
                    <ul className="space-y-4">
                      {relatedKnowledge.slice(0, 3).map(match => (
                        <li key={match.entity.urn}>
                          <a 
                            href={match.entity.url} 
                            className="group block"
                          >
                            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-1 block group-hover:text-accent transition-colors">
                              {match.entity.type}
                            </span>
                            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors leading-snug line-clamp-2">
                              {match.entity.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </SidebarWidget>
                </>
              )}
            </ReadingCompanionSidebar>
          </Container>
        </div>
      </article>
    </main>
  );
}
