import type {
  ProjectCaseStudy,
  ProjectRouteManifestItem,
  ProjectTextBlock,
} from "@/project-engine/types";
import type { ProjectsContent } from "@/sections/projects/types";

const medrouterProblem = {
  id: "problem",
  label: "Problem",
  title: "Emergency routing has too many hidden assumptions.",
  body:
    "Version 0.1 copy. This space will explain the real problem MEDROUTER studies without turning the section into a pitch.",
} satisfies ProjectTextBlock;

const medrouterExistingSystems = {
  id: "existing-systems",
  label: "Why Existing Systems Break",
  title: "Nearest is not always ready.",
  body:
    "Version 0.1 copy. This will describe the gap between static routing, live capacity, clinical needs, and human override.",
} satisfies ProjectTextBlock;

const medrouterSolution = {
  id: "design-goal",
  label: "Design Goal",
  title: "Make the route easier to trust, inspect, and override.",
  body:
    "Version 0.1 copy. This will clarify what the system is trying to improve before explaining how it works.",
} satisfies ProjectTextBlock;

export const medrouterProject = {
  id: "medrouter",
  slug: "medrouter",
  title: "MEDROUTER",
  tagline:
    "Version 0.1 summary. A decision-support system for emergency hospital routing.",
  category: "Medical AI",
  status: "Featured case study",
  year: "2026",
  technologies: ["React", "Firebase", "Mapbox", "LLM Systems"],
  overview: {
    id: "medrouter-overview",
    label: "Overview",
    title: "Emergency routing decision support.",
    body:
      "Version 0.1 description for an emergency routing decision-support system.",
  },
  problem: medrouterProblem,
  solution: medrouterSolution,
  architecture: {
    id: "system-overview",
    label: "System Overview",
    title: "Architecture drawing area",
    body:
      "Reserved for a future SVG that explains actors, data flow, ranking logic, and review points.",
    canvasLabel: "Reserved architecture diagram canvas",
  },
  decisionPipeline: {
    id: "decision-pipeline",
    label: "Decision Pipeline",
    steps: [
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
    ],
  },
  engineeringDecisions: {
    id: "engineering-decisions",
    label: "Engineering Decisions",
    labels: {
      decision: "Decision",
      why: "Reason",
      tradeoff: "Tradeoff",
    },
    items: [
      {
        id: "visible-evidence",
        decision: "Keep routing evidence visible.",
        why:
          "Version 0.1 reason. The interface should show why a route is suggested.",
        tradeoff:
          "Version 0.1 tradeoff. More evidence can slow scanning if hierarchy is weak.",
      },
      {
        id: "human-override",
        decision: "Preserve human override.",
        why:
          "Version 0.1 reason. Dispatchers need room to act on context the system may not know.",
        tradeoff:
          "Version 0.1 tradeoff. Override paths require clearer audit language.",
      },
      {
        id: "capability-before-distance",
        decision: "Compare capability before distance alone.",
        why:
          "Version 0.1 reason. The closest hospital may not be the most useful destination.",
        tradeoff:
          "Version 0.1 tradeoff. Ranking logic becomes harder to explain cleanly.",
      },
    ],
  },
  timeline: {
    id: "timeline",
    label: "Timeline",
    items: [
      {
        id: "research-framing",
        date: "2026",
        title: "Research framing",
        description:
          "Version 0.1 placeholder milestone for future standalone case-study pages.",
      },
      {
        id: "architecture-prototype",
        date: "2026",
        title: "Architecture prototype",
        description:
          "Version 0.1 placeholder milestone for future standalone case-study pages.",
      },
    ],
  },
  outcomes: {
    id: "outcomes",
    label: "Outcomes",
    items: [
      {
        id: "framework",
        label: "Framework",
        value: "Version 0.1",
        description:
          "Placeholder outcome slot for future evidence, evaluation, and implementation notes.",
      },
    ],
  },
  futureWork: {
    id: "future-work",
    label: "Future Work",
    title: "Replace placeholders with evidence.",
    body:
      "Version 0.1 future work. This block will hold next implementation, research, and validation steps.",
  },
  links: [],
  metadata: [
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
  ],
  featured: true,
  route: {
    path: "/projects/medrouter",
    enabled: true,
  },
  display: {
    sectionId: "featured-project",
    titleId: "featured-project-title",
    label: "CASE STUDY 01",
    metadataLabel: "Evidence Rail",
    narrativeBlocks: [
      medrouterProblem,
      medrouterExistingSystems,
      medrouterSolution,
    ],
    status: {
      id: "current-status",
      label: "Current Status",
      title: "Framework first, story later.",
      body:
        "Version 0.1 status. This block will eventually describe what works, what is being tested, and what remains open.",
    },
  },
} satisfies ProjectCaseStudy;

