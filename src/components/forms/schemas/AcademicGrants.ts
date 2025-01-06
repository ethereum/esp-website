import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;
const MIN_TEXT_AREA_LENGTH = 500;

export const AcademicGrantsSchema = z
  .object({
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
    applyingAs: z
      .string({ required_error: 'Please select in which capacity you are applying' })
      .min(1, 'Please select in which capacity you are applying'),
    applyingAsOther: stringFieldSchema('Field', { max: MAX_TEXT_LENGTH }).optional(),
    company: stringFieldSchema('Organization', { min: 1, max: MAX_TEXT_LENGTH }).refine(
      value => !containURL(value),
      'Organization cannot contain a URL'
    ),
    country: stringFieldSchema('Country', { min: 1 }),
    countriesTeam: stringFieldSchema('Countries of team', { min: 1 }).optional(),
    timezone: stringFieldSchema('Time zone', { min: 1 }),
    projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
    projectDescription: stringFieldSchema('Project description', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    projectCategory: stringFieldSchema('Project category', { min: 1 }),
    teamProfile: stringFieldSchema('Team profile', { min: 1, max: MAX_TEXT_LENGTH }),
    grantScope: stringFieldSchema('Grant scope', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    previousWork: stringFieldSchema('Previous work', { min: 1, max: MAX_TEXT_LENGTH }),
    impact: stringFieldSchema('Project goals', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    problemBeingSolved: stringFieldSchema('Field', {
      min: 1,
      max: MAX_TEXT_AREA_LENGTH
    }),
    isYourProjectPublicGood: stringFieldSchema('Field', {
      min: 1,
      max: MAX_TEXT_AREA_LENGTH
    }),
    requestAmount: stringFieldSchema('Total budget', { min: 1, max: 20 }),
    proposedTimeline: stringFieldSchema('Field', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    challenges: stringFieldSchema('Challenges', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    additionalSupportReq: stringFieldSchema('Additional support required', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    referralSource: stringFieldSchema('Referral source', { min: 1 }),
    referralSourceIfOther: stringFieldSchema('Field', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    shareResearch: stringFieldSchema('Share research', { min: 1 }),
    linkedinProfile: stringFieldSchema('LinkedIn profiles', { max: MAX_TEXT_LENGTH }).optional(),
    twitter: stringFieldSchema('Twitter handle', { max: 16 }).optional(),
    alternativeContact: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
    repeatApplicant: z.boolean(),
    canTheEFReachOut: z.boolean().optional(),
    additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    captchaToken: stringFieldSchema('Captcha', { min: 1 })
  })
  .refine(
    data =>
      data.POCisAuthorisedSignatory ||
      (!data.POCisAuthorisedSignatory && data.authorisedSignatoryInformation),
    {
      message: `Authorised signatory information is required`,
      path: ['authorisedSignatoryInformation']
    }
  );

export type AcademicGrantsData = z.infer<typeof AcademicGrantsSchema>;
