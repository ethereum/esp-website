import { Center, Checkbox, Flex, Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import { PageText, DropdownIndicator, PageSection } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field, TextAreaField, TextField, DateField } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  FIAT_CURRENCY_OPTIONS,
  TIMEZONE_OPTIONS,
  DESTINO_DEVCONNECT_CATEGORY_OPTIONS,
  DESTINO_DEVCONNECT_EVENT_TYPE_OPTIONS,
  DESTINO_DEVCONNECT_REFERRAL_SOURCE_OPTIONS,
  EVENT_FORMAT_OPTIONS
} from './constants';
import { DEVCON_GRANTS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { DestinoDevconnectSchema, DestinoDevconnectData } from './schemas/DestinoDevconnect';

export const DestinoDevconnectForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<DestinoDevconnectData>({
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      repeatApplicant: false,
      canTheEFReachOut: true,
      requestedSupport: []
    },
    resolver: zodResolver(DestinoDevconnectSchema)
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting }
  } = methods;

  // for conditional fields, get the current values
  const category = watch('category');
  const requestedSupport = watch('requestedSupport');
  const isCommunityInitiative = category === 'Community Initiative';
  const isNonFinancial = category === 'Non-Financial Support';
  const isTeam = watch('applyingAs') === 'A team';
  const isInPerson = watch('inPerson') === 'In-person';
  const isFreeTickets = requestedSupport?.includes('Tickets');
  const isVoucherCodes = requestedSupport?.includes('Vouchers');
  const isScholarships = requestedSupport?.includes('Scholarship');

  const onSubmit = async (data: DestinoDevconnectData) => {
    const payload: DestinoDevconnectData = { ...data };

    if (payload.applyingAs === 'An individual') {
      payload.company = '';
    }

    return api.destinoDevconnect
      .submit(payload)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(DEVCON_GRANTS_THANK_YOU_PAGE_URL);
        } else {
          toast({
            ...TOAST_OPTIONS,
            title: 'Something went wrong while submitting, please try again.',
            status: 'error'
          });
          res.text().then(text => {
            console.error('API Error Response:', text);
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

            <Controller
              name='applyingAs'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Field
                  id='applyingAs'
                  label='Are you submitting on behalf of a team, or as an individual?'
                  error={error}
                  isRequired
                >
                  <RadioGroup onChange={onChange} value={value}>
                    <Stack direction='row' spacing={4}>
                      <Radio value='An individual'>
                        <PageText fontSize='input'>Individual</PageText>
                      </Radio>
                      <Radio value='A team'>
                        <PageText fontSize='input'>Team</PageText>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Field>
              )}
            />

            {isTeam && <TextField id='company' label='Name of organization or entity' isRequired />}

            <TextAreaField id='teamProfile' label='Profile' isRequired />
            <TextAreaField id='previousWork' label='Previous Work' isRequired />
            <TextField id='twitter' label='Twitter Handle(s)' />
            <TextField
              id='alternativeContact'
              label='Telegram Username or Alternative Contact Info'
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

            <Controller
              name='category'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field id='category' label='Category' error={error} isRequired>
                  <Select
                    id='category'
                    options={DESTINO_DEVCONNECT_CATEGORY_OPTIONS}
                    onChange={option => {
                      onChange(
                        (option as (typeof DESTINO_DEVCONNECT_CATEGORY_OPTIONS)[number]).value
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

            <PageSection>Requested Support</PageSection>

            <Controller
              name='requestedSupport'
              control={control}
              render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
                <Field
                  id='requestedSupport'
                  label='Do you need free tickets, voucher codes for discounted tickets, and/or scholarships?'
                  error={error}
                >
                  <Stack direction='row' spacing={4}>
                    <Checkbox
                      isChecked={value.includes('Tickets')}
                      onChange={e => {
                        const newValue = e.target.checked
                          ? [...value, 'Tickets']
                          : value.filter(v => v !== 'Tickets');
                        onChange(newValue);
                      }}
                    >
                      <PageText fontSize='input'>Free tickets</PageText>
                    </Checkbox>
                    <Checkbox
                      isChecked={value.includes('Vouchers')}
                      onChange={e => {
                        const newValue = e.target.checked
                          ? [...value, 'Vouchers']
                          : value.filter(v => v !== 'Vouchers');
                        onChange(newValue);
                      }}
                    >
                      <PageText fontSize='input'>Voucher codes for discounted tickets</PageText>
                    </Checkbox>
                    <Checkbox
                      isChecked={value.includes('Scholarship')}
                      onChange={e => {
                        const newValue = e.target.checked
                          ? [...value, 'Scholarship']
                          : value.filter(v => v !== 'Scholarship');
                        onChange(newValue);
                      }}
                    >
                      <PageText fontSize='input'>Scholarships</PageText>
                    </Checkbox>
                  </Stack>
                </Field>
              )}
            />

            {isFreeTickets && (
              <TextField
                id='ticketRequest'
                label='Number of tickets requested'
                isRequired={isFreeTickets}
              />
            )}

            {isVoucherCodes && (
              <TextField
                id='voucherRequest'
                label='Number of voucher codes requested'
                isRequired={isVoucherCodes}
              />
            )}

            {isScholarships && (
              <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                <Controller
                  name='fiatCurrency'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Field
                      id='fiatCurrency'
                      label='Fiat Currency'
                      error={error}
                      isRequired={isScholarships}
                    >
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

                <TextField
                  id='requestedAmount'
                  label='Scholarship amount'
                  isRequired={isScholarships}
                />
              </Flex>
            )}

            {(isFreeTickets || isVoucherCodes) && (
                <TextField
                  id='additionalSupportRequests'
                  label='How will the tickets be distributed, and who will be receiving these tickets?'
                  isRequired={isFreeTickets || isVoucherCodes}
                />
              )}

            {isCommunityInitiative && (
              <>
                <PageSection>Project Details</PageSection>

                <TextField id='projectName' label='Project name' isRequired />
                <TextAreaField id='projectDescription' label='Project Summary' isRequired />
                <TextField id='projectRepoLink' label='Project Repo Link' />
                <TextAreaField
                  id='problemBeingSolved'
                  label='Why do you need free tickets, vouchers or scholarships?'
                  helpText='What problem, gap, or opportunity are you tackling through your initiative?'
                  isRequired
                />
                <TextAreaField
                  id='impact'
                  label='Why do you believe your community should receive this support, and who do you plan to select to receive this support?'
                  isRequired
                />

                <TextAreaField id='proposedTimeline' label='Budget breakdown' isRequired />
              </>
            )}

            {isNonFinancial && (
              <>
                <TextAreaField
                  id='nonFinancialSupportRequest'
                  label='Non-financial support request'
                  helpText='How are you hoping we can help? Please provide details of your non-financial support request.'
                  isRequired
                />

                <PageSection>Event Details</PageSection>

                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                  <TextField id='eventName' label='Event Name' isRequired />
                  <DateField id='eventDate' label='Event Date' isRequired />
                </Flex>

                <TextField id='eventLink' label='Event Link' />
                <TextAreaField id='eventDescription' label='Event Summary' isRequired />
                <TextAreaField
                  id='eventTopics'
                  label='Event topics'
                  helpText="Please briefly describe the topics you plan to cover at this event (e.g. stablecoins, local governance, institutional adoption, identity, community building, etc.) and how you'll explore how Ethereum can create real-world impact in Argentina and Latin America."
                  isRequired
                />

                <Controller
                  name='typeOfEvent'
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <Field
                      id='typeOfEvent'
                      label='What type of event is this?'
                      error={error}
                      isRequired
                    >
                      <Select
                        id='typeOfEvent'
                        options={DESTINO_DEVCONNECT_EVENT_TYPE_OPTIONS}
                        onChange={option => {
                          onChange(
                            (option as (typeof DESTINO_DEVCONNECT_EVENT_TYPE_OPTIONS)[number]).value
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

                <Controller
                  name='inPerson'
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <Field
                      id='inPerson'
                      label='Is your event in-person or online?'
                      error={error}
                      isRequired
                    >
                      <Select
                        id='inPerson'
                        options={EVENT_FORMAT_OPTIONS}
                        onChange={option => {
                          onChange((option as (typeof EVENT_FORMAT_OPTIONS)[number]).value);
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

                {isInPerson && <TextField id='eventLocation' label='Event Location' isRequired />}

                <TextField
                  id='estimatedAttendees'
                  label='Estimated number of attendees/registrants'
                  isRequired
                />
                <TextAreaField id='targetAudience' label='Target audience' isRequired />
                <TextAreaField id='confirmedSpeakers' label='Confirmed speakers' />
                <TextAreaField id='confirmedSponsors' label='Confirmed sponsors' />
                <TextAreaField id='proposedTimeline' label='Budget breakdown' isRequired />
              </>
            )}

            <PageSection>Additional Details</PageSection>

            <Controller
              name='referralSource'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field
                  id='referralSource'
                  label='How did you hear about the Devconnect Frens Program?'
                  error={error}
                  isRequired
                >
                  <Select
                    id='referralSource'
                    options={DESTINO_DEVCONNECT_REFERRAL_SOURCE_OPTIONS}
                    onChange={option => {
                      onChange(
                        (option as (typeof DESTINO_DEVCONNECT_REFERRAL_SOURCE_OPTIONS)[number])
                          .value
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

            <TextAreaField
              id='futureEvents'
              label='Do you plan on organizing more events or initiatives around Devconnect? If yes, please share more details about them.'
            />

            <TextAreaField
              id='referrals'
              label='Did anyone recommend that you submit an application to the Devconnect Frens Program?'
            />
            <TextAreaField
              id='additionalInfo'
              label='Do you have any questions about the Devconnect Frens Program?'
            />

            <Controller
              name='repeatApplicant'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Field
                  id='repeatApplicant'
                  label='Have you applied before to any grants at the Ethereum Foundation?'
                >
                  <RadioGroup
                    onChange={value => onChange(value === 'Yes')}
                    value={value ? 'Yes' : 'No'}
                  >
                    <Stack direction='row' spacing={4}>
                      <Radio value='Yes'>
                        <PageText fontSize='input'>Yes</PageText>
                      </Radio>
                      <Radio value='No'>
                        <PageText fontSize='input'>No</PageText>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Field>
              )}
            />

            <Controller
              name='canTheEFReachOut'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Field
                  id='canTheEFReachOut'
                  label='Have you applied for or received other funding?'
                >
                  <RadioGroup
                    onChange={value => onChange(value === 'true')}
                    value={value ? 'true' : 'false'}
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
