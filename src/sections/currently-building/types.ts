export interface BuildStage {
  id: string;
  label: string;
  state: "complete" | "active" | "upcoming";
}

export interface FutureReadingItem {
  id: string;
  label: string;
  href?: string;
}

export interface CurrentlyBuildingContent {
  id: string;
  title: string;
  focusLabel: string;
  focus: string;
  systemLabel: string;
  system: string;
  stageLabel: string;
  stages: readonly BuildStage[];
  futureReadingLabel: string;
  futureReading: readonly FutureReadingItem[];
}

