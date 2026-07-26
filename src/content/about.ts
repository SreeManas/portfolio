import type { AboutContent } from "@/sections/about/types";

export const aboutContent: AboutContent = {
  id: "about",
  label: "ABOUT",
  title: "Before the systems, there is a person learning how to build them.",
  introduction:
    "Version 0.1 introduction. I am an undergraduate engineer interested in AI, healthcare, and decision-support systems.",
  narrative:
    "Version 0.1 narrative. I am drawn to projects where engineering has to stay close to people: messy inputs, incomplete information, time pressure, and decisions that need to be explained. This portfolio is a place to collect the work, notes, and experiments that shape how I think.",
  profile: {
    role: {
      label: "Current Role",
      value: "Undergraduate AI-focused engineer",
    },
    education: {
      label: "Education",
      value: "B.Tech Information Technology",
    },
    location: {
      label: "Location",
      value: "Hyderabad, India",
    },
    interestsLabel: "Current Interests",
    interests: [
      "Decision Intelligence",
      "Medical AI",
      "LLM Evaluation",
      "Human-AI Systems",
    ],
  },
  highlightsLabel: "Selected Context",
  highlights: [
    {
      id: "class-representative",
      label: "Class Representative (IT-B)",
    },
    {
      id: "digital-head",
      label: "Digital Head, Hyderabad Youth Assembly",
    },
    {
      id: "bits-hackathon",
      label: "BITS Pilani Hackathon - Top 15 finish",
    },
    {
      id: "podpreneur",
      label: "Podpreneur - 2nd Place",
    },
    {
      id: "ai-healthcare-research",
      label: "AI and healthcare research projects",
    },
  ],
};
