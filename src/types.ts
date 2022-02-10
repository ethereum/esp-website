import {
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  PROJECT_CATEGORY_OPTIONS,
  REASONS_FOR_MEETING,
  TIMEZONE_OPTIONS
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

export interface OfficeHoursFormData {
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  individualOrTeam: IndividualOrTeam; // SF API: Individual_or_Team__c
  company: string; // SF API: Company
  projectName: string; // SF API: Project_Name__c
  projectDescription: string; // SF API: Project_Description__c
  additionalInfo: string; // SF API: Additional_Information__c
  projectCategory: ProjectCategory; // SF API: Category__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
  reasonForMeeting: ReasonForMeeting; // SF API: Reason_for_meeting__c
  otherReasonForMeeting: string; // SF API: Reason_for_meeting_if_Other__c
  timezone: Timezone; // SF API: Time_Zone__c
}

export type IndividualOrTeam = 'Individual' | 'Team';

export type RepeatApplicant = 'Yes' | 'No';

export type ReasonForMeeting = typeof REASONS_FOR_MEETING;

export type ProjectCategory = typeof PROJECT_CATEGORY_OPTIONS[number];

export type ReferralSource = typeof HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS[number];

export type Timezone = typeof TIMEZONE_OPTIONS[number];

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
