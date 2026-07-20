import type { JournalContent } from "@/sections/journal/types";

export const journalContent = {
  id: "journal",
  title: "NOTES",
  introduction:
    "Version 0.1 notebook entries from experiments, decisions, mistakes, and questions still in progress.",
  ordering: {
    mode: "manual",
  },
  entries: [
    {
      id: "decision-traces",
      date: "2026-07-20",
      category: "Observation",
      title: "Decision traces",
      note:
        "A recommendation feels more useful when the evidence trail stays visible enough to question.",
      tags: ["Explainability", "Interface"],
      bodyFormat: "plain",
    },
    {
      id: "capability-before-distance",
      date: "2026-07-18",
      category: "Experiment",
      title: "Capability before distance",
      note:
        "Testing how routing changes when hospital readiness is treated as seriously as travel time.",
      tags: ["Routing", "Medical AI"],
      bodyFormat: "plain",
    },
    {
      id: "evaluation-is-product-work",
      date: "2026-07-14",
      category: "Lesson",
      title: "Evaluation is product work",
      note:
        "A model can be correct and still fail if the explanation does not help a person act.",
      tags: ["LLM Evaluation", "Human-AI"],
      bodyFormat: "plain",
    },
    {
      id: "interfaces-as-pressure",
      date: "2026-07-09",
      category: "Question",
      title: "Interfaces under pressure",
      note:
        "What information remains readable when the user is tired, rushed, or responsible for a hard call?",
      tags: ["Systems", "Decision Intelligence"],
      bodyFormat: "plain",
    },
  ],
} satisfies JournalContent;

