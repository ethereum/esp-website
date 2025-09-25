import { Stack, Radio, RadioGroup } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageSection, PageText } from '../../UI';
import { TextField, TextAreaField, Field } from '../fields';

export const AdditionalDetailsSection: FC = () => {
  const { control } = useFormContext();

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Additional Details</PageSection>

      <Controller
        name='repeatApplicant'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field
            id='repeatApplicant'
            label='Have you applied before to any grants at the Ethereum Foundation?'
            error={error}
            isRequired
          >
            <RadioGroup onChange={val => onChange(val === 'true')} value={value?.toString()}>
              <Stack direction='row' spacing={4}>
                <Radio value='true'>
                  <PageText fontSize='input'>Yes</PageText>
                </Radio>
                <Radio value='false'>
                  <PageText fontSize='input'>No</PageText>
                </Radio>
              </Stack>
            </RadioGroup>
          </Field>
        )}
      />

      <TextField
        id='referral'
        label='Referral(s)'
        helpText='Do you have an Ethereum Foundation referral for this project?'
        isRequired
      />

      <TextField id='additionalInfo' label='Additional questions or comments?' />

      <Controller
        name='opportunityOutreachConsent'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field
            id='opportunityOutreachConsent'
            label='Allow contact from Ethereum Foundation about other opportunities?'
            error={error}
          >
            <RadioGroup onChange={val => onChange(val === 'true')} value={value?.toString()}>
              <Stack direction='row' spacing={4}>
                <Radio value='true'>
                  <PageText fontSize='input'>Yes</PageText>
                </Radio>
                <Radio value='false'>
                  <PageText fontSize='input'>No</PageText>
                </Radio>
              </Stack>
            </RadioGroup>
          </Field>
        )}
      />
    </Stack>
  );
};
