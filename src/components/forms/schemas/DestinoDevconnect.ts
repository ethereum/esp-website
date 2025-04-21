import * as z from 'zod';

import { stringFieldSchema } from './utils';
import { containURL } from '../../../utils';

const MAX_TEXT_LENGTH = 255;
const MAX_TEXT_AREA_LENGTH = 2000;

export type DestinoDevconnectData = z.infer<typeof DestinoDevconnectSchema>;

export const DestinoDevconnectSchema = z
  .object({
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
    applyingAs: stringFieldSchema('Are you submitting on behalf of a team, or as an individual?', {
      min: 1
    }),
    company: stringFieldSchema('Name of organization or entity', {
      max: MAX_TEXT_LENGTH
    })
      .refine(value => !containURL(value), 'Organization cannot contain a URL')
      .optional(),
    teamProfile: stringFieldSchema('Profile', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    previousWork: stringFieldSchema('Previous Work', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
    twitter: stringFieldSchema('Twitter Handle(s)', { max: 16 }).optional(),
    alternativeContact: stringFieldSchema('Telegram Username or Alternative Contact Info', {
      max: 150
    }).optional(),
    country: stringFieldSchema('Country', { min: 1 }),
    timezone: stringFieldSchema('Time Zone', { min: 1 }),
    category: stringFieldSchema('Category', { min: 1 }),

    // Project Details (if Community Initiative)
    projectName: stringFieldSchema('Project name', { max: MAX_TEXT_LENGTH }).optional(),
    projectDescription: stringFieldSchema('Project Summary', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    projectRepoLink: z.string().optional(),
    problemBeingSolved: stringFieldSchema(
      'What problem(s) are being solved by within the scope of the grant?',
      {
        max: MAX_TEXT_AREA_LENGTH
      }
    ).optional(),
    impact: stringFieldSchema('Why is your project important?', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    howIsItDifferent: stringFieldSchema('How does your project differ from similar ones?', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    isItPublicGood: stringFieldSchema('Is your project a public good?', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    isItOpenSource: stringFieldSchema('Is your project open source?', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    sustainabilityPlan: stringFieldSchema('What are your plans after the grant is completed?', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    otherProjects: stringFieldSchema(
      "If you didn't work on this project, what would you work on instead?",
      {
        max: MAX_TEXT_AREA_LENGTH
      }
    ).optional(),
    proposedTimeline: stringFieldSchema('Budget breakdown', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),

    // Event Details (if Community Event)
    eventName: stringFieldSchema('Event Name', { max: MAX_TEXT_LENGTH }).optional(),
    eventDate: z.string().optional(),
    eventLink: z.string().optional(),
    eventDescription: stringFieldSchema('Event Summary', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    eventTopics: stringFieldSchema('Event topics', { max: MAX_TEXT_AREA_LENGTH }).optional(),
    typeOfEvent: stringFieldSchema('What type of event is this?', {
      max: MAX_TEXT_LENGTH
    }).optional(),
    inPerson: stringFieldSchema('Is your event in-person or online?', {
      max: MAX_TEXT_LENGTH
    }).optional(),
    eventLocation: stringFieldSchema('Event Location', { max: MAX_TEXT_LENGTH }).optional(),
    estimatedAttendees: z.coerce
      .number({ invalid_type_error: 'Estimated attendees must be a number' })
      .optional(),
    targetAudience: stringFieldSchema('Target audience', { max: 3000 }).optional(),
    confirmedSpeakers: stringFieldSchema('Confirmed speakers', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),
    confirmedSponsors: stringFieldSchema('Confirmed sponsors', {
      max: MAX_TEXT_AREA_LENGTH
    }).optional(),

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
    canTheEFReachOut: z.boolean(),
    captchaToken: stringFieldSchema('Captcha', { min: 1 })
  })
  .refine(
    data => {
      if (data.category === 'Community Initiative') {
        return (
          data.projectName !== '' &&
          data.projectDescription !== '' &&
          data.problemBeingSolved !== '' &&
          data.impact !== '' &&
          data.howIsItDifferent !== '' &&
          data.isItPublicGood !== '' &&
          data.isItOpenSource !== '' &&
          data.sustainabilityPlan !== '' &&
          data.otherProjects !== '' &&
          data.proposedTimeline !== ''
        );
      }
      return true;
    },
    data => {
      if (!data.projectName) {
        return { path: ['projectName'], message: 'Project name is required' };
      }
      if (!data.projectDescription) {
        return { path: ['projectDescription'], message: 'Project description is required' };
      }
      if (!data.problemBeingSolved) {
        return { path: ['problemBeingSolved'], message: 'Problem being solved is required' };
      }
      if (!data.impact) {
        return { path: ['impact'], message: 'Impact is required' };
      }
      if (!data.howIsItDifferent) {
        return { path: ['howIsItDifferent'], message: 'How is it different is required' };
      }
      if (!data.isItPublicGood) {
        return { path: ['isItPublicGood'], message: 'Is it public good is required' };
      }
      if (!data.isItOpenSource) {
        return { path: ['isItOpenSource'], message: 'Is it open source is required' };
      }
      if (!data.sustainabilityPlan) {
        return { path: ['sustainabilityPlan'], message: 'Sustainability plan is required' };
      }
      if (!data.otherProjects) {
        return { path: ['otherProjects'], message: 'Other projects are required' };
      }
      if (!data.proposedTimeline) {
        return { path: ['proposedTimeline'], message: 'Proposed timeline is required' };
      }

      return { path: [], message: '' };
    }
  )
  .refine(
    data => {
      if (data.category === 'Community Event') {
        return (
          data.eventName !== '' &&
          data.eventDate !== '' &&
          data.eventDescription !== '' &&
          data.eventTopics !== '' &&
          data.typeOfEvent !== '' &&
          data.inPerson !== '' &&
          data.estimatedAttendees !== undefined &&
          data.targetAudience !== '' &&
          data.proposedTimeline !== ''
        );
      }
      return true;
    },
    data => {
      if (!data.eventName) {
        return { path: ['eventName'], message: 'Event name is required' };
      }
      if (!data.eventDate) {
        return { path: ['eventDate'], message: 'Event date is required' };
      }
      if (!data.eventDescription) {
        return { path: ['eventDescription'], message: 'Event description is required' };
      }
      if (!data.eventTopics) {
        return { path: ['eventTopics'], message: 'Event topics are required' };
      }
      if (!data.typeOfEvent) {
        return { path: ['typeOfEvent'], message: 'Type of event is required' };
      }
      if (!data.inPerson) {
        return { path: ['inPerson'], message: 'In-person or online is required' };
      }
      if (!data.estimatedAttendees) {
        return { path: ['estimatedAttendees'], message: 'Estimated attendees are required' };
      }
      if (!data.targetAudience) {
        return { path: ['targetAudience'], message: 'Target audience is required' };
      }
      if (!data.proposedTimeline) {
        return { path: ['proposedTimeline'], message: 'Proposed timeline is required' };
      }
      if (data.inPerson === 'In-person' && !data.eventLocation) {
        return { path: ['eventLocation'], message: 'Event location is required' };
      }

      return { path: [], message: '' };
    }
  )
  .refine(
    data => {
      if (data.applyingAs === 'Team') {
        return data.company !== '';
      }
      return true;
    },
    {
      message: 'Organization name is required when applying as a team'
    }
  );
