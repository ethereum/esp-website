import { NextApiRequest } from 'next';
import {
  PROJECT_GRANTS_PROJECT_CATEGORY_OPTIONS,
  APPLYING_AS_OPTIONS,
  COUNTRY_OPTIONS,
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE,
  PROJECT_CATEGORY_OPTIONS,
  REASONS_FOR_MEETING,
  TIMEZONE_OPTIONS,
  WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS,
  ACADEMIC_GRANTS_PROJECT_CATEGORY_OPTIONS
} from './components/forms/constants';
import { ABOUT_URL, APPLICANTS_URL, ESP_BLOG_URL, HOME_URL } from './constants';

export interface TabsMap {
  [name: string]: number;
}

export interface CaptchaForm {
  captchaToken: string;
}

export type NewsletterFormData = {
  email: string;
};

export interface ProjectGrantsFormData extends CaptchaForm {
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  company: string; // SF API: Company
  projectName: string; // SF API: Project_Name__c
  website: string; // SF API: Website
  projectRepo: string; // SF API: Github_Link__c
  twitter: string; // SF API: Twitter__c
  teamProfile: string; // SF API: Team_Profile__c
  projectCategory: ProjectCategory; // SF API: Category__c
  projectDescription: string; // SF API: Project_Description__c
  progress: string; // SF API: Progress__c
  problemBeingSolved: string; // SF API: Problem_Being_Solved__c
  proposedTimeline: string; // SF API: Proposed_Timeline__c
  requestedAmount: string; // SF API: Requested_Amount__c
  whyIsProjectImportant: string; // SF API: Impact__c
  howDoesYourProjectDiffer: string; // SF API: How_is_it_different__c
  isYourProjectPublicGood: string; // SF API: Is_it_a_Public_Good__c
  isOpenSource: string; // SF API: Is_it_Open_Source__c
  whyEthereum: string; // SF API: Why_Ethereum__c
  challenges: string; // SF API: Challenges__c
  sustainabilityPlan: string; // SF API: Sustainability_Plan__c
  otherProjects: string; // SF API: Other_Projects__c
  repeatApplicant: string; // SF API: Repeat_Applicant__c
  otherFunding: string; // SF API: Other_Funding__c
  additionalInfo: string; // SF API: Additional_Information__c
  city: string; // SF API: npsp__CompanyCity__c
  country: Country; // SF API: npsp__CompanyCountry__c
  timezone: Timezone; // SF API: Time_Zone__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
  referralSourceIfOther: string; // SF API: Referral_Source_if_Other__c
  referrals: string; // SF API: Referrals__c
  uploadProposal: File;
}

export interface SmallGrantsFormData extends CaptchaForm {
  // General
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  individualOrTeam: IndividualOrTeam; // SF API: Individual_or_Team__c
  company: string; // SF API: Company
  city: string; // SF API: npsp__CompanyCity__c
  country: Country; // SF API: npsp__CompanyCountry__c
  website: string; // SF API: Website
  twitter: string; // SF API: Twitter__c
  projectCategory: ProjectCategory; // SF API: Category__c
  individualOrTeamSummary: string; // SF API: Team_Profile__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
  referrals: string; // SF API: Referrals__c
  additionalInfo: string; // SF API: Additional_Information__c
  // Project specific
  projectName: string; // SF API: Project_Name__c
  projectRepo: string; // SF API: Github_Link__c
  projectPreviousWork: string; // SF API: Previous_Work__c
  projectDescription: string; // SF API: Project_Description__c
  problemBeingSolved: string; // SF API: Problem_Being_Solved__c
  whyIsProjectImportant: string; // SF API: Impact__c
  howDoesYourProjectDiffer: string; // SF API: How_is_it_different__c
  projectRequestedAmount: string; // SF API: Requested_Amount__c
  proposedTimeline: string; // SF API: Proposed_Timeline__c
  isYourProjectPublicGood: string; // SF API: Is_it_a_Public_Good__c
  isOpenSource: string; // SF API: Is_it_Open_Source__c
  sustainabilityPlan: string; // SF API: Sustainability_Plan__c
  otherProjects: string; // SF API: Other_Projects__c
  repeatApplicant: string; // SF API: Repeat_Applicant__c
  progress: string; // SF API: Progress__c
  otherFunding: string; // SF API: Other_Funding__c
}

