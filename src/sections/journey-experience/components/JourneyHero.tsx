import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { motionEase } from "@/lib/motion";
import type { JourneyExperienceContent } from "@/journey/types";

interface JourneyHeroProps {
  content: JourneyExperienceContent["hero"];
}

export function JourneyHero({ content }: JourneyHeroProps): ReactElement {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="journey-page-title"
      className="relative border-b border-border py-[var(--section-space)]"
    >
      <Container size="wide">
        <a
          href="/"
          className="font-mono text-xs uppercase leading-6 text-muted-foreground underline-offset-4 transition-colors duration-200 ease-dossier hover:text-ink hover:underline focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Back to Home
        </a>

        <div className="mt-12 max-w-[var(--measure-copy)] md:mt-16">
          <SectionLabel>{content.eyebrow}</SectionLabel>
          <h1
            id="journey-page-title"
            className="mt-5 font-display text-6xl leading-none text-ink text-balance md:text-8xl"
          >
            {content.title}
          </h1>
          <p className="mt-7 max-w-[var(--measure-note)] text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            {content.description}
          </p>
        </div>

        <div className="mt-16 flex flex-col items-start gap-3 md:mt-20">
          <p className="font-mono text-xs uppercase leading-6 text-muted-foreground">
            {content.scrollLabel}
          </p>
          <motion.span
            aria-hidden="true"
            className="block h-10 w-px bg-border"
            animate={
              prefersReducedMotion
                ? undefined
                : { scaleY: [1, 0.55, 1], opacity: [0.35, 1, 0.35] }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: motionEase,
            }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </Container>
    </section>
  );
}
