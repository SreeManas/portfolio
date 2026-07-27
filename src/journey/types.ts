export type JourneyFilter =
  | "All"
  | "Projects"
  | "Leadership"
  | "Hackathons"
  | "Education"
  | "Awards"
  | "Learning";

export type JourneyTimelineCategory = Exclude<JourneyFilter, "All">;

export type JourneyIconName =
  | "compass"
  | "code"
  | "people"
  | "flag"
  | "award"
  | "building"
  | "notes"
  | "spark"
  | "health"
  | "tools"
  | "research"
  | "human";

export interface JourneyFocusArea {
  id: string;
  title: string;
  description: string;
  icon: JourneyIconName;
}

export interface JourneyTimelineItem {
  id: string;
  year: string;
  title: string;
  category: JourneyTimelineCategory;
  summary: string;
  details: string;
  icon: JourneyIconName;
}

export interface JourneyLeadershipItem {
  id: string;
  role: string;
  organisation: string;
  duration: string;
  responsibilities: readonly string[];
  takeaway: string;
}

export interface JourneyHackathonItem {
  id: string;
  event: string;
  date: string;
  achievement: string;
  technologies: readonly string[];
  lesson: string;
}

export interface JourneyProjectMilestone {
  id: string;
  title: string;
  year: string;
  summary: string;
  href?: string;
  status: string;
}

export interface JourneyCredential {
  id: string;
  provider: string;
  title: string;
  year: string;
  status: string;
}

export interface JourneyAchievement {
  id: string;
  title: string;
  context: string;
  detail: string;
}

export interface JourneyStatistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface JourneyNextItem {
  id: string;
  title: string;
  description: string;
}

export interface JourneyExperienceContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    scrollLabel: string;
  };
  mission: {
    label: string;
    title: string;
    introduction: string;
    focusAreas: readonly JourneyFocusArea[];
  };
  timeline: {
    label: string;
    title: string;
    introduction: string;
    filters: readonly JourneyFilter[];
    items: readonly JourneyTimelineItem[];
  };
  leadership: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyLeadershipItem[];
  };
  hackathons: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyHackathonItem[];
  };
  projects: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyProjectMilestone[];
  };
  credentials: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyCredential[];
  };
  achievements: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyAchievement[];
  };
  statistics: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyStatistic[];
  };
  next: {
    label: string;
    title: string;
    introduction: string;
    items: readonly JourneyNextItem[];
  };
  cta: {
    label: string;
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}
