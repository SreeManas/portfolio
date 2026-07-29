import type { Technology } from "../types";

export const architecture: Technology = {
  id: "architecture",
  name: "Architecture",
  slug: "architecture",
  description:
    "The fundamental organization of a system, embodied in its components, their relationships to each other and the environment, and the principles governing its design and evolution.",
  role: "System Design",
  category: "Concept",
  relatedTechnologies: ["Backend", "Frontend", "Performance"],
};

export const frontend: Technology = {
  id: "frontend",
  name: "Frontend",
  slug: "frontend",
  description:
    "The client-side portion of applications. Focused on user experience, interface rendering, accessibility, and performance in the browser or client device.",
  role: "Domain",
  category: "Concept",
  relatedTechnologies: ["React", "TypeScript", "Performance", "Architecture"],
};

export const backend: Technology = {
  id: "backend",
  name: "Backend",
  slug: "backend",
  description:
    "The server-side of applications, responsible for data persistence, authentication, API orchestration, and complex business logic.",
  role: "Domain",
  category: "Concept",
  relatedTechnologies: ["TypeScript", "Architecture", "Performance"],
};

export const performance: Technology = {
  id: "performance",
  name: "Performance",
  slug: "performance",
  description:
    "The systemic focus on application speed, resource efficiency, latency reduction, and smooth user experiences at scale.",
  role: "Discipline",
  category: "Concept",
  relatedTechnologies: ["Frontend", "Backend", "Architecture", "React"],
};
