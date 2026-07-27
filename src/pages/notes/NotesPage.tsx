import { useDeferredValue, useMemo, useState, type ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { notesContent } from "@/content/notes";
import { motionTiming } from "@/lib/motion";
import type { EngineeringNote, NoteCategory } from "@/notes/types";
import { NoteCard } from "@/sections/notes/components/NoteCard";
import { NotesCategoryFilter } from "@/sections/notes/components/NotesCategoryFilter";
import { NotesSearch } from "@/sections/notes/components/NotesSearch";

function matchesQuery(note: EngineeringNote, query: string): boolean {
  if (!query) {
    return true;
  }

  const haystack = [
    note.title,
    note.summary,
    note.category,
    ...note.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function NotesPage(): ReactElement {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NoteCategory | "All">("All");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const featuredNote = useMemo(
    () => notesContent.notes.find((note) => note.featured),
    [],
  );

  const filteredNotes = useMemo(() => {
    return notesContent.notes.filter((note) => {
      if (category !== "All" && note.category !== category) {
        return false;
      }

      return matchesQuery(note, deferredQuery);
    });
  }, [category, deferredQuery]);

  const gridNotes = useMemo(() => {
    if (featuredNote && category === "All" && !deferredQuery) {
      return filteredNotes.filter((note) => note.id !== featuredNote.id);
    }

    return filteredNotes;
  }, [category, deferredQuery, featuredNote, filteredNotes]);

  const showFeatured =
    Boolean(featuredNote) &&
    category === "All" &&
    !deferredQuery &&
    featuredNote !== undefined &&
    matchesQuery(featuredNote, deferredQuery);

  return (
    <main
      id="main-content"
      aria-labelledby="notes-page-title"
      className="min-h-dvh bg-canvas"
    >
      <section className="border-b border-border py-[var(--section-space)]">
        <Container size="wide">
          <header className="max-w-[var(--measure-copy)]">
            <a
              href="/"
              className="font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Back to Home
            </a>
            <SectionLabel className="mt-10">Knowledge Hub</SectionLabel>
            <h1
              id="notes-page-title"
              className="mt-5 max-w-[24rem] font-display text-4xl leading-none text-ink text-balance md:text-6xl"
            >
              {notesContent.title}
            </h1>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {notesContent.introduction}
            </p>
          </header>

          <div className="mt-12 space-y-6 md:mt-14">
            <NotesSearch
              id="notes-search"
              value={query}
              placeholder={notesContent.searchPlaceholder}
              onChange={setQuery}
            />
            <NotesCategoryFilter
              categories={notesContent.categories}
              selected={category}
              onSelect={setCategory}
            />
          </div>
        </Container>
      </section>

      {showFeatured && featuredNote ? (
        <section
          aria-labelledby="featured-note-title"
          className="border-b border-border py-[var(--section-space)]"
        >
          <Container size="wide">
            <Reveal distance={8} transition={{ duration: motionTiming.standard }}>
              <SectionLabel>Featured Note</SectionLabel>
              <h2 id="featured-note-title" className="sr-only">
                Featured note
              </h2>
              <div className="mt-5">
                <NoteCard note={featuredNote} featured />
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section
        aria-labelledby="notes-grid-title"
        className="py-[var(--section-space)]"
      >
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>All Notes</SectionLabel>
              <h2
                id="notes-grid-title"
                className="mt-5 max-w-[20rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
              >
                Technical thinking, filed for inspection.
              </h2>
            </div>
            <p
              aria-live="polite"
              className="font-mono text-xs uppercase leading-6 text-muted-foreground"
            >
              {filteredNotes.length}{" "}
              {filteredNotes.length === 1 ? "note" : "notes"}
            </p>
          </div>

          {gridNotes.length > 0 ? (
            <ul className="mt-10 grid list-none gap-5 p-0 md:mt-12 md:grid-cols-2">
              {gridNotes.map((note, index) => (
                <li key={note.id}>
                  <Reveal
                    distance={10}
                    transition={{
                      duration: motionTiming.standard,
                      delay: Math.min(index * 0.04, 0.16),
                    }}
                  >
                    <NoteCard note={note} />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
              No notes match this search. Try another keyword or clear the
              category filter.
            </p>
          )}
        </Container>
      </section>
    </main>
  );
}
