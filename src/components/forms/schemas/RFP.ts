import {
  contactInformationSchema,
  projectOverviewSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { stringFieldSchema } from './utils';
import { z } from 'zod';
import { MAX_TEXT_LENGTH, MAX_WISHLIST_FILE_SIZE } from '../../../constants';

export const RFPSchema = z.object({
  selectedRFPId: stringFieldSchema('RFP item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...additionalDetailsSchema,
  // Override referral to be optional for RFP forms
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional(),
  fileUpload: z
    .any()
    .refine(
      file => !!file,
      'For RFP: Attach a PDF proposal that fulfills the requirements of the Request for Proposals.'
    )
    .refine(file => (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
    .refine(file => (file?.type || file?.mimetype) === 'application/pdf', 'File must be a PDF'),
  ...requiredSchema
});

export type RFPData = z.infer<typeof RFPSchema>;

export interface RFPItem {
  Id: string;
  Name: string;
  Description__c: string;
  Category__c?: string;
  Priority__c?: string;
  Expected_Deliverables__c?: string;
  Skills_Required__c?: string;
  Estimated_Effort__c?: string;
  Requirements__c?: string;
  Tags__c?: string;
  Ecosystem_Need__c?: string;
  RFP_HardRequirements_Long__c?: string;
  RFP_SoftRequirements__c?: string;
  Resources__c?: string;
  RFP_Open_Date__c?: string;
  RFP_Close_Date__c?: string;
  RFP_Project_Duration__c?: string;
  Custom_URL_Slug__c?: string;
}
