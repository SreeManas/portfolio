import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Container } from "@/components/layout/Container";
import { NoteTags } from "@/sections/notes/components/NoteTags";
import type { EngineeringNote } from "@/notes/types";

interface NoteDetailPageProps {
  note: EngineeringNote;
}

export function NoteDetailPage({ note }: NoteDetailPageProps): ReactElement {
  return (
    <main
      id="main-content"
      aria-labelledby="note-page-title"
      className="min-h-dvh bg-canvas"
    >
      <article>
        <header className="border-b border-border py-[var(--section-space)]">
          <Container size="narrow">
            <a
              href="/notes"
              className="font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Back to Notes
            </a>

            <SectionLabel className="mt-10">{note.category}</SectionLabel>
            <h1
              id="note-page-title"
              className="mt-5 font-display text-4xl leading-none text-ink text-balance md:text-6xl"
            >
              {note.title}
            </h1>
            <p className="mt-6 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {note.summary}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase leading-6 text-muted-foreground">
              <div>
                <dt className="text-[0.625rem] tracking-wide">Reading time</dt>
                <dd className="mt-1 text-ink">{note.readingTime}</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] tracking-wide">Published</dt>
                <dd className="mt-1 text-ink">
                  <time dateTime={note.date}>{note.date}</time>
                </dd>
              </div>
              <div>
                <dt className="text-[0.625rem] tracking-wide">Category</dt>
                <dd className="mt-1 text-ink">{note.category}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <NoteTags tags={note.tags} />
            </div>
          </Container>
        </header>

        <div className="py-[var(--section-space)]">
          <Container size="narrow">
            <EditorialDivider className="mb-10" />
            <div className="max-w-[var(--measure-copy)]">
              <p className="text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
                {note.content}
              </p>
            </div>
            <EditorialDivider className="mt-12" />
            <a
              href="/notes"
              className="mt-8 inline-block font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 transition-colors duration-200 ease-dossier hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              ← Back to Notes
            </a>
          </Container>
        </div>
      </article>
    </main>
  );
}
