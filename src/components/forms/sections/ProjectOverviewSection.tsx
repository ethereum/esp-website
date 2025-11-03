import { Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageSection } from '../../UI';
import { TextField, TextAreaField, Field, UploadFile } from '../fields';
import { Select } from 'chakra-react-select';
import { DropdownIndicator } from '../../UI';
import { chakraStyles } from '../selectStyles';

import { FIAT_CURRENCY_OPTIONS, DOMAIN_OPTIONS, OUTPUT_OPTIONS } from '../constants';

interface FieldConfig {
  label?: string;
  helpText?: string;
  isRequired?: boolean;
}

interface FileUploadConfig extends FieldConfig {
  dropzoneProps?: {
    accept?: string[];
    maxFiles?: number;
    maxSize?: number;
  };
}

interface ProjectOverviewSectionProps {
  fields?: {
    projectName?: FieldConfig | false;
    projectSummary?: FieldConfig | false;
    fileUpload?: FileUploadConfig | false;
    projectRepo?: FieldConfig | false;
    domain?: FieldConfig | false;
    output?: FieldConfig | false;
    budgetRequest?: FieldConfig | false;
    currency?: FieldConfig | false;
  };
}

// Default configurations for each field
const DEFAULT_FIELDS = {
  projectName: {
    label: 'Project Name',
    helpText: 'Provide a concise title for your project.',
    isRequired: true
  },
  projectSummary: {
    label: 'Project Summary',
    helpText:
      'Describe your project in a few sentences, including what is being built and why it matters. Provide links to any existing public or published work.',
    isRequired: true
  },
  fileUpload: {
    label: 'PDF Proposal',
    helpText: 'Attach a PDF proposal that fulfills the requirements of the Request for Proposals.',
    isRequired: true,
    dropzoneProps: {
      accept: ['application/pdf'],
      maxFiles: 1,
      maxSize: 4194304 // 4MB
    }
  },
  projectRepo: {
    label: 'Project Repo Link',
    helpText: 'Include a link to a repository for this project: Github, Gitlab, HackMD',
    isRequired: false
  },
  domain: {
    label: 'Domain',
    helpText: 'Select a domain for this project.',
    isRequired: true
  },
  output: {
    label: 'Output',
    helpText: 'Select an expected outcome of this project.',
    isRequired: true
  },
  budgetRequest: {
    label: 'Budget Request',
    isRequired: true
  },
  currency: {
    label: 'Currency',
    isRequired: true
  }
};

export const ProjectOverviewSection: FC<ProjectOverviewSectionProps> = ({ fields }) => {
  const { control } = useFormContext();

  // Merge provided fields config with defaults
  const projectNameConfig =
    fields?.projectName === false
      ? null
      : { ...DEFAULT_FIELDS.projectName, ...fields?.projectName };

  const projectSummaryConfig =
    fields?.projectSummary === false
      ? null
      : { ...DEFAULT_FIELDS.projectSummary, ...fields?.projectSummary };

  // Handle deprecated includeFileUpload prop
  const fileUploadConfig =
    fields?.fileUpload === false ? null : { ...DEFAULT_FIELDS.fileUpload, ...fields?.fileUpload };

  const projectRepoConfig =
    fields?.projectRepo === false
      ? null
      : { ...DEFAULT_FIELDS.projectRepo, ...fields?.projectRepo };

  const domainConfig =
    fields?.domain === false ? null : { ...DEFAULT_FIELDS.domain, ...fields?.domain };

  const outputConfig =
    fields?.output === false ? null : { ...DEFAULT_FIELDS.output, ...fields?.output };

  const budgetRequestConfig =
    fields?.budgetRequest === false
      ? null
      : { ...DEFAULT_FIELDS.budgetRequest, ...fields?.budgetRequest };

  const currencyConfig =
    fields?.currency === false ? null : { ...DEFAULT_FIELDS.currency, ...fields?.currency };

  const showBudgetFields = budgetRequestConfig || currencyConfig;

  return (
    <Stack spacing={6}>
      <PageSection mt={6}>Budget</PageSection>

      {showBudgetFields && (
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          {budgetRequestConfig && (
            <TextField
              id='budgetRequest'
              label={budgetRequestConfig.label}
              helpText={budgetRequestConfig.helpText}
              isRequired={budgetRequestConfig.isRequired}
            />
          )}

          {currencyConfig && (
            <Controller
              name='currency'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Field
                  id='currency'
                  label={currencyConfig.label}
                  error={error}
                  isRequired={currencyConfig.isRequired}
                  helpText={currencyConfig.helpText}
                >
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
          )}
        </Flex>
      )}

      <PageSection mt={12}>Project Overview</PageSection>

      {projectNameConfig && (
        <TextField
          id='projectName'
          label={projectNameConfig.label}
          helpText={projectNameConfig.helpText}
          isRequired={projectNameConfig.isRequired}
        />
      )}

      {projectSummaryConfig && (
        <TextAreaField
          id='projectSummary'
          label={projectSummaryConfig.label}
          helpText={projectSummaryConfig.helpText}
          isRequired={projectSummaryConfig.isRequired}
        />
      )}

      {fileUploadConfig && (
        <UploadFile
          id='fileUpload'
          label={fileUploadConfig.label}
          helpText={fileUploadConfig.helpText}
          isRequired={fileUploadConfig.isRequired}
          dropzoneProps={fileUploadConfig.dropzoneProps}
        />
      )}

      {projectRepoConfig && (
        <TextField
          id='projectRepo'
          label={projectRepoConfig.label}
          helpText={projectRepoConfig.helpText}
          isRequired={projectRepoConfig.isRequired}
        />
      )}

      {domainConfig && (
        <Controller
          name='domain'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field
              id='domain'
              label={domainConfig.label}
              error={error}
              isRequired={domainConfig.isRequired}
              helpText={domainConfig.helpText}
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
      )}

      {outputConfig && (
        <Controller
          name='output'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field
              id='output'
              label={outputConfig.label}
              error={error}
              isRequired={outputConfig.isRequired}
              helpText={outputConfig.helpText}
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
      )}
    </Stack>
  );
};
