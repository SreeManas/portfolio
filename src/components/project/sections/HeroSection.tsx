import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { ProjectStatusBadge } from "@/sections/projects/components/ProjectStatusBadge";
import type { ProjectHeroData } from "@/content/projects/types";

interface HeroSectionProps {
  data: ProjectHeroData;
  backHref?: string;
  backLabel?: string;
}

export function HeroSection({
  data,
  backHref = "/projects",
  backLabel = "Back to Projects",
}: HeroSectionProps): ReactElement {
  return (
    <section className="border-b border-border py-[var(--section-space)]">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)] lg:gap-20">
          <header className="max-w-[var(--measure-copy)]">
            <BackLink href={backHref}>{backLabel}</BackLink>

            <div className="mt-10">
              <ProjectStatusBadge status={data.status} />
            </div>

            <p className="mt-8 font-mono text-xs uppercase leading-6 text-muted-foreground">
              {data.category} / {data.year}
            </p>

            <h1
              id="case-study-title"
              className="mt-5 font-display text-5xl leading-none text-ink text-balance md:text-7xl"
            >
              {data.title}
            </h1>

            <p className="mt-7 text-xl leading-9 text-muted-foreground md:text-2xl md:leading-10">
              {data.tagline}
            </p>
          </header>

          <aside aria-label="Project metadata" className="lg:pt-32">
            <dl className="divide-y divide-border border-y border-border">
              <div className="py-4">
                <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground font-semibold">
                  Category
                </dt>
                <dd className="mt-1 text-sm leading-6 text-ink">{data.category}</dd>
              </div>

              <div className="py-4">
                <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground font-semibold">
                  Timeline
                </dt>
                <dd className="mt-1 text-sm leading-6 text-ink">{data.year}</dd>
              </div>

              {data.role ? (
                <div className="py-4">
                  <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground font-semibold">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-ink">{data.role}</dd>
                </div>
              ) : null}

              {data.teamSize ? (
                <div className="py-4">
                  <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground font-semibold">
                    Team Size
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-ink">{data.teamSize}</dd>
                </div>
              ) : null}

              {data.links.length > 0 ? (
                <div className="py-4">
                  <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground font-semibold">
                    Quick Links
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase leading-6">
                    {data.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        {data.coverImage ? (
          <div className="mt-12 overflow-hidden border border-border bg-paper rounded-panel shadow-sm">
            <img
              src={data.coverImage}
              alt={`${data.title} Cover`}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
