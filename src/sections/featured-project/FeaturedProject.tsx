import type { ReactElement } from "react";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { featuredProjectContent } from "@/content/featuredProject";
import { ProjectCaseStudy } from "@/sections/featured-project/components/ProjectCaseStudy";
import { motionTiming } from "@/lib/motion";

export function FeaturedProject(): ReactElement {
  return (
    <Section
      id={featuredProjectContent.id}
      aria-labelledby="featured-project-title"
      width="wide"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <ProjectCaseStudy content={featuredProjectContent} />
      </Reveal>
    </Section>
  );
}

