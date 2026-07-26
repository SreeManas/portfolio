import type { ProjectCaseStudy } from "@/project-engine/types";

export interface ProjectsContent {
  id: string;
  label: string;
  title: string;
  introduction: string;
  metadataLabels: {
    status: string;
    category: string;
    year: string;
  };
  projects: readonly ProjectCaseStudy[];
}
