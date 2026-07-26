export interface ContactLink {
  id: string;
  label: string;
  href: string;
}

export interface ContactContent {
  id: string;
  label: string;
  title: string;
  introduction: string;
  links: readonly ContactLink[];
  socialLinks?: readonly ContactLink[];
}
