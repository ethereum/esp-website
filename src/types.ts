import {
  COUNTRY_OPTIONS,
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

export interface ProposalFile {
  name: string;
  type: string;
  content: string;
  path: string;
}

export type ProjectGrantsFormData = {
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  company: string; // SF API: Company
  projectName: string; // SF API: Project_Name__c
  website: string; // SF API: Website
  github: string; // SF API: Github_Link__c
  twitter: string; // SF API: Twitter__c
  teamProfile: string; // SF API: Team_Profile__c
  projectDescription: string; // SF API: Project_Description__c
  projectCategory: ProjectCategory; // SF API: Project_Category__c
  requestedAmount: string; // SF API: Requested_Amount__c
  city: string; // SF API: npsp__CompanyCity__c
  country: Country; // SF API: npsp__CompanyCountry__c
  timezone: Timezone; // SF API: Time_Zone__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
  referralSourceIfOther: string; // SF API: Referral_Source_if_Other__c
  referrals: string; // SF API: Referrals__c
  uploadProposal: ProposalFile;
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

export type Country = typeof COUNTRY_OPTIONS[number];

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
