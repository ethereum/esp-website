import { Stack, Radio, RadioGroup } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageSection, PageText } from '../../UI';
import { TextField, Field } from '../fields';

interface FieldCustomization {
  label?: string;
  helpText?: string;
}

interface AdditionalDetailsSectionProps {
  customText?: {
    repeatApplicant?: FieldCustomization;
    referral?: FieldCustomization;
    additionalInfo?: FieldCustomization;
    opportunityOutreachConsent?: FieldCustomization;
  };
}

export const AdditionalDetailsSection: FC<AdditionalDetailsSectionProps> = ({ customText }) => {
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
            label={
              customText?.repeatApplicant?.label ||
              'Have you applied before to any grants at the Ethereum Foundation?'
            }
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
        label={customText?.referral?.label || 'Referral(s)'}
        helpText={
          customText?.referral?.helpText ||
          'Do you have an Ethereum Foundation referral for this project?'
        }
        isRequired
      />

      <TextField
        id='additionalInfo'
        label={customText?.additionalInfo?.label || 'Additional questions or comments?'}
        helpText={customText?.additionalInfo?.helpText}
      />

      <Controller
        name='opportunityOutreachConsent'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Field
            id='opportunityOutreachConsent'
            label={
              customText?.opportunityOutreachConsent?.label ||
              'Allow contact from Ethereum Foundation about other opportunities?'
            }
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
