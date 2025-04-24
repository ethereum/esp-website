import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;

export type TenYearAnniversaryData = z.infer<typeof TenYearAnniversarySchema>;

export const TenYearAnniversarySchema = z.object({
  // Contact Information
  firstName: stringFieldSchema('First Name', { min: 1, max: 40 }).refine(
    value => !containURL(value),
    'First name cannot contain a URL'
  ),
  lastName: stringFieldSchema('Last Name', { min: 1, max: 80 }).refine(
    value => !containURL(value),
    'Last name cannot contain a URL'
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  company: stringFieldSchema('Name of organization or entity', {
    min: 1,
    max: MAX_TEXT_LENGTH
  })
    .refine(value => !containURL(value), 'Organization cannot contain a URL')
    .refine(value => value !== '', 'Organization is required'),
  teamProfile: stringFieldSchema('Profile', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  previousWork: stringFieldSchema('This field', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  twitter: stringFieldSchema('Twitter Handle(s)', { max: 16 }).optional(),
  alternativeContact: stringFieldSchema('Telegram Username or Alternative Contact Info', {
    max: 150
  }).optional(),
  country: stringFieldSchema('Country', { min: 1 }),
  timezone: stringFieldSchema('Time Zone', { min: 1 }),

  // Event Details
  eventName: stringFieldSchema('Event Name', { max: MAX_TEXT_LENGTH }).refine(
    value => value !== '',
    'Event name is required'
  ),
  eventDescription: stringFieldSchema('Event Summary', { max: MAX_TEXT_AREA_LENGTH }).refine(
    value => value !== '',
    'Event description is required'
  ),
  eventLink: z.string().refine(value => value !== '', 'Event link is required'),
  eventDate: z.string().refine(value => value !== '', 'Event date is required'),
  eventLocation: stringFieldSchema('Event Location', { max: MAX_TEXT_LENGTH }).refine(
    value => value !== '',
    'Event location is required'
  ),
  proposedTimeline: stringFieldSchema('Budget breakdown', {
    max: MAX_TEXT_AREA_LENGTH
  }).refine(value => value !== '', 'Proposed timeline is required'),

  // Requested Amount
  fiatCurrency: stringFieldSchema('Fiat Currency', { min: 1 }),
  requestedAmount: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .min(1, 'Amount must be at least 1'),

  // Additional Details
  referralSource: stringFieldSchema('How did you hear about this grant round?', { min: 1 }),
  referrals: stringFieldSchema(
    'Did anyone recommend that you submit an application to the Ecosystem Support Program?',
    {
      max: MAX_TEXT_AREA_LENGTH
    }
  ).optional(),
  additionalInfo: stringFieldSchema('Do you have any questions about this grant round?', {
    max: MAX_TEXT_AREA_LENGTH
  }).optional(),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});
