import {
  contactInformationSchema,
  projectOverviewSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { stringFieldSchema } from './utils';
import { z } from 'zod';

export const RFPSchema = z.object({
  selectedRFPId: stringFieldSchema('RFP item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...additionalDetailsSchema,
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
}
