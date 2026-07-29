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

interface NoteDetailPageProps {
  note: EngineeringArticle;
}

export function NoteDetailPage({ note }: NoteDetailPageProps): ReactElement {
  // Find next/prev articles
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
              <BackLink href="/notes">Back to Platform</BackLink>
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
          <Container size="wide" className="flex justify-center">
            
            <TableOfContents />
            
            <div className="max-w-[var(--measure-copy)] w-full mx-auto xl:mx-16">
              <EditorialDivider className="mb-10" />
              
              <div id="article-body" className="min-h-[50vh]">
                {note.content}
              </div>
              
              <EditorialDivider className="mt-16" />
              
              {/* Related Reading Placeholder for FP9C */}
              <aside className="mt-16 bg-paper border border-border rounded-panel p-6 shadow-sm opacity-50 border-dashed" aria-label="Related Reading">
                <h3 className="font-display text-2xl font-semibold text-ink">Related Reading Placeholder</h3>
                <p className="mt-2 text-muted-foreground text-sm">Feature Pack 9C will inject related articles, knowledge graphs, and cross-linking here.</p>
              </aside>

              <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} />

              <div className="mt-12">
                <BackLink href="/notes">Back to Platform</BackLink>
              </div>
            </div>
          </Container>
        </div>
      </article>
    </main>
  );
}
