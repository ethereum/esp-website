import { z } from 'zod';
import { stringFieldSchema } from './utils';

export const CSATSchema = z.object({
  // Salesforce Application ID reference
  applicationId: stringFieldSchema('Application ID', { min: 1 }),

  // CSAT Rating (1-5)
  csatRating: z.coerce
    .number({
      required_error: 'Please select a satisfaction rating',
      invalid_type_error: 'Please select a valid rating'
    })
    .int('Rating must be a whole number')
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),

  // CSAT Comments (optional)
  csatComments: stringFieldSchema('Comments', { max: 32768 }).optional(),

  // Captcha token
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
});

export type CSATData = z.infer<typeof CSATSchema>;
