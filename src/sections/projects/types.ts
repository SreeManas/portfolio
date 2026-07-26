export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  status: string;
  year: string;
  technologies: readonly string[];
  featured: boolean;
  slug: string;
  caseStudyPath?: string;
  metadata?: readonly ProjectMetadataItem[];
  thumbnail?: string;
  links?: readonly ProjectLink[];
}

export interface ProjectMetadataItem {
  id: string;
  label: string;
  value: string;
}

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
  projects: readonly ProjectRecord[];
}
