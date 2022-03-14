import {
  Box,
  Center,
  Checkbox,
  CheckboxGroup,
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
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  OTHER,
  PROJECT_CATEGORY_OPTIONS,
  TEAM,
  TIMEZONE_OPTIONS
} from './constants';
import { OFFICE_HOURS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { BasicForm, IndividualOrTeam, OfficeHoursFormData, ReasonForMeeting } from '../../types';

interface OfficeHoursForm extends OfficeHoursFormData, BasicForm {}

export const OfficeHoursForm: FC = () => {
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>('Individual');
  const [reasonForMeeting, setReasonForMeeting] = useState<ReasonForMeeting>(['']);
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<OfficeHoursForm>({
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

  const onSubmit = async ({ captchaToken, ...data }: OfficeHoursForm) => {
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

  const handleCheckbox = (value: ReasonForMeeting) => {
    setReasonForMeeting(value);
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
                  maxLength: 40
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
                {...register('lastName', { required: true, maxLength: 80 })}
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
            defaultValue='Individual'
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
                      value='Individual'
                      defaultChecked
                      mr={8}
                    >
                      <PageText fontSize='input'>Individual</PageText>
                    </Radio>

                    <Radio id='team' size='lg' name='individualOrTeam' value='Team'>
                      <PageText fontSize='input'>Team</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Box display={individualOrTeam === TEAM ? 'block' : 'none'}>
            <Fade in={individualOrTeam === TEAM} delay={0.25}>
              <FormControl id='company-control' isRequired={individualOrTeam === TEAM} mb={8}>
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
                    required: individualOrTeam === TEAM,
                    maxLength: 255
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
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='project-name-control' mb={8}>
            <FormLabel htmlFor='projectName' mb={1}>
              <PageText fontSize='input'>Project name</PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              If you&apos;re not asking for help on a project, or simply don&apos;t have a title
              yet, you can write &quot;N/A&quot;.
            </PageText>

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
                maxLength: 255
              })}
            />

            {errors?.projectName?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project name cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='project-description-control' mb={8}>
            <FormLabel htmlFor='projectDescription' mb={1}>
              <PageText fontSize='input'>What is your project about?</PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              If you have a project you&apos;d like to discuss, give us a short summary of what you
              are hoping to accomplish. Just a paragraph will do.
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
                maxLength: 32768
              })}
            />

            {errors?.projectDescription?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project description cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='additional-info-control' mb={8}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>Where can we learn more?</PageText>
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
                maxLength: 32768
              })}
            />

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
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='project-category-control' isRequired mb={8}>
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

          <Controller
            name='reasonForMeeting'
            control={control}
            rules={{ required: true, validate: selected => selected.length > 0 }}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <FormControl id='reason-for-meeting-control' isRequired mb={2}>
                <FormLabel htmlFor='reasonForMeeting'>
                  <PageText display='inline' fontSize='input'>
                    What can we help you with? You may choose more than one reason.
                  </PageText>
                </FormLabel>

                <CheckboxGroup
                  colorScheme='white'
                  onChange={(value: ReasonForMeeting) => {
                    onChange(value);
                    handleCheckbox(value);
                  }}
                  value={value}
                >
                  <Stack>
                    <Checkbox id='project-feedback' value='Project feedback or advice'>
                      <PageText fontSize='input'>Project feedback or advice</PageText>
                    </Checkbox>
                    <Checkbox id='questions-about-esp' value='Questions about ESP'>
                      <PageText fontSize='input'>Questions about ESP</PageText>
                    </Checkbox>
                    <Checkbox
                      id='questions-about-applying'
                      value='Questions about applying for a grant'
                    >
                      <PageText fontSize='input'>Questions about applying for a grant</PageText>
                    </Checkbox>
                    <Checkbox id='how-to-contribute' value='How to contribute to Ethereum'>
                      <PageText fontSize='input'>How to contribute to Ethereum</PageText>
                    </Checkbox>
                    <Checkbox id='other' value='Other'>
                      <PageText fontSize='input'>Other</PageText>
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>

                {errors?.reasonForMeeting && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Choose at least one reason.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Box display={reasonForMeeting.includes(OTHER) ? 'block' : 'none'}>
            <Fade in={reasonForMeeting.includes(OTHER)} delay={0.25}>
              <FormControl id='other-reason-for-meeting-control' mb={8}>
                <FormLabel htmlFor='otherReasonForMeeting'>
                  <PageText display='inline' fontSize='input'>
                    Reason for meeting
                  </PageText>
                </FormLabel>
                <Textarea
                  id='otherReasonForMeeting'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  {...register('otherReasonForMeeting', {
                    maxLength: 32768
                  })}
                />

                {errors?.otherReasonForMeeting?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Reason for meeting cannot exceed 32768 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

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
