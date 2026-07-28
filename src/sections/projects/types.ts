import type { ProjectCaseStudy } from "@/content/projects/types";

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
