import {
  contactInformationSchema,
  projectOverviewSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { z } from 'zod';
import { stringFieldSchema } from './utils';
import type { RFPGrantInitiative } from '../../../types';

export const RFPSchema = z.object({
  selectedRFPId: stringFieldSchema('RFP item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});

export type RFPData = z.infer<typeof RFPSchema>;

export type RFPItem = RFPGrantInitiative;
