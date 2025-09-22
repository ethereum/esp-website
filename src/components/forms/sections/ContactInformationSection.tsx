import { Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageSection } from '../../UI';
import { TextField, Field } from '../fields';
import { Select } from 'chakra-react-select';
import { DropdownIndicator } from '../../UI';
import { chakraStyles } from '../selectStyles';

import {
  COUNTRY_OPTIONS,
  TIMEZONE_OPTIONS,
  PROFILE_TYPE_OPTIONS
} from '../constants';

export const ContactInformationSection: FC = () => {
  const { control, watch } = useFormContext();

  const watchProfileType = watch('profileType');
  const isOtherProfileType = watchProfileType === 'Other';

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Contact Information</PageSection>

      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <TextField id='firstName' label='First name' isRequired />
        <TextField id='lastName' label='Last name' isRequired />
      </Flex>

      <TextField id='email' label='Email' isRequired />

      <TextField
        id='company'
        label='Company'
        helpText='Name of company, team, or organization. If you do not have an organization name, write "N/A"'
        isRequired
      />

      <Controller
        name='profileType'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field id='profileType' label='Profile Type' error={error} isRequired>
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

      {isOtherProfileType && <TextField id='otherProfileType' label='If Other' />}

      <TextField id='alternativeContact' label='Alternative Contact Info' />

      <TextField id='website' label='Website' />

      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Controller
          name='country'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field id='country' label='Country' error={error} isRequired>
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

        <Controller
          name='timezone'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field id='timezone' label='Time Zone' error={error} isRequired>
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
      </Flex>
    </Stack>
  );
};