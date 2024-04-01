import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;
const MIN_TEXT_AREA_LENGTH = 500;

export const EPFSchema = z.object({
  firstName: stringFieldSchema('First name', { min: 1, max: 40 }).refine(
    value => !containURL(value),
    'First name cannot contain a URL'
  ),
  lastName: stringFieldSchema('Last name', { min: 1, max: 80 }).refine(
    value => !containURL(value),
    'Last name cannot contain a URL'
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  individualOrTeam: stringFieldSchema(
    'Please select whether you are applying as an individual or a team.',
    { min: 1, max: MAX_TEXT_LENGTH }
  ),
  teamProfile: stringFieldSchema('Team profile', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  city: stringFieldSchema('City', { max: MAX_TEXT_LENGTH }).optional(),
  country: stringFieldSchema('Country', { min: 1 }),
  timezone: stringFieldSchema('Time zone', { min: 1 }),
  referralSourceIfOther: stringFieldSchema('EPF cohort', { min: 1, max: MAX_TEXT_LENGTH }),
  referralSource: stringFieldSchema('EPF referral', {
    max: MAX_TEXT_LENGTH
  }).optional(),
  projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
  projectDescription: stringFieldSchema('Project summary', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  projectRepoLink: z.string().url({ message: 'Invalid URL' }),
  projectCategory: stringFieldSchema('Project category', { min: 1 }),
  requestedAmount: stringFieldSchema('Budget request', { min: 1, max: 20 }),
  proposedTimeline: stringFieldSchema('Proposed timeline', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  progress: stringFieldSchema('Progress', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  problemBeingSolved: stringFieldSchema('Problem being solved', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  sustainabilityPlan: stringFieldSchema('Sustainability plan', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  impact: stringFieldSchema('Impact', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  alternativeContact: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
  repeatApplicant: z.boolean(),
  additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

export type EPFData = z.infer<typeof EPFSchema>;
