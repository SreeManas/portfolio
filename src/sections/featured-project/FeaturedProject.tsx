import type { ReactElement } from "react";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/sections/projects/components/ProjectCard";
import { medrouterProject } from "@/content/projects/medrouter";
import { motionTiming } from "@/lib/motion";

export function FeaturedProject(): ReactElement {
  return (
    <Section
      id="featured-project"
      aria-labelledby="featured-project-title"
      width="wide"
    >
      <Reveal distance={0} transition={{ duration: motionTiming.standard }}>
        <ProjectCard project={medrouterProject} featured />
      </Reveal>
    </Section>
  );
}
