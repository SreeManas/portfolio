export const sectionRegistry = [
  {
    id: "hero",
    label: "Opening",
    question: "Who is this engineer?",
  },
  {
    id: "current-mission",
    label: "Current Mission",
    question: "What problem is he trying to solve?",
  },
  {
    id: "featured-project",
    label: "Featured Project",
    question: "What has he built with depth?",
  },
  {
    id: "engineering-thinking",
    label: "Engineering Thinking",
    question: "How does he make decisions?",
  },
  {
    id: "selected-work",
    label: "Selected Work",
    question: "Where else has this thinking appeared?",
  },
  {
    id: "journal",
    label: "Journal",
    question: "What is he learning and noticing?",
  },
  {
    id: "journey",
    label: "Journey",
    question: "How did this path develop?",
  },
  {
    id: "curiosity",
    label: "Curiosity",
    question: "What questions keep pulling him forward?",
  },
  {
    id: "manifesto",
    label: "Manifesto",
    question: "What does he believe about software?",
  },
  {
    id: "contact",
    label: "Contact",
    question: "How should people reach him?",
  },
] as const;

export type SectionId = (typeof sectionRegistry)[number]["id"];
