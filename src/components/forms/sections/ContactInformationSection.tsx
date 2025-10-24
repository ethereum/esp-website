import { Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageSection } from '../../UI';
import { TextField, Field } from '../fields';
import { Select } from 'chakra-react-select';
import { DropdownIndicator } from '../../UI';
import { chakraStyles } from '../selectStyles';

import { COUNTRY_OPTIONS, TIMEZONE_OPTIONS, PROFILE_TYPE_OPTIONS } from '../constants';

interface FieldConfig {
  label?: string;
  helpText?: string;
  isRequired?: boolean;
}

interface ContactInformationSectionProps {
  fields?: {
    firstName?: FieldConfig | false;
    lastName?: FieldConfig | false;
    email?: FieldConfig | false;
    company?: FieldConfig | false;
    profileType?: FieldConfig | false;
    otherProfileType?: FieldConfig | false;
    alternativeContact?: FieldConfig | false;
    website?: FieldConfig | false;
    country?: FieldConfig | false;
    timezone?: FieldConfig | false;
  };
}

// Default configurations for each field
const DEFAULT_FIELDS = {
  firstName: {
    label: 'First name',
    isRequired: true
  },
  lastName: {
    label: 'Last name',
    isRequired: true
  },
  email: {
    label: 'Email',
    isRequired: true
  },
  company: {
    label: 'Company',
    helpText:
      'Name of company, team, or organization. If you do not have an organization name, write "N/A"',
    isRequired: true
  },
  profileType: {
    label: 'Profile Type',
    isRequired: true
  },
  otherProfileType: {
    label: 'If Other',
    isRequired: false
  },
  alternativeContact: {
    label: 'Alternative Contact Info',
    isRequired: false
  },
  website: {
    label: 'Website',
    isRequired: false
  },
  country: {
    label: 'Country',
    isRequired: true
  },
  timezone: {
    label: 'Time Zone',
    isRequired: true
  }
};

export const ContactInformationSection: FC<ContactInformationSectionProps> = ({ fields }) => {
  const { control, watch } = useFormContext();

  const watchProfileType = watch('profileType');
  const isOtherProfileType = watchProfileType === 'Other';

  // Merge provided fields config with defaults
  const firstNameConfig =
    fields?.firstName === false ? null : { ...DEFAULT_FIELDS.firstName, ...fields?.firstName };

  const lastNameConfig =
    fields?.lastName === false ? null : { ...DEFAULT_FIELDS.lastName, ...fields?.lastName };

  const emailConfig =
    fields?.email === false ? null : { ...DEFAULT_FIELDS.email, ...fields?.email };

  const companyConfig =
    fields?.company === false ? null : { ...DEFAULT_FIELDS.company, ...fields?.company };

  const profileTypeConfig =
    fields?.profileType === false
      ? null
      : { ...DEFAULT_FIELDS.profileType, ...fields?.profileType };

  const otherProfileTypeConfig =
    fields?.otherProfileType === false
      ? null
      : { ...DEFAULT_FIELDS.otherProfileType, ...fields?.otherProfileType };

  const alternativeContactConfig =
    fields?.alternativeContact === false
      ? null
      : { ...DEFAULT_FIELDS.alternativeContact, ...fields?.alternativeContact };

  const websiteConfig =
    fields?.website === false ? null : { ...DEFAULT_FIELDS.website, ...fields?.website };

  const countryConfig =
    fields?.country === false ? null : { ...DEFAULT_FIELDS.country, ...fields?.country };

  const timezoneConfig =
    fields?.timezone === false ? null : { ...DEFAULT_FIELDS.timezone, ...fields?.timezone };

  const showNameFields = firstNameConfig || lastNameConfig;
  const showLocationFields = countryConfig || timezoneConfig;

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Contact Information</PageSection>

      {showNameFields && (
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          {firstNameConfig && (
            <TextField
              id='firstName'
              label={firstNameConfig.label}
              helpText={firstNameConfig.helpText}
              isRequired={firstNameConfig.isRequired}
            />
          )}
          {lastNameConfig && (
            <TextField
              id='lastName'
              label={lastNameConfig.label}
              helpText={lastNameConfig.helpText}
              isRequired={lastNameConfig.isRequired}
            />
          )}
        </Flex>
      )}

      {emailConfig && (
        <TextField
          id='email'
          label={emailConfig.label}
          helpText={emailConfig.helpText}
          isRequired={emailConfig.isRequired}
        />
      )}

      {companyConfig && (
        <TextField
          id='company'
          label={companyConfig.label}
          helpText={companyConfig.helpText}
          isRequired={companyConfig.isRequired}
        />
      )}

      {profileTypeConfig && (
        <Controller
          name='profileType'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field
              id='profileType'
              label={profileTypeConfig.label}
              error={error}
              isRequired={profileTypeConfig.isRequired}
              helpText={profileTypeConfig.helpText}
            >
              <Select
                value={PROFILE_TYPE_OPTIONS.find(option => option.value === value) || null}
                onChange={selectedOption =>
                  onChange((selectedOption as (typeof PROFILE_TYPE_OPTIONS)[number])?.value)
                }
                options={PROFILE_TYPE_OPTIONS}
                placeholder='Select profile type'
                components={{ DropdownIndicator }}
                chakraStyles={chakraStyles}
              />
            </Field>
          )}
        />
      )}

      {isOtherProfileType && otherProfileTypeConfig && (
        <TextField
          id='otherProfileType'
          label={otherProfileTypeConfig.label}
          helpText={otherProfileTypeConfig.helpText}
          isRequired={otherProfileTypeConfig.isRequired}
        />
      )}

      {alternativeContactConfig && (
        <TextField
          id='alternativeContact'
          label={alternativeContactConfig.label}
          helpText={alternativeContactConfig.helpText}
          isRequired={alternativeContactConfig.isRequired}
        />
      )}

      {websiteConfig && (
        <TextField
          id='website'
          label={websiteConfig.label}
          helpText={websiteConfig.helpText}
          isRequired={websiteConfig.isRequired}
        />
      )}

      {showLocationFields && (
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          {countryConfig && (
            <Controller
              name='country'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Field
                  id='country'
                  label={countryConfig.label}
                  error={error}
                  isRequired={countryConfig.isRequired}
                  helpText={countryConfig.helpText}
                >
                  <Select
                    value={COUNTRY_OPTIONS.find(option => option.value === value) || null}
                    onChange={selectedOption =>
                      onChange((selectedOption as (typeof COUNTRY_OPTIONS)[number])?.value)
                    }
                    options={COUNTRY_OPTIONS}
                    placeholder='Select country'
                    components={{ DropdownIndicator }}
                    chakraStyles={chakraStyles}
                  />
                </Field>
              )}
            />
          )}

          {timezoneConfig && (
            <Controller
              name='timezone'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Field
                  id='timezone'
                  label={timezoneConfig.label}
                  error={error}
                  isRequired={timezoneConfig.isRequired}
                  helpText={timezoneConfig.helpText}
                >
                  <Select
                    value={TIMEZONE_OPTIONS.find(option => option.value === value) || null}
                    onChange={selectedOption =>
                      onChange((selectedOption as (typeof TIMEZONE_OPTIONS)[number])?.value)
                    }
                    options={TIMEZONE_OPTIONS}
                    placeholder='Select time zone'
                    components={{ DropdownIndicator }}
                    chakraStyles={chakraStyles}
                  />
                </Field>
              )}
            />
          )}
        </Flex>
      )}
    </Stack>
  );
};
