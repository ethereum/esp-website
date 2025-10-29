import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { z } from 'zod';
import {
  MAX_TEXT_AREA_LENGTH,
  MIN_TEXT_AREA_LENGTH,
  MAX_WISHLIST_FILE_SIZE
} from '../../../constants';
import { stringFieldSchema } from './utils';

export const DirectGrantSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,
  applicantProfile: stringFieldSchema('Applicant profile', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  // File upload field
  fileUpload: z
    .any()
    .optional()
    .refine(file => !file || (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(
      file => !file || (file?.type || file?.mimetype) === 'application/pdf',
      'File must be a PDF'
    )
});

export type DirectGrantData = z.infer<typeof DirectGrantSchema>;
