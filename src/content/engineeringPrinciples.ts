import type { EditorialListItem } from "@/components/editorial/NumberedEditorialList";

export const engineeringPrinciplesContent = {
  id: "engineering-principles",
  label: "ENGINEERING PRINCIPLES",
  title: "How I think before I build.",
  introduction:
    "Version 0.1 notes on the mental models that guide my engineering work.",
  principles: [
    {
      id: "frame-before-model",
      title: "Frame the problem before choosing the model.",
      description:
        "Start with the decision, the user, and the constraint. The model is only useful after the problem is clear.",
    },
    {
      id: "visible-uncertainty",
      title: "Make uncertainty visible.",
      description:
        "A system should show what it knows, what it is unsure about, and where a human should inspect further.",
    },
    {
      id: "human-decisions",
      title: "Optimize for human decisions, not benchmark numbers.",
      description:
        "Good metrics matter, but the interface must help people understand what action to take next.",
    },
    {
      id: "inspectable-recommendations",
      title: "Every recommendation should be inspectable.",
      description:
        "If software suggests a path, it should preserve enough evidence for the suggestion to be questioned.",
    },
  ] satisfies readonly EditorialListItem[],
  transition:
    "These ideas become tangible through projects. The first of them is MEDROUTER.",
} as const;

