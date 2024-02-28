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
import { FC } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field, TextField, TextAreaField } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  APPLYING_AS_OPTIONS,
  COUNTRY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE,
  OTHER,
  TIMEZONE_OPTIONS,
  DATA_CHALLENGE_PROJECT_CATEGORY_OPTIONS
} from './constants';
import { TOAST_OPTIONS, DATA_CHALLENGE_THANK_YOU_PAGE_URL } from '../../constants';

import { DataChallengeData, DataChallengeSchema } from './schemas/DataChallenge4844';

export const DataChallengeForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<DataChallengeData>({
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      POCisAuthorisedSignatory: true,
      repeatApplicant: false,
      canTheEFReachOut: true
    },
    resolver: zodResolver(DataChallengeSchema)
  });

  const {
    handleSubmit,
    register,
    control,
    trigger,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = methods;

  // for conditional fields, get the current values
  const POCisAuthorisedSignatory = watch('POCisAuthorisedSignatory');
  const applyingAs = watch('applyingAs');
  const referralSource = watch('referralSource');

  const notAuthorisedSignatory = POCisAuthorisedSignatory === false;

  const onSubmit: SubmitHandler<DataChallengeData> = async data => {
    return api.dataChallenge
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(DATA_CHALLENGE_THANK_YOU_PAGE_URL);
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
        <Flex
          as='form'
          id='data-challenge-form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          direction='column'
          gap={8}
        >
          <Flex direction='column'>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
              <TextField
                id='firstName'
                label='First name'
                isRequired
                mr={{ md: 12 }}
                mb={{ base: 8, md: 0 }}
              />

              <TextField id='lastName' label='Last name' isRequired />
            </Flex>

            {!errors?.firstName && !errors?.lastName && (
              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                Who is the point of contact for the application?
              </PageText>
            )}
          </Flex>

          <TextField id='email' label='Email' isRequired />

          <Controller
            name='POCisAuthorisedSignatory'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field
                id='POCisAuthorisedSignatory'
                label='Is the point of contact also the authorised signatory?'
                isRequired
              >
                <RadioGroup
                  id='POCisAuthorisedSignatory'
                  onChange={value => onChange(value === 'Yes')}
                  value={value ? 'Yes' : 'No'}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='POCisAuthorisedSignatory-yes'
                      size='lg'
                      name='POCisAuthorisedSignatory'
                      value='Yes'
                      defaultChecked
                      mr={8}
                    >
                      <PageText fontSize='input'>Yes</PageText>
                    </Radio>

                    <Radio
                      id='POCisAuthorisedSignatory-no'
                      size='lg'
                      name='POCisAuthorisedSignatory'
                      value='No'
                    >
                      <PageText fontSize='input'>No</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Field>
            )}
          />

          <Box display={notAuthorisedSignatory ? 'block' : 'none'}>
            <Fade in={notAuthorisedSignatory} delay={0.25}>
              <TextField
                id='authorisedSignatoryInformation'
                label='Name, job title, and email address of the authorised signatory'
                helpText='(e.g. John Smith, CEO, john@mycompany.com. This is the person who will sign the contract. They must be someone who can sign contracts on behalf of the entity)'
                isRequired
              />
            </Fade>
          </Box>

          <Controller
            name='applyingAs'
            control={control}
            render={({ field: { onChange } }) => (
              <Field id='applyingAs' label='In which capacity are you applying?' isRequired>
                <Select
                  id='applyingAs'
                  options={APPLYING_AS_OPTIONS}
                  onChange={option =>
                    onChange((option as typeof APPLYING_AS_OPTIONS[number]).value)
                  }
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Field>
            )}
          />

          <Box display={applyingAs === OTHER ? 'block' : 'none'}>
            <Fade in={applyingAs === OTHER} delay={0.25}>
              <TextField id='applyingAsOther' label='If other, please specify' />
            </Fade>
          </Box>

          <TextField
            id='company'
            label='If applying as an Organization, please specify its name'
            helpText='Name of your university program, team, or organization. If you do not have an organization name, write "N/A"'
            isRequired
          />

          <Flex direction={{ base: 'column', md: 'row' }} gap={12} mb={3}>
            <Controller
              name='country'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field
                  id='country'
                  label='Country'
                  helpText='Please indicate the country where the Institution/ Lead Investigator is located'
                  error={error}
                  isRequired
                >
                  <Select
                    id='country'
                    options={COUNTRY_OPTIONS}
                    onChange={option => {
                      const value = (option as typeof COUNTRY_OPTIONS[number]).value;
                      onChange(value);
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
                <Field
                  id='timezone'
                  label='Time zone'
                  helpText='Please choose your current time zone to help us schedule calls if needed'
                  error={error}
                  isRequired
                >
                  <Select
                    id='timezone'
                    options={TIMEZONE_OPTIONS}
                    onChange={option => {
                      onChange((option as typeof TIMEZONE_OPTIONS[number]).value);
                      trigger('timezone');
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

          <TextField
            id='countriesTeam'
            label='If you are a team of distributed researchers, please indicate where your fellow researchers are located'
            helpText='You can write as many countries as needed'
          />

          <TextField
            id='projectName'
            label='Project name'
            helpText='This should be a concise description of the title of your project'
            isRequired
          />

          <TextField id='website' label='Blog Post' helpText='Link to your blog post submission' />

          <TextAreaField
            id='projectDescription'
            label='Brief project summary'
            helpText="Describe your project in a few sentences (you'll have the chance to go into more detail in the attached proposal). If it's already underway, provide links to any existing published work."
            isRequired
          />

          <TextField
            id='projectRepoLink'
            label='Project repo link'
            helpText='If your project has a Github repo please provide the link'
          />

          <Controller
            name='projectCategory'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='projectCategory'
                label='Project category'
                helpText='Please choose a category that your project best fits in'
                error={error}
                isRequired
              >
                <Select
                  id='projectCategory'
                  options={DATA_CHALLENGE_PROJECT_CATEGORY_OPTIONS}
                  onChange={option => {
                    onChange(
                      (option as typeof DATA_CHALLENGE_PROJECT_CATEGORY_OPTIONS[number]).value
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
            name='referralSource'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='referralSource'
                label='How did you hear about the this grant round?'
                error={error}
                isRequired
              >
                <Select
                  id='referralSource'
                  options={HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE}
                  onChange={option =>
                    onChange((option as typeof HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE[number]).value)
                  }
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Field>
            )}
          />

          <Box display={referralSource === OTHER ? 'block' : 'none'}>
            <Fade in={referralSource === OTHER} delay={0.25}>
              <TextAreaField
                id='referralSourceIfOther'
                label="If 'Other' is chosen"
                helpText='Please be as specific as possible. (e.g., an email received, an individual who
              recommended you apply, a link to a tweet, etc.)'
              />
            </Fade>
          </Box>

          <TextField id='linkedin' label='LinkedIn Profile(s)' helpText='URL only' />

          <FormControl id='twitter-control'>
            <FormLabel htmlFor='twitter' mb={1}>
              <PageText fontSize='input'>Twitter handle(s)</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Ex: @mytwitterhandle
            </PageText>

            <Input
              id='twitter'
              type='text'
              placeholder='yourtwitterhandle'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              position='relative'
              color='brand.paragraph'
              fontSize='input'
              pl={8}
              mt={3}
              {...register('twitter')}
            />

            {errors?.twitter && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.twitter.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <TextField
            id='alternativeContact'
            label='Telegram username or alternative contact info'
            helpText="In regards to your submission, we'll get in touch with you via email by default. As backup, if you'd like to provide alternative contact info, you may do so. Not required"
          />

          <Controller
            name='repeatApplicant'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field
                id='repeatApplicant'
                label='Have you applied before to any grants at the Ethereum Foundation?'
                isRequired
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

          <Controller
            name='canTheEFReachOut'
            control={control}
            defaultValue={true}
            render={({ field: { onChange, value } }) => (
              <FormControl id='canTheEFReachOut-control'>
                <FormLabel htmlFor='canTheEFReachOut'>
                  <PageText display='inline' fontSize='input'>
                    Is it OK for a member of the Ethereum Foundation to reach out to you (say, in
                    regards to getting involved in other opportunities that may come up)?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='canTheEFReachOut'
                  onChange={value => onChange(value === 'Yes')}
                  value={value ? 'Yes' : 'No'}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='canTheEFReachOut-yes'
                      size='lg'
                      name='canTheEFReachOut'
                      value='Yes'
                      defaultChecked
                      mr={8}
                    >
                      <PageText fontSize='input'>Yes</PageText>
                    </Radio>

                    <Radio id='canTheEFReachOut-no' size='lg' name='canTheEFReachOut' value='No'>
                      <PageText fontSize='input'>No</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <TextAreaField
            id='additionalInfo'
            label='Do you have any questions about this grant round?'
            helpText="Is there anything we didn't cover in the above questions? Feel free to add any
            relevant links here. This is optional"
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
