import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;

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
  repeatApplicant: z.boolean(),
  canTheEFReachOut: z.boolean().optional(),
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

const communityInitiativeSchema = baseSchema.extend({
  category: z.literal('Community Initiative'),

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
  howIsItDifferent: stringFieldSchema('How does your project differ from similar ones?', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  isItPublicGood: stringFieldSchema('Is your project a public good?', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  isItOpenSource: stringFieldSchema('Is your project open source?', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  sustainabilityPlan: stringFieldSchema('What are your plans after the grant is completed?', {
    min: 1,
    max: MAX_TEXT_AREA_LENGTH
  }),
  otherProjects: stringFieldSchema(
    "If you didn't work on this project, what would you work on instead?",
    {
      min: 1,
      max: MAX_TEXT_AREA_LENGTH
    }
  )
});

const communityEventSchema = baseSchema.extend({
  category: z.literal('Community Event'),

  // Event Details (if Community Event)
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
  }).optional()
});

// Define the union with explicit discriminator and add team validation
const rawSchema = z.discriminatedUnion(
  'category',
  [communityEventSchema, communityInitiativeSchema],
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
  // Event location validation for in-person events
  .refine(
    data => {
      return (
        data.category !== 'Community Event' ||
        data.inPerson !== 'In-person' ||
        (data.eventLocation && data.eventLocation.trim() !== '')
      );
    },
    {
      message: 'Event location is required for in-person events',
      path: ['eventLocation']
    }
  );

export type DestinoDevconnectData = z.infer<typeof DestinoDevconnectSchema>;
