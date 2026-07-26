export interface SkillItem {
  id: string;
  label: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: readonly SkillItem[];
}

export interface SkillsContent {
  id: string;
  label: string;
  title: string;
  introduction: string;
  groups: readonly SkillGroup[];
}
