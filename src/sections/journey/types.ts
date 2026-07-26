export interface JourneyLink {
  label: string;
  href: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  links?: readonly JourneyLink[];
}

export interface JourneyContent {
  id: string;
  label: string;
  title: string;
  introduction: string;
  milestones: readonly JourneyMilestone[];
}
