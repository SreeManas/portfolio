import type { ReactElement } from "react";

import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { skillsContent } from "@/content/skills";
import { motionTiming } from "@/lib/motion";

export function Skills(): ReactElement {
  return (
    <Section id={skillsContent.id} aria-labelledby="skills-title" width="wide">
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-24">
          <header>
            <SectionLabel>{skillsContent.label}</SectionLabel>
            <h2
              id="skills-title"
              className="mt-5 max-w-[22rem] font-display text-3xl leading-tight text-ink text-balance md:text-4xl"
            >
              {skillsContent.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-note)] text-base leading-7 text-muted-foreground">
              {skillsContent.introduction}
            </p>
          </header>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {skillsContent.groups.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-title`}>
                <h3
                  id={`${group.id}-title`}
                  className="font-mono text-xs uppercase leading-6 text-muted-foreground"
                >
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-base leading-7 text-ink">
                  {group.skills.map((skill, index) => (
                    <li key={skill.id} className="flex items-center gap-3">
                      <span>{skill.label}</span>
                      {index < group.skills.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground"
                        >
                          .
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
