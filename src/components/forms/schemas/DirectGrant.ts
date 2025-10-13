import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { z } from 'zod';
import { MAX_WISHLIST_FILE_SIZE } from '../../../constants';

export const DirectGrantSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,
  // File upload field
  fileUpload: z
    .any()
    .refine(file => (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(file => (file?.type || file?.mimetype) === 'application/pdf', 'File must be a PDF')
    .or(z.literal(''))
});

export type DirectGrantData = z.infer<typeof DirectGrantSchema>;
