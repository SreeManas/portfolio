import type { ReactElement } from "react";

import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { CurrentMission } from "@/sections/current-mission/CurrentMission";
import { CurrentlyBuilding } from "@/sections/currently-building/CurrentlyBuilding";
import { EngineeringJournal } from "@/sections/journal/EngineeringJournal";
import { EngineeringPrinciples } from "@/sections/engineering-principles/EngineeringPrinciples";
import { FeaturedProject } from "@/sections/featured-project/FeaturedProject";
import { FeaturedProjects } from "@/sections/projects/FeaturedProjects";
import { Hero } from "@/sections/hero/Hero";
import { Journey } from "@/sections/journey/Journey";
import { Skills } from "@/sections/skills/Skills";

export function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <About />
      <CurrentMission />
      <EngineeringPrinciples />
      <FeaturedProjects />
      <FeaturedProject />
      <EngineeringJournal />
      <CurrentlyBuilding />
      <Skills />
      <Journey />
      <Contact />
    </>
  );
}
