import { z } from 'zod';
import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import { MAX_TEXT_AREA_LENGTH, MAX_TEXT_LENGTH, MAX_WISHLIST_FILE_SIZE } from '../../../constants';

const baseContactSchema = {
  firstName: stringFieldSchema('First name', { min: 1, max: 20 }).refine(
    value => !containURL(value),
    'First name cannot contain a URL'
  ),
  lastName: stringFieldSchema('Last name', { min: 1, max: 20 }).refine(
    value => !containURL(value),
    'Last name cannot contain a URL'
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  company: stringFieldSchema('Company', { max: 50 }).optional().or(z.literal('')),
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
  country: stringFieldSchema('Country', { min: 1, max: 2 }), // 2 character country code
  timezone: stringFieldSchema('Time zone', { min: 1 })
};

const sharedSchema = {
  officeHoursReason: stringFieldSchema('Office hours reason', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  })
};

const additionalDetailsSchema = {
  repeatApplicant: z.boolean().default(false),
  opportunityOutreachConsent: z.boolean().default(true)
};

const requiredSchema = {
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
};

// Base schema with common fields
const baseOfficeHoursSchema = z.object({
  ...baseContactSchema,
  ...sharedSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});

// Schema for Advice requests
const adviceSchema = baseOfficeHoursSchema.extend({
  officeHoursRequest: z.literal('Advice')
});

// Schema for Project Feedback requests with required project fields
const projectFeedbackSchema = baseOfficeHoursSchema.extend({
  officeHoursRequest: z.literal('Project Feedback'),
  projectName: stringFieldSchema('Project name', { min: 1, max: 80 }),
  projectSummary: stringFieldSchema('Project summary', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  fileUpload: z
    .any()
    .refine(file => !file || (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(
      file => !file || (file?.type || file?.mimetype) === 'application/pdf',
      'File must be a PDF'
    )
    .optional()
    .or(z.literal('')),
  projectRepo: stringFieldSchema('Project repo', { max: MAX_TEXT_LENGTH }).url({
    message: 'Invalid URL'
  }),
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
  additionalInfo: stringFieldSchema('Additional information', {
    max: MAX_TEXT_AREA_LENGTH
  }).optional()
});

// Create discriminated union
export const OfficeHoursSchema = z.discriminatedUnion(
  'officeHoursRequest',
  [adviceSchema, projectFeedbackSchema],
  {
    errorMap: () => ({
      message: 'Office hours request type is required'
    })
  }
);

export type OfficeHoursData = z.infer<typeof OfficeHoursSchema>;
