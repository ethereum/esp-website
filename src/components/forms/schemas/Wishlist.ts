import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { z } from 'zod';
import { MAX_WISHLIST_FILE_SIZE, MAX_TEXT_LENGTH } from '../../../constants';
import { stringFieldSchema } from './utils';

export const WishlistSchema = z.object({
  selectedWishlistId: stringFieldSchema('Wishlist item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  // Override referral to be optional for Wishlist forms
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional(),
  ...requiredSchema,
  // Override the file upload field as it is not required for the Wishlist form
  fileUpload: z
    .any()
    .refine(file => (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(file => (file?.type || file?.mimetype) === 'application/pdf', 'File must be a PDF')
    .or(z.literal(''))
});

export type WishlistData = z.infer<typeof WishlistSchema>;

export interface WishlistItem {
  Id: string;
  Name: string;
  Description__c: string;
  Category__c?: string;
  Priority__c?: string;
  Expected_Deliverables__c?: string;
  Skills_Required__c?: string;
  Estimated_Effort__c?: string;
  Tags__c?: string;
  Out_of_Scope__c?: string;
  Resources__c?: string;
}
