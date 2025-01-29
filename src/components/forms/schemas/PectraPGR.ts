import * as z from 'zod';

import { stringFieldSchema } from './utils'
import { containURL } from '../../../utils'
import { MAX_PROPOSAL_FILE_SIZE } from '../../../constants'

const MAX_TEXT_LENGTH = 255
const MAX_TEXT_AREA_LENGTH = 2000
const MIN_TEXT_AREA_LENGTH = 500
const TEXT_AREA_LONG_LENGTH = 32768

const ACCEPTED_FILE_TYPES = ['application/pdf']

export const PectraPGRSchema = z.object({
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
  company: stringFieldSchema('Company name', { max: MAX_TEXT_LENGTH }).optional(),
  country: stringFieldSchema('Country', { min: 1 }),
  timezone: stringFieldSchema('Time zone', { min: 1 }),
  projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
  projectDescription: stringFieldSchema('Project description', {
    min: 1,
    max: MIN_TEXT_AREA_LENGTH
  }),
  impact: stringFieldSchema('Impact', {
    min: 1,
    max: TEXT_AREA_LONG_LENGTH
  }),
  howIsItDifferent: stringFieldSchema('How is it different?', {
    min: 1,
    max: TEXT_AREA_LONG_LENGTH
  }),
  proposalAttachment: z
  .any()
  .refine(file => !!file, 'Proposal is required.')
  .refine(file => file?.size <= MAX_PROPOSAL_FILE_SIZE, `Max file size is 4MB.`)
  .refine(
    file => ACCEPTED_FILE_TYPES.includes(file?.type || file?.mimetype),
    'Only .pdf files are accepted.'
  ),
  projectCategory: stringFieldSchema('Project category', { min: 1 }),
  requestAmount: stringFieldSchema('Total budget', { min: 1, max: 20 }),
  referralSource: stringFieldSchema('Referral source', { min: 1 }),
  referralSourceIfOther: stringFieldSchema('Field', { max: MAX_TEXT_AREA_LENGTH }).optional(),
  linkedinProfile: z.union([z.literal(''), z.string().trim().url()]),
  twitter: stringFieldSchema('Twitter handle', { max: 16 }).optional(),
  website: z.string().trim().url().optional(),
  alternativeContact: stringFieldSchema('Alternative contact info', { max: 150 }).optional(),
  repeatApplicant: z.boolean(),
  additionalInfo: stringFieldSchema('Additional info', { max: MAX_TEXT_AREA_LENGTH }).optional(),
})

export type PectraPGRData = z.infer<typeof PectraPGRSchema>