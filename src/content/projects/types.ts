import type { ArchitectureDiagramData } from "@/components/documentation/ArchitectureDiagram";
import type { FileTreeNode } from "@/components/documentation/FileTree";
import type { ApiFlowData } from "@/components/documentation/ApiFlow";
import type { SequenceDiagramData } from "@/components/documentation/SequenceDiagram";
import type { TerminalComponentData } from "@/components/documentation/TerminalComponent";
import type { ComparisonTableData } from "@/components/documentation/ComparisonTable";
import type { MetricItemData } from "@/components/documentation/MetricsGrid";
import type { CalloutType } from "@/components/documentation/Callout";

export interface BaseSection {
  id: string;
  label: string;
  title: string;
  visible?: boolean;
}

export interface ProjectHeroData {
  title: string;
  tagline: string;
  status: string;
  year: string;
  category: string;
  role?: string;
  teamSize?: string;
  technologies: readonly string[];
  links: readonly { id: string; label: string; href: string }[];
  coverImage?: string;
}

export interface ExecutiveSummaryData extends BaseSection {
  overview: string;
  keyAchievements?: readonly string[];
  metrics?: readonly { label: string; value: string; detail?: string }[];
}

export interface ProblemStatementData extends BaseSection {
  problem: string;
  targetUsers?: string;
  painPoints?: readonly string[];
  limitations?: string;
  breakdown?: {
    problem: string;
    impact: string;
    opportunity: string;
  };
  calloutData?: {
    type: CalloutType;
    title?: string;
    message: string;
  };
}

export interface SolutionOverviewData extends BaseSection {
  architectureSummary: string;
  workflow?: readonly string[];
  majorSystems?: readonly { title: string; description: string }[];
  designPhilosophy?: string;
  apiFlowData?: ApiFlowData;
  sequenceData?: SequenceDiagramData;
  calloutData?: {
    type: CalloutType;
    title?: string;
    message: string;
  };
}

export interface ArchitectureSectionData extends BaseSection {
  description: string;
  diagramPlaceholderLabel?: string;
  diagramUrl?: string;
  diagramData?: ArchitectureDiagramData;
  fileTreeData?: FileTreeNode[];
  notes?: readonly string[];
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  reasonChosen: string;
  responsibility: string;
  icon?: string;
}

export interface TechStackData extends BaseSection {
  items: readonly TechnologyItem[];
  terminalData?: TerminalComponentData;
  codeSnippet?: {
    filename?: string;
    language?: string;
    code: string;
  };
}

export interface EngineeringDecisionItem {
  id: string;
  title: string;
  decision: string;
  reason: string;
  alternativesConsidered?: string;
  tradeoffs: string;
  outcome?: string;
  lessons?: string;
}

export interface DecisionsData extends BaseSection {
  items: readonly EngineeringDecisionItem[];
  comparisonData?: ComparisonTableData;
}

export interface ChallengeItem {
  id: string;
  title: string;
  problem: string;
  cause: string;
  solution: string;
  result: string;
}

export interface ChallengesData extends BaseSection {
  items: readonly ChallengeItem[];
}

export interface ResultItem {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface ResultsData extends BaseSection {
  summary?: string;
  metrics: readonly ResultItem[];
  metricsData?: MetricItemData[];
  userImpact?: string;
}

export interface LessonsData extends BaseSection {
  reflections: readonly string[];
}

export interface RoadmapItem {
  id: string;
  period: string;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Planned" | "Research";
}

export interface RoadmapData extends BaseSection {
  items: readonly RoadmapItem[];
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "Note" | "Project" | "External";
  href: string;
  description?: string;
}

export interface ResourcesData extends BaseSection {
  items: readonly ResourceItem[];
}

export interface ProjectMetadataData {
  version?: string;
  lastUpdated?: string;
  author?: string;
}

export interface ProjectRoute {
  path: string;
  enabled: boolean;
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
  featured: boolean;
  route: ProjectRoute;
  hero: ProjectHeroData;
  executiveSummary?: ExecutiveSummaryData;
  problem?: ProblemStatementData;
  solution?: SolutionOverviewData;
  architecture?: ArchitectureSectionData;
  techStack?: TechStackData;
  decisions?: DecisionsData;
  challenges?: ChallengesData;
  results?: ResultsData;
  lessons?: LessonsData;
  roadmap?: RoadmapData;
  resources?: ResourcesData;
  metadata?: ProjectMetadataData;
}
