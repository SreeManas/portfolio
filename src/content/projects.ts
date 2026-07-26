import type { ProjectsContent } from "@/sections/projects/types";

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
  projects: [
    {
      id: "medrouter",
      title: "MEDROUTER",
      shortDescription:
        "Version 0.1 description for an emergency routing decision-support system.",
      category: "Medical AI",
      status: "Featured case study",
      year: "2026",
      technologies: ["React", "Firebase", "Mapbox", "LLM Systems"],
      featured: true,
      slug: "medrouter",
      caseStudyPath: "#case-note",
      metadata: [
        { id: "case-study", label: "Future Page", value: "Ready for route" },
      ],
    },
    {
      id: "bhagavadgeetha-io",
      title: "BhagavadGeetha.io",
      shortDescription:
        "Version 0.1 description for a reflective reading and interpretation project.",
      category: "Knowledge Interface",
      status: "In progress",
      year: "2026",
      technologies: ["React", "TypeScript", "Content Systems"],
      featured: false,
      slug: "bhagavadgeetha-io",
      metadata: [
        { id: "case-study", label: "Future Page", value: "Planned" },
      ],
    },
    {
      id: "nova",
      title: "NOVA",
      shortDescription:
        "Version 0.1 description for an experimental AI assistant system.",
      category: "Agentic Systems",
      status: "Prototype",
      year: "2026",
      technologies: ["LLMs", "Evaluation", "Product Systems"],
      featured: false,
      slug: "nova",
      metadata: [
        { id: "case-study", label: "Future Page", value: "Planned" },
      ],
    },
    {
      id: "ai-healthcare-research",
      title: "AI Healthcare Research",
      shortDescription:
        "Version 0.1 description for research notes at the intersection of AI and healthcare workflows.",
      category: "Research",
      status: "Ongoing",
      year: "2026",
      technologies: ["Evaluation", "Medical AI", "Research Notes"],
      featured: false,
      slug: "ai-healthcare-research",
      metadata: [
        { id: "case-study", label: "Future Page", value: "Planned" },
      ],
    },
    {
      id: "experimental-projects",
      title: "Experimental Projects",
      shortDescription:
        "Version 0.1 description for smaller prototypes, interface tests, and engineering studies.",
      category: "Experiments",
      status: "Collected notes",
      year: "2026",
      technologies: ["Prototyping", "Interfaces", "Systems"],
      featured: false,
      slug: "experimental-projects",
      metadata: [
        { id: "case-study", label: "Future Page", value: "Planned" },
      ],
    },
  ],
} satisfies ProjectsContent;
