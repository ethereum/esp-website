import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH, MIN_TEXT_AREA_LENGTH } from '../../../constants';

// Shared field schemas
const contactInformationSchema = {
  firstName: stringFieldSchema('First name', { min: 1, max: 20 }).refine(
    value => !containURL(value),
    'First name cannot contain a URL'
  ),
  lastName: stringFieldSchema('Last name', { min: 1, max: 20 }).refine(
    value => !containURL(value),
    'Last name cannot contain a URL'
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  company: stringFieldSchema('Company', { min: 1, max: 50 }),
  profileType: z.enum([
    'Individual',
    'Team',
    'Company',
    'Organization',
    'University',
    'Consortium of Universities',
    'Research Center',
    'Other'
  ]),
  otherProfileType: stringFieldSchema('Other profile type', { max: 50 }).optional(),
  alternativeContact: stringFieldSchema('Alternative contact', { max: 50 }).optional(),
  website: stringFieldSchema('Website', { max: MAX_TEXT_LENGTH })
    .url({ message: 'Invalid URL' })
    .optional()
    .or(z.literal('')),
  country: stringFieldSchema('Country', { min: 1, max: 2 }), // 2 character country code
  timezone: stringFieldSchema('Time zone', { min: 1 })
};

const projectOverviewSchema = {
  projectName: stringFieldSchema('Project name', { min: 1, max: 80 }),
  projectSummary: stringFieldSchema('Project summary', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  fileUpload: z
    .instanceof(File, { message: 'PDF proposal is required' })
    .refine(file => file.type === 'application/pdf', 'File must be a PDF'),
  projectRepo: stringFieldSchema('Project repo', { max: MAX_TEXT_LENGTH })
    .url({ message: 'Invalid URL' })
    .optional()
    .or(z.literal('')),
  domain: z.enum([
    'Application layer',
    'Cryptography',
    'DAOs/Governance',
    'Decentralized Identity',
    'DeFi',
    'Economics',
    'Ethereum Protocol',
    'Government',
    'Layer 2',
    'NFTs / Digital Art',
    'Nodes and Clients',
    'Privacy',
    'Security',
    'Society and Regulatory',
    'UX/UI',
    'Zero-knowledge Proofs',
    'Other'
  ]),
  output: z.enum([
    'Application',
    'Dashboard',
    'Developer tooling',
    'Ecosystem development',
    'Research'
  ]),
  budgetRequest: z.coerce.number().positive(),
  currency: stringFieldSchema('Currency', { min: 1 })
};

const projectDetailsSchema = {
  projectStructure: stringFieldSchema('Project structure', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  sustainabilityPlan: stringFieldSchema('Sustainability plan', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  funding: stringFieldSchema('Other funding', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  problemBeingSolved: stringFieldSchema('Problem being solved', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  measuredImpact: stringFieldSchema('Measured impact', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  successMetrics: stringFieldSchema('Success metrics', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  ecosystemFit: stringFieldSchema('Ecosystem fit', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  communityFeedback: stringFieldSchema('Community feedback', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  openSourceLicense: stringFieldSchema('Open source license', {
    min: 1,
    max: MAX_TEXT_LENGTH
  }),
  applicantProfile: stringFieldSchema('Applicant profile', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  })
};

const additionalDetailsSchema = {
  repeatApplicant: z.boolean().default(false),
  referral: stringFieldSchema('Referral', { min: 1, max: MAX_TEXT_LENGTH }),
  additionalInfo: stringFieldSchema('Additional information', { max: MAX_TEXT_LENGTH }).optional(),
  opportunityOutreachConsent: z.boolean().default(true)
};

const requiredSchema = {
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
};

// Full base schema with all possible fields
export const BaseGrantSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});

// Schema for Wishlist forms (includes project details)
export const WishlistSchema = z.object({
  selectedWishlistId: stringFieldSchema('Wishlist item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});

// Schema for RFP forms (excludes project details)
export const RFPSchema = z.object({
  selectedRFPId: stringFieldSchema('RFP item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});

// Export individual schema sections for form composition
export {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
};

// Export types
export type BaseGrantData = z.infer<typeof BaseGrantSchema>;
export type WishlistData = z.infer<typeof WishlistSchema>;
export type RFPData = z.infer<typeof RFPSchema>;

// Form configuration types
export interface FormConfig {
  includeProjectDetails: boolean;
  formId: string;
  submitApiEndpoint: 'wishlist' | 'rfp';
  thankYouPageUrl: string;
  selectedItemIdField: 'selectedWishlistId' | 'selectedRFPId';
  selectedItemDisplayText: string;
}

// Item types (keeping existing interfaces)
export interface WishlistItem {
  Id: string;
  Name: string;
  Description__c: string;
  Category__c?: string;
  Priority__c?: string;
  Expected_Deliverables__c?: string;
  Skills_Required__c?: string;
  Estimated_Effort__c?: string;
}

export interface RFPItem {
  Id: string;
  Name: string;
  Description__c: string;
  Category__c?: string;
  Priority__c?: string;
  Expected_Deliverables__c?: string;
  Skills_Required__c?: string;
  Estimated_Effort__c?: string;
  Requirements__c?: string;
}
