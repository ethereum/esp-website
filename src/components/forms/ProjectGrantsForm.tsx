import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  RadioGroup,
  Radio,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, TextField, UploadFile, TextAreaField } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  FIAT_CURRENCY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  OTHER,
  PROJECT_GRANTS_PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS
} from './constants';
import {
  MAX_TEXT_AREA_LENGTH,
  MAX_TEXT_LENGTH,
  PROJECT_GRANTS_THANK_YOU_PAGE_URL,
  TOAST_OPTIONS
} from '../../constants';

import { ProjectGrantsFormData, ReferralSource } from '../../types';
import { containURL } from '../../utils';

export const ProjectGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [referralSource, setReferralSource] = useState<ReferralSource | unknown>({
    value: '',
    label: ''
  });

  const methods = useForm<ProjectGrantsFormData>({
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

  const onSubmit = async (data: ProjectGrantsFormData) => {
    return api.projectGrants
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(PROJECT_GRANTS_THANK_YOU_PAGE_URL);
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

  const handleReferralSource = (source: ReferralSource) => {
    setReferralSource(source);
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
        <form id='project-grants-form' onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' mb={8}>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
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

            {!errors?.firstName && !errors?.lastName && (
              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                This should be the main contact we&apos;ll be talking to.
              </PageText>
            )}
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

          <TextField
            id='company'
            label='Organization name'
            helpText='Name of your team or organization. If you do not have an organization name, write "N/A".'
            maxLength={MAX_TEXT_LENGTH}
            isRequired
            registerOptions={{
              required: {
                value: true,
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

          <TextAreaField
            id='teamProfile'
            label='Team profile'
            helpText="Briefly describe your organization. Provide links to previous work. How is your organization suited to the project's objectives, and how does it provide the necessary expertise?"
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Team profile is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Team profile cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextField
            id='twitter'
            label='Twitter'
            helpText='Twitter handle for your team or project.'
            maxLength={16}
            registerOptions={{
              maxLength: {
                value: 16,
                message: 'Twitter handle cannot exceed 16 characters.'
              }
            }}
            mb={8}
          />

          <TextField
            id='website'
            label='Website'
            helpText='Link to your team or project website.'
            maxLength={MAX_TEXT_LENGTH}
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_LENGTH,
                message: `Website cannot exceed ${MAX_TEXT_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextField
            id='projectName'
            label='Project name'
            helpText='This should be a concise description of the title of your project.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Project name is required.'
              },
              maxLength: {
                value: MAX_TEXT_LENGTH,
                message: `Project name cannot exceed ${MAX_TEXT_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextField
            id='projectRepo'
            label='Project repo'
            helpText='GitHub or other public repository of the project or related work.'
            maxLength={MAX_TEXT_LENGTH}
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_LENGTH,
                message: `Repo name cannot exceed ${MAX_TEXT_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <Controller
            name='projectCategory'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
              <FormControl id='project-category-control' isRequired mb={8}>
                <FormLabel htmlFor='projectCategory' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Project category
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please choose a category that your project best fits in.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='projectCategory'
                    options={PROJECT_GRANTS_PROJECT_CATEGORY_OPTIONS}
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
                        Project category is required.
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <TextAreaField
            id='projectDescription'
            label='Brief project summary'
            helpText="Describe your project in a few sentences (you'll have the chance to go into more detail in the long form). If it's already underway, provide links to any existing published work."
            isRequired
            registerOptions={{
              required: {
                value: true,
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
            id='progress'
            label='Describe the current status of the project and progress achieved so far'
            helpText='For example, do you have an MVP? Please describe its functionality and limitations and provide a link to it here.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='problemBeingSolved'
            label='What problem(s) are being solved by within the scope of the grant?'
            helpText='What is the specific problems, research questions, or needs you are trying to address?'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='proposedTimeline'
            label='Proposed tasks, roadmap and budget?'
            helpText='Provide a summary that includes a timeline of the expected work and an estimated budgetary breakdown.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
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
                isRequired
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
                id='requested-amount-control'
                isRequired
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
                  {...register('requestedAmount', {
                    required: true,
                    maxLength: 30
                  })}
                />

                {errors?.requestedAmount?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Requested amount is required.
                    </PageText>
                  </Box>
                )}
                {errors?.requestedAmount?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Requested amount cannot exceed 30 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Flex>
          </Stack>

          <TextAreaField
            id='whyIsProjectImportant'
            label='Why is your project important?'
            helpText='Why should solving these problems or addressing these needs be prioritized, what evidence do you have of importance or demand?'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='howDoesYourProjectDiffer'
            label='How does your project differ from similar ones?'
            helpText='What other solutions are being worked on, what unique contribution will you make or advance will you provide beyond the state of the art?'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='isYourProjectPublicGood'
            label='Describe how your project will result in a public good.'
            helpText='Public goods are things like open source code, shared infrastructure, openly shared research, documentation, community building or other benefits provided to the community that are typically under-provided by the free market.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='isOpenSource'
            label='Will your results be open source?'
            helpText='If not, please explain why.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='whyEthereum'
            label='Describe the expected effects of your project proposal on the Ethereum ecosystem.'
            helpText='Please list the expected results of the project and explain how they will have a positive effect on the Ethereum ecosystem at large.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='challenges'
            label='Describe key risks and challenges to your project.'
            helpText='What are the critical risks, relating to both project implementation and achieving expected impacts?'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='sustainabilityPlan'
            label='What are your plans after the grant is completed?'
            helpText='Please describe your plans for the project after the grant period ends.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='otherProjects'
            label="If you didn't work on this project, what would you work on instead?"
            helpText='Please describe any other projects you are considering or planning to work on.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <Controller
            name='repeatApplicant'
            control={control}
            rules={{ required: true }}
            defaultValue='No'
            render={({ field: { onChange, value } }) => (
              <FormControl id='repeat-applicant-control' isRequired mb={8}>
                <FormLabel htmlFor='repeatApplicant'>
                  <PageText display='inline' fontSize='input'>
                    Have you previously applied to ESP with this same idea or project?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='repeatApplicant'
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
              </FormControl>
            )}
          />

          <TextAreaField
            id='otherFunding'
            label='Have you applied for or received other funding?'
            helpText='Please describe any other funding sources you have applied for or received.'
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Field is required.'
              },
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextAreaField
            id='additionalInfo'
            label="Anything else you'd like to share?"
            helpText='Please provide any additional information that you think would be helpful for the evaluation of your application.'
            maxLength={MAX_TEXT_AREA_LENGTH}
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Additional info cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
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
                mb={{ base: 8, md: 0 }}
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

          <Controller
            name='timezone'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
              <FormControl id='timezone-control' isRequired mb={8}>
                <FormLabel htmlFor='timezone' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Your time zone
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please choose your current time zone to help us schedule calls.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='timezone'
                    options={TIMEZONE_OPTIONS}
                    onBlur={onBlur}
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
                </Box>

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

          <Controller
            name='howDidYouHearAboutESP'
            control={control}
            rules={{ required: true }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange } }) => (
              <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={8}>
                <FormLabel htmlFor='howDidYouHearAboutESP'>
                  <PageText display='inline' fontSize='input'>
                    How did you hear about the Ecosystem Support Program?
                  </PageText>
                </FormLabel>

                <Select
                  id='howDidYouHearAboutESP'
                  options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                  onChange={(selected: any) => {
                    onChange(selected);
                    handleReferralSource(selected);
                  }}
                />
              </FormControl>
            )}
          />

          <Box display={(referralSource as ReferralSource).value === OTHER ? 'block' : 'none'}>
            <Fade in={(referralSource as ReferralSource).value === OTHER} delay={0.25}>
              <TextField
                id='referralSourceIfOther'
                label='If other, explain how'
                maxLength={MAX_TEXT_LENGTH}
                registerOptions={{
                  maxLength: {
                    value: MAX_TEXT_LENGTH,
                    message: `Referral source cannot exceed ${MAX_TEXT_LENGTH} characters.`
                  }
                }}
                mb={8}
              />
            </Fade>
          </Box>

          <TextAreaField
            id='referrals'
            label='Did anyone recommend that you submit an application to the Ecosystem Support Program?'
            helpText="Please include the person's name and details of their referral."
            maxLength={MAX_TEXT_AREA_LENGTH}
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Referral name cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <UploadFile
            id='proposalAttachment'
            label='Upload an additional document'
            helpText='Add any additional document related to your proposal.'
            mb={8}
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
