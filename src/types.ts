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

export type GranteeFinanceFormData = {
  // these fields map to SF's Contract object fields
  paymentPreference: PaymentPreference;
  beneficiaryName: string; // SF API: Beneficiary_Name__c
  contactEmail: string; // SF API: User_Email__c
  notes: string; // SF API: Transfer_Notes__c
  granteeSecurityID: string; // SF API: Contract_ID__c

  // ETH/DAI
  tokenPreference: TokenPreference;

  // ETH
  ethAddress: string; // SF API: ETH_Address__c

  // DAI
  daiAddress: string; // SF API: DAI_Address__c

  // FIAT
  beneficiaryAddress: string; // SF API: Beneficiary_Address__c
  fiatCurrencyCode: string; // SF API: Fiat_Currency__c
  bankName: string; // SF API: Bank_Name__c
  bankAddress: string; // SF API: Bank_Address__c
  IBAN: string; // SF API: IBAN_Account_Number__c
  SWIFTCode: string; // SF API: SWIFT_Code_BIC__c
};

export type IndividualOrTeam = 'Individual' | 'Team';

export type RepeatApplicant = 'Yes' | 'No';

export type PaymentPreference = 'ETH/DAI' | 'Fiat' | '';

export type TokenPreference = 'ETH' | 'DAI';

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
