import type { ReactElement } from "react";

import { RootLayout } from "@/app/RootLayout";
import { Hero } from "@/sections/hero/Hero";
import { CurrentMission } from "@/sections/current-mission/CurrentMission";
import { EngineeringPrinciples } from "@/sections/engineering-principles/EngineeringPrinciples";
import { FeaturedProject } from "@/sections/featured-project/FeaturedProject";
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
        <CurrentMission />
        <EngineeringPrinciples />
        <FeaturedProject />
        <EngineeringJournal />
        <CurrentlyBuilding />
      </main>
    </RootLayout>
  );
}
