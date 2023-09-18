import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import { MAX_PROPOSAL_FILE_SIZE } from '../../../constants';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 32768;
const MIN_TEXT_AREA_LENGTH = 500;

const ACCEPTED_FILE_TYPES = ['application/pdf'];

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
  title: stringFieldSchema('Title', { min: 1, max: 128 }),
  applyingAs: z.string().min(1, 'Please select in which capacity you are applying.'),
  applyingAsOther: stringFieldSchema('Field', { max: MAX_TEXT_LENGTH }).optional(),
  company: stringFieldSchema('Organization', { min: 1, max: MAX_TEXT_LENGTH }).refine(
    value => !containURL(value),
    'Organization cannot contain a URL'
  ),
  country: stringFieldSchema('Country', { min: 1 }),
  timezone: stringFieldSchema('Time zone', { min: 1 }),
  countriesTeam: stringFieldSchema('Countries of team', { min: 1, max: MAX_TEXT_LENGTH }),
  projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
  projectDescription: stringFieldSchema('Project description', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  projectCategory: stringFieldSchema('Project category', { min: 1 }),
  requestAmount: stringFieldSchema('Total amount', { min: 1, max: 20 }),
  projectRepoLink: z.string().optional(),
  proposalAttachment: z
    .any()
    .refine(file => !!file, 'Proposal is required.')
    .refine(file => file?.size <= MAX_PROPOSAL_FILE_SIZE, `Max file size is 4MB.`)
    .refine(
      file => ACCEPTED_FILE_TYPES.includes(file?.type || file?.mimetype),
      'Only .pdf files are accepted.'
    ),
  shareResearch: z.string().optional(),
  website: stringFieldSchema('Website', { max: MAX_TEXT_LENGTH }).optional(),
  twitter: stringFieldSchema('Twitter handle', { max: 40 }).optional(),
  github: stringFieldSchema('Github handle', { max: 40 }).optional(),
  alternativeContact: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
  repeatApplicant: z.boolean(),
  canTheEFReachOut: z.boolean().optional(),
  additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
  referralSource: stringFieldSchema('Referral source', { min: 1 }),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

export type DataCollectionData = z.infer<typeof DataCollectionSchema>;
