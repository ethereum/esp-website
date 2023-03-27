import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';
import {
  ADVICE,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  INDIVIDUAL,
  PROJECT_CATEGORY_OPTIONS,
  TEAM,
  PROJECT_FEEDBACK,
  TIMEZONE_OPTIONS
} from './constants';
import { OFFICE_HOURS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

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
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormControl id='first-name-control' isRequired mb={8} mr={{ md: 12 }}>
              <FormLabel htmlFor='firstName'>
                <PageText display='inline' fontSize='input'>
                  First name
                </PageText>
              </FormLabel>
              <Input
                id='firstName'
                type='text'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                color='brand.paragraph'
                fontSize='input'
                {...register('firstName', {
                  required: true,
                  maxLength: 40,
                  validate: value => !containURL(value)
                })}
              />

              {errors?.firstName?.type === 'required' && (
                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    First name is required.
                  </PageText>
                </Box>
              )}
              {errors?.firstName?.type === 'maxLength' && (
                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    First name cannot exceed 40 characters.
                  </PageText>
                </Box>
              )}
              {errors?.firstName?.type === 'validate' && (
                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    First name contain a URL.
                  </PageText>
                </Box>
              )}
            </FormControl>

            <FormControl id='last-name-control' isRequired mb={8}>
              <FormLabel htmlFor='lastName'>
                <PageText display='inline' fontSize='input'>
                  Last name
                </PageText>
              </FormLabel>
              <Input
                id='lastName'
                type='text'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                color='brand.paragraph'
                fontSize='input'
                {...register('lastName', {
                  required: true,
                  maxLength: 80,
                  validate: value => !containURL(value)
                })}
              />

              {errors?.lastName?.type === 'required' && (
                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Last name is required.
                  </PageText>
                </Box>
              )}
              {errors?.lastName?.type === 'maxLength' && (
                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Last name cannot exceed 80 characters.
                  </PageText>
                </Box>
              )}
              {errors?.lastName?.type === 'validate' && (
                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Last name contain a URL.
                  </PageText>
                </Box>
              )}
            </FormControl>
          </Flex>

          <FormControl id='email-control' isRequired mb={8}>
            <FormLabel htmlFor='email'>
              <PageText display='inline' fontSize='input'>
                Email
              </PageText>
            </FormLabel>
            <Input
              id='email'
              type='email'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              color='brand.paragraph'
              fontSize='input'
              {...register('email', { required: true })}
            />

            {errors?.email?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Email is required.
                </PageText>
              </Box>
            )}
          </FormControl>

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
              <FormControl id='company-control' isRequired={isTeam} mb={8}>
                <FormLabel htmlFor='company' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Name of organization or entity
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Name of your team or entity you&apos;re submitting for. If your organization
                  doesn&apos;t have a formal name, just try to describe it in a few words!
                </PageText>

                <Input
                  id='company'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('company', {
                    required: isTeam,
                    maxLength: 255,
                    validate: value => !containURL(value)
                  })}
                />

                {errors?.company?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Organization name is required.
                    </PageText>
                  </Box>
                )}
                {errors?.company?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Organization name cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
                {errors?.company?.type === 'validate' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Organization name contain a URL.
                    </PageText>
                  </Box>
                )}
              </FormControl>
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
              <FormControl
                id='project-name-control'
                isRequired={isRequestingProjectFeedback}
                mb={8}
              >
                <FormLabel htmlFor='projectName' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Project name
                  </PageText>
                </FormLabel>

                <Input
                  id='projectName'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('projectName', {
                    required: isRequestingProjectFeedback,
                    maxLength: 255
                  })}
                />

                {errors?.projectName?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project name is required.
                    </PageText>
                  </Box>
                )}
                {errors?.projectName?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project name cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl
                id='project-description-control'
                isRequired={isRequestingProjectFeedback}
                mb={8}
              >
                <FormLabel htmlFor='projectDescription' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    What is your project about?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Give us a short summary of what you are hoping to accomplish. Just a paragraph
                  will do.
                </PageText>

                <Textarea
                  id='projectDescription'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('projectDescription', {
                    required: isRequestingProjectFeedback,
                    maxLength: 32768
                  })}
                />

                {errors?.projectDescription?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project description is required..
                    </PageText>
                  </Box>
                )}
                {errors?.projectDescription?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project description cannot exceed 32768 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl
                id='additional-info-control'
                isRequired={isRequestingProjectFeedback}
                mb={8}
              >
                <FormLabel htmlFor='additionalInfo' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Where can we learn more?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please share links to any relevant Github repos, social media, websites, published
                  work or professional profiles.
                </PageText>

                <Textarea
                  id='additionalInfo'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('additionalInfo', {
                    required: isRequestingProjectFeedback,
                    maxLength: 32768
                  })}
                />

                {errors?.additionalInfo?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Some additional resources are required.
                    </PageText>
                  </Box>
                )}
                {errors?.additionalInfo?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Additional info cannot exceed 32768 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

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

          <FormControl id='other-reason-for-meeting-control' mb={8} isRequired>
            <FormLabel htmlFor='otherReasonForMeeting'>
              <PageText display='inline' fontSize='input'>
                How are you hoping ESP can help?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please list any specific questions or details that would expedite the call.
            </PageText>

            <Textarea
              id='otherReasonForMeeting'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              h='150px'
              {...register('otherReasonForMeeting', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.otherReasonForMeeting?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Questions or details are required.
                </PageText>
              </Box>
            )}
            {errors?.otherReasonForMeeting?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Reason for meeting cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

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
