import type { ReactElement } from "react";

import { EditorialDivider } from "@/components/editorial/EditorialDivider";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { aboutContent } from "@/content/about";
import { motionTiming } from "@/lib/motion";

export function About(): ReactElement {
  return (
    <Section id={aboutContent.id} aria-labelledby="about-title" width="wide">
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-24">
          <div>
            <SectionLabel>{aboutContent.label}</SectionLabel>
            <h2
              id="about-title"
              className="mt-5 max-w-[22rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {aboutContent.title}
            </h2>
          </div>

          <div className="max-w-[var(--measure-copy)]">
            <p className="text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {aboutContent.introduction}
            </p>
            <p className="mt-8 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {aboutContent.narrative}
            </p>

            <div className="mt-12 grid gap-8 border-y border-border py-8 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
              <dl className="space-y-5">
                <div>
                  <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {aboutContent.profile.role.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-ink">
                    {aboutContent.profile.role.value}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {aboutContent.profile.education.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-ink">
                    {aboutContent.profile.education.value}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase leading-6 text-muted-foreground">
                    {aboutContent.profile.location.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-ink">
                    {aboutContent.profile.location.value}
                  </dd>
                </div>
              </dl>

              <div>
                <SectionLabel className="text-accent">
                  {aboutContent.profile.interestsLabel}
                </SectionLabel>
                <ul className="mt-4 flex flex-wrap gap-y-3 text-sm leading-6 text-ink">
                  {aboutContent.profile.interests.map((interest) => (
                    <li
                      key={interest}
                      className="border-l border-border px-4 first:border-l-0 first:pl-0"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <SectionLabel className="text-accent">
                {aboutContent.highlightsLabel}
              </SectionLabel>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {aboutContent.highlights.map((highlight) => (
                  <li
                    key={highlight.id}
                    className="grid gap-2 py-4 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] sm:gap-8"
                  >
                    <p className="text-base leading-7 text-ink">
                      {highlight.label}
                    </p>
                    {highlight.detail ? (
                      <p className="text-sm leading-6 text-muted-foreground">
                        {highlight.detail}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <EditorialDivider className="mt-12" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
