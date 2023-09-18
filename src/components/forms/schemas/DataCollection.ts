import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 32768;
const MIN_TEXT_AREA_LENGTH = 500;

export const DataCollectionSchema = z.object({
  firstName: stringFieldSchema('First name', { min: 1, max: 40 }).refine(
    value => !containURL(value),
    'First name cannot contain a URL'
  ),
  lastName: stringFieldSchema('Last name', { min: 1, max: 80 }).refine(
    value => !containURL(value),
    'Last name cannot contain a URL'
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  // TODO: add Title
  applyingAs: z.string().min(1, 'Please select in which capacity you are applying.'),
  company: stringFieldSchema('Organization', { min: 1, max: MAX_TEXT_LENGTH }).refine(
    value => !containURL(value),
    'Organization cannot contain a URL'
  ),
  applyingAsOther: stringFieldSchema('Field', { max: MAX_TEXT_LENGTH }).optional(),
  country: stringFieldSchema('Country', { min: 1 }),
  // TODO: add Countries of Team
  timezone: stringFieldSchema('Time zone', { min: 1 }),
  projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
  projectDescription: stringFieldSchema('Project description', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  projectCategory: stringFieldSchema('Project category', { min: 1 }),
  requestAmount: stringFieldSchema('Total amount', { max: 20 }).optional(),
  // TODO: add Project Repo (Github_Link__c)
  // TODO: add Proposal Attachment URL
  // TODO: add Would you share your research?
  // TODO: add Website
  twitter: stringFieldSchema('Twitter handle', { max: 16 }).optional(),
  // TODO: add Github Username
  alternativeContact: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
  repeatApplicant: z.boolean(),
  canTheEFReachOut: z.boolean().optional(),
  additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
  referralSource: stringFieldSchema('Referral source', { min: 1 }),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

export type DataCollectionData = z.infer<typeof DataCollectionSchema>;
