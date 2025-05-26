import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';

import uploadSVG from '../../../public/images/upload.svg';
import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  INDIVIDUAL,
  COMMUNITY_EVENT,
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  PROJECT_CATEGORY_OPTIONS,
  TEAM,
  FIAT_CURRENCY_OPTIONS
} from './constants';
import {
  MAX_PROPOSAL_FILE_SIZE,
  MAX_TEXT_AREA_LENGTH,
  MAX_TEXT_LENGTH,
  SMALL_GRANTS_THANK_YOU_PAGE_URL,
  TOAST_OPTIONS
} from '../../constants';

import { RemoveIcon } from '../UI/icons';
import {
  IndividualOrTeam,
  ProjectCategory,
  RepeatApplicant,
  SmallGrantsFormData
} from '../../types';
import { containURL } from '../../utils';
import { useDropzone } from 'react-dropzone';

export const SmallGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>(INDIVIDUAL);
  const [repeatApplicant, setRepeatApplicant] = useState<RepeatApplicant>('No');
  // `unknown` comes from react-select required typings (https://stackoverflow.com/a/54370057)
  const [projectCategory, setProjectCategory] = useState<ProjectCategory | unknown>({
    value: '',
    label: ''
  });

  const methods = useForm<SmallGrantsFormData>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch
  } = methods;

  const isAProject =
    (projectCategory as ProjectCategory).value !== COMMUNITY_EVENT &&
    (projectCategory as ProjectCategory).value !== '';

  const isAnEvent = (projectCategory as ProjectCategory).value === COMMUNITY_EVENT;

  // if the event format is in-person or hybrid, we need to show the event location field
  const eventFormat = watch('eventFormat');
  const isInPersonOrHybrid =
    eventFormat?.value === 'In-person' || eventFormat?.value === 'Hybrid (both)';

  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];

      setSelectedFile(file);

      setValue('uploadDocuments', file, { shouldValidate: true });

      toast({
        ...TOAST_OPTIONS,
        title: 'Document uploaded!',
        status: 'success'
      });
    },
    [setValue, toast]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const onSubmit = async (data: SmallGrantsFormData) => {
    return api.smallGrants
      .submit(data, isAProject)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(SMALL_GRANTS_THANK_YOU_PAGE_URL);
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
        <form id='small-grants-form' onSubmit={handleSubmit(onSubmit)}>
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
                _placeholder={{ fontSize: 'input' }}
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
                    First name cannot contain a URL.
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
                _placeholder={{ fontSize: 'input' }}
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
                    Last name cannot contain a URL.
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
              _placeholder={{ fontSize: 'input' }}
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
              <FormControl
                id='individual-or-team-control'
                isRequired
                mb={individualOrTeam === TEAM ? 4 : 8}
              >
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
                <FormLabel htmlFor='company'>
                  <PageText display='inline' fontSize='input'>
                    Name of organization or entity
                  </PageText>
                </FormLabel>
                <Input
                  id='company'
                  type='text'
                  placeholder="Enter the name of organization or entity you're submitting for"
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  {...register('company', {
                    required: individualOrTeam === TEAM,
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
                      Organization name cannot contain a URL.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='individual-or-team-summary-control' isRequired mb={8}>
            <FormLabel htmlFor='individualOrTeamSummary' mb={1}>
              <PageText display='inline' fontSize='input'>
                Individual or team summary
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Tell us about yourself, your experience, and your motivations. Feel free to link to
              any biography pages, LinkedIn pages, etc.
            </PageText>

            <Textarea
              id='individualOrTeamSummary'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('individualOrTeamSummary', {
                required: true,
                maxLength: MAX_TEXT_AREA_LENGTH
              })}
            />

            {errors?.individualOrTeamSummary?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team summary is required.
                </PageText>
              </Box>
            )}
            {errors?.individualOrTeamSummary?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team summary cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Flex direction='column' mb={8}>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
              <FormControl id='city-control' mr={{ md: 12 }} mb={{ base: 8, md: 0 }}>
                <FormLabel htmlFor='city'>
                  <PageText fontSize='input'>City</PageText>
                </FormLabel>

                <Input
                  id='city'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  {...register('city', {
                    maxLength: MAX_TEXT_LENGTH
                  })}
                />

                {errors?.city?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      City name cannot exceed {MAX_TEXT_LENGTH} characters.
                    </PageText>
                  </Box>
                )}

                <Box mt={1}>
                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Where are you located, or where is your team located?
                  </PageText>
                </Box>
              </FormControl>

              <Controller
                name='country'
                control={control}
                defaultValue={{ value: '', label: '' }}
                rules={{ required: true, validate: selected => selected.value !== '' }}
                render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                  <FormControl id='country-control' isRequired>
                    <FormLabel htmlFor='country'>
                      <PageText display='inline' fontSize='input'>
                        Country
                      </PageText>
                    </FormLabel>

                    <Select
                      id='country'
                      options={COUNTRY_OPTIONS}
                      onBlur={onBlur}
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
                          Country is required.
                        </PageText>
                      </Box>
                    )}
                  </FormControl>
                )}
              />
            </Flex>
          </Flex>

          <FormControl id='website-control' mb={8}>
            <FormLabel htmlFor='website'>
              <PageText fontSize='input'>Website</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              https://
            </PageText>
            <Input
              id='website'
              type='text'
              placeholder='yourwebsiteaddress.com'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              position='relative'
              color='brand.paragraph'
              fontSize='input'
              pl={16}
              {...register('website', {
                maxLength: MAX_TEXT_LENGTH
              })}
            />

            {errors?.website?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Website cannot exceed {MAX_TEXT_LENGTH} characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='twitter-control' mb={8}>
            <FormLabel htmlFor='twitter'>
              <PageText fontSize='input'>Twitter</PageText>
            </FormLabel>

            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <Input
              id='twitter'
              type='text'
              placeholder='twitter_handle'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              position='relative'
              color='brand.paragraph'
              fontSize='input'
              pl={8}
              {...register('twitter', {
                maxLength: 16
              })}
            />

            {errors?.twitter?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Twitter handle cannot exceed 16 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          {/* Below controller determines `isAProject` and `isAnEvent` values */}
          <Controller
            name='projectCategory'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
              <FormControl id='project-category-control' isRequired mb={8}>
                <FormLabel htmlFor='projectCategory'>
                  <PageText display='inline' fontSize='input'>
                    Project category
                  </PageText>
                </FormLabel>

                <Box mb={2}>
                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Please choose a category that your project best fits in.{' '}
                    <strong>Additional questions will appear based on your selection</strong>.
                  </PageText>
                </Box>

                <Select
                  id='projectCategory'
                  options={PROJECT_CATEGORY_OPTIONS}
                  onBlur={onBlur}
                  onChange={value => {
                    onChange(value);
                    setProjectCategory(value);
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
                      Project category is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Box display={isAProject ? 'block' : 'none'}>
            <Fade in={isAProject} delay={0.25}>
              <FormControl id='project-name-control' isRequired={isAProject} mt={8} mb={8}>
                <FormLabel htmlFor='projectName' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Project name
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  A short, concise title of what you&apos;re working on.
                </PageText>

                <Input
                  id='projectName'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('projectName', {
                    required: isAProject,
                    maxLength: MAX_TEXT_LENGTH
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

              <FormControl id='project-repo-control' mb={8}>
                <FormLabel htmlFor='projectRepo' mb={1}>
                  <PageText fontSize='input'>Project repo</PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Github, Radicle, etc.
                </PageText>

                <Input
                  id='projectRepo'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('projectRepo', {
                    maxLength: MAX_TEXT_LENGTH
                  })}
                />

                {errors?.projectRepo?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Repo name cannot exceed {MAX_TEXT_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='project-previous-work-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='projectPreviousWork' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Previous work
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please provide links to published code, research, or other documentation of what
                  you&apos;ve worked on.
                </PageText>

                <Textarea
                  id='projectPreviousWork'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('projectPreviousWork', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.projectPreviousWork?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Previous work is required.
                    </PageText>
                  </Box>
                )}
                {errors?.projectPreviousWork?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Previous work cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='project-description-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='projectDescription' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    What is the project?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Describe the main concept and components of the proposed work.
                </PageText>

                <Textarea
                  id='projectDescription'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('projectDescription', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.projectDescription?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project description is required.
                    </PageText>
                  </Box>
                )}
                {errors?.projectDescription?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project description cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='problem-being-solved-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='problemBeingSolved' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    What problem(s) are being solved by within the scope of the grant?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  What are the specific problems, research questions, or needs you are trying to
                  address?
                </PageText>

                <Textarea
                  id='problemBeingSolved'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('problemBeingSolved', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.problemBeingSolved?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Problems being addressed is required.
                    </PageText>
                  </Box>
                )}
                {errors?.problemBeingSolved?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Problems being addressed cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='why-is-project-important-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='whyIsProjectImportant' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Why is your project important?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  How do you know people need what you&apos;re making? Why is this project important
                  for your target demographic/problem area?
                </PageText>

                <Textarea
                  id='whyIsProjectImportant'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('whyIsProjectImportant', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.whyIsProjectImportant?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project impact is required.
                    </PageText>
                  </Box>
                )}
                {errors?.whyIsProjectImportant?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Project impact cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='how-does-your-project-differ-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='howDoesYourProjectDiffer' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    How does your project differ from similar ones?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  What other solutions are being worked on, and what alternatives do people
                  currently rely on? Do you have unique expertise/perspective?
                </PageText>

                <Textarea
                  id='howDoesYourProjectDiffer'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('howDoesYourProjectDiffer', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.howDoesYourProjectDiffer?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      How is your project different is required.
                    </PageText>
                  </Box>
                )}
                {errors?.howDoesYourProjectDiffer?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      How is your project different cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <Stack>
                <Stack>
                  <PageText display='inline' fontSize='input'>
                    Requested amount
                  </PageText>

                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Choose denominated currency and enter a whole number in the Amount field
                  </PageText>
                </Stack>

                <Flex direction={{ base: 'column', md: 'row' }}>
                  <FormControl
                    id='fiat-currency-control'
                    isRequired={isAProject}
                    mb={8}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                  >
                    <Controller
                      name='fiatCurrency'
                      control={control}
                      defaultValue={{ value: '', label: '' }}
                      rules={{ required: true, validate: selected => selected.value !== '' }}
                      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                        <FormControl id='fiat-currency-control' isRequired>
                          <FormLabel htmlFor='fiatCurrency'>
                            <PageText display='inline' fontSize='input'>
                              Fiat currency
                            </PageText>
                          </FormLabel>

                          <Select
                            id='fiat-currency'
                            options={FIAT_CURRENCY_OPTIONS}
                            onBlur={onBlur}
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
                                Fiat currency is required.
                              </PageText>
                            </Box>
                          )}
                        </FormControl>
                      )}
                    />
                  </FormControl>

                  <FormControl
                    id='project-requested-amount-control'
                    isRequired={isAProject}
                    mb={8}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                  >
                    <FormLabel htmlFor='projectRequestedAmount'>
                      <PageText display='inline' fontSize='input'>
                        Amount
                      </PageText>
                    </FormLabel>

                    <Input
                      id='projectRequestedAmount'
                      type='number'
                      bg='white'
                      borderRadius={0}
                      borderColor='brand.border'
                      h='56px'
                      _placeholder={{ fontSize: 'input' }}
                      color='brand.paragraph'
                      fontSize='input'
                      {...register('projectRequestedAmount', {
                        required: isAProject,
                        maxLength: 30
                      })}
                    />

                    {errors?.projectRequestedAmount?.type === 'required' && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Requested amount is required.
                        </PageText>
                      </Box>
                    )}
                    {errors?.projectRequestedAmount?.type === 'maxLength' && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Requested amount cannot exceed 30 characters.
                        </PageText>
                      </Box>
                    )}
                  </FormControl>
                </Flex>
              </Stack>

              <FormControl id='proposed-timeline-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='proposedTimeline' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Proposed tasks, roadmap and budget
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Give us an itemized breakdown of how you&apos;ll be using the requested funds.
                  Provide a brief timeline of the expected work and estimated budget. For each month
                  or stage of work, list: main objectives, tasks that need to be completed to reach
                  each objective, deliverables, and anticipated budget.
                </PageText>

                <Textarea
                  id='proposedTimeline'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('proposedTimeline', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.proposedTimeline?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Proposed timeline is required.
                    </PageText>
                  </Box>
                )}
                {errors?.proposedTimeline?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Proposed timeline cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='is-your-project-public-good-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='isYourProjectPublicGood' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Is your project a public good?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  If so, how?
                </PageText>

                <Textarea
                  id='isYourProjectPublicGood'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('isYourProjectPublicGood', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.isYourProjectPublicGood?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Is your project public good is required.
                    </PageText>
                  </Box>
                )}
                {errors?.isYourProjectPublicGood?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Is your project public good cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='is-open-source-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='isOpenSource' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Is your project open source?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  If not, why not?
                </PageText>

                <Textarea
                  id='isOpenSource'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('isOpenSource', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.isOpenSource?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Is your project open source is required.
                    </PageText>
                  </Box>
                )}
                {errors?.isOpenSource?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Is your project open source cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='sustainability-plan-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='sustainabilityPlan' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    What are your plans after the grant is completed?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  How do you aim to be sustainable after the grant? Alternatively, tell us why this
                  project doesn&apos;t need to be sustainable!
                </PageText>

                <Textarea
                  id='sustainabilityPlan'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('sustainabilityPlan', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.sustainabilityPlan?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Sustainability plan is required.
                    </PageText>
                  </Box>
                )}
                {errors?.sustainabilityPlan?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Sustainability plan cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='other-projects-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='otherProjects'>
                  <PageText display='inline' fontSize='input'>
                    If you didn&apos;t work on this project, what would you work on instead?
                  </PageText>
                </FormLabel>
                <Textarea
                  id='otherProjects'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  {...register('otherProjects', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.otherProjects?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Other projects is required.
                    </PageText>
                  </Box>
                )}
                {errors?.otherProjects?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Other projects cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <Controller
                name='repeatApplicant'
                control={control}
                rules={{ required: isAProject }}
                defaultValue='No'
                render={({ field: { onChange, value } }) => (
                  <FormControl id='repeat-applicant-control' isRequired={isAProject} mb={8}>
                    <FormLabel htmlFor='repeatApplicant' mb={2}>
                      <PageText display='inline' fontSize='input'>
                        Have you previously applied to ESP with this same idea or project?
                      </PageText>
                    </FormLabel>

                    <PageText as='small' fontSize='helpText' color='brand.helpText'>
                      Has anything changed? If you&apos;re considering reapplying, we recommend
                      signing up for Office Hours first before restarting the application process.
                    </PageText>

                    <RadioGroup
                      id='repeatApplicant'
                      onChange={(value: RepeatApplicant) => {
                        onChange(value);
                        setRepeatApplicant(value);
                      }}
                      value={value}
                      fontSize='input'
                      colorScheme='white'
                      mt={4}
                    >
                      <Stack direction='row'>
                        <Radio
                          id='repeat-applicant-no'
                          size='lg'
                          name='repeatApplicant'
                          value='No'
                          defaultChecked
                          mr={8}
                        >
                          <PageText fontSize='input'>No</PageText>
                        </Radio>

                        <Radio
                          id='repeat-applicant-yes'
                          size='lg'
                          name='repeatApplicant'
                          value='Yes'
                        >
                          <PageText fontSize='input'>Yes</PageText>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}
              />

              <Box display={repeatApplicant === 'Yes' ? 'block' : 'none'}>
                <Fade in={repeatApplicant === 'Yes'} delay={0.25}>
                  <FormControl
                    id='progress'
                    isRequired={isAProject && repeatApplicant === 'Yes'}
                    mb={8}
                  >
                    <FormLabel htmlFor='progress'>
                      <PageText display='inline' fontSize='input'>
                        If you&apos;ve applied previously with the same idea, how much progress have
                        you made since the last time you applied?
                      </PageText>
                    </FormLabel>
                    <Textarea
                      id='progress'
                      bg='white'
                      borderRadius={0}
                      borderColor='brand.border'
                      _placeholder={{ fontSize: 'input' }}
                      color='brand.paragraph'
                      fontSize='input'
                      h='150px'
                      {...register('progress', {
                        required: isAProject && repeatApplicant === 'Yes',
                        maxLength: MAX_TEXT_AREA_LENGTH
                      })}
                    />

                    {errors?.progress?.type === 'required' && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Progress is required.
                        </PageText>
                      </Box>
                    )}
                    {errors?.progress?.type === 'maxLength' && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Progress cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                        </PageText>
                      </Box>
                    )}
                  </FormControl>
                </Fade>
              </Box>

              <FormControl id='other-funding-control' isRequired={isAProject} mb={8}>
                <FormLabel htmlFor='otherFunding' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Have you applied for or received other funding?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  If so, where else did you get funding from?
                </PageText>

                <Textarea
                  id='otherFunding'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('otherFunding', {
                    required: isAProject,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.otherFunding?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Other funding data is required.
                    </PageText>
                  </Box>
                )}
                {errors?.otherFunding?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Other funding data cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Box display={isAnEvent ? 'block' : 'none'}>
            <Fade in={isAnEvent} delay={0.25}>
              <FormControl id='event-name-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='eventName' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Event name
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  What&apos;s the official title of your event?
                </PageText>

                <Input
                  id='eventName'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('eventName', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_LENGTH
                  })}
                />

                {errors?.eventName?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event name is required.
                    </PageText>
                  </Box>
                )}
                {errors?.eventName?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event name cannot exceed {MAX_TEXT_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='event-date-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='eventDate' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Event date
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please enter the first date of your event (DD/MM/YYYY)
                </PageText>

                <Input
                  id='eventDate'
                  type='date'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('eventDate', {
                    required: isAnEvent
                  })}
                />

                {errors?.eventDate?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event date is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='event-previous-work-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='eventPreviousWork' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    List of any previous events you&apos;ve organized
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  The more information the better!
                </PageText>

                <Textarea
                  id='eventPreviousWork'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('eventPreviousWork', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.eventPreviousWork?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Previous work is required.
                    </PageText>
                  </Box>
                )}
                {errors?.eventPreviousWork?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Previous work cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='sponsorship-link-control' mb={8}>
                <FormLabel htmlFor='sponsorshipLink' mb={1}>
                  <PageText fontSize='input'>
                    Is there a website for this event? Paste the link here.
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Meetup, Facebook page, event site, etc (URL only).
                </PageText>

                <Input
                  id='sponsorshipLink'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('sponsorshipLink', {
                    maxLength: MAX_TEXT_LENGTH
                  })}
                />

                {errors?.sponsorshipLink?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      URL cannot exceed {MAX_TEXT_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='sponsorship-details-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='sponsorshipDetails' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Describe your event
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  For example: Will your agenda include talks, workshops, discussions? What is your
                  planned format - round table, showcase or a more informal setting? What are your
                  goals for the event?
                </PageText>

                <Textarea
                  id='sponsorshipDetails'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('sponsorshipDetails', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.sponsorshipDetails?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event details are required.
                    </PageText>
                  </Box>
                )}
                {errors?.sponsorshipDetails?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event details cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='sponsorship-topics-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='sponsorshipTopics' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Event topics
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please briefly describe the topics you plan to cover at this event. For example:
                  staking, zero knowledge, defi, social impact, NFTs, etc.
                </PageText>

                <Textarea
                  id='sponsorshipTopics'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('sponsorshipTopics', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.sponsorshipTopics?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event topics are required.
                    </PageText>
                  </Box>
                )}
                {errors?.sponsorshipTopics?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Event topics cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <Flex direction={{ base: 'column', lg: 'row' }}>
                <Controller
                  name='eventType'
                  control={control}
                  rules={{
                    required: isAnEvent,
                    validate: selected =>
                      (!isAnEvent && selected.value === '') || (isAnEvent && selected.value !== '')
                  }}
                  defaultValue={{ value: '', label: '' }}
                  render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                    <FormControl
                      id='event-type-control'
                      isRequired={isAnEvent}
                      mb={8}
                      mr={{ md: 12 }}
                    >
                      <FormLabel htmlFor='eventType'>
                        <PageText display='inline' fontSize='input'>
                          What type of event is this?
                        </PageText>
                      </FormLabel>

                      <Select
                        id='eventType'
                        options={EVENT_TYPE_OPTIONS}
                        onBlur={onBlur}
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
                            Event type is required.
                          </PageText>
                        </Box>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name='eventFormat'
                  control={control}
                  rules={{
                    required: isAnEvent,
                    validate: selected =>
                      (!isAnEvent && selected.value === '') || (isAnEvent && selected.value !== '')
                  }}
                  defaultValue={{ value: '', label: '' }}
                  render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                    <FormControl id='event-format-control' isRequired={isAnEvent} mb={8}>
                      <FormLabel htmlFor='eventFormat'>
                        <PageText display='inline' fontSize='input'>
                          Is your event in-person or online?
                        </PageText>
                      </FormLabel>

                      <Select
                        id='eventFormat'
                        options={EVENT_FORMAT_OPTIONS}
                        onBlur={onBlur}
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
                            Event format is required.
                          </PageText>
                        </Box>
                      )}
                    </FormControl>
                  )}
                />
              </Flex>

              <Flex direction={{ base: 'column', lg: 'row' }}>
                <FormControl
                  id='expected-attendees-control'
                  isRequired={isAnEvent}
                  mb={8}
                  mr={{ md: 12 }}
                >
                  <FormLabel htmlFor='expectedAttendees' mb={1}>
                    <PageText display='inline' fontSize='input'>
                      Expected number of attendees/registrants
                    </PageText>
                  </FormLabel>

                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Enter a whole number. Ex: 300.
                  </PageText>

                  <Input
                    id='expectedAttendees'
                    type='number'
                    bg='white'
                    borderRadius={0}
                    borderColor='brand.border'
                    h='56px'
                    _placeholder={{ fontSize: 'input' }}
                    color='brand.paragraph'
                    fontSize='input'
                    mt={3}
                    {...register('expectedAttendees', {
                      required: isAnEvent,
                      maxLength: 18
                    })}
                  />

                  {errors?.expectedAttendees?.type === 'required' && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        Expected number is required.
                      </PageText>
                    </Box>
                  )}
                  {errors?.expectedAttendees?.type === 'maxLength' && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        Expected number cannot exceed 18 characters.
                      </PageText>
                    </Box>
                  )}
                </FormControl>

                <FormControl
                  id='event-location-control'
                  isRequired={isAnEvent && isInPersonOrHybrid}
                  visibility={isAnEvent && isInPersonOrHybrid ? 'visible' : 'hidden'}
                >
                  <FormLabel htmlFor='eventLocation' mb={1}>
                    <PageText display='inline' fontSize='input'>
                      Event Location
                    </PageText>
                  </FormLabel>

                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Please list the City and Country of where your event will be located
                  </PageText>

                  <Input
                    id='eventLocation'
                    type='text'
                    bg='white'
                    borderRadius={0}
                    borderColor='brand.border'
                    h='56px'
                    _placeholder={{ fontSize: 'input' }}
                    color='brand.paragraph'
                    fontSize='input'
                    mt={3}
                    {...register('eventLocation', {
                      required: isAnEvent && isInPersonOrHybrid,
                      maxLength: MAX_TEXT_LENGTH
                    })}
                  />

                  {errors?.eventLocation?.type === 'required' && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        Event location is required.
                      </PageText>
                    </Box>
                  )}
                  {errors?.eventLocation?.type === 'maxLength' && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        Event location cannot exceed {MAX_TEXT_LENGTH} characters.
                      </PageText>
                    </Box>
                  )}
                </FormControl>
              </Flex>

              <FormControl id='target-audience-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='targetAudience' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Target audience
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Ex: developers, entrepreneurs, general community.
                </PageText>

                <Textarea
                  id='targetAudience'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('targetAudience', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.targetAudience?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Target audience is required.
                    </PageText>
                  </Box>
                )}
                {errors?.targetAudience?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Target audience cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='confirmed-speakers-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='confirmedSpeakers' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    List any confirmed speakers
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please list their full names and topic discussion. If you do not have any
                  confirmed speakers, please explain why.
                </PageText>

                <Textarea
                  id='confirmedSpeakers'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('confirmedSpeakers', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.confirmedSpeakers?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Confirmed speakers list is required.
                    </PageText>
                  </Box>
                )}
                {errors?.confirmedSpeakers?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Confirmed speakers list cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='confirmed-sponsors-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='confirmedSponsors'>
                  <PageText display='inline' fontSize='input'>
                    List any confirmed sponsors
                  </PageText>
                </FormLabel>
                <Textarea
                  id='confirmedSponsors'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  {...register('confirmedSponsors', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.confirmedSponsors?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Confirmed sponsors list is required.
                    </PageText>
                  </Box>
                )}
                {errors?.confirmedSponsors?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Confirmed sponsors list cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='event-budget-breakdown-control' isRequired={isAnEvent} mb={8}>
                <FormLabel htmlFor='eventBudgetBreakdown' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Budget breakdown
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please itemize your anticipated costs - best estimates are ok if things are not
                  yet confirmed or dependent on final attendee count.
                </PageText>

                <Textarea
                  id='eventBudgetBreakdown'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('eventBudgetBreakdown', {
                    required: isAnEvent,
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

                {errors?.eventBudgetBreakdown?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Budget breakdown is required.
                    </PageText>
                  </Box>
                )}
                {errors?.eventBudgetBreakdown?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Budget breakdown cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <Stack>
                <Stack>
                  <PageText display='inline' fontSize='input'>
                    Requested amount
                  </PageText>

                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Choose denominated currency and enter a whole number in the Amount field
                  </PageText>
                </Stack>

                <Flex direction={{ base: 'column', md: 'row' }}>
                  <FormControl
                    id='fiat-currency-control'
                    isRequired={isAProject}
                    mb={8}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                  >
                    <Controller
                      name='fiatCurrency'
                      control={control}
                      defaultValue={{ value: '', label: '' }}
                      rules={{ required: true, validate: selected => selected.value !== '' }}
                      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                        <FormControl id='fiat-currency-control' isRequired>
                          <FormLabel htmlFor='fiatCurrency'>
                            <PageText display='inline' fontSize='input'>
                              Fiat currency
                            </PageText>
                          </FormLabel>

                          <Select
                            id='fiat-currency'
                            options={FIAT_CURRENCY_OPTIONS}
                            onBlur={onBlur}
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
                                Fiat currency is required.
                              </PageText>
                            </Box>
                          )}
                        </FormControl>
                      )}
                    />
                  </FormControl>

                  <FormControl
                    id='event-requested-amount-control'
                    isRequired={isAnEvent}
                    mb={8}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                  >
                    <FormLabel htmlFor='eventRequestedAmount'>
                      <PageText display='inline' fontSize='input'>
                        Amount
                      </PageText>
                    </FormLabel>

                    <Input
                      id='eventRequestedAmount'
                      type='number'
                      bg='white'
                      borderRadius={0}
                      borderColor='brand.border'
                      h='56px'
                      _placeholder={{ fontSize: 'input' }}
                      color='brand.paragraph'
                      fontSize='input'
                      {...register('eventRequestedAmount', {
                        required: isAnEvent,
                        maxLength: 30
                      })}
                    />

                    {errors?.eventRequestedAmount?.type === 'required' && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Requested amount is required.
                        </PageText>
                      </Box>
                    )}
                    {errors?.eventRequestedAmount?.type === 'maxLength' && (
                      <Box mt={1}>
                        <PageText as='small' fontSize='helpText' color='red.500'>
                          Requested amount cannot exceed 30 characters.
                        </PageText>
                      </Box>
                    )}
                  </FormControl>
                </Flex>
              </Stack>
            </Fade>
          </Box>

          <Controller
            name='howDidYouHearAboutESP'
            control={control}
            defaultValue={{ value: '', label: '' }}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
              <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={8}>
                <FormLabel htmlFor='howDidYouHearAboutESP'>
                  <PageText display='inline' fontSize='input'>
                    How did you hear about the Ecosystem Support Program?
                  </PageText>
                </FormLabel>

                <Select
                  id='howDidYouHearAboutESP'
                  options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
                  onBlur={onBlur}
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

          <FormControl id='referrals-control' mb={8}>
            <FormLabel htmlFor='referrals' mb={1}>
              <PageText fontSize='input'>
                Did anyone recommend that you submit an application to the Ecosystem Support
                Program?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please include the person&apos;s name and details of their referral.
            </PageText>

            <Textarea
              id='referrals'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('referrals', {
                maxLength: MAX_TEXT_AREA_LENGTH
              })}
            />

            {errors?.referrals?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Referrals info cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='additional-info-control' mb={8}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>Anything else you&apos;d like to share?</PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Is there anything we should know about that hasn&apos;t been covered by the questions
              above? You also have the option to link any supporting documents or relevant sites
              here.
            </PageText>

            <Textarea
              id='additionalInfo'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('additionalInfo', {
                maxLength: MAX_TEXT_AREA_LENGTH
              })}
            />

            {errors?.additionalInfo?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Additional info cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='uploadDocuments'
            control={control}
            rules={{ validate: file => (file ? file.size < MAX_PROPOSAL_FILE_SIZE : true) }}
            render={({ field: { onChange } }) => (
              <Field
                id='upload-documents'
                label='Upload Additional Documents'
                helpText='Add any additional documents related to your proposal.'
                {...getRootProps()}
              >
                <InputGroup>
                  <Input
                    id='uploadDocuments'
                    type='file'
                    role='button'
                    aria-label='File Upload'
                    hidden
                    onChange={onChange}
                    {...getInputProps({ name: 'base64' })}
                  />
                  <Box
                    w='100%'
                    cursor='pointer'
                    bgColor='brand.upload.bg'
                    justifyContent='space-evenly'
                    py={9}
                    px={{ base: 6, md: 16 }}
                    mt={4}
                    mb={12}
                  >
                    <Grid templateColumns='150px 1fr'>
                      <GridItem alignSelf='center'>
                        <Box mr={6} flexShrink={0}>
                          <Image src={uploadSVG} alt='Upload file' height={42} width={44} />
                        </Box>
                      </GridItem>
                      <GridItem mb={selectedFile ? 4 : 0}>
                        <Stack>
                          <FormLabel htmlFor='uploadDocuments'>
                            <PageText fontSize='input' fontWeight={700} mb={2}>
                              Upload documents
                            </PageText>
                          </FormLabel>

                          <PageText
                            as='small'
                            fontSize='helpText'
                            color='brand.helpText'
                            lineHeight='17px'
                            display='inline-block'
                            mb={2}
                          >
                            Click here or drag file to this box.
                          </PageText>
                        </Stack>

                        {selectedFile && errors?.uploadDocuments && (
                          <Box mt={1}>
                            <PageText as='small' fontSize='helpText' color='red.500'>
                              File size cannot exceed 4mb.
                            </PageText>
                          </Box>
                        )}
                      </GridItem>
                      <GridItem colStart={2}>
                        {selectedFile && (
                          <Flex
                            display='inline-flex'
                            alignItems='center'
                            justifyContent='space-between'
                            bg='brand.upload.filename'
                            minW='175px'
                            pl={4}
                            py={2}
                            borderRadius='5px'
                          >
                            <PageText mr={2}>{selectedFile.name}</PageText>
                            <Flex role='button' onClick={handleRemoveFile} px={3}>
                              <RemoveIcon />
                            </Flex>
                          </Flex>
                        )}
                      </GridItem>
                    </Grid>
                  </Box>
                </InputGroup>
              </Field>
            )}
          />

          <Stack display={isAnEvent ? 'block' : 'none'} mb={10}>
            <PageText fontSize='input' fontWeight={700} mb={-1}>
              NOTE:
            </PageText>

            <PageText fontSize='input'>
              Event sponsorships are <strong>not</strong> grants - there are some key differences in
              the way they are administered - but the application process starts in the same way.
            </PageText>
          </Stack>

          <Center mb={8}>
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