export interface CommunityEventsFormData extends CaptchaForm {
  // General
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  individualOrTeam: IndividualOrTeam; // SF API: Individual_or_Team__c
  company: string; // SF API: Company
  city: string; // SF API: npsp__CompanyCity__c
  country: Country; // SF API: npsp__CompanyCountry__c
  website: string; // SF API: Website
  twitter: string; // SF API: Twitter__c
  projectCategory: ProjectCategory; // SF API: Category__c // TODO: do we need it?
  individualOrTeamSummary: string; // SF API: Team_Profile__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
  referrals: string; // SF API: Referrals__c
  additionalInfo: string; // SF API: Additional_Information__c
  // Event specific
  eventName: string; // SF API: Project_Name__c
  eventDate: Date; // SF API: Sponsorship_Date__c
  eventPreviousWork: string; // SF API: Previous_Work__c
  sponsorshipLink: string; // SF API: Sponsorship_Link__c
  sponsorshipDetails: string; // SF API: Sponsorship_Details__c
  sponsorshipTopics: string; // SF API: Sponsorship_Request__c
  eventType: EventType; // SF API: Type_of_Event__c
  eventFormat: EventFormat; // SF API: In_Person__c
  expectedAttendees: number; // SF API: Estimated_Number_of_Attendees__c
  targetAudience: string; // SF API: Target_Audience__c
  confirmedSpeakers: string; // SF API: Confirmed_Speakers__c
  confirmedSponsors: string; // SF API: Confirmed_Sponsors__c
  eventBudgetBreakdown: string; // SF API: Proposed_Timeline__c
  eventRequestedAmount: string; // SF API: Sponsorship_Monetary_Request__c
}

export interface GranteeFinanceFormData extends CaptchaForm {
  // these fields map to SF's Contract object fields
  paymentPreference: PaymentPreference;
  beneficiaryName: string; // SF API: Beneficiary_Name__c
  contactEmail: string; // SF API: User_Email__c
  notes: string; // SF API: Transfer_Notes__c
  granteeSecurityID: string; // SF API: Contract_ID__c

  // ETH/DAI
  tokenPreference: TokenPreference;
  l2Payment: L2PaymentPreference; // SF API: Layer2_Payment__c

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
}

export interface OfficeHoursFormData extends CaptchaForm {
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  individualOrTeam: IndividualOrTeam; // SF API: Individual_or_Team__c
  company: string; // SF API: Company
  officeHoursRequest: OfficeHoursRequest; // SF API: Office_Hours_Request__c
  projectName: string; // SF API: Project_Name__c
  projectDescription: string; // SF API: Project_Description__c
  additionalInfo: string; // SF API: Additional_Information__c
  projectCategory: ProjectCategory; // SF API: Category__c
  otherReasonForMeeting: string; // SF API: Reason_for_meeting_if_Other__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
  timezone: Timezone; // SF API: Time_Zone__c
}

export interface DevconGrantsFormData extends CaptchaForm {
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  company: string; // SF API: Company
  eventPreviousWork: string; // SF API: Previous_Work__c
  teamProfile: string; // SF API: Team_Profile__c
  eventName: string; // SF API: Project_Name__c
  eventDate: Date; // SF API: Sponsorship_Date__c
  sponsorshipLink: string; // SF API: Sponsorship_Link__c
  sponsorshipDetails: string; // SF API: Sponsorship_Details__c
  projectDescription: string; // SF API: Project_Description__c
  eventType: EventType; // SF API: Type_of_Event__c
  eventFormat: EventFormat; // SF API: In_Person__c
  city: string; // SF API: npsp__CompanyCity__c
  twitter: string; // SF API: Twitter__c
  expectedAttendees: number; // SF API: Estimated_Number_of_Attendees__c
  targetAudience: string; // SF API: Target_Audience__c
  confirmedSpeakers: string; // SF API: Confirmed_Speakers__c
  confirmedSponsors: string; // SF API: Confirmed_Sponsors__c
  proposedTimeline: string; // SF API: Proposed_Timeline__c
  requestedAmount: string; // SF API: Requested_Amount__c
  additionalInfo: string; // SF API: Additional_Information__c
  howDidYouHearAboutESP: ReferralSource; // SF API: Referral_Source__c
}

export interface EcodevGrantsFormData extends CaptchaForm {
  firstName: string; // SF API: FirstName
  lastName: string; // SF API: LastName
  email: string; // SF API: Email
  company: string; // SF API: Company
  projectName: string; // SF API: Project_Name__c
  website: string; // SF API: Website
  projectRepo: string; // SF API: Github_Link__c
  twitter: string; // SF API: Twitter__c
  teamProfile: string; // SF API: Team_Profile__c
  projectCategory: ProjectCategory; // SF API: Category__c
  projectDescription: string; // SF API: Project_Description__c
  progress: string; // SF API: Progress__c
  problemBeingSolved: string; // SF API: Problem_Being_Solved__c
  proposedTimeline: string; // SF API: Proposed_Timeline__c
  requestedAmount: string; // SF API: Requested_Amount__c
  whyIsProjectImportant: string; // SF API: Impact__c
  howDoesYourProjectDiffer: string; // SF API: How_is_it_different__c
  isYourProjectPublicGood: string; // SF API: Is_it_a_Public_Good__c
  isOpenSource: string; // SF API: Is_it_Open_Source__c
  whyEthereum: string; // SF API: Why_Ethereum__c
  challenges: string; // SF API: Challenges__c
  sustainabilityPlan: string; // SF API: Sustainability_Plan__c
  otherProjects: string; // SF API: Other_Projects__c
  repeatApplicant: string; // SF API: Repeat_Applicant__c
  otherFunding: string; // SF API: Other_Funding__c
  additionalInfo: string; // SF API: Additional_Information__c
  city: string; // SF API: npsp__CompanyCity__c
  country: Country; // SF API: npsp__CompanyCountry__c
  timezone: Timezone; // SF API: Time_Zone__c
  referrals: string; // SF API: Referrals__c
  uploadProposal: File;
}

