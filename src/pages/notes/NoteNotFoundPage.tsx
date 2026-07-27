import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";

export function NoteNotFoundPage(): ReactElement {
  return (
    <main
      id="main-content"
      aria-labelledby="note-not-found-title"
      className="min-h-dvh bg-canvas"
    >
      <section className="py-[var(--section-space)]">
        <Container size="narrow">
          <a
            href="/notes"
            className="font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Back to Notes
          </a>
          <SectionLabel className="mt-10">Not Found</SectionLabel>
          <h1
            id="note-not-found-title"
            className="mt-5 font-display text-4xl leading-none text-ink text-balance md:text-5xl"
          >
            This note could not be found.
          </h1>
          <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
            The page may have moved, or the note is not published yet.
          </p>
        </Container>
      </section>
    </main>
  );
}
