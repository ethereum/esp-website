import { Box, Center, Flex, Stack, useToast, Radio, RadioGroup } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

import { PageSection, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from './fields';
import { TextField, TextAreaField, Field, UploadFile } from './fields';
import { Select } from 'chakra-react-select';
import { DropdownIndicator } from '../UI';
import { chakraStyles } from './selectStyles';

import { api } from './api';
import { RFPSchema, RFPData, RFPItem } from './schemas/RFP';
import { RFP_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';
import {
  COUNTRY_OPTIONS,
  FIAT_CURRENCY_OPTIONS,
  TIMEZONE_OPTIONS,
  PROFILE_TYPE_OPTIONS,
  DOMAIN_OPTIONS,
  OUTPUT_OPTIONS
} from './constants';

interface RFPFormProps {
  rfpItem: RFPItem;
}

export const RFPForm: FC<RFPFormProps> = ({ rfpItem }) => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<RFPData>({
    resolver: zodResolver(RFPSchema),
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      selectedRFPId: rfpItem.Id
    }
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, isSubmitting },
    reset
  } = methods;

  const watchProfileType = watch('profileType');
  const isOtherProfileType = watchProfileType === 'Other';

  const onSubmit = async (data: RFPData) => {
    return api.rfp
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(RFP_THANK_YOU_PAGE_URL);
        } else {
          toast({
            ...TOAST_OPTIONS,
            title: 'Something went wrong while submitting, please try again.',
            status: 'error'
          });
          throw new Error('Network response was not OK');
        }
      })
      .catch(err => console.error('There has been a problem with your operation: ', err.message));
  };

  return (
    <Stack
      w='100%'
      bgGradient='linear(to-br, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={{ base: 5, md: 12 }}
      pt={{ base: 8, md: 12 }}
      pb={{ base: 20, md: 16 }}
      borderRadius={{ md: '10px' }}
    >
      <FormProvider {...methods}>
        <form id='rfp-form' onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8}>
            {/* Selected RFP Item Display */}
            <Box
              p={6}
              bg='white'
              borderRadius='lg'
              borderLeft='4px solid'
              borderLeftColor='brand.orange.100'
            >
              <Stack spacing={2}>
                <PageText fontSize='sm' color='brand.helpText' fontWeight='600'>
                  Selected RFP:
                </PageText>
                <PageText fontSize='lg' fontWeight='700' color='brand.heading'>
                  {rfpItem.Name}
                </PageText>
                <PageText fontSize='sm' color='brand.paragraph'>
                  {rfpItem.Description__c}
                </PageText>
              </Stack>
            </Box>

            {/* Contact Information Section */}
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

            {/* Project Overview Section */}
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
                          onChange(
                            (selectedOption as (typeof FIAT_CURRENCY_OPTIONS)[number])?.value
                          )
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

            {/* Additional Details Section */}
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
                    <RadioGroup
                      onChange={val => onChange(val === 'true')}
                      value={value?.toString()}
                    >
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

              <TextAreaField
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
                    <RadioGroup
                      onChange={val => onChange(val === 'true')}
                      value={value?.toString()}
                    >
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

            <Center mb={12}>
              <Captcha />
            </Center>

            <Center>
              <SubmitButton
                isValid={isValid}
                isSubmitting={isSubmitting}
                height='56px'
                width='310px'
                text='Submit Application'
              />
            </Center>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};
