import { Stack, Radio, RadioGroup } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextareaProps } from '@chakra-ui/react';

import { PageSection, PageText } from '../../UI';
import { TextField, TextAreaField, Field } from '../fields';

interface FieldConfig {
  label?: string;
  helpText?: string;
  isRequired?: boolean;
  textareaProps?: Pick<TextareaProps, 'rows' | 'resize'>;
}

interface AdditionalDetailsSectionProps {
  fields?: {
    repeatApplicant?: FieldConfig | false;
    referral?: FieldConfig | false;
    additionalInfo?: FieldConfig | false;
    opportunityOutreachConsent?: FieldConfig | false;
  };
}

// Default configurations for each field
const DEFAULT_FIELDS = {
  repeatApplicant: {
    label: 'Have you applied before to any grants at the Ethereum Foundation?',
    isRequired: true
  },
  referral: {
    label: 'Referral(s)',
    helpText: 'Do you have an Ethereum Foundation referral for this project?',
    isRequired: true
  },
  additionalInfo: {
    label: 'Additional questions or comments?',
    isRequired: false,
    textareaProps: {
      rows: 3,
      resize: 'vertical' as const
    }
  },
  opportunityOutreachConsent: {
    label: 'Allow contact from Ethereum Foundation about other opportunities?',
    isRequired: false
  }
};

export const AdditionalDetailsSection: FC<AdditionalDetailsSectionProps> = ({ fields }) => {
  const { control } = useFormContext();

  // Merge provided fields config with defaults
  const repeatApplicantConfig =
    fields?.repeatApplicant === false
      ? null
      : { ...DEFAULT_FIELDS.repeatApplicant, ...fields?.repeatApplicant };

  const referralConfig =
    fields?.referral === false ? null : { ...DEFAULT_FIELDS.referral, ...fields?.referral };

  const additionalInfoConfig =
    fields?.additionalInfo === false
      ? null
      : { ...DEFAULT_FIELDS.additionalInfo, ...fields?.additionalInfo };

  const opportunityOutreachConsentConfig =
    fields?.opportunityOutreachConsent === false
      ? null
      : { ...DEFAULT_FIELDS.opportunityOutreachConsent, ...fields?.opportunityOutreachConsent };

  return (
    <Stack spacing={6}>
      <PageSection mt={12}>Additional Details</PageSection>

      {repeatApplicantConfig && (
        <Controller
          name='repeatApplicant'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field
              id='repeatApplicant'
              label={repeatApplicantConfig.label}
              error={error}
              isRequired={repeatApplicantConfig.isRequired}
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
      )}

      {referralConfig && (
        <TextField
          id='referral'
          label={referralConfig.label}
          helpText={referralConfig.helpText}
          isRequired={referralConfig.isRequired}
        />
      )}

      {additionalInfoConfig && (
        <TextAreaField
          id='additionalInfo'
          label={additionalInfoConfig.label}
          helpText={additionalInfoConfig.helpText}
          isRequired={additionalInfoConfig.isRequired}
          textareaProps={additionalInfoConfig.textareaProps}
        />
      )}

      {opportunityOutreachConsentConfig && (
        <Controller
          name='opportunityOutreachConsent'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Field
              id='opportunityOutreachConsent'
              label={opportunityOutreachConsentConfig.label}
              error={error}
              isRequired={opportunityOutreachConsentConfig.isRequired}
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
      )}
    </Stack>
  );
};
