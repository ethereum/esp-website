import { Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageSection } from '../../UI';
import { TextField, TextAreaField, Field, UploadFile } from '../fields';
import { Select } from 'chakra-react-select';
import { DropdownIndicator } from '../../UI';
import { chakraStyles } from '../selectStyles';

import { FIAT_CURRENCY_OPTIONS, DOMAIN_OPTIONS, OUTPUT_OPTIONS } from '../constants';

interface ProjectOverviewSectionProps {
  includeFileUpload?: boolean;
}

export const ProjectOverviewSection: FC<ProjectOverviewSectionProps> = ({
  includeFileUpload = true
}) => {
  const { control } = useFormContext();

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Project Overview</PageSection>

      <TextField
        id='projectName'
        label='Project Name'
        helpText='Provide a concise title for your project.'
        isRequired
      />

      <TextAreaField
        id='projectSummary'
        label='Project Summary'
        helpText='Describe your project in a few sentences, including what is being built and why it matters. Provide links to any existing public or published work.'
        isRequired
      />

      {includeFileUpload && (
        <UploadFile
          id='fileUpload'
          label='PDF Proposal'
          helpText='Attach a PDF proposal that fulfills the requirements of the Request for Proposals.'
          isRequired
          dropzoneProps={{
            accept: ['application/pdf'],
            maxFiles: 1,
            maxSize: 4194304 // 4MB
          }}
        />
      )}

      <TextField
        id='projectRepo'
        label='Project Repo Link'
        helpText='Include a link to a repository for this project: Github, Gitlab, HackMD'
      />

      <Controller
        name='domain'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field
            id='domain'
            label='Domain'
            error={error}
            isRequired
            helpText='Select a domain for this project.'
          >
            <Select
              value={DOMAIN_OPTIONS.find(option => option.value === value) || null}
              onChange={selectedOption =>
                onChange((selectedOption as (typeof DOMAIN_OPTIONS)[number])?.value)
              }
              options={DOMAIN_OPTIONS}
              placeholder='Select domain'
              components={{ DropdownIndicator }}
              chakraStyles={chakraStyles}
            />
          </Field>
        )}
      />

      <Controller
        name='output'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field
            id='output'
            label='Output'
            error={error}
            isRequired
            helpText='Select an expected outcome of this project.'
          >
            <Select
              value={OUTPUT_OPTIONS.find(option => option.value === value) || null}
              onChange={selectedOption =>
                onChange((selectedOption as (typeof OUTPUT_OPTIONS)[number])?.value)
              }
              options={OUTPUT_OPTIONS}
              placeholder='Select output type'
              components={{ DropdownIndicator }}
              chakraStyles={chakraStyles}
            />
          </Field>
        )}
      />

      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <TextField id='budgetRequest' label='Budget Request' isRequired />

        <Controller
          name='currency'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field id='currency' label='Currency' error={error} isRequired>
              <Select
                value={FIAT_CURRENCY_OPTIONS.find(option => option.value === value) || null}
                onChange={selectedOption =>
                  onChange((selectedOption as (typeof FIAT_CURRENCY_OPTIONS)[number])?.value)
                }
                options={FIAT_CURRENCY_OPTIONS}
                placeholder='Select currency'
                components={{ DropdownIndicator }}
                chakraStyles={chakraStyles}
              />
            </Field>
          )}
        />
      </Flex>
    </Stack>
  );
};
