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
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, TextField, UploadFile } from '.';
import { TextAreaField } from './fields/TextAreaField';

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
  MAX_TEXT_AREA_LENGTH,
  MAX_TEXT_LENGTH,
  SMALL_GRANTS_THANK_YOU_PAGE_URL,
  TOAST_OPTIONS
} from '../../constants';

import {
  IndividualOrTeam,
  ProjectCategory,
  RepeatApplicant,
  SmallGrantsFormData
} from '../../types';
import { containURL } from '../../utils';

export const SmallGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
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
                validate: value => !containURL(value) || 'First name cannot contain a URL.'
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
                validate: value => !containURL(value) || 'Last name cannot contain a URL.'
              }}
            />
          </Flex>

          <TextField
            id='email'
            label='Email'
            type='email'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Email is required.'
              },
              maxLength: {
                value: MAX_TEXT_LENGTH,
                message: `Email cannot exceed ${MAX_TEXT_LENGTH} characters.`
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
              <TextField
                id='company'
                label='Name of organization or entity'
                helpText="Enter the name of organization or entity you're submitting for"
                isRequired={individualOrTeam === TEAM}
                maxLength={MAX_TEXT_LENGTH}
                registerOptions={{
                  required: {
                    value: individualOrTeam === TEAM,
                    message: 'Organization name is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_LENGTH,
                    message: `Organization name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                  },
                  validate: value => !containURL(value) || 'Organization name cannot contain a URL.'
                }}
                mb={8}
              />
            </Fade>
          </Box>

          <TextAreaField
            id='individualOrTeamSummary'
            label='Individual or team summary'
            helpText='Tell us about yourself, your experience, and your motivations. Feel free to link to any biography pages, LinkedIn pages, etc.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Team summary is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Team summary cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <Flex direction='column' mb={8}>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
              <TextField
                id='city'
                label='City'
                helpText='Where are you located, or where is your team located?'
                maxLength={MAX_TEXT_LENGTH}
                registerOptions={{
                  maxLength: {
                    value: MAX_TEXT_LENGTH,
                    message: `City name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                  }
                }}
                mr={{ md: 12 }}
              />

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

          <TextField
            id='website'
            label='Website'
            maxLength={MAX_TEXT_LENGTH}
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_LENGTH,
                message: `Website cannot exceed ${MAX_TEXT_LENGTH} characters.`
              }
            }}
            mb={8}
            pl={16}
          />

          <TextField
            id='twitter'
            label='Twitter'
            helpText='@twitter_handle'
            maxLength={16}
            registerOptions={{
              maxLength: {
                value: 16,
                message: 'Twitter handle cannot exceed 16 characters.'
              }
            }}
            mb={8}
            pl={8}
          />

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

              <TextAreaField
                id='projectPreviousWork'
                label='Previous work'
                helpText="Please provide links to published code, research, or other documentation of what you've worked on."
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Previous work is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Previous work cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='projectDescription'
                label='What is the project?'
                helpText='Describe the main concept and components of the proposed work.'
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
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
                id='problemBeingSolved'
                label='What problem(s) are being solved by within the scope of the grant?'
                helpText='What are the specific problems, research questions, or needs you are trying to address?'
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Problems being addressed is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Problems being addressed cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='whyIsProjectImportant'
                label='Why is your project important?'
                helpText="How do you know people need what you're making? Why is this project important for your target demographic/problem area?"
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Project impact is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Project impact cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='howDoesYourProjectDiffer'
                label='How does your project differ from similar ones?'
                helpText='What other solutions are being worked on, and what alternatives do people currently rely on? Do you have unique expertise/perspective?'
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'How is your project different is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `How is your project different cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='isYourProjectPublicGood'
                label='Is your project a public good?'
                helpText='If so, how?'
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Is your project public good is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Is your project public good cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

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

              <TextAreaField
                id='isOpenSource'
                label='Is your project open source?'
                helpText='If not, why not?'
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Is your project open source is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Is your project open source cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='sustainabilityPlan'
                label='What are your plans after the grant is completed?'
                helpText="How do you aim to be sustainable after the grant? Alternatively, tell us why this project doesn't need to be sustainable!"
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Sustainability plan is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Sustainability plan cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

              <TextAreaField
                id='otherProjects'
                label="If you didn't work on this project, what would you work on instead?"
                isRequired={isAProject}
                registerOptions={{
                  required: {
                    value: isAProject,
                    message: 'Other projects is required.'
                  },
                  maxLength: {
                    value: MAX_TEXT_AREA_LENGTH,
                    message: `Other projects cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                  }
                }}
                mb={8}
              />

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
                  <TextAreaField
                    id='progress'
                    label="If you've applied previously with the same idea, how much progress have you made since the last time you applied?"
                    isRequired={isAProject && repeatApplicant === 'Yes'}
                    registerOptions={{
                      required: {
                        value: isAProject && repeatApplicant === 'Yes',
                        message: 'Progress is required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Progress cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />
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

          <UploadFile
            id='uploadProposal'
            label='Upload an additional document'
            helpText='Add any additional document related to your proposal.'
            mb={8}
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
