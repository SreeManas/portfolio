import type { ReactElement } from "react";
import { useMemo } from "react";

import { Container } from "@/components/layout/Container";
import { Kbd } from "@/components/ui/Kbd";
import { heroContent } from "@/content/hero";
import { getModifierKey } from "@/command-palette/lib/platform";

export function Hero(): ReactElement {
  const shortcutKeys = useMemo(
    () => [getModifierKey(), heroContent.shortcutKey],
    [],
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border/70 bg-canvas"
    >
      <Container size="wide">
        <div className="grid min-h-svh grid-rows-[auto_1fr_auto] py-5 md:py-8">
          <header
            aria-label={heroContent.navLabel}
            className="grid gap-5 border-b border-border/70 pb-5 text-sm text-muted-foreground lg:grid-cols-[minmax(12rem,0.24fr)_1fr_minmax(12rem,0.24fr)] lg:items-start"
          >
            <a
              href="#hero-title"
              className="w-fit font-medium text-ink no-underline transition-colors duration-200 ease-dossier hover:text-accent"
            >
              {heroContent.identity}
            </a>

            <nav aria-label={heroContent.navLabel}>
              <ol className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-center">
                {heroContent.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="no-underline transition-colors duration-200 ease-dossier hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div
              aria-label={heroContent.shortcutLabel}
              className="flex items-center gap-1.5 lg:justify-end"
            >
              {shortcutKeys.map((key, index) => (
                <span key={key} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span aria-hidden="true" className="font-mono text-xs">
                      {heroContent.shortcutSeparator}
                    </span>
                  ) : null}
                  <Kbd>{key}</Kbd>
                </span>
              ))}
            </div>
          </header>

          <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,0.64fr)_minmax(19rem,0.36fr)] lg:items-center lg:gap-16">
            <div className="max-w-[60rem]">
              <p className="mb-8 max-w-[var(--measure-note)] border-l border-accent pl-4 font-mono text-xs uppercase leading-6 text-muted-foreground">
                {heroContent.eyebrow}
              </p>
              <h1
                id="hero-title"
                className="max-w-[12ch] font-display text-5xl leading-none text-ink text-balance sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {heroContent.title}
              </h1>
              <p className="mt-8 max-w-[var(--measure-copy)] text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
                {heroContent.introduction}
              </p>
            </div>

            <aside
              aria-labelledby="hero-sidebar-title"
              className="border-y border-border py-6 lg:self-end lg:border-y-0 lg:border-l lg:py-0 lg:pl-8"
            >
              <h2
                id="hero-sidebar-title"
                className="font-mono text-xs uppercase text-accent"
              >
                {heroContent.sidebarLabel}
              </h2>
              <dl className="mt-5 divide-y divide-border">
                {heroContent.sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-5"
                  >
                    <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-6 text-ink">
                      <ul className="space-y-1">
                        {item.value.map((value) => (
                          <li key={value}>{value}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <section
            aria-labelledby="latest-notes-title"
            className="border-t border-border/70 pt-5"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(12rem,0.24fr)_1fr]">
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  {heroContent.notesStrip.label}
                </p>
                <h2
                  id="latest-notes-title"
                  className="mt-3 max-w-[18rem] text-base font-semibold leading-6 text-ink"
                >
                  {heroContent.notesStrip.title}
                </h2>
              </div>
              <ol className="divide-y divide-border border-y border-border lg:border-t-0">
                {heroContent.notesStrip.notes.map((note) => (
                  <li
                    key={note.date}
                    className="grid gap-3 py-5 sm:grid-cols-[7rem_minmax(10rem,0.28fr)_1fr] sm:gap-5"
                  >
                    <p className="font-mono text-xs uppercase leading-6 text-accent">
                      {note.date}
                    </p>
                    <h3 className="text-base font-semibold text-ink">
                      {note.title}
                    </h3>
                    <p className="max-w-[var(--measure-copy)] text-sm leading-6 text-muted-foreground">
                      {note.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
}
