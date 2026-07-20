import type { CurrentlyBuildingContent } from "@/sections/currently-building/types";

export const currentlyBuildingContent = {
  id: "currently-building",
  title: "CURRENTLY BUILDING",
  focusLabel: "Current Focus",
  focus:
    "Version 0.1 snapshot of the workbench: turning decision-support ideas into testable systems.",
  systemLabel: "Current System",
  system: "MEDROUTER",
  stageLabel: "Current Stage",
  stages: [
    {
      id: "research",
      label: "Research",
      state: "complete",
    },
    {
      id: "architecture",
      label: "Architecture",
      state: "active",
    },
    {
      id: "prototype",
      label: "Prototype",
      state: "upcoming",
    },
    {
      id: "evaluation",
      label: "Evaluation",
      state: "upcoming",
    },
    {
      id: "deployment",
      label: "Deployment",
      state: "upcoming",
    },
  ],
  futureReadingLabel: "Future Reading",
  futureReading: [
    {
      id: "research-papers",
      label: "Research papers",
    },
    {
      id: "system-documentation",
      label: "System documentation",
    },
    {
      id: "architecture-sketches",
      label: "Architecture sketches",
    },
    {
      id: "prototype-notes",
      label: "Prototype notes",
    },
  ],
} satisfies CurrentlyBuildingContent;

