import * as z from 'zod';

import { containURL } from '../../../utils';
import { CUSTOM_BUILD, DAPPNODE } from '../constants';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 32768;
const MIN_TEXT_AREA_LENGTH = 500;

const stringFieldSchema = (fieldName: string, { min, max }: { min?: number; max?: number }) => {
  let fieldSchema = z.string({ required_error: `${fieldName} is required` });

  if (min) {
    fieldSchema = fieldSchema.min(
      min,
      min > 1
        ? `${fieldName} must contain at least ${min} character(s)
    `
        : `${fieldName} is required`
    );
  }

  if (max) {
    fieldSchema = fieldSchema.max(max, `${fieldName} cannot exceed ${max} characters`);
  }

  return fieldSchema;
};

export const schema = z
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
    applyingAs: z.string().min(1, 'Please select in which capacity you are applying.'),
    applyingAsOther: stringFieldSchema('Field', { max: MAX_TEXT_LENGTH }).optional(),
    teamProfile: stringFieldSchema('Team profile', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    timezone: stringFieldSchema('Time zone', { min: 1 }),
    country: stringFieldSchema('Country', { min: 1 }),
    projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
    company: stringFieldSchema('Organization', { min: 1, max: MAX_TEXT_LENGTH }).refine(
      value => !containURL(value),
      'Organization cannot contain a URL'
    ),
    projectDescription: stringFieldSchema('Project description', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    projectPreviousWork: stringFieldSchema('Previous work', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    whyIsProjectImportant: stringFieldSchema('Proposed impact', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    hardware: stringFieldSchema('Hardware', { min: 1 }),
    customBuildDetail: stringFieldSchema('Custom build detail', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    downloadSpeed: stringFieldSchema('Download speed', { min: 1 }),
    dataLimitations: stringFieldSchema('Data limitations', { min: 1 }),
    commitment: stringFieldSchema('Commitment', { min: 1 }),
    challenges: stringFieldSchema('Challenges', {
      min: MIN_TEXT_AREA_LENGTH,
      max: MAX_TEXT_AREA_LENGTH
    }),
    referralSource: stringFieldSchema('Referral source', { min: 1 }),
    referralSourceIfOther: stringFieldSchema('Field', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    telegram: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
    twitter: stringFieldSchema('Twitter handle', { max: 16 }).optional(),
    linkedinProfile: stringFieldSchema('LinkedIn profiles', { max: MAX_TEXT_LENGTH }).optional(),
    repeatApplicant: z.boolean(),
    canTheEFReachOut: z.boolean().optional(),
    additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    captchaToken: stringFieldSchema('Captcha', { min: 1 })
  })
  .refine(data => data.hardware === CUSTOM_BUILD && data.customBuildDetail, {
    message: `Custom build detail must contain at least ${MIN_TEXT_AREA_LENGTH} character(s)`,
    path: ['customBuildDetail']
  });

export type Data = z.infer<typeof schema>;
