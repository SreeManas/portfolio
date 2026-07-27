import type { ReactElement } from "react";

import { journeyExperienceContent } from "@/content/journeyExperience";
import { JourneyAchievementsSection } from "@/sections/journey-experience/components/JourneyAchievementsSection";
import { JourneyCredentialsSection } from "@/sections/journey-experience/components/JourneyCredentialsSection";
import { JourneyCtaSection } from "@/sections/journey-experience/components/JourneyCtaSection";
import { JourneyHackathonsSection } from "@/sections/journey-experience/components/JourneyHackathonsSection";
import { JourneyHero } from "@/sections/journey-experience/components/JourneyHero";
import { JourneyLeadershipSection } from "@/sections/journey-experience/components/JourneyLeadershipSection";
import { JourneyMissionSection } from "@/sections/journey-experience/components/JourneyMissionSection";
import { JourneyNextSection } from "@/sections/journey-experience/components/JourneyNextSection";
import { JourneyProjectsSection } from "@/sections/journey-experience/components/JourneyProjectsSection";
import { JourneyStatisticsSection } from "@/sections/journey-experience/components/JourneyStatisticsSection";
import { JourneyTimelineSection } from "@/sections/journey-experience/components/JourneyTimelineSection";

export function JourneyPage(): ReactElement {
  const content = journeyExperienceContent;

  return (
    <main
      id="main-content"
      aria-labelledby="journey-page-title"
      className="min-h-dvh bg-canvas"
    >
      <JourneyHero content={content.hero} />
      <JourneyMissionSection content={content.mission} />
      <JourneyTimelineSection content={content.timeline} />
      <JourneyLeadershipSection content={content.leadership} />
      <JourneyHackathonsSection content={content.hackathons} />
      <JourneyProjectsSection content={content.projects} />
      <JourneyCredentialsSection content={content.credentials} />
      <JourneyAchievementsSection content={content.achievements} />
      <JourneyStatisticsSection content={content.statistics} />
      <JourneyNextSection content={content.next} />
      <JourneyCtaSection content={content.cta} />
    </main>
  );
}
