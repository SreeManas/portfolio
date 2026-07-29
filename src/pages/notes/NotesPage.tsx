import { useDeferredValue, useMemo, useState, type ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { platformConfig, getAllPublishedArticles } from "@/content/notes";
import { motionTiming } from "@/lib/motion";
import type { EngineeringArticle, NoteCategory, ArticleDifficulty } from "@/notes/types";
import { BackLink } from "@/components/ui/BackLink";
import { ArticleCard } from "@/sections/platform/components/ArticleCard";
import { PlatformSearch } from "@/sections/platform/components/PlatformSearch";
import { PlatformFilters } from "@/sections/platform/components/PlatformFilters";
import { EmptyState } from "@/sections/platform/components/EmptyState";
import { PlatformSectionHeader } from "@/sections/platform/components/PlatformSectionHeader";
import { SeriesCard } from "@/sections/platform/components/SeriesCard";
import { TechnologyExplorer } from "@/sections/platform/components/TechnologyExplorer";


function matchesSearchQuery(article: EngineeringArticle, query: string): boolean {
  if (!query) return true;
  
  const haystack = [
    article.title,
    article.subtitle || "",
    article.summary,
    article.category,
    ...(article.tags || []),
    ...(article.keywords || []),
    ...(article.relatedTechnologies || []),
    article.series?.name || "",
  ].join(" ").toLowerCase();

  return haystack.includes(query);
}

export function NotesPage(): ReactElement {
  const publishedArticles = useMemo(() => getAllPublishedArticles(), []);
  
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  
  const [activeCategory, setActiveCategory] = useState<NoteCategory | "All">("All");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [activeDifficulty, setActiveDifficulty] = useState<ArticleDifficulty | "All">("All");

  const isFilteredView = deferredQuery !== "" || activeCategory !== "All" || activeTag !== "All" || activeDifficulty !== "All";

  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((article) => {
      if (activeCategory !== "All" && article.category !== activeCategory) return false;
      if (activeTag !== "All" && !article.tags.includes(activeTag)) return false;
      if (activeDifficulty !== "All" && article.difficulty !== activeDifficulty) return false;
      return matchesSearchQuery(article, deferredQuery);
    });
  }, [publishedArticles, activeCategory, activeTag, activeDifficulty, deferredQuery]);

  // Curated Lists
  const featuredArticle = useMemo(
    () => publishedArticles.find((article) => article.featured && article.pinned) || publishedArticles.find((article) => article.featured),
    [publishedArticles]
  );

  const latestArticles = useMemo(() => {
    return publishedArticles
      .filter(a => a.id !== featuredArticle?.id)
      .slice(0, 6);
  }, [publishedArticles, featuredArticle]);

  const recentlyUpdated = useMemo(() => {
    return [...publishedArticles]
      .filter(a => a.lastUpdated)
      .sort((a, b) => new Date(b.lastUpdated!).getTime() - new Date(a.lastUpdated!).getTime())
      .slice(0, 3);
  }, [publishedArticles]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publishedArticles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [publishedArticles]);

  // Unique technologies for the explorer
  const technologies = ["React", "TypeScript", "Architecture", "Backend", "Frontend", "Performance"];

  const handleClearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setActiveTag("All");
    setActiveDifficulty("All");
  };

  const handleTechnologySelect = (tech: string) => {
    setQuery(tech);
    document.getElementById("platform-search")?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main
      id="main-content"
      aria-labelledby="platform-page-title"
      className="min-h-dvh bg-canvas selection:bg-accent/20 selection:text-ink"
    >
      <section className="py-[var(--section-space)]">
        <Container size="wide">
          <header className="max-w-[var(--measure-copy)]">
            <BackLink href="/">Back to Home</BackLink>
            <SectionLabel className="mt-10">{platformConfig.title}</SectionLabel>
            <h1
              id="platform-page-title"
              className="mt-5 max-w-[28rem] font-display text-4xl leading-tight text-ink text-balance md:text-5xl lg:text-6xl"
            >
              Engineering Publishing Platform
            </h1>
            <p className="mt-6 max-w-[var(--measure-note)] text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {platformConfig.introduction}
            </p>
          </header>

          <div className="mt-12 space-y-6 md:mt-16 max-w-4xl border border-border/80 bg-paper/50 p-6 md:p-8 rounded-panel shadow-sm backdrop-blur-sm">
            <PlatformSearch
              id="platform-search"
              value={query}
              placeholder={platformConfig.searchPlaceholder}
              onChange={setQuery}
            />
            
            <PlatformFilters
              categories={platformConfig.categories}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
              tags={allTags}
              activeTag={activeTag}
              onTagSelect={setActiveTag}
              activeDifficulty={activeDifficulty}
              onDifficultySelect={setActiveDifficulty}
            />
          </div>
        </Container>
      </section>

      {isFilteredView ? (
        <section aria-labelledby="filtered-results-title" className="py-[var(--section-space)] border-t border-border bg-paper">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-12">
              <div>
                <SectionLabel>Search Results</SectionLabel>
                <h2 id="filtered-results-title" className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Found
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>

            {filteredArticles.length > 0 ? (
              <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <li key={article.id}>
                    <Reveal distance={10} transition={{ duration: motionTiming.standard, delay: Math.min(index * 0.04, 0.16) }}>
                      <ArticleCard article={article} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState 
                title="No publications found"
                description="Try adjusting your search terms or clearing some filters to find what you're looking for."
                action={{ label: "Clear all filters", onClick: handleClearFilters }}
                className="my-8"
              />
            )}
          </Container>
        </section>
      ) : (
        <>
          {/* CURATED VIEW */}
          {featuredArticle && (
            <section aria-labelledby="featured-article-title" className="py-[var(--section-space)] border-t border-border bg-paper">
              <Container size="wide">
                <Reveal distance={8} transition={{ duration: motionTiming.standard }}>
                  <PlatformSectionHeader 
                    label="Featured Publication" 
                    title="Deep dive of the month"
                    className="mb-10"
                  />
                  <h2 id="featured-article-title" className="sr-only">Featured Publication</h2>
                  <ArticleCard article={featuredArticle} featured />
                </Reveal>
              </Container>
            </section>
          )}

          <section aria-labelledby="latest-articles-title" className="py-[var(--section-space)] border-t border-border">
            <Container size="wide">
              <PlatformSectionHeader 
                label="Latest Publications" 
                title="Recent engineering notes"
                description="The most recent explorations, architectural decisions, and technical deep dives published to the platform."
                action={{ label: "View Archive", onClick: () => {
                  document.getElementById("archive-section")?.scrollIntoView({ behavior: "smooth" });
                }}}
                className="mb-10 md:mb-14"
              />
              <h2 id="latest-articles-title" className="sr-only">Latest Articles</h2>
              
              {latestArticles.length > 0 ? (
                <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                  {latestArticles.map((article, index) => (
                    <li key={article.id}>
                      <Reveal distance={10} transition={{ duration: motionTiming.standard, delay: Math.min(index * 0.04, 0.16) }}>
                        <ArticleCard article={article} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState title="No recent articles" description="More engineering notes are coming soon." />
              )}
            </Container>
          </section>

          {recentlyUpdated.length > 0 && (
            <section aria-labelledby="recently-updated-title" className="py-[var(--section-space)] border-t border-border bg-paper">
              <Container size="wide">
                <PlatformSectionHeader 
                  label="Recently Updated" 
                  title="Iterative documentation"
                  description="Engineering knowledge is a living artifact. These articles have been recently revised with new learnings, corrected metrics, or updated architectural diagrams."
                  className="mb-10"
                />
                <h2 id="recently-updated-title" className="sr-only">Recently Updated Articles</h2>
                
                <ul className="grid list-none gap-6 p-0 md:grid-cols-3">
                  {recentlyUpdated.map((article, index) => (
                    <li key={article.id}>
                      <Reveal distance={10} transition={{ duration: motionTiming.standard, delay: Math.min(index * 0.04, 0.16) }}>
                        <div className="relative border border-border/80 bg-canvas p-6 rounded-panel h-full flex flex-col group hover:border-accent/40 transition-colors">
                          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent mb-4 block">
                            Updated {article.lastUpdated}
                          </span>
                          <h3 className="font-display text-xl font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                            <a href={`/notes/${article.slug}`} className="focus-visible:outline-none before:absolute before:inset-0">
                              {article.title}
                            </a>
                          </h3>
                          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </Container>
            </section>
          )}

          <section aria-labelledby="series-title" className="py-[var(--section-space)] border-t border-border">
            <Container size="wide">
              <PlatformSectionHeader 
                label="Engineering Series" 
                title="Structured technical narratives"
                description="Comprehensive multi-part explorations of complex engineering topics, system migrations, and architectural patterns."
                className="mb-10"
              />
              <h2 id="series-title" className="sr-only">Engineering Series</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <SeriesCard 
                  series={{ id: "building-medrouter", name: "Building MEDROUTER", order: 1 }}
                  articleCount={4}
                  topic="Healthcare Tech"
                  description="A comprehensive look at building a production-grade healthcare AI routing platform from zero to one. Exploring compliance, scaling, and decision systems."
                />
                <SeriesCard 
                  series={{ id: "design-systems", name: "Design System Architecture", order: 1 }}
                  articleCount={3}
                  topic="Frontend Infrastructure"
                  description="The evolution of our internal component library. Creating scalable, accessible, and performant design tokens for enterprise applications."
                />
              </div>
            </Container>
          </section>

          <section aria-labelledby="technology-title" className="py-[var(--section-space)] border-t border-border bg-paper">
            <Container size="wide">
              <PlatformSectionHeader 
                label="Technologies" 
                title="Browse by stack"
                className="mb-10"
              />
              <h2 id="technology-title" className="sr-only">Browse by Technology</h2>
              <TechnologyExplorer technologies={technologies} onSelect={handleTechnologySelect} />
            </Container>
          </section>

          <section id="archive-section" aria-labelledby="archive-title" className="py-[var(--section-space)] border-t border-border">
            <Container size="wide">
              <PlatformSectionHeader 
                label="Archive" 
                title="All engineering notes"
                className="mb-10 md:mb-14"
              />
              <h2 id="archive-title" className="sr-only">Article Archive</h2>
              
              <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                {publishedArticles.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        </>
      )}
    </main>
  );
}
