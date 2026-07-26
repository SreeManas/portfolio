import type { JourneyContent } from "@/sections/journey/types";

export const journeyContent: JourneyContent = {
  id: "journey",
  label: "JOURNEY",
  title: "A working record of how the engineering path is taking shape.",
  introduction:
    "Version 0.1 narrative milestones. This section will stay focused on learning, responsibility, and the choices that shaped the work.",
  milestones: [
    {
      id: "it-foundation",
      year: "2024",
      title: "Started building the technical foundation.",
      description:
        "Placeholder note about moving from coursework into stronger software fundamentals and applied projects.",
    },
    {
      id: "student-leadership",
      year: "2025",
      title: "Learned to coordinate people and systems.",
      description:
        "Placeholder note about class representation, organizing work, and understanding how decisions move through groups.",
    },
    {
      id: "product-experiments",
      year: "2025",
      title: "Built early product experiments.",
      description:
        "Placeholder note about prototypes, hackathons, product framing, and learning from imperfect builds.",
    },
    {
      id: "decision-intelligence",
      year: "2026",
      title: "Focused the work around decision intelligence.",
      description:
        "Placeholder note about connecting AI, healthcare, routing, evaluation, and human decision-making.",
    },
  ],
};
