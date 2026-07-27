import type { JourneyContent } from "@/sections/journey/types";

export const journeyContent: JourneyContent = {
  id: "journey",
  label: "JOURNEY",
  title: "A working record of how the engineering path is taking shape.",
  introduction:
    "From technical foundations and leadership roles to hackathons, MEDROUTER, and the current focus on decision intelligence.",
  milestones: [
    {
      id: "it-foundation",
      year: "2024",
      title: "Started building the technical foundation.",
      description:
        "Moved from coursework into stronger software fundamentals and applied projects as a B.Tech Information Technology student.",
    },
    {
      id: "student-leadership",
      year: "2025",
      title: "Learned to coordinate people and systems.",
      description:
        "Class Representative (IT-B) and Digital Head at Hyderabad Youth Assembly — responsibility beyond the editor.",
    },
    {
      id: "product-experiments",
      year: "2025",
      title: "Built early product experiments.",
      description:
        "BITS Pilani Hackathon (Top 15) and Podpreneur (2nd Place) sharpened product framing under pressure.",
    },
    {
      id: "decision-intelligence",
      year: "2026",
      title: "Focused the work around decision intelligence.",
      description:
        "MEDROUTER, Engineering Notes, and a clearer path through medical AI and human-centered decision support.",
    },
  ],
};