export type IndividualOrTeam = 'Individual' | 'Team';

export type OfficeHoursRequest = 'Project feedback' | 'Advice';

export type RepeatApplicant = 'Yes' | 'No';

export type L2PaymentPreference = RepeatApplicant;

export type PaymentPreference = 'ETH/DAI' | 'Fiat' | '';

export type TokenPreference = 'ETH' | 'DAI';

export type ReasonForMeeting = typeof REASONS_FOR_MEETING;

export type ProjectCategory = typeof PROJECT_CATEGORY_OPTIONS[number];

export type AcademicGrantsProjectCategory = typeof ACADEMIC_GRANTS_PROJECT_CATEGORY_OPTIONS[number];

export type ProjectGrantsProjectCategory = typeof PROJECT_GRANTS_PROJECT_CATEGORY_OPTIONS[number];

export type EventType = typeof EVENT_TYPE_OPTIONS[number];

export type EventFormat = typeof EVENT_FORMAT_OPTIONS[number];

export type WouldYouShareYourResearch = typeof WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS[number];

export type Country = typeof COUNTRY_OPTIONS[number];

export type ReferralSource = typeof HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS[number];

export type GrantsReferralSource = typeof HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE[number];

export type Timezone = typeof TIMEZONE_OPTIONS[number];

export type ApplyingAs = typeof APPLYING_AS_OPTIONS[number];

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

// body request data types
export interface OfficeHoursNextApiRequest extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    individualOrTeam: string;
    company: string;
    officeHoursRequest: string;
    projectName: string;
    projectDescription: string;
    additionalInfo: string;
    projectCategory: string;
    otherReasonForMeeting: string;
    howDidYouHearAboutESP: string;
    timezone: string;
  };
}

export interface GranteeFinanceNextApiRequest extends NextApiRequest {
  body: {
    beneficiaryName: string;
    contactEmail: string;
    notes: string;
    ethAddress: string;
    daiAddress: string;
    beneficiaryAddress: string;
    fiatCurrencyCode: string;
    bankName: string;
    bankAddress: string;
    IBAN: string;
    SWIFTCode: string;
    granteeSecurityID: string;
    l2Payment: boolean;
  };
}

export interface DevconGrantsNextApiRequest extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    eventPreviousWork: string;
    teamProfile: string;
    eventName: string;
    eventDate: string;
    sponsorshipLink: string;
    sponsorshipDetails: string;
    projectDescription: string;
    eventType: string;
    eventFormat: string;
    city: string;
    twitter: string;
    expectedAttendees: string;
    targetAudience: string;
    confirmedSpeakers: string;
    confirmedSponsors: string;
    proposedTimeline: string;
    requestedAmount: string;
    additionalInfo: string;
    howDidYouHearAboutESP: string;
  };
}

export interface SmallGrantsEventNextApiRequest extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    individualOrTeam: string;
    company: string;
    city: string;
    country: string;
    website: string;
    twitter: string;
    projectCategory: string;
    individualOrTeamSummary: string;
    howDidYouHearAboutESP: string;
    referrals: string;
    additionalInfo: string;
    eventName: string;
    eventDate: string;
    eventPreviousWork: string;
    sponsorshipLink: string;
    sponsorshipDetails: string;
    sponsorshipTopics: string;
    eventType: string;
    eventFormat: string;
    expectedAttendees: string;
    targetAudience: string;
    confirmedSpeakers: string;
    confirmedSponsors: string;
    eventBudgetBreakdown: string;
    eventRequestedAmount: string;
  };
}

export interface SmallGrantsProjectNextApiRequest extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    individualOrTeam: string;
    company: string;
    city: string;
    country: string;
    website: string;
    twitter: string;
    projectCategory: string;
    individualOrTeamSummary: string;
    howDidYouHearAboutESP: string;
    referrals: string;
    additionalInfo: string;
    projectName: string;
    projectRepo: string;
    projectPreviousWork: string;
    projectDescription: string;
    problemBeingSolved: string;
    whyIsProjectImportant: string;
    howDoesYourProjectDiffer: string;
    projectRequestedAmount: string;
    proposedTimeline: string;
    isYourProjectPublicGood: string;
    isOpenSource: string;
    sustainabilityPlan: string;
    otherProjects: string;
    repeatApplicant: boolean;
    progress: string;
    otherFunding: string;
  };
}
