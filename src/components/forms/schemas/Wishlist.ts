import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { MAX_WISHLIST_FILE_SIZE } from '../../../constants';
import type { WishlistGrantInitiative } from '../../../types';
import { stringFieldSchema } from './utils';
import { z } from 'zod';

export const WishlistSchema = z.object({
  selectedWishlistId: stringFieldSchema('Wishlist item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,
  // Override the file upload field as it is not required for the Wishlist form
  fileUpload: z
    .any()
    .refine(file => (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(file => (file?.type || file?.mimetype) === 'application/pdf', 'File must be a PDF')
    .or(z.literal(''))
});

export type WishlistData = z.infer<typeof WishlistSchema>;

export type WishlistItem = WishlistGrantInitiative;
