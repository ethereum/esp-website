import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { PageSection } from '../../UI';
import { TextField, TextAreaField } from '../fields';

interface FieldConfig {
  label?: string;
  helpText?: string;
  isRequired?: boolean;
}

interface ProjectDetailsSectionProps {
  fields?: {
    projectStructure?: FieldConfig | false;
    sustainabilityPlan?: FieldConfig | false;
    funding?: FieldConfig | false;
    problemBeingSolved?: FieldConfig | false;
    measuredImpact?: FieldConfig | false;
    successMetrics?: FieldConfig | false;
    ecosystemFit?: FieldConfig | false;
    communityFeedback?: FieldConfig | false;
    openSourceLicense?: FieldConfig | false;
    applicantProfile?: FieldConfig | false;
  };
}

// Default configurations for each field
const DEFAULT_FIELDS = {
  projectStructure: {
    label: 'Project Structure',
    helpText:
      'Provide a detailed breakdown of the project scope of work and timeline including milestones, deliverables, and expected outcomes.',
    isRequired: true
  },
  sustainabilityPlan: {
    label: 'Sustainability Plan',
    helpText:
      'Share plans towards achieving sustainability (both financial and non-financial) for this project in future.',
    isRequired: true
  },
  funding: {
    label: 'Funding',
    helpText: 'Have you received or discussed funding for this project from other parties?',
    isRequired: true
  },
  problemBeingSolved: {
    label: 'Problem Being Solved',
    helpText:
      'Within this domain, what is the problem identified, who is affected by it, and how does this project provide a solution? Provide concrete examples.',
    isRequired: true
  },
  measuredImpact: {
    label: 'Measured Impact',
    helpText:
      "Depending on the stage of this project, provide metrics for the project's current impact on the ecosystem, e.g. users, page visits, code contributors.",
    isRequired: true
  },
  successMetrics: {
    label: 'Success Metrics',
    helpText:
      'What quantifiable measurements will be used to gauge the success of this project after completion?',
    isRequired: true
  },
  ecosystemFit: {
    label: 'Ecosystem Fit',
    helpText:
      'Compare your project to 2-3 similar projects in the ecosystem. How is your work unique or novel?',
    isRequired: true
  },
  communityFeedback: {
    label: 'Community Feedback',
    helpText: 'What domain expert or community feedback have you received for this project?',
    isRequired: true
  },
  openSourceLicense: {
    label: 'Open Source License',
    helpText: 'Specify which open source license you are using for this project.',
    isRequired: true
  },
  applicantProfile: {
    label: 'Applicant Profile',
    helpText:
      'Briefly provide a biography of yourself and your team including relevant experience and expertise.',
    isRequired: true
  }
};

export const ProjectDetailsSection: FC<ProjectDetailsSectionProps> = ({ fields }) => {
  // Merge provided fields config with defaults
  const projectStructureConfig =
    fields?.projectStructure === false
      ? null
      : { ...DEFAULT_FIELDS.projectStructure, ...fields?.projectStructure };

  const sustainabilityPlanConfig =
    fields?.sustainabilityPlan === false
      ? null
      : { ...DEFAULT_FIELDS.sustainabilityPlan, ...fields?.sustainabilityPlan };

  const fundingConfig =
    fields?.funding === false ? null : { ...DEFAULT_FIELDS.funding, ...fields?.funding };

  const problemBeingSolvedConfig =
    fields?.problemBeingSolved === false
      ? null
      : { ...DEFAULT_FIELDS.problemBeingSolved, ...fields?.problemBeingSolved };

  const measuredImpactConfig =
    fields?.measuredImpact === false
      ? null
      : { ...DEFAULT_FIELDS.measuredImpact, ...fields?.measuredImpact };

  const successMetricsConfig =
    fields?.successMetrics === false
      ? null
      : { ...DEFAULT_FIELDS.successMetrics, ...fields?.successMetrics };

  const ecosystemFitConfig =
    fields?.ecosystemFit === false
      ? null
      : { ...DEFAULT_FIELDS.ecosystemFit, ...fields?.ecosystemFit };

  const communityFeedbackConfig =
    fields?.communityFeedback === false
      ? null
      : { ...DEFAULT_FIELDS.communityFeedback, ...fields?.communityFeedback };

  const openSourceLicenseConfig =
    fields?.openSourceLicense === false
      ? null
      : { ...DEFAULT_FIELDS.openSourceLicense, ...fields?.openSourceLicense };

  const applicantProfileConfig =
    fields?.applicantProfile === false
      ? null
      : { ...DEFAULT_FIELDS.applicantProfile, ...fields?.applicantProfile };

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Project Details</PageSection>

      {projectStructureConfig && (
        <TextAreaField
          id='projectStructure'
          label={projectStructureConfig.label}
          helpText={projectStructureConfig.helpText}
          isRequired={projectStructureConfig.isRequired}
        />
      )}

      {sustainabilityPlanConfig && (
        <TextAreaField
          id='sustainabilityPlan'
          label={sustainabilityPlanConfig.label}
          helpText={sustainabilityPlanConfig.helpText}
          isRequired={sustainabilityPlanConfig.isRequired}
        />
      )}

      {fundingConfig && (
        <TextAreaField
          id='funding'
          label={fundingConfig.label}
          helpText={fundingConfig.helpText}
          isRequired={fundingConfig.isRequired}
        />
      )}

      {problemBeingSolvedConfig && (
        <TextAreaField
          id='problemBeingSolved'
          label={problemBeingSolvedConfig.label}
          helpText={problemBeingSolvedConfig.helpText}
          isRequired={problemBeingSolvedConfig.isRequired}
        />
      )}

      {measuredImpactConfig && (
        <TextAreaField
          id='measuredImpact'
          label={measuredImpactConfig.label}
          helpText={measuredImpactConfig.helpText}
          isRequired={measuredImpactConfig.isRequired}
        />
      )}

      {successMetricsConfig && (
        <TextAreaField
          id='successMetrics'
          label={successMetricsConfig.label}
          helpText={successMetricsConfig.helpText}
          isRequired={successMetricsConfig.isRequired}
        />
      )}

      {ecosystemFitConfig && (
        <TextAreaField
          id='ecosystemFit'
          label={ecosystemFitConfig.label}
          helpText={ecosystemFitConfig.helpText}
          isRequired={ecosystemFitConfig.isRequired}
        />
      )}

      {communityFeedbackConfig && (
        <TextAreaField
          id='communityFeedback'
          label={communityFeedbackConfig.label}
          helpText={communityFeedbackConfig.helpText}
          isRequired={communityFeedbackConfig.isRequired}
        />
      )}

      {openSourceLicenseConfig && (
        <TextField
          id='openSourceLicense'
          label={openSourceLicenseConfig.label}
          helpText={openSourceLicenseConfig.helpText}
          isRequired={openSourceLicenseConfig.isRequired}
        />
      )}

      {applicantProfileConfig && (
        <TextAreaField
          id='applicantProfile'
          label={applicantProfileConfig.label}
          helpText={applicantProfileConfig.helpText}
          isRequired={applicantProfileConfig.isRequired}
        />
      )}
    </Stack>
  );
};
