import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { z } from 'zod';
import { MAX_TEXT_AREA_LENGTH, MAX_WISHLIST_FILE_SIZE } from '../../../constants';
import { stringFieldSchema } from './utils';

export const DirectGrantSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,

  projectSummary: stringFieldSchema('Project summary', { min: 250, max: MAX_TEXT_AREA_LENGTH }),
  applicantProfile: stringFieldSchema('Applicant profile', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  projectStructure: stringFieldSchema('Project structure', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  sustainabilityPlan: stringFieldSchema('Sustainability plan', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  funding: stringFieldSchema('Other funding', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  problemBeingSolved: stringFieldSchema('Problem being solved', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  measuredImpact: stringFieldSchema('Measured impact', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  successMetrics: stringFieldSchema('Success metrics', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  ecosystemFit: stringFieldSchema('Ecosystem fit', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
  communityFeedback: stringFieldSchema('Community feedback', { min: 1, max: MAX_TEXT_AREA_LENGTH }),
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
