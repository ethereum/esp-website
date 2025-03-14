import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;
const MIN_TEXT_AREA_LENGTH = 500;

export const DataChallengeSchema = z.object({
  firstName: stringFieldSchema('First name', { min: 1, max: 40 }).refine(
    value => !containURL(value),
    'First name cannot contain a URL'
  ),
  lastName: stringFieldSchema('Last name', { min: 1, max: 80 }).refine(
    value => !containURL(value),
    'Last name cannot contain a URL'
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  POCisAuthorisedSignatory: z.boolean(),
  authorisedSignatoryInformation: stringFieldSchema('Authorised signatory information', {
    max: MAX_TEXT_LENGTH
  }).optional(),
  applyingAs: z.string().min(1, 'Please select in which capacity you are applying.'),
  applyingAsOther: stringFieldSchema('Field', { max: MAX_TEXT_LENGTH }).optional(),
  company: stringFieldSchema('Organization', { min: 1, max: MAX_TEXT_LENGTH }).refine(
    value => !containURL(value),
    'Organization cannot contain a URL'
  ),
  country: stringFieldSchema('Country', { min: 1 }),
  timezone: stringFieldSchema('Time zone', { min: 1 }),
  countriesTeam: stringFieldSchema('Countries of team', { min: 1 }).optional(),
  projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
  website: stringFieldSchema('Blog post', { min: 1, max: MAX_TEXT_LENGTH }),
  projectDescription: stringFieldSchema('Project summary', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  projectRepoLink: z.string().optional(),
  projectCategory: stringFieldSchema('Project category', { min: 1 }),
  referralSource: stringFieldSchema('Referral source', { min: 1 }),
  referralSourceIfOther: stringFieldSchema('Field', { max: MAX_TEXT_LENGTH }).optional(),
  linkedin: stringFieldSchema('LinkedIn handle', { max: 40 }).optional(),
  twitter: stringFieldSchema('Twitter handle', { max: 40 }).optional(),
  alternativeContact: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
  repeatApplicant: z.boolean(),
  canTheEFReachOut: z.boolean(),
  additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

export type DataChallengeData = z.infer<typeof DataChallengeSchema>;
