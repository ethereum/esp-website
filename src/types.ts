import { PROJECT_CATEGORY_OPTIONS, REASONS_FOR_MEETING } from './components/forms/constants';

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

export type OfficeHoursFormData = {
  firstName: string;
  lastName: string;
  email: string;
  individualOrTeam: string;
  company: string;
  projectName: string;
  projectSummary: string;
  additionalInfo: string;
  projectCategory: string;
  howDidYouHearAboutESP: string;
  reasonForMeeting: string;
  otherReasonForMeeting: string;
  timezone: string;
};

export type IndividualOrTeam = 'Individual' | 'Team';

export type ReasonForMeeting = typeof REASONS_FOR_MEETING;

// const PROJECT_CATEGORIES = PROJECT_CATEGORY_OPTIONS.map(({ label }) => label);
export type ProjectCategory = typeof PROJECT_CATEGORY_OPTIONS[number];
