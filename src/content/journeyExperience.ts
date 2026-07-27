import type { JourneyExperienceContent } from "@/journey/types";

export const journeyExperienceContent = {
  hero: {
    eyebrow: "Engineering Journey",
    title: "Journey",
    description:
      "A record of growth through projects, leadership, experimentation, and continuous learning — how the engineering path is taking shape.",
    scrollLabel: "Scroll to explore",
  },
  mission: {
    label: "Current Mission",
    title: "What the work is pointed at today.",
    introduction:
      "I am drawn to AI that helps people make decisions without asking them to surrender judgment. The focus areas below are where that mission shows up in practice.",
    focusAreas: [
      {
        id: "ai",
        title: "Artificial Intelligence",
        description:
          "Building systems that expose evidence, uncertainty, and tradeoffs clearly enough to question.",
        icon: "spark",
      },
      {
        id: "healthcare",
        title: "Healthcare Systems",
        description:
          "Studying medical decision support where time, trust, and readiness all matter.",
        icon: "health",
      },
      {
        id: "devtools",
        title: "Developer Tools",
        description:
          "Exploring interfaces and tooling that keep complex workflows inspectable under pressure.",
        icon: "tools",
      },
      {
        id: "human-centered",
        title: "Human-Centered Products",
        description:
          "Keeping engineering close to people: messy inputs, incomplete information, and hard calls.",
        icon: "human",
      },
      {
        id: "research",
        title: "Research & Learning",
        description:
          "Continuing AI and healthcare research projects while sharpening evaluation habits.",
        icon: "research",
      },
    ],
  },
  timeline: {
    label: "Timeline",
    title: "Milestones that changed how the work is done.",
    introduction:
      "A vertical record of foundation, responsibility, experimentation, and the decision-intelligence focus that followed.",
    filters: [
      "All",
      "Projects",
      "Leadership",
      "Hackathons",
      "Education",
      "Awards",
      "Learning",
    ],
    items: [
      {
        id: "technical-foundation",
        year: "2024",
        title: "Started building the technical foundation",
        category: "Education",
        summary:
          "Moved from coursework into stronger software fundamentals and applied projects as a B.Tech Information Technology student.",
        details:
          "This stretch established the base for later product work: writing software with intent, learning how systems fit together, and treating projects as a way to test ideas rather than only complete assignments.",
        icon: "code",
      },
      {
        id: "class-representative",
        year: "2025",
        title: "Class Representative (IT-B)",
        category: "Leadership",
        summary:
          "Learned to coordinate people and communication inside the class — how decisions move through groups.",
        details:
          "Representing IT-B meant staying close to both classmates and the systems around them: organizing work, carrying context between people, and practicing responsibility under real coordination pressure.",
        icon: "people",
      },
      {
        id: "digital-head-hya",
        year: "2025",
        title: "Digital Head, Hyderabad Youth Assembly",
        category: "Leadership",
        summary:
          "Took on digital leadership beyond the classroom with Hyderabad Youth Assembly.",
        details:
          "The role extended coordination into a broader organization: aligning digital work with people who need clarity, pace, and follow-through — another lesson in systems that involve both tools and teams.",
        icon: "flag",
      },
      {
        id: "bits-hackathon",
        year: "2025",
        title: "BITS Pilani Hackathon",
        category: "Hackathons",
        summary: "Top 15 finish — shipping under time pressure with incomplete information.",
        details:
          "A competition finish that reinforced product framing under constraint: what to build first, what to leave unfinished, and how to keep a prototype coherent when the clock is the loudest stakeholder.",
        icon: "award",
      },
      {
        id: "podpreneur",
        year: "2025",
        title: "Podpreneur",
        category: "Awards",
        summary: "2nd Place — an early product experiment that had to stand up to judging.",
        details:
          "Podpreneur pushed prototypes toward clearer product framing. The result mattered, but so did the practice of explaining imperfect builds with enough honesty for others to evaluate them.",
        icon: "award",
      },
      {
        id: "medrouter",
        year: "2026",
        title: "MEDROUTER",
        category: "Projects",
        summary:
          "A decision-support system for emergency hospital routing — the featured case study on this portfolio.",
        details:
          "MEDROUTER connects medical AI, routing, evaluation, and human override. The project is where decision intelligence stopped being only a theme and became an architecture to inspect.",
        icon: "building",
      },
      {
        id: "engineering-notes",
        year: "2026",
        title: "Engineering Notes",
        category: "Learning",
        summary:
          "Opened a knowledge hub for technical thinking, experiments, and architectural decisions.",
        details:
          "Notes sit beside projects on purpose: to keep learning visible, to record trade-offs, and to treat writing as part of engineering rather than an afterthought.",
        icon: "notes",
      },
      {
        id: "decision-intelligence",
        year: "2026",
        title: "Current AI journey",
        category: "Learning",
        summary:
          "Focused the work around decision intelligence, medical AI, and human-AI collaboration.",
        details:
          "The present chapter connects AI, software engineering, product thinking, and system design. Each project is another attempt to understand that space without asking people to surrender judgment.",
        icon: "compass",
      },
    ],
  },
  leadership: {
    label: "Leadership",
    title: "Responsibility outside the editor.",
    introduction:
      "Roles where coordination, clarity, and follow-through mattered as much as the technical work.",
    items: [
      {
        id: "class-rep",
        role: "Class Representative",
        organisation: "IT-B",
        duration: "2025",
        responsibilities: [
          "Represent classmates and carry context between people and systems.",
          "Organize communication when decisions need to move through the group.",
          "Practice accountability under ordinary academic pressure.",
        ],
        takeaway:
          "Leadership often starts as coordination — making the path clearer for everyone else.",
      },
      {
        id: "digital-head",
        role: "Digital Head",
        organisation: "Hyderabad Youth Assembly",
        duration: "2025",
        responsibilities: [
          "Lead digital work for a youth assembly beyond the classroom.",
          "Align tools, communication, and pace with people who need reliable follow-through.",
          "Treat digital systems as support for collective decisions, not decoration.",
        ],
        takeaway:
          "The same instincts that help systems stay inspectable also help teams stay aligned.",
      },
    ],
  },
  hackathons: {
    label: "Hackathons & Competitions",
    title: "Pressure as a teacher.",
    introduction:
      "Finishes that mattered less as trophies and more as practice for shipping, framing, and learning in public.",
    items: [
      {
        id: "bits",
        event: "BITS Pilani Hackathon",
        date: "2025",
        achievement: "Top 15 finish",
        technologies: [],
        lesson:
          "Time pressure reveals which parts of a system are actually essential — and which explanations survive when the audience is tired.",
      },
      {
        id: "podpreneur",
        event: "Podpreneur",
        date: "2025",
        achievement: "2nd Place",
        technologies: [],
        lesson:
          "Product framing is engineering work. A prototype only becomes evaluable when the problem, constraint, and decision are stated clearly.",
      },
    ],
  },
  projects: {
    label: "Project Milestones",
    title: "Work that earned a closer look.",
    introduction:
      "Milestones from the portfolio’s project index — from featured case study to work still forming.",
    items: [
      {
        id: "medrouter",
        title: "MEDROUTER",
        year: "2026",
        summary:
          "Emergency hospital routing decision support — featured Medical AI case study.",
        href: "/projects/medrouter",
        status: "Featured case study",
      },
      {
        id: "under-development",
        title: "Under Development",
        year: "2026",
        summary: "An AI systems project reserved for a future case study.",
        status: "Coming Soon",
      },
      {
        id: "experimental",
        title: "Experimental Project",
        year: "2026",
        summary: "A developer-tools prototype still taking shape.",
        status: "Prototype",
      },
      {
        id: "notes-hub",
        title: "Engineering Notes",
        year: "2026",
        summary:
          "Knowledge hub for technical thinking, experiments, and architectural decisions.",
        href: "/notes",
        status: "Published",
      },
    ],
  },
  credentials: {
    label: "Education",
    title: "Formal learning path.",
    introduction:
      "Credentials currently on record. Certification details will appear here only when they are real and ready to share.",
    items: [
      {
        id: "btech-it",
        provider: "Undergraduate program",
        title: "B.Tech Information Technology",
        year: "In progress",
        status: "Active",
      },
    ],
  },
  achievements: {
    label: "Achievements",
    title: "Moments that raised the bar.",
    introduction:
      "Selected outcomes already documented elsewhere on this portfolio — placements, leadership, and research direction.",
    items: [
      {
        id: "bits-top-15",
        title: "BITS Pilani Hackathon — Top 15",
        context: "Competition",
        detail: "A top-fifteen finish under hackathon constraints.",
      },
      {
        id: "podpreneur-second",
        title: "Podpreneur — 2nd Place",
        context: "Competition",
        detail: "Second place for an early product experiment.",
      },
      {
        id: "class-rep-selection",
        title: "Class Representative (IT-B)",
        context: "Leadership",
        detail: "Selected to represent classmates and coordinate class systems.",
      },
      {
        id: "hya-digital-head",
        title: "Digital Head — Hyderabad Youth Assembly",
        context: "Leadership",
        detail: "Selected to lead digital work for the assembly.",
      },
      {
        id: "ai-healthcare",
        title: "AI and healthcare research projects",
        context: "Research",
        detail:
          "Ongoing research direction connecting medical AI with decision-support thinking.",
      },
    ],
  },
  statistics: {
    label: "Statistics",
    title: "A compact view of the path so far.",
    introduction:
      "Counts derived from work already present on this portfolio — not aspirational metrics.",
    items: [
      { id: "projects", label: "Projects in portfolio", value: 3 },
      { id: "competitions", label: "Competition finishes", value: 2 },
      { id: "leadership", label: "Leadership roles", value: 2 },
      { id: "focus", label: "Active focus areas", value: 5 },
      { id: "years", label: "Years building", value: 2, suffix: "+" },
    ],
  },
  next: {
    label: "What's Next",
    title: "Direction, not destination.",
    introduction:
      "The next chapter stays close to the current mission: decision intelligence, medical AI, and systems people can inspect.",
    items: [
      {
        id: "medrouter-next",
        title: "Keep building MEDROUTER",
        description:
          "Move the emergency routing case study from framework toward clearer architecture, evaluation, and evidence.",
      },
      {
        id: "ai-research",
        title: "Deepen AI research",
        description:
          "Continue AI and healthcare research with stronger evaluation habits and human-AI collaboration.",
      },
      {
        id: "impactful-products",
        title: "Ship impactful products",
        description:
          "Turn decision-support ideas into interfaces that expose uncertainty without hiding judgment.",
      },
      {
        id: "large-systems",
        title: "Learn large-scale systems",
        description:
          "Grow toward software systems where routing, evidence, and override remain readable at scale.",
      },
    ],
  },
  cta: {
    label: "Continue",
    title: "Inspect the work, or start a conversation.",
    description:
      "The journey is easiest to evaluate next to the projects and notes that produced it.",
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Contact", href: "/#contact" },
  },
} satisfies JourneyExperienceContent;
