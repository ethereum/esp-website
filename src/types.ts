export interface TabsMap {
  [name: string]: number;
}

export type NewsletterFormData = {
  email: string;
};

export type ProjectGrantsFormData = {
  projectName: string;
  organizationName: string;
  website: string;
  github: string;
  twitter: string;
  teamProfile: string;
  projectSummary: string;
  projectCategory: string;
  requestedAmount: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  timezone: string;
  howDidYouHearAboutESP: string;
  recommendation: string;
};
