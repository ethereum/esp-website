import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import {
  MAX_TEXT_LENGTH,
  MAX_TEXT_AREA_LENGTH,
  MIN_TEXT_AREA_LENGTH,
  CUSTOM_MIN_TEXT_AREA_LENGTH,
  MAX_WISHLIST_FILE_SIZE
} from '../../../constants';
import { DOMAIN_OPTIONS, OUTPUT_OPTIONS, PROFILE_TYPE_OPTIONS } from '../constants';

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
  profileType: z.enum(PROFILE_TYPE_OPTIONS.map(option => option.value) as [string, ...string[]]),
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
    .any()
    .refine(file => !!file, 'PDF proposal is required')
    .refine(file => (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(file => (file?.type || file?.mimetype) === 'application/pdf', 'File must be a PDF'),
  projectRepo: stringFieldSchema('Project repo', { max: MAX_TEXT_LENGTH })
    .url({ message: 'Invalid URL' })
    .or(z.literal('')),
  domain: z.enum(DOMAIN_OPTIONS.map(option => option.value) as [string, ...string[]]),
  output: z.enum(OUTPUT_OPTIONS.map(option => option.value) as [string, ...string[]]),
  budgetRequest: z.coerce
    .number({
      required_error: 'Budget request is required',
      invalid_type_error: 'Please enter a valid number'
    })
    .positive('Budget request must be a positive number'),
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
    min: CUSTOM_MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  problemBeingSolved: stringFieldSchema('Problem being solved', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  measuredImpact: stringFieldSchema('Measured impact', {
    min: CUSTOM_MIN_TEXT_AREA_LENGTH,
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
    min: CUSTOM_MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  openSourceLicense: stringFieldSchema('Open source license', {
    min: 1,
    max: MAX_TEXT_LENGTH
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

export const BaseGrantSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});

export {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
};

export type BaseGrantData = z.infer<typeof BaseGrantSchema>;

export interface FormConfig {
  formId: string;
  submitApiEndpoint: 'wishlist' | 'rfp' | 'direct-grant';
  thankYouPageUrl: string;
  selectedItemIdField: 'selectedWishlistId' | 'selectedRFPId' | 'selectedDirectGrantId';
  selectedItemDisplayText: string;
}
