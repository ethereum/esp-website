import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH, MIN_TEXT_AREA_LENGTH } from '../../../constants';

export const RFPSchema = z.object({
  // RFP Selection
  selectedRFPId: stringFieldSchema('RFP item', { min: 1 }),

  // Contact Information
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
  timezone: stringFieldSchema('Time zone', { min: 1 }),

  // Project Overview
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
  budgetRequest: z.number().positive(),
  currency: stringFieldSchema('Currency', { min: 1 }),

  // Additional Details
  repeatApplicant: z.boolean().default(false),
  referral: stringFieldSchema('Referral', { min: MIN_TEXT_AREA_LENGTH, max: MAX_TEXT_AREA_LENGTH }),
  additionalInfo: stringFieldSchema('Additional information', { max: MAX_TEXT_LENGTH }).optional(),
  opportunityOutreachConsent: z.boolean().default(true),

  // Required for submission
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

export type RFPData = z.infer<typeof RFPSchema>;

// Type for RFP items
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
