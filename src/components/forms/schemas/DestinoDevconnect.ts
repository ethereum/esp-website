import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH } from '../../../constants';

const baseSchema = z.object({
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
  applyingAs: z.enum(['An individual', 'A team']),
  company: z.string().optional(),
  teamProfile: stringFieldSchema('Profile', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  previousWork: stringFieldSchema('Previous Work', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  twitter: stringFieldSchema('Twitter Handle(s)', { max: 16 }).optional(),
  alternativeContact: stringFieldSchema('Telegram Username or Alternative Contact Info', {
    max: 150
  }).optional(),
  country: stringFieldSchema('Country', { min: 1 }),
  timezone: stringFieldSchema('Time Zone', { min: 1 }),

  proposedTimeline: stringFieldSchema('Budget breakdown', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),

  requestedSupport: z
    .array(z.enum(['Tickets', 'Vouchers', 'Scholarship']))
    .min(1, 'Please select at least one option'),

  // Additional Details
  referralSource: stringFieldSchema('How did you hear about this grant round?', { min: 1 }),
  referrals: stringFieldSchema(
    'Did anyone recommend that you submit an application to the Ecosystem Support Program?',
    {
      max: MAX_TEXT_AREA_LENGTH
    }
  ).optional(),
  futureEvents: stringFieldSchema('Field', {
    max: MAX_TEXT_AREA_LENGTH
  }).optional(),
  additionalInfo: stringFieldSchema('Do you have any questions about this grant round?', {
    max: MAX_TEXT_AREA_LENGTH
  }).optional(),
  repeatApplicant: z.boolean(),
  canTheEFReachOut: z.boolean().optional(),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

const communityInitiativeSchema = baseSchema.extend({
  category: z.literal('Community Initiative'),
  ticketRequest: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .min(1, 'Amount must be at least 1')
    .optional(),
  voucherRequest: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .min(1, 'Amount must be at least 1')
    .optional(),
  fiatCurrency: stringFieldSchema('Fiat Currency', { min: 1 }).optional(),
  requestedAmount: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .min(1, 'Amount must be at least 1')
    .optional(),

  // Project Details (if Community Initiative)
  projectName: stringFieldSchema('Project name', { min: 1, max: MAX_TEXT_LENGTH }),
  projectDescription: stringFieldSchema('Project Summary', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  projectRepoLink: z.string().optional(),
  problemBeingSolved: stringFieldSchema(
    'What problem(s) are being solved by within the scope of the grant?',
    {
      min: 1,
      max: MAX_TEXT_AREA_LENGTH
    }
  ),
  impact: stringFieldSchema('Why is your project important?', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  additionalSupportRequests: stringFieldSchema('How will the tickets be distributed, and who will be receiving these tickets?', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }).optional(),
});

const nonFinancialSchema = baseSchema.extend({
  category: z.literal('Non-Financial Support'),

  // Non-Financial Support Details
  eventName: stringFieldSchema('Event Name', { min: 1, max: MAX_TEXT_LENGTH }),
  eventDate: z.string(),
  eventLink: z.string(),
  eventDescription: stringFieldSchema('Event Summary', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  eventTopics: stringFieldSchema('Event topics', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  typeOfEvent: stringFieldSchema('What type of event is this?', {
    min: 1,
    max: MAX_TEXT_LENGTH
  }),
  inPerson: stringFieldSchema('Is your event in-person or online?', { min: 1 }),
  eventLocation: z.string().optional(),
  estimatedAttendees: z.coerce
    .number({
      invalid_type_error: 'Estimated attendees must be a number'
    })
    .min(1, 'Estimated attendees must be at least 1'),
  targetAudience: stringFieldSchema('Target audience', { min: 1, max: MAX_TEXT_LENGTH }),
  confirmedSpeakers: stringFieldSchema('Confirmed speakers', {
    max: MAX_TEXT_AREA_LENGTH
  }).optional(),
  confirmedSponsors: stringFieldSchema('Confirmed sponsors', {
    max: MAX_TEXT_AREA_LENGTH
  }).optional(),
  nonFinancialSupportRequest: stringFieldSchema('Non-financial support request', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  })
});

// Define the union with explicit discriminator and add team validation
const rawSchema = z.discriminatedUnion(
  'category',
  [communityInitiativeSchema, nonFinancialSchema],
  {
    errorMap: () => ({
      message: 'Category is required'
    })
  }
);

// Chain refine validations for each condition
export const DestinoDevconnectSchema = rawSchema
  // Company validation for team applications
  .refine(
    data => !(data.applyingAs === 'A team' && (!data.company || data.company.trim() === '')),
    {
      message: 'Company name is required when applying as a team',
      path: ['company']
    }
  )
  // Conditional validation for ticketRequest when Free tickets is selected
  .refine(
    data => {
      if (data.category === 'Community Initiative' && data.requestedSupport?.includes('Tickets')) {
        return data.ticketRequest !== undefined && data.ticketRequest >= 1;
      }
      return true;
    },
    {
      message: 'Number of tickets requested is required when Free tickets is selected',
      path: ['ticketRequest']
    }
  )
  // Conditional validation for voucherRequest when Voucher codes is selected
  .refine(
    data => {
      if (data.category === 'Community Initiative' && data.requestedSupport?.includes('Vouchers')) {
        return data.voucherRequest !== undefined && data.voucherRequest >= 1;
      }
      return true;
    },
    {
      message: 'Number of voucher codes requested is required when Voucher codes for discounted tickets is selected',
      path: ['voucherRequest']
    }
  )
  // Conditional validation for scholarship fields when Scholarships is selected
  .refine(
    data => {
      if (data.category === 'Community Initiative' && data.requestedSupport?.includes('Scholarship')) {
        return data.fiatCurrency !== undefined && data.fiatCurrency.trim() !== '' && 
               data.requestedAmount !== undefined && data.requestedAmount >= 1;
      }
      return true;
    },
    {
      message: 'Fiat currency and scholarship amount are required when Scholarships is selected',
      path: ['fiatCurrency']
    }
  )
  // Conditional validation for additionalSupportRequests when tickets or vouchers are selected
  .refine(
    data => {
      if (data.category === 'Community Initiative' && 
          (data.requestedSupport?.includes('Tickets') || data.requestedSupport?.includes('Vouchers'))) {
        return data.additionalSupportRequests !== undefined && data.additionalSupportRequests.trim() !== '';
      }
      return true;
    },
    {
      message: 'Additional support requests details are required when requesting tickets or vouchers',
      path: ['additionalSupportRequests']
    }
  );

export type DestinoDevconnectData = z.infer<typeof DestinoDevconnectSchema>;
