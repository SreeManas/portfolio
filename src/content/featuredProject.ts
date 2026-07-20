import type {
  CaseStudyContent,
  CaseStudyDecision,
  CaseStudyEvidenceItem,
  CaseStudyPipelineStep,
  CaseStudyTextBlock,
} from "@/sections/featured-project/types";

const narrativeBlocks = [
  {
    id: "problem",
    label: "Problem",
    title: "Emergency routing has too many hidden assumptions.",
    body:
      "Version 0.1 copy. This space will explain the real problem MEDROUTER studies without turning the section into a pitch.",
  },
  {
    id: "existing-systems",
    label: "Why Existing Systems Break",
    title: "Nearest is not always ready.",
    body:
      "Version 0.1 copy. This will describe the gap between static routing, live capacity, clinical needs, and human override.",
  },
  {
    id: "design-goal",
    label: "Design Goal",
    title: "Make the route easier to trust, inspect, and override.",
    body:
      "Version 0.1 copy. This will clarify what the system is trying to improve before explaining how it works.",
  },
] satisfies readonly CaseStudyTextBlock[];

const pipeline = [
  {
    id: "patient-intake",
    label: "Patient Intake",
  },
  {
    id: "evidence-collection",
    label: "Evidence Collection",
  },
  {
    id: "capability-matching",
    label: "Capability Matching",
  },
  {
    id: "recommendation",
    label: "Recommendation",
  },
  {
    id: "human-review",
    label: "Human Review",
  },
  {
    id: "final-decision",
    label: "Final Decision",
  },
] satisfies readonly CaseStudyPipelineStep[];

const decisions = [
  {
    id: "visible-evidence",
    decision: "Keep routing evidence visible.",
    reason:
      "Version 0.1 reason. The interface should show why a route is suggested.",
    tradeoff:
      "Version 0.1 tradeoff. More evidence can slow scanning if hierarchy is weak.",
  },
  {
    id: "human-override",
    decision: "Preserve human override.",
    reason:
      "Version 0.1 reason. Dispatchers need room to act on context the system may not know.",
    tradeoff:
      "Version 0.1 tradeoff. Override paths require clearer audit language.",
  },
  {
    id: "capability-before-distance",
    decision: "Compare capability before distance alone.",
    reason:
      "Version 0.1 reason. The closest hospital may not be the most useful destination.",
    tradeoff:
      "Version 0.1 tradeoff. Ranking logic becomes harder to explain cleanly.",
  },
] satisfies readonly CaseStudyDecision[];

const evidenceRail = [
  {
    id: "status",
    label: "Status",
    value: "Version 0.1 framework",
  },
  {
    id: "research",
    label: "Research",
    value: "Notes pending",
  },
  {
    id: "architecture",
    label: "Architecture",
    value: "Diagram slot reserved",
  },
  {
    id: "timeline",
    label: "Timeline",
    value: "In progress",
  },
] satisfies readonly CaseStudyEvidenceItem[];

export const featuredProjectContent = {
  id: "featured-project",
  label: "CASE STUDY 01",
  name: "MEDROUTER",
  summary:
    "Version 0.1 summary. A decision-support system for emergency hospital routing.",
  narrativeBlocks,
  architecturePreview: {
    id: "system-overview",
    label: "System Overview",
    title: "Architecture drawing area",
    body:
      "Reserved for a future SVG that explains actors, data flow, ranking logic, and review points.",
  },
  pipeline: {
    label: "Decision Pipeline",
    steps: pipeline,
  },
  decisions: {
    label: "Engineering Decisions",
    items: decisions,
  },
  status: {
    id: "current-status",
    label: "Current Status",
    title: "Framework first, story later.",
    body:
      "Version 0.1 status. This block will eventually describe what works, what is being tested, and what remains open.",
  },
  futureWork: {
    id: "future-work",
    label: "Future Work",
    title: "Replace placeholders with evidence.",
    body:
      "Version 0.1 future work. This block will hold next implementation, research, and validation steps.",
  },
  evidenceRail,
} satisfies CaseStudyContent;
