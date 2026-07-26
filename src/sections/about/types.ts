export interface AboutHighlight {
  id: string;
  label: string;
  detail?: string;
}

export interface AboutContent {
  id: string;
  label: string;
  title: string;
  introduction: string;
  narrative: string;
  profile: {
    role: {
      label: string;
      value: string;
    };
    education: {
      label: string;
      value: string;
    };
    location: {
      label: string;
      value: string;
    };
    interestsLabel: string;
    interests: readonly string[];
  };
  highlightsLabel: string;
  highlights: readonly AboutHighlight[];
}
