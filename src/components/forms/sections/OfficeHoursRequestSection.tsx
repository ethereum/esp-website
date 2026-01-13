import { Fade, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'chakra-react-select';

import { PageSection, PageText, DropdownIndicator } from '../../UI';
import { TextField, TextAreaField, Field, UploadFile } from '../fields';
import { chakraStyles } from '../selectStyles';
import { DOMAIN_OPTIONS } from '../constants';

const ADVICE = 'Advice';
const PROJECT_FEEDBACK = 'Project Feedback';

export const OfficeHoursRequestSection: FC = () => {
  const { control, watch } = useFormContext();
  const officeHoursRequest = watch('officeHoursRequest');
  const isRequestingProjectFeedback = officeHoursRequest === PROJECT_FEEDBACK;

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Office Hours Request</PageSection>

      <Controller
        name='officeHoursRequest'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field
            id='officeHoursRequest'
            label='Office Hours Request'
            error={error}
            isRequired
            helpText='Choose from the options below. For feedback about whether your project is eligible for a grant, click the Project Feedback button.'
          >
            <RadioGroup
              id='officeHoursRequest'
              onChange={onChange}
              value={value}
              fontSize='input'
              colorScheme='white'
              mt={3}
            >
              <Stack direction='row'>
                <Radio id='advice' size='lg' name='officeHoursRequest' value={ADVICE} mr={8}>
                  <PageText fontSize='input'>{ADVICE}</PageText>
                </Radio>

                <Radio
                  id='project-feedback'
                  size='lg'
                  name='officeHoursRequest'
                  value={PROJECT_FEEDBACK}
                >
                  <PageText fontSize='input'>{PROJECT_FEEDBACK}</PageText>
                </Radio>
              </Stack>
            </RadioGroup>
          </Field>
        )}
      />

      {isRequestingProjectFeedback && (
        <Fade in={isRequestingProjectFeedback} delay={0.25}>
          <Stack spacing={6}>
            <TextField
              id='projectName'
              label='Project name'
              isRequired={isRequestingProjectFeedback}
            />

            <TextAreaField
              id='projectSummary'
              label='Project summary'
              helpText='Describe your project in a few sentences, including what is being built and why it matters. Provide links to any existing public or published work.'
              isRequired={isRequestingProjectFeedback}
            />

            <UploadFile
              id='fileUpload'
              label='File upload'
              dropzoneProps={{
                accept: ['application/pdf'],
                maxFiles: 1,
                maxSize: 4194304 // 4MB
              }}
            />

            <TextField
              id='projectRepo'
              label='Project repo link'
              helpText='Include a link to a repository for this project: Github, Gitlab, HackMD, etc.'
              isRequired={isRequestingProjectFeedback}
            />

            <Controller
              name='domain'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Field
                  id='domain'
                  label='Domain'
                  error={error}
                  isRequired={isRequestingProjectFeedback}
                  helpText='Select a domain for this project.'
                >
                  <Select
                    value={DOMAIN_OPTIONS.find(option => option.value === value) || null}
                    onChange={selectedOption =>
                      onChange((selectedOption as (typeof DOMAIN_OPTIONS)[number])?.value)
                    }
                    options={DOMAIN_OPTIONS}
                    placeholder='Select'
                    components={{ DropdownIndicator }}
                    chakraStyles={chakraStyles}
                  />
                </Field>
              )}
            />

            <TextAreaField
              id='officeHoursReason'
              label='How are you hoping ESP can help?'
              isRequired={isRequestingProjectFeedback}
            />

            <TextAreaField
              id='additionalInfo'
              label='Additional questions or comments?'
              isRequired={false}
            />
          </Stack>
        </Fade>
      )}

      {!isRequestingProjectFeedback && (
        <Fade in={!isRequestingProjectFeedback} delay={0.25}>
          <TextAreaField
            id='officeHoursReason'
            label='How are you hoping ESP can help?'
            helpText='Please list any specific questions or details that would expedite the call.'
            isRequired={!isRequestingProjectFeedback}
          />
        </Fade>
      )}
    </Stack>
  );
};
