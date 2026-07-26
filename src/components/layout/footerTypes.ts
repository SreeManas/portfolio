export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterContent {
  copyright: string;
  navigationLabel: string;
  navigation: readonly FooterLink[];
  socialLabel: string;
  socialLinks: readonly FooterLink[];
  versionLabel: string;
  version: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
}
