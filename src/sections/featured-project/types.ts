export interface CaseStudyTextBlock {
  id: string;
  label: string;
  title: string;
  body: string;
}

export interface CaseStudyPipelineStep {
  id: string;
  label: string;
}

export interface CaseStudyDecision {
  id: string;
  decision: string;
  reason: string;
  tradeoff: string;
}

export interface CaseStudyEvidenceItem {
  id: string;
  label: string;
  value: string;
  href?: string;
}

export interface CaseStudyContent {
  id: string;
  label: string;
  name: string;
  summary: string;
  narrativeBlocks: readonly CaseStudyTextBlock[];
  architecturePreview: CaseStudyTextBlock;
  pipeline: {
    label: string;
    steps: readonly CaseStudyPipelineStep[];
  };
  decisions: {
    label: string;
    items: readonly CaseStudyDecision[];
  };
  status: CaseStudyTextBlock;
  futureWork: CaseStudyTextBlock;
  evidenceRail: readonly CaseStudyEvidenceItem[];
}