function createPlaceholderProject(
  project: Pick<
    ProjectCaseStudy,
    | "id"
    | "slug"
    | "title"
    | "tagline"
    | "category"
    | "status"
    | "year"
    | "technologies"
  >,
): ProjectCaseStudy {
  const overview = {
    id: `${project.id}-overview`,
    label: "Overview",
    title: "Version 0.1 project overview.",
    body: project.tagline,
  } satisfies ProjectTextBlock;
  const problem = {
    id: `${project.id}-problem`,
    label: "Problem",
    title: "Version 0.1 problem framing.",
    body: "Placeholder problem statement for a future standalone case study.",
  } satisfies ProjectTextBlock;
  const solution = {
    id: `${project.id}-solution`,
    label: "Solution",
    title: "Version 0.1 solution framing.",
    body: "Placeholder solution note for a future standalone case study.",
  } satisfies ProjectTextBlock;

  return {
    ...project,
    overview,
    problem,
    solution,
    architecture: {
      id: `${project.id}-architecture`,
      label: "Architecture",
      title: "Version 0.1 architecture area.",
      body: "Reserved for a future architecture diagram and system notes.",
      canvasLabel: "Reserved architecture diagram canvas",
    },
    decisionPipeline: {
      id: `${project.id}-decision-pipeline`,
      label: "Decision Pipeline",
      steps: [],
    },
    engineeringDecisions: {
      id: `${project.id}-engineering-decisions`,
      label: "Engineering Decisions",
      labels: {
        decision: "Decision",
        why: "Why",
        tradeoff: "Tradeoff",
      },
      items: [],
    },
    timeline: {
      id: `${project.id}-timeline`,
      label: "Timeline",
      items: [],
    },
    outcomes: {
      id: `${project.id}-outcomes`,
      label: "Outcomes",
      items: [],
    },
    futureWork: {
      id: `${project.id}-future-work`,
      label: "Future Work",
      title: "Version 0.1 future work.",
      body: "Placeholder future-work note for a future standalone case study.",
    },
    links: [],
    metadata: [
      {
        id: "status",
        label: "Status",
        value: project.status,
      },
      {
        id: "category",
        label: "Category",
        value: project.category,
      },
      {
        id: "year",
        label: "Year",
        value: project.year,
      },
    ],
    featured: false,
    route: {
      path: `/projects/${project.slug}`,
      enabled: false,
    },
    display: {
      sectionId: project.id,
      titleId: `${project.id}-title`,
      label: "CASE STUDY",
      metadataLabel: "Project Metadata",
      narrativeBlocks: [problem, solution],
      status: {
        id: `${project.id}-status`,
        label: "Current Status",
        title: "Version 0.1 status.",
        body: "Placeholder status note for a future standalone case study.",
      },
    },
  };
}

export const projectCaseStudies = [
  medrouterProject,
  createPlaceholderProject({
    id: "under-development",
    slug: "under-development",
    title: "🚧 Under Development",
    tagline:
      "Building the next flagship AI project. This space is intentionally reserved for future engineering work. Case study coming soon.",
    category: "AI Systems",
    status: "Coming Soon",
    year: "2026",
    technologies: ["AI Systems", "Product Architecture", "Evaluation"],
  }),
  createPlaceholderProject({
    id: "experimental-project",
    slug: "experimental-project",
    title: "🧪 Experimental Project",
    tagline:
      "Currently exploring AI systems, developer tools and scalable software architecture. A full case study will be published once the project reaches production quality.",
    category: "Developer Tools",
    status: "Prototype",
    year: "2026",
    technologies: ["AI Systems", "Developer Tooling", "Architecture"],
  }),
] satisfies readonly ProjectCaseStudy[];

export const projectRouteManifest: readonly ProjectRouteManifestItem[] =
  projectCaseStudies.map((project) => ({
    id: project.id,
    slug: project.slug,
    path: project.route.path,
    enabled: project.route.enabled,
    title: project.title,
  }));

export function getProjectBySlug(
  slug: ProjectCaseStudy["slug"],
): ProjectCaseStudy | undefined {
  return projectCaseStudies.find((project) => project.slug === slug);
}

export const projectsContent = {
  id: "projects",
  label: "FEATURED PROJECTS",
  title: "Selected engineering work.",
  introduction:
    "Version 0.1 project index. Each record will eventually connect to deeper notes, evidence, and case studies.",
  metadataLabels: {
    status: "Status",
    category: "Category",
    year: "Year",
  },
  projects: projectCaseStudies,
} satisfies ProjectsContent;
