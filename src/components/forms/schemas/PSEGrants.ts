import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;
const MIN_TEXT_AREA_LENGTH = 500;

export const PSESchema = z
  .object({
    projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
    impact: stringFieldSchema('Rationale', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    projectDescription: stringFieldSchema('Project description', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    isOpenSource: z.boolean(),
    openSourceDetails: z.string().optional(),
    proposalAttachment: z.union([z.literal(''), z.string().trim().url({ message: 'Invalid URL' })]),
    projectRepoLink: stringFieldSchema('Project repository', { min: 1 }).url({
      message: 'Invalid URL'
    }),
    requestedAmount: stringFieldSchema('Total budget', { min: 1, max: 20 }),

    // Applicant Details
    firstName: stringFieldSchema('First name', { min: 1, max: 40 }).refine(
      value => !containURL(value),
      'First name cannot contain a URL'
    ),
    lastName: stringFieldSchema('Last name', { min: 1, max: 80 }).refine(
      value => !containURL(value),
      'Last name cannot contain a URL'
    ),
    email: z.string().email({ message: 'Invalid email address' }),
    company: stringFieldSchema('Organization', { max: MAX_TEXT_LENGTH })
      .refine(value => !containURL(value), 'Organization cannot contain a URL')
      .optional(),
    discord: stringFieldSchema('Discord', { max: 60 }),
    twitter: stringFieldSchema('Twitter', { max: 40 }).optional(),
    alternativeContact: stringFieldSchema('Notion account', { max: 150 }).optional(),
    companyCity: stringFieldSchema('Company city', { min: 1, max: MAX_TEXT_LENGTH }),
    website: stringFieldSchema('Website', { min: 1 }).url({
      message: 'Invalid URL'
    }),
    country: stringFieldSchema('Country', { min: 1 }),
    countriesOfTeam: z.string().optional(),
    timezone: stringFieldSchema('Time zone', { min: 1 }),

    // Additional Information
    relatedPSEProject: stringFieldSchema('Related PSE project', { min: 1, max: MAX_TEXT_LENGTH }),
    referrals: stringFieldSchema('Field', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    sustainabilityPlan: stringFieldSchema('Field', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    otherProjects: stringFieldSchema('Field', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    repeatApplicant: z.boolean(),
    additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    captchaToken: stringFieldSchema('Captcha', { min: 1 })
  })
  .refine(
    data => {
      if (data.isOpenSource && (!data.openSourceDetails || data.openSourceDetails.trim() === '')) {
        return false;
      }
      return true;
    },
    {
      message: 'Open source details is required',
      path: ['openSourceDetails']
    }
  );

export type PSEData = z.infer<typeof PSESchema>;
