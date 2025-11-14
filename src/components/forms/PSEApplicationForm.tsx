import { Center, Flex, Stack, RadioGroup, Radio, useToast, Collapse, Link } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import { DropdownIndicator, PageSection, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field, TextField, TextAreaField } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  FIAT_CURRENCY_OPTIONS,
  TIMEZONE_OPTIONS,
  PSE_PROJECTS_OPTIONS
} from './constants';
import { TOAST_OPTIONS, PSE_APPLICATION_THANK_YOU_PAGE_URL } from '../../constants';

import { PSEData, PSESchema } from './schemas/PSEGrants';

export const PSEApplicationForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<PSEData>({
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      isOpenSource: false,
      repeatApplicant: false,
      fiatCurrency: 'USD'
    },
    resolver: zodResolver(PSESchema)
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting }
  } = methods;

  const isOpenSource = watch('isOpenSource');

  const onSubmit: SubmitHandler<PSEData> = async data => {
    return api.pseGrants
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(PSE_APPLICATION_THANK_YOU_PAGE_URL);
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
      bgGradient='linear(to-b, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={{ base: 5, md: 12 }}
      pt={{ base: 8, md: 12 }}
      pb={{ base: 20, md: 16 }}
      borderRadius={{ md: '10px' }}
    >
      <FormProvider {...methods}>
        <Flex
          as='form'
          id='pse-application-form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          direction='column'
          gap={8}
        >
          <PageSection mt={12}>Project Details</PageSection>

          <TextField id='projectName' label='Project Name' isRequired />

          <TextAreaField id='projectDescription' label='Project Description' isRequired />

          <TextAreaField
            id='impact'
            label='Short Rationale'
            helpText='Describe the potential impact of this project, how it differs from similar ones, and how it will result in a public good.'
            isRequired
          />

          <Controller
            name='isOpenSource'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field id='isOpenSource' label='Will your results be open source?' isRequired>
                <RadioGroup
                  id='isOpenSource'
                  onChange={value => onChange(value === 'Yes')}
                  value={value ? 'Yes' : 'No'}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio id='open-source-yes' size='lg' name='isOpenSource' value='Yes' mr={8}>
                      <PageText fontSize='input'>Yes</PageText>
                    </Radio>
                    <Radio id='open-source-no' size='lg' name='isOpenSource' value='No'>
                      <PageText fontSize='input'>No</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Field>
            )}
          />

          <Collapse in={isOpenSource}>
            <TextAreaField
              id='openSourceDetails'
              label='Open Source Details'
              helpText='Please provide details about your open source license and how you plan to manage the project as open source.'
              isRequired={isOpenSource}
            />
          </Collapse>

          <TextField
            id='proposalAttachment'
            label='Proposal URL'
            helpText={
              <div>
                Include below a link to your detailed project proposal. Use the HackMD proposal
                template{' '}
                <Link
                  fontWeight={700}
                  color='brand.orange.100'
                  href='https://hackmd.io/@28POrCkqSYCpNAIdvae0ag/r1trYkmIh'
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                >
                  here
                </Link>
                .
              </div>
            }
            isRequired
          />

          <TextField
            id='projectRepoLink'
            label='Project Repository'
            helpText='Provide a link to your project repository.'
            isRequired
          />

          <Stack>
            <Stack>
              <PageText display='inline' fontSize='input'>
                Requested amount
              </PageText>

              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                Estimated grant amount, i.e. USD 50,000. Proposals should include a detailed budget
                breakdown for requested amount.
              </PageText>
            </Stack>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
              <Controller
                name='fiatCurrency'
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Field id='fiatCurrency' label='Fiat currency' error={error} isRequired>
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
                      selectedOptionColorScheme='brand.option'
                      chakraStyles={chakraStyles}
                    />
                  </Field>
                )}
              />

              <TextField id='requestedAmount' label='Total Budget Request' isRequired />
            </Flex>
          </Stack>

          <PageSection mt={12}>Applicant Details</PageSection>

          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <TextField id='firstName' label='First Name' isRequired />
            <TextField id='lastName' label='Last Name' isRequired />
          </Flex>

          <TextField id='email' label='Email' isRequired />
          <TextField id='company' label='Organization / Team' />
          <TextField id='website' label='Website' isRequired />
          <TextField id='discord' label='Discord' />
          <TextField id='twitter' label='Twitter' />
          <TextField
            id='alternativeContact'
            label='Notion Account'
            helpText='Insert Notion account email if different from the above email'
          />
          <TextField
            id='city'
            label='City'
            helpText='City that the organization or primary contact is based in.'
          />

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
                  selectedOptionColorScheme='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Field>
            )}
          />

          <Controller
            name='countriesOfTeam'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='countriesOfTeam'
                label='Countries of Team'
                helpText='If you are a team of distributed researchers, please indicate where your fellow researchers are located. You can write as many countries as needed.'
                error={error}
              >
                <Select
                  id='countriesOfTeam'
                  options={COUNTRY_OPTIONS}
                  isMulti
                  onChange={selectedOptions => {
                    onChange(
                      (selectedOptions as typeof COUNTRY_OPTIONS)
                        .map(option => option.value)
                        .join(',')
                    );
                  }}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColorScheme='brand.option'
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
                label='Time Zone'
                helpText='Please choose your current time zone to help us schedule calls.'
                error={error}
                isRequired
              >
                <Select
                  id='timezone'
                  options={TIMEZONE_OPTIONS}
                  onChange={option => {
                    onChange((option as (typeof TIMEZONE_OPTIONS)[number]).value);
                  }}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColorScheme='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Field>
            )}
          />

          <PageSection mt={12}>Additional Information</PageSection>

          <Controller
            name='relatedPSEProject'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='relatedPSEProject'
                label='Related PSE Project'
                helpText={
                  <div>
                    Which PSE project does your proposal relate to? See the{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://pse.dev/en/projects'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      complete list of PSE projects
                    </Link>
                  </div>
                }
                error={error}
                isRequired
              >
                <Select
                  id='relatedPSEProject'
                  options={PSE_PROJECTS_OPTIONS}
                  isMulti
                  onChange={selectedOptions => {
                    onChange(
                      (selectedOptions as typeof PSE_PROJECTS_OPTIONS)
                        .map(option => option.value)
                        .join(',')
                    );
                  }}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColorScheme='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Field>
            )}
          />

          <TextField
            id='referrals'
            label='PSE Contact'
            helpText='Please provide the name of the person at PSE you have discussed this project with or who directed you to apply, if applicable.'
            isRequired
          />

          <TextAreaField
            id='sustainabilityPlan'
            label='What are your plans after the grant is completed?'
          />

          <TextAreaField
            id='otherProjects'
            label="If you didn't work on this project, what would you work on instead?"
          />

          <Controller
            name='repeatApplicant'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field
                id='repeatApplicant'
                label='Have you applied before to any grants at the Ethereum Foundation?'
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
            label='Additional Information'
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
