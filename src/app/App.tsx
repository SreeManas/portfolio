import type { ReactElement } from "react";

import { CommandPalette } from "@/command-palette/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { footerContent } from "@/content/footer";
import { RootLayout } from "@/app/RootLayout";
import { Hero } from "@/sections/hero/Hero";
import { About } from "@/sections/about/About";
import { CurrentMission } from "@/sections/current-mission/CurrentMission";
import { EngineeringPrinciples } from "@/sections/engineering-principles/EngineeringPrinciples";
import { FeaturedProject } from "@/sections/featured-project/FeaturedProject";
import { FeaturedProjects } from "@/sections/projects/FeaturedProjects";
import { EngineeringJournal } from "@/sections/journal/EngineeringJournal";
import { CurrentlyBuilding } from "@/sections/currently-building/CurrentlyBuilding";
import { Skills } from "@/sections/skills/Skills";
import { Journey } from "@/sections/journey/Journey";
import { Contact } from "@/sections/contact/Contact";

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
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer content={footerContent} />
      <CommandPalette />
    </RootLayout>
  );
}
