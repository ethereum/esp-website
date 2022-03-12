import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
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
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { DropdownIndicator, ImportantText, PageText } from '../UI';

import { api } from './api';
import { useShadowAnimation } from '../../hooks';

import { chakraStyles } from './selectStyles';

import planeVectorSVG from '../../../public/images/plane-vector.svg';

import {
  COMMUNITY_EVENT,
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  PROJECT_CATEGORY_OPTIONS,
  TEAM
} from './constants';
import { SMALL_GRANTS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import {
  BasicForm,
  IndividualOrTeam,
  ProjectCategory,
  RepeatApplicant,
  SmallGrantsFormData
} from '../../types';
import { Captcha } from '.';

interface SmallGrantsFormForm extends SmallGrantsFormData, BasicForm {}

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const SmallGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>('Individual');
  const [repeatApplicant, setRepeatApplicant] = useState<RepeatApplicant>('No');
  // `unknown` comes from react-select required typings (https://stackoverflow.com/a/54370057)
  const [projectCategory, setProjectCategory] = useState<ProjectCategory | unknown>({
    value: '',
    label: ''
  });

  const methods = useForm<SmallGrantsFormForm>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    reset
  } = methods;
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  const isAProject =
    (projectCategory as ProjectCategory).value !== COMMUNITY_EVENT &&
    (projectCategory as ProjectCategory).value !== '';

  const isAnEvent = (projectCategory as ProjectCategory).value === COMMUNITY_EVENT;

  const onSubmit = ({ captchaToken, ...data }: SmallGrantsFormForm) => {
    api.smallGrants
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
                _placeholder={{ fontSize: 'input' }}
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
            defaultValue='Individual'
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
                maxLength: 32768
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
                  Team summary cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

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
                maxLength: 255
              })}
            />

            {errors?.website?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Website cannot exceed 255 characters.
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

          <Controller
            name='projectCategory'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='project-category-control' isRequired mb={8}>
                <FormLabel htmlFor='projectCategory'>
                  <PageText display='inline' fontSize='input'>
                    Project category
                  </PageText>
                </FormLabel>

                <Select
                  id='projectCategory'
                  options={PROJECT_CATEGORY_OPTIONS}
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
                    maxLength: 255
                  })}
                />

                {errors?.projectRepo?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Repo name cannot exceed 255 characters.
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
                    maxLength: 32768
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
                      Previous work cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Project description cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Project impact cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      How is your project different cannot exceed 32768 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl
                id='project-requested-amount-control'
                isRequired={isAProject}
                mb={8}
                w={{ md: '50%' }}
                pr={{ lg: 6 }}
              >
                <FormLabel htmlFor='projectRequestedAmount' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Requested amount
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Ex: EUR 10,000.
                </PageText>

                <Input
                  id='projectRequestedAmount'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('projectRequestedAmount', {
                    required: isAProject,
                    maxLength: 20
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
                      Requested amount cannot exceed 20 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

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
                    maxLength: 32768
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
                      Proposed timeline cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Is your project public good cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Is your project open source cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Sustainability plan cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Other projects cannot exceed 32768 characters.
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
                        maxLength: 32768
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
                          Progress cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Other funding data cannot exceed 32768 characters.
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
                    maxLength: 255
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
                      Event name cannot exceed 255 characters.
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
                    maxLength: 32768
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
                      Previous work cannot exceed 32768 characters.
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
                    maxLength: 255
                  })}
                />

                {errors?.sponsorshipLink?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      URL cannot exceed 255 characters.
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
                    maxLength: 32768
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
                      Event details cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Event topics cannot exceed 32768 characters.
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
                  render={({ field: { onChange }, fieldState: { error } }) => (
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
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <FormControl id='event-format-control' isRequired={isAnEvent} mb={8}>
                      <FormLabel htmlFor='eventFormat'>
                        <PageText display='inline' fontSize='input'>
                          Is your event in-person or online?
                        </PageText>
                      </FormLabel>

                      <Select
                        id='eventFormat'
                        options={EVENT_FORMAT_OPTIONS}
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

              <FormControl
                id='expected-attendees-control'
                isRequired={isAnEvent}
                mb={8}
                w={{ md: '50%' }}
                pr={{ lg: 6 }}
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
                    maxLength: 3000
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
                      Target audience cannot exceed 3000 characters.
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
                    maxLength: 32768
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
                      Confirmed speakers list cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Confirmed sponsors list cannot exceed 32768 characters.
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
                    maxLength: 32768
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
                      Budget breakdown cannot exceed 32768 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl
                id='event-requested-amount-control'
                isRequired={isAnEvent}
                mb={8}
                w={{ md: '50%' }}
                pr={{ lg: 6 }}
              >
                <FormLabel htmlFor='eventRequestedAmount' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Requested sponsorship amount
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Ex: USD 500.
                </PageText>

                <Input
                  id='eventRequestedAmount'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('eventRequestedAmount', {
                    required: isAnEvent,
                    maxLength: 255
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
                      Requested amount cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

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
            <Box id='submit-application' position='relative'>
              <MotionBox
                backgroundColor='brand.button.shadow'
                h='56px'
                w='310px'
                position='absolute'
                animate={shadowBoxControl}
                opacity={!isValid ? 0 : 1}
              />

              <MotionButton
                backgroundColor='brand.accent'
                w='310px'
                py={7}
                borderRadius={0}
                type='submit'
                isDisabled={!isValid}
                _hover={{ bg: 'brand.hover' }}
                whileHover={{ x: -1.5, y: -1.5 }}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                pointerEvents={!isValid ? 'none' : 'auto'}
              >
                <ImportantText as='h3' color='white'>
                  Submit Application
                </ImportantText>

                <Flex pl={5}>
                  <Image src={planeVectorSVG} alt='paper plane vector' height='29px' width='32px' />
                </Flex>
              </MotionButton>
            </Box>
          </Center>
        </form>
      </FormProvider>
    </Stack>
  );
};
