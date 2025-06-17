import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, TextField } from '.';
import { TextAreaField } from './fields/TextAreaField';

import { api } from './api';

import { chakraStyles } from './selectStyles';
import {
  ADVICE,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  INDIVIDUAL,
  PROJECT_CATEGORY_OPTIONS,
  TEAM,
  PROJECT_FEEDBACK,
  COUNTRY_OPTIONS,
  TIMEZONE_OPTIONS
} from './constants';
import {
  OFFICE_HOURS_THANK_YOU_PAGE_URL,
  TOAST_OPTIONS,
  MAX_TEXT_AREA_LENGTH,
  MAX_TEXT_LENGTH
} from '../../constants';

import { IndividualOrTeam, OfficeHoursFormData, OfficeHoursRequest } from '../../types';
import { containURL } from '../../utils';

export const OfficeHoursForm: FC = () => {
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>(INDIVIDUAL);
  const [officeHoursRequest, setOfficeHoursRequest] =
    useState<OfficeHoursRequest>(PROJECT_FEEDBACK);
  const router = useRouter();
  const toast = useToast();

  const isTeam = individualOrTeam === TEAM;
  const isRequestingProjectFeedback = officeHoursRequest === PROJECT_FEEDBACK;

  const methods = useForm<OfficeHoursFormData>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    trigger,
    control,
    formState: { errors, isValid, isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: OfficeHoursFormData) => {
    return api.officeHours
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(OFFICE_HOURS_THANK_YOU_PAGE_URL);
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
        <form id='office-hours-form' onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={{ base: 'column', md: 'row' }} mb={8}>
            <TextField
              id='firstName'
              label='First name'
              maxLength={40}
              isRequired
              registerOptions={{
                required: {
                  value: true,
                  message: 'First name is required.'
                },
                maxLength: {
                  value: 40,
                  message: 'First name cannot exceed 40 characters.'
                },
                validate: {
                  containURL: value => !containURL(value) || 'First name cannot contain a URL.'
                }
              }}
              mr={{ md: 12 }}
            />

            <TextField
              id='lastName'
              label='Last name'
              maxLength={80}
              isRequired
              registerOptions={{
                required: {
                  value: true,
                  message: 'Last name is required.'
                },
                maxLength: {
                  value: 80,
                  message: 'Last name cannot exceed 80 characters.'
                },
                validate: {
                  containURL: value => !containURL(value) || 'Last name cannot contain a URL.'
                }
              }}
            />
          </Flex>

          <TextField
            id='email'
            label='Email'
            type='email'
            hideCharCounter
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Email is required.'
              }
            }}
            mb={8}
          />

          {/* If the component doesn't expose input's ref, we should use the Controller component, */}
          {/* which will take care of the registration process (https://react-hook-form.com/get-started#IntegratingwithUIlibraries) */}
          <Controller
            name='individualOrTeam'
            control={control}
            rules={{ required: true }}
            defaultValue={INDIVIDUAL}
            render={({ field: { onChange, value } }) => (
              <FormControl id='individual-or-team-control' isRequired mb={value === TEAM ? 4 : 8}>
                <FormLabel htmlFor='individualOrTeam' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Are you submitting on behalf of a team, or as an individual?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='individualOrTeam'
                  onChange={(value: IndividualOrTeam) => {
                    onChange(value);
                    setIndividualOrTeam(value);
                  }}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                >
                  <Stack direction='row'>
                    <Radio
                      id='individual'
                      size='lg'
                      name='individualOrTeam'
                      value={INDIVIDUAL}
                      defaultChecked
                      mr={8}
                    >
                      <PageText fontSize='input'>{INDIVIDUAL}</PageText>
                    </Radio>

                    <Radio id='team' size='lg' name='individualOrTeam' value='Team'>
                      <PageText fontSize='input'>Team</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Box display={isTeam ? 'block' : 'none'}>
            <Fade in={isTeam} delay={0.25}>
              <TextField
                id='company'
                label='Name of organization or entity'
                helpText="Name of your team or entity you're submitting for. If your organization doesn't have a formal name, just try to describe it in a few words!"
                isRequired={isTeam}
                maxLength={MAX_TEXT_LENGTH}
                registerOptions={{
                  required: {
                    value: isTeam,
                    message: 'Organization name is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_LENGTH,
                    message: `Organization name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                  },
                  validate: {
                    containURL: value =>
                      !containURL(value) || 'Organization name cannot contain a URL.'
                  }
                }}
                mb={8}
              />
            </Fade>
          </Box>

          <Controller
            name='officeHoursRequest'
            control={control}
            rules={{ required: true }}
            defaultValue={PROJECT_FEEDBACK}
            render={({ field: { onChange, value } }) => (
              <FormControl
                id='office-hours-request-control'
                isRequired
                mb={value === PROJECT_FEEDBACK ? 4 : 8}
              >
                <FormLabel htmlFor='officeHoursRequest' mb={2}>
                  <PageText display='inline' fontSize='input' mb={1}>
                    Office Hours Request
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Choose from the options below. For feedback about whether your project is eligible
                  for a grant, click the Project Feedback button.
                </PageText>

                <RadioGroup
                  id='officeHoursRequest'
                  onChange={(value: OfficeHoursRequest) => {
                    onChange(value);
                    setOfficeHoursRequest(value);
                  }}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                  mt={3}
                >
                  <Stack direction='row'>
                    <Radio id='advice' size='lg' name='officeHoursRequest' value={ADVICE} mr={8}>
                      <PageText fontSize='input'>{ADVICE}</PageText>
                    </Radio>

                    <Radio
                      id='project-feedback'
                      size='lg'
                      name='officeHoursRequest'
                      value={PROJECT_FEEDBACK}
                      defaultChecked
                    >
                      <PageText fontSize='input'>{PROJECT_FEEDBACK}</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Box display={isRequestingProjectFeedback ? 'block' : 'none'}>
            <Fade in={isRequestingProjectFeedback} delay={0.25}>
              <TextField
                id='projectName'
                label='Project name'
                isRequired={isRequestingProjectFeedback}
                maxLength={MAX_TEXT_LENGTH}
                registerOptions={{
                  required: {
                    value: isRequestingProjectFeedback,
                    message: 'Project name is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_LENGTH,
                    message: `Project name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='projectDescription'
                label='What is your project about?'
                helpText='Give us a short summary of what you are hoping to accomplish. Just a paragraph will do.'
                isRequired={isRequestingProjectFeedback}
                maxLength={MAX_TEXT_AREA_LENGTH}
                registerOptions={{
                  required: {
                    value: isRequestingProjectFeedback,
                    message: 'Project description is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Project description cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='additionalInfo'
                label='Where can we learn more?'
                helpText='Please share links to any relevant Github repos, social media, websites, published work or professional profiles.'
                isRequired={isRequestingProjectFeedback}
                maxLength={MAX_TEXT_AREA_LENGTH}
                registerOptions={{
                  required: {
                    value: isRequestingProjectFeedback,
                    message: 'Some additional resources are required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Additional info cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <Controller
                name='projectCategory'
                control={control}
                rules={{
                  required: isRequestingProjectFeedback,
                  validate: selected => selected.value !== '' || !isRequestingProjectFeedback
                }}
                defaultValue={{ value: '', label: '' }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <FormControl
                    id='project-category-control'
                    isRequired={isRequestingProjectFeedback}
                    mb={8}
                  >
                    <FormLabel htmlFor='projectCategory' mb={1}>
                      <PageText display='inline' fontSize='input'>
                        Project category
                      </PageText>
                    </FormLabel>

                    <PageText as='small' fontSize='helpText' color='brand.helpText'>
                      Choose what category your project best fits into.
                    </PageText>

                    <Box mt={3}>
                      <Select
                        id='projectCategory'
                        options={PROJECT_CATEGORY_OPTIONS}
                        onChange={onChange}
                        components={{ DropdownIndicator }}
                        placeholder='Select'
                        closeMenuOnSelect={true}
                        selectedOptionColor='brand.option'
                        chakraStyles={chakraStyles}
                      />
                    </Box>

                    {error && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Project category is required.
                        </PageText>
                      </Box>
                    )}
                  </FormControl>
                )}
              />
            </Fade>
          </Box>

          <Controller
            name='howDidYouHearAboutESP'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={8}>
                <FormLabel htmlFor='howDidYouHearAboutESP'>
                  <PageText display='inline' fontSize='input'>
                    How did you hear about the Ecosystem Support Program?
                  </PageText>
                </FormLabel>

                <Select
                  id='howDidYouHearAboutESP'
                  options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
                  onChange={onChange}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Referral source is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <TextAreaField
            id='otherReasonForMeeting'
            label='How are you hoping ESP can help?'
            helpText='Please list any specific questions or details that would expedite the call.'
            isRequired
            maxLength={MAX_TEXT_AREA_LENGTH}
            registerOptions={{
              required: {
                value: true,
                message: 'Questions or details are required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Reason for meeting cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <Controller
            name='country'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='country-control' isRequired mb={8}>
                <FormLabel htmlFor='country'>
                  <PageText display='inline' fontSize='input'>
                    Country
                  </PageText>
                </FormLabel>

                <Select
                  id='country'
                  options={COUNTRY_OPTIONS}
                  onChange={value => {
                    onChange(value);
                    trigger('country');
                  }}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Country is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Controller
            name='timezone'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='timezone-control' isRequired mt={8} mb={20}>
                <FormLabel htmlFor='timezone'>
                  <PageText display='inline' fontSize='input'>
                    Your time zone
                  </PageText>
                </FormLabel>

                <Select
                  id='timezone'
                  options={TIMEZONE_OPTIONS}
                  onChange={value => {
                    onChange(value);
                    trigger('timezone');
                  }}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Time zone is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

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
        </form>
      </FormProvider>
    </Stack>
  );
};
