import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { PageSection } from '../../UI';
import { TextField, TextAreaField } from '../fields';

export const ProjectDetailsSection: FC = () => {
  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Project Details</PageSection>

      <TextAreaField
        id='projectStructure'
        label='Project Structure'
        helpText='Provide a detailed breakdown of the project scope of work and timeline including milestones, deliverables, and expected outcomes.'
        isRequired
      />

      <TextAreaField
        id='sustainabilityPlan'
        label='Sustainability Plan'
        helpText='Share plans towards achieving sustainability (both financial and non-financial) for this project in future.'
        isRequired
      />

      <TextAreaField
        id='funding'
        label='Funding'
        helpText='Have you received or discussed funding for this project from other parties?'
        isRequired
      />

      <TextAreaField
        id='problemBeingSolved'
        label='Problem Being Solved'
        helpText='Within this domain, what is the problem identified, who is affected by it, and how does this project provide a solution? Provide concrete examples.'
        isRequired
      />

      <TextAreaField
        id='measuredImpact'
        label='Measured Impact'
        helpText="Depending on the stage of this project, provide metrics for the project's current impact on the ecosystem, e.g. users, page visits, code contributors."
        isRequired
      />

      <TextAreaField
        id='successMetrics'
        label='Success Metrics'
        helpText='What quantifiable measurements will be used to gauge the success of this project after completion?'
        isRequired
      />

      <TextAreaField
        id='ecosystemFit'
        label='Ecosystem Fit'
        helpText='Compare your project to 2-3 similar projects in the ecosystem. How is your work unique or novel?'
        isRequired
      />

      <TextAreaField
        id='communityFeedback'
        label='Community Feedback'
        helpText='What domain expert or community feedback have you received for this project?'
        isRequired
      />

      <TextField
        id='openSourceLicense'
        label='Open Source License'
        helpText='Specify which open source license you are using for this project.'
        isRequired
      />

      <TextAreaField
        id='applicantProfile'
        label='Applicant Profile'
        helpText='Briefly provide a biography of yourself and your team including relevant experience and expertise.'
        isRequired
      />
    </Stack>
  );
};