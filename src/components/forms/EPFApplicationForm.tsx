import { Center, Flex, Stack, RadioGroup, Radio, useToast } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field, TextField, TextAreaField } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  TIMEZONE_OPTIONS,
  INDIVIDUAL,
  TEAM,
  EPF_APPLICATION_PROJECT_CATEGORY_OPTIONS
} from './constants';
import { TOAST_OPTIONS, EPF_APPLICATION_THANK_YOU_PAGE_URL } from '../../constants';

import { EPFData, EPFSchema } from './schemas/EPFApplication';

export const EPFApplicationForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<EPFData>({
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      individualOrTeam: INDIVIDUAL,
      repeatApplicant: false
    },
    resolver: zodResolver(EPFSchema)
  });

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
    reset
  } = methods;

  const onSubmit: SubmitHandler<EPFData> = async data => {
    return api.epfApplication
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(EPF_APPLICATION_THANK_YOU_PAGE_URL);
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
        <Flex
          as='form'
          id='epf-application-form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          direction='column'
          gap={8}
        >
          <Flex direction='column'>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
              <TextField
                id='firstName'
                label='First name'
                isRequired
                mr={{ md: 12 }}
                mb={{ base: 8, md: 0 }}
              />

              <TextField id='lastName' label='Last name' isRequired />
            </Flex>

            {!errors?.firstName && !errors?.lastName && (
              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                Who is the point of contact for the application?
              </PageText>
            )}
          </Flex>

          <TextField id='email' label='Email' isRequired />

          <Controller
            name='individualOrTeam'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field id='individualOrTeam' label='Individual or team?' isRequired>
                <RadioGroup
                  id='individualOrTeam'
                  onChange={onChange}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='repeat-applicant-yes'
                      size='lg'
                      name='individualOrTeam'
                      value={INDIVIDUAL}
                      mr={8}
                    >
                      <PageText fontSize='input'>{INDIVIDUAL}</PageText>
                    </Radio>

                    <Radio id='repeat-applicant-no' size='lg' name='individualOrTeam' value={TEAM}>
                      <PageText fontSize='input'>{TEAM}</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Field>
            )}
          />

          <TextAreaField
            id='teamProfile'
            label='Team profile'
            helpText='Tell us about yourself, your experience, and your motivations. Feel free to link to any biography pages, LinkedIn pages, etc.'
            isRequired
          />

          <TextField id='city' label='City' />

          <Flex direction={{ base: 'column', md: 'row' }} gap={12} mb={3}>
            <Controller
              name='country'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field
                  id='country'
                  label='Country'
                  helpText='Please indicate the country where the Institution/ Lead Investigator is located'
                  error={error}
                  isRequired
                >
                  <Select
                    id='country'
                    options={COUNTRY_OPTIONS}
                    onChange={option => {
                      const value = (option as (typeof COUNTRY_OPTIONS)[number]).value;
                      onChange(value);
                    }}
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />
                </Field>
              )}
            />

            <Controller
              name='timezone'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field
                  id='timezone'
                  label='Time zone'
                  helpText='Please choose your current time zone to help us schedule calls if needed'
                  error={error}
                  isRequired
                >
                  <Select
                    id='timezone'
                    options={TIMEZONE_OPTIONS}
                    onChange={option => {
                      onChange((option as (typeof TIMEZONE_OPTIONS)[number]).value);
                      trigger('timezone');
                    }}
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />
                </Field>
              )}
            />
          </Flex>

          <TextField id='referralSourceIfOther' label='EPF Cohort' isRequired />

          <TextAreaField
            id='referralSource'
            label='EPF Referral'
            helpText="Include the person's name and details of their referral"
          />

          <TextField id='projectName' label='Project name' isRequired />

          <TextAreaField id='projectDescription' label='Brief project summary' isRequired />

          <TextField id='projectRepoLink' label='Project repo link' isRequired />

          <Controller
            name='projectCategory'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field id='projectCategory' label='Project category' error={error} isRequired>
                <Select
                  id='projectCategory'
                  options={EPF_APPLICATION_PROJECT_CATEGORY_OPTIONS}
                  onChange={option => {
                    onChange(
                      (option as (typeof EPF_APPLICATION_PROJECT_CATEGORY_OPTIONS)[number]).value
                    );
                  }}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Field>
            )}
          />

          <TextField id='requestedAmount' label='Budget request' isRequired />

          <TextAreaField
            id='proposedTimeline'
            label='Proposed tasks, roadmap and budget'
            helpText='Provide a timeline and budget breakdown for the proposed scope of work'
            isRequired
          />

          <TextAreaField
            id='progress'
            label='Progress'
            helpText='Detail the current stage and progress of this project'
            isRequired
          />

          <TextAreaField
            id='problemBeingSolved'
            label='What problem(s) are being solved by within the scope of the grant?'
            helpText='What are the specific problems, research questions, or Ethereum protocol needs does this project address?'
            isRequired
          />

          <TextAreaField
            id='sustainabilityPlan'
            label='What are your plans after the grant is completed?'
            isRequired
          />

          <TextAreaField
            id='impact'
            label='What is the potential impact of this work?'
            isRequired
          />

          <TextField
            id='alternativeContact'
            label='Telegram username or alternative contact info'
            helpText="In regards to your submission, we'll get in touch with you via email by default. As backup, if you'd like to provide alternative contact info, you may do so. Not required"
          />

          <Controller
            name='repeatApplicant'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field
                id='repeatApplicant'
                label='Have you applied before to any grants at the Ethereum Foundation?'
                isRequired
              >
                <RadioGroup
                  id='repeatApplicant'
                  onChange={value => onChange(value === 'Yes')}
                  value={value ? 'Yes' : 'No'}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='repeat-applicant-yes'
                      size='lg'
                      name='repeatApplicant'
                      value='Yes'
                      mr={8}
                    >
                      <PageText fontSize='input'>Yes</PageText>
                    </Radio>

                    <Radio
                      id='repeat-applicant-no'
                      size='lg'
                      name='repeatApplicant'
                      value='No'
                      defaultChecked
                    >
                      <PageText fontSize='input'>No</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Field>
            )}
          />

          <TextAreaField
            id='additionalInfo'
            label='Additional information'
            helpText='Feel free to include any additional, relevant information that may not be covered by this form'
          />

          <Center mb={12}>
            <Captcha />
          </Center>

          <Center>
            <SubmitButton
              isValid
              isSubmitting={isSubmitting}
              height='56px'
              width='310px'
              text='Submit Application'
            />
          </Center>
        </Flex>
      </FormProvider>
    </Stack>
  );
};
