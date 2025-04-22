import { Center, Flex, Stack, useToast } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import { DropdownIndicator, PageSection } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field, TextAreaField, TextField, DateField } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  FIAT_CURRENCY_OPTIONS,
  TIMEZONE_OPTIONS,
  REFERRAL_SOURCE_OPTIONS
} from './constants';
import { TEN_YEAR_ANNIVERSARY_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { TenYearAnniversarySchema, TenYearAnniversaryData } from './schemas/TenYearAnniversary';

export const TenYearAnniversaryFrom: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<TenYearAnniversaryData>({
    mode: 'all',
    shouldFocusError: true,
    resolver: zodResolver(TenYearAnniversarySchema)
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data: TenYearAnniversaryData) => {
    return api.tenYearAnniversary
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(TEN_YEAR_ANNIVERSARY_THANK_YOU_PAGE_URL);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={10}>
            <PageSection>Contact Information</PageSection>

            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
              <TextField id='firstName' label='First Name' isRequired />
              <TextField id='lastName' label='Last Name' isRequired />
            </Flex>

            <TextField id='email' label='Email' isRequired />

            <TextField id='company' label='Name of company, team, or organization. If you do not have an organization name, write "N/A"' isRequired />
            <TextAreaField id='teamProfile' label='Tell us about yourself, your experience, and your motivations. Feel free to link to any biography pages, LinkedIn pages, etc.' isRequired />
            <TextAreaField id='previousWork' label='List of any previous events you’ve organized.' isRequired />
            <TextField id='twitter' label='Twitter Handle(s)' />
            <TextField
              id='alternativeContact'
              label="We will contact you via email by default. As backup, if you'd like to provide alternative contact info, you may do so."
            />

            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
              <Controller
                name='country'
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <Field id='country' label='Country' error={error} isRequired>
                    <Select
                      id='country'
                      options={COUNTRY_OPTIONS}
                      onChange={option => {
                        onChange((option as (typeof COUNTRY_OPTIONS)[number]).value);
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
                  <Field id='timezone' label='Time Zone' error={error} isRequired>
                    <Select
                      id='timezone'
                      options={TIMEZONE_OPTIONS}
                      onChange={option => {
                        onChange((option as (typeof TIMEZONE_OPTIONS)[number]).value);
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

            <PageSection>Event Details</PageSection>

            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
              <TextField id='eventName' label='Event Name' isRequired />
              <DateField id='eventDate' label='Event Date' isRequired />
            </Flex>

            <TextField id='eventLink' label='Is there a website for this event? Paste the link here.' isRequired />
            <TextAreaField id='eventDescription' label='Describe your event, including planned format and goals for the event.' isRequired />

            <TextField id='eventLocation' label='Event Location' isRequired />
            <TextAreaField id='proposedTimeline' label='The maximum sponsorship amount for this round is 500 USD. In this space, itemize your anticipated costs. Best estimates are ok if things are not yet confirmed or dependent on final attendee count.' isRequired />

            <PageSection>Choose denominated currency and enter a whole number in the Amount field</PageSection>

            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
              <Controller
                name='fiatCurrency'
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Field id='fiatCurrency' label='Fiat Currency' error={error} isRequired>
                    <Select
                      id='fiatCurrency'
                      value={FIAT_CURRENCY_OPTIONS.find(option => option.value === value)}
                      options={FIAT_CURRENCY_OPTIONS}
                      onChange={option => {
                        onChange((option as (typeof FIAT_CURRENCY_OPTIONS)[number]).value);
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

              <TextField id='requestedAmount' label='Amount' isRequired />
            </Flex>

            <PageSection>Additional Details</PageSection>

            <Controller
              name='referralSource'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field
                  id='referralSource'
                  label='How did you hear about this grant round?'
                  error={error}
                >
                  <Select
                    id='referralSource'
                    options={REFERRAL_SOURCE_OPTIONS}
                    onChange={option => {
                      onChange((option as (typeof REFERRAL_SOURCE_OPTIONS)[number]).value);
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

            <TextAreaField
              id='referrals'
              label='Did anyone recommend that you submit an application to the Ecosystem Support Program?'
            />

            <TextAreaField id='additionalInfo' label="Is there anything we didn't cover in the above questions? Feel free to add any relevant links here. This is optional." />
            

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
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};