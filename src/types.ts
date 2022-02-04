import {
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  PROJECT_CATEGORY_OPTIONS,
  REASONS_FOR_MEETING
} from './components/forms/constants';
import { ABOUT_URL, APPLICANTS_URL, ESP_BLOG_URL, HOME_URL } from './constants';

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

export type RepeatApplicant = 'Yes' | 'No';

export type ReasonForMeeting = typeof REASONS_FOR_MEETING;

export type ProjectCategory = typeof PROJECT_CATEGORY_OPTIONS[number];

export type ReferralSource = typeof HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS[number];

export type Href = typeof HOME_URL | typeof APPLICANTS_URL | typeof ABOUT_URL | typeof ESP_BLOG_URL;

export interface NavLink {
  href: Href;
  text: string;
}

export interface Grant {
  Quarter: string;
  Category: string;
  Project: string;
  Recipient: string;
  Description: string;
  Twitter: string;
}

export interface SidebarLink {
  text: string;
  href: string;
}
