import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;
const MIN_TEXT_AREA_LENGTH = 500;

export const PSESchema = z
  .object({
    projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
    projectOverview: stringFieldSchema('Project overview', { min: 1, max: MAX_TEXT_LENGTH }),
    impact: stringFieldSchema('Impact', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    projectDescription: stringFieldSchema('Project description', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    projectCategory: stringFieldSchema('Project category', { min: 1 }),
    isOpenSource: z.boolean(),
    openSourceDetails: z.string().optional(),
    challenges: stringFieldSchema('Challenges', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    proposalAttachment: z.string().url({ message: 'Invalid URL' }).optional(),
    projectRepoLink: stringFieldSchema('Project repo link', { min: 1 }).url({
      message: 'Invalid URL'
    }),

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
    company: stringFieldSchema('Company', { max: MAX_TEXT_LENGTH }).optional(),
    discord: stringFieldSchema('Discord', { max: 60 }),
    alternativeContact: stringFieldSchema('Alternative contact', { max: 150 }).optional(),
    website: stringFieldSchema('Website', { min: 1 }).url({
      message: 'Invalid URL'
    }),
    country: stringFieldSchema('Country', { min: 1 }),
    countriesOfTeam: stringFieldSchema('Countries of team', { min: 1 }).optional(),
    timezone: stringFieldSchema('Time zone', { min: 1 }),

    // Development Roadmap
    proposedTimeline: stringFieldSchema('Roadmap overview', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    progress: stringFieldSchema('Roadmap milestones', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    requestedAmount: stringFieldSchema('Total budget', { min: 1, max: 20 }),

    // Additional Information
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
