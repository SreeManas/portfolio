import type { ReactElement } from "react";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCaseStudy } from "@/components/project-engine/ProjectCaseStudy";
import { featuredProjectContent } from "@/content/featuredProject";
import { motionTiming } from "@/lib/motion";

export function FeaturedProject(): ReactElement {
  return (
    <Section
      id={featuredProjectContent.display.sectionId}
      aria-labelledby={featuredProjectContent.display.titleId}
      width="wide"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <ProjectCaseStudy project={featuredProjectContent} />
      </Reveal>
    </Section>
  );
}
