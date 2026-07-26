import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import type { FooterContent } from "@/components/layout/footerTypes";

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps): ReactElement {
  return (
    <footer className="border-t border-border bg-canvas py-10">
      <Container size="wide">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-start md:gap-16">
          <div>
            <p className="text-sm leading-6 text-ink">{content.copyright}</p>
            <dl className="mt-4 grid gap-3 font-mono text-xs uppercase leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-6">
              <div>
                <dt>{content.versionLabel}</dt>
                <dd className="mt-1 text-ink">{content.version}</dd>
              </div>
              <div>
                <dt>{content.lastUpdatedLabel}</dt>
                <dd className="mt-1">
                  <time dateTime={content.lastUpdated}>
                    {content.lastUpdated}
                  </time>
                </dd>
              </div>
            </dl>
          </div>

          <nav aria-label={content.navigationLabel}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground md:justify-end">
              {content.navigation.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={content.socialLabel}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase leading-6 text-muted-foreground md:justify-end">
              {content.socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
