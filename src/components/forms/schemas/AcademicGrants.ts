import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import { MAX_PROPOSAL_FILE_SIZE } from '../../../constants';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;
const MIN_TEXT_AREA_LENGTH = 500;

const ACCEPTED_FILE_TYPES = ['application/pdf'];

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
    requestAmount: stringFieldSchema('Total budget', { min: 1, max: 20 }),
    referralSource: stringFieldSchema('Referral source', { min: 1 }),
    referralSourceIfOther: stringFieldSchema('Field', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    proposalAttachment: z
      .any()
      .refine(file => !!file, 'Proposal is required.')
      .refine(file => file?.size <= MAX_PROPOSAL_FILE_SIZE, `Max file size is 4MB.`)
      .refine(
        file => ACCEPTED_FILE_TYPES.includes(file?.type || file?.mimetype),
        'Only .pdf files are accepted.'
      ),
    shareResearch: stringFieldSchema('Share research', { min: 1 }),
    website: stringFieldSchema('Website', { max: MAX_TEXT_LENGTH }).optional(),
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
