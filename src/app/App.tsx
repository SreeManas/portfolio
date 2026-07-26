import type { ReactElement } from "react";

import { RootLayout } from "@/app/RootLayout";
import { Hero } from "@/sections/hero/Hero";
import { About } from "@/sections/about/About";
import { CurrentMission } from "@/sections/current-mission/CurrentMission";
import { EngineeringPrinciples } from "@/sections/engineering-principles/EngineeringPrinciples";
import { FeaturedProject } from "@/sections/featured-project/FeaturedProject";
import { FeaturedProjects } from "@/sections/projects/FeaturedProjects";
import { EngineeringJournal } from "@/sections/journal/EngineeringJournal";
import { CurrentlyBuilding } from "@/sections/currently-building/CurrentlyBuilding";

export function App(): ReactElement {
  return (
    <RootLayout>
      <main
        id="main-content"
        aria-label="Portfolio content"
        className="min-h-dvh"
      >
        <Hero />
        <About />
        <CurrentMission />
        <EngineeringPrinciples />
        <FeaturedProjects />
        <FeaturedProject />
        <EngineeringJournal />
        <CurrentlyBuilding />
      </main>
    </RootLayout>
  );
}
