export interface ProjectLink {
  id: string;
  label: string;
  href: string;
}

export interface ProjectRoute {
  path: string;
  enabled: boolean;
}

export interface ProjectMetadataItem {
  id: string;
  label: string;
  value: string;
  href?: string;
}

export interface ProjectTextBlock {
  id: string;
  label: string;
  title: string;
  body: string;
}

export interface ProjectArchitectureBlock extends ProjectTextBlock {
  canvasLabel: string;
}

export interface ProjectPipelineStep {
  id: string;
  label: string;
}

export interface ProjectPipeline {
  id: string;
  label: string;
  steps: readonly ProjectPipelineStep[];
}

export interface ProjectDecisionRecord {
  id: string;
  decision: string;
  why: string;
  tradeoff: string;
}

export interface ProjectDecisionLabels {
  decision: string;
  why: string;
  tradeoff: string;
}

export interface ProjectDecisionGroup {
  id: string;
  label: string;
  labels: ProjectDecisionLabels;
  items: readonly ProjectDecisionRecord[];
}

export interface ProjectTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  links?: readonly ProjectLink[];
}

export interface ProjectTimeline {
  id: string;
  label: string;
  items: readonly ProjectTimelineItem[];
}

export interface ProjectOutcome {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface ProjectOutcomes {
  id: string;
  label: string;
  items: readonly ProjectOutcome[];
}

export interface ProjectCaseStudyDisplay {
  sectionId: string;
  titleId: string;
  label: string;
  metadataLabel: string;
  narrativeBlocks: readonly ProjectTextBlock[];
  status: ProjectTextBlock;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: string;
  year: string;
  technologies: readonly string[];
  overview: ProjectTextBlock;
  problem: ProjectTextBlock;
  solution: ProjectTextBlock;
  architecture: ProjectArchitectureBlock;
  decisionPipeline: ProjectPipeline;
  engineeringDecisions: ProjectDecisionGroup;
  timeline: ProjectTimeline;
  outcomes: ProjectOutcomes;
  futureWork: ProjectTextBlock;
  links: readonly ProjectLink[];
  metadata: readonly ProjectMetadataItem[];
  featured: boolean;
  route: ProjectRoute;
  display: ProjectCaseStudyDisplay;
}

export interface ProjectRouteManifestItem {
  id: string;
  slug: string;
  path: string;
  enabled: boolean;
  title: string;
}
