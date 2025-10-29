import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { z } from 'zod';
import {
  MAX_WISHLIST_FILE_SIZE,
  MAX_TEXT_LENGTH,
  MIN_TEXT_AREA_LENGTH,
  MAX_TEXT_AREA_LENGTH
} from '../../../constants';
import { stringFieldSchema } from './utils';

export const WishlistSchema = z.object({
  selectedWishlistId: stringFieldSchema('Wishlist item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  applicantProfile: stringFieldSchema('Applicant profile', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  }),
  // Override referral to be optional for Wishlist forms
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional(),
  ...requiredSchema,
  // Override file upload field as optional for the Wishlist form
  fileUpload: z
    .any()
    .optional()
    .refine(file => !file || (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(
      file => !file || (file?.type || file?.mimetype) === 'application/pdf',
      'File must be a PDF'
    )
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
  Custom_URL_Slug__c?: string;
}
