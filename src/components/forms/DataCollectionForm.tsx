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
  useToast,
  Link
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, Field, TextField, TextAreaField, UploadFile } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  APPLYING_AS_DATA_COLLECTION_OPTIONS,
  COUNTRY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  OTHER,
  DATA_COLLECTION_PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS,
  WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS
} from './constants';
import { DATA_COLLECTION_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { DataCollectionSchema, type DataCollectionData } from './schemas/DataCollection';

export const DataCollectionForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<DataCollectionData>({
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      repeatApplicant: false,
      canTheEFReachOut: true
    },
    resolver: zodResolver(DataCollectionSchema)
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
  const applyingAs = watch('applyingAs');
  const referralSource = watch('referralSource');

  const handleDrop = () => {
    toast({
      ...TOAST_OPTIONS,
      title: 'Proposal uploaded!',
      status: 'success'
    });
  };

  const onSubmit: SubmitHandler<DataCollectionData> = async data => {
    return api.dataCollection
      .submit(data)
      .then(res => {
        if (res.ok) {
          // reset();
          // router.push(DATA_COLLECTION_THANK_YOU_PAGE_URL);
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
        <form id='run-a-node-grants-form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <Flex direction='column' mb={8}>
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

          <TextField id='email' label='Email' isRequired mb={8} />

          <TextField id='title' label='Title' isRequired mb={8} />

          <Controller
            name='applyingAs'
            control={control}
            render={({ field: { onChange } }) => (
              <Field id='applyingAs' label='In which capacity are you applying?' isRequired mb={8}>
                <Select
                  id='applyingAs'
                  options={APPLYING_AS_DATA_COLLECTION_OPTIONS}
                  onChange={option =>
                    onChange((option as typeof APPLYING_AS_DATA_COLLECTION_OPTIONS[number]).value)
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
              <TextField id='applyingAsOther' label='If other, please specify' mb={8} />
            </Fade>
          </Box>

          <TextField
            id='company'
            label='If applying as an Organization, please specify its name'
            helpText='Name of your university program, team, or organization. If you do not have an organization name, write "N/A"'
            isRequired
            mb={8}
          />

          <Flex direction={{ base: 'column', md: 'row' }} gap={12} mb={3}>
            <Controller
              name='country'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Field
                  id='country'
                  label='Country'
                  helpText='Provide the country of where the node would be located'
                  error={error}
                  isRequired
                  mb={8}
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
                  helpText='Please choose your current time zone to help us schedule calls'
                  error={error}
                  isRequired
                  mb={8}
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
            mb={8}
          />

          <TextField
            id='projectName'
            label='Project name'
            helpText='This should be a concise description of the title of your project'
            isRequired
            mb={8}
          />

          <TextAreaField
            id='projectDescription'
            label='Brief project summary'
            helpText="Describe your project in a few sentences (you'll have the chance to go into more detail on your blogpost)"
            isRequired
            mb={8}
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
                mb={8}
              >
                <Select
                  id='projectCategory'
                  options={DATA_COLLECTION_PROJECT_CATEGORY_OPTIONS}
                  onChange={option => {
                    onChange(
                      (option as typeof DATA_COLLECTION_PROJECT_CATEGORY_OPTIONS[number]).value
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

          <TextField
            id='requestAmount'
            label='Total budget requested'
            helpText='Estimated grant amount. Ex: USD 20,000'
            isRequired
            mb={8}
          />

          <TextField id='projectRepoLink' label='Project repo link' mb={8} />

          <UploadFile
            id='proposalAttachment'
            label='Proposal'
            title='Upload proposal'
            helpText={
              <>
                Attach a PDF proposal. An proposal template is available{' '}
                <Link
                  fontWeight={700}
                  color='brand.orange.100'
                  href='https://notes.ethereum.org/@YlnZmB-mQ9ah8neq5cLDDg/Grant_Proposal_template'
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                >
                  here
                </Link>
              </>
            }
            isRequired
            onDrop={handleDrop}
            mb={8}
          />

          <Controller
            name='shareResearch'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='shareResearch'
                label='If the opportunity presents itself, would you like to share your findings/research output through a Conference/Discord Talk?'
                error={error}
                mb={8}
              >
                <Select
                  id='shareResearch'
                  options={WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS}
                  onChange={option => {
                    onChange(
                      (option as typeof WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS[number]).value
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

          <TextField id='website' label='Website' mb={8} />

          <FormControl id='twitter-control' mb={8}>
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

          <FormControl id='github-control' mb={8}>
            <FormLabel htmlFor='github' mb={1}>
              <PageText fontSize='input'>Github handle(s)</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Ex: @mygithub
            </PageText>

            <Input
              id='github'
              type='text'
              placeholder='yourgithubhandle'
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
              {...register('github')}
            />

            {errors?.github && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.github.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <TextField
            id='alternativeContact'
            label='Telegram username or alternative contact info'
            helpText="In regards to your submission, we'll get in touch with you via email by default. As backup, if you'd like to provide alternative contact info, you may do so. Not required."
            mb={8}
          />

          <Controller
            name='repeatApplicant'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field
                id='repeatApplicant'
                label='Have you applied before to any grants at the Ethereum Foundation?'
                isRequired
                mb={8}
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
              <FormControl id='canTheEFReachOut-control' mb={8}>
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
            label='Do you have any questions about this challenge?'
            helpText="Is there anything we didn't cover in the above questions? Feel free to add any
            relevant links here. This is optional."
            mb={8}
          />

          <Controller
            name='referralSource'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='referralSource'
                label='How did you hear about this wave of grants?'
                isRequired
                mb={8}
              >
                <Select
                  id='referralSource'
                  options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
                  onChange={option =>
                    onChange((option as typeof HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS[number]).value)
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
                mb={8}
              />
            </Fade>
          </Box>

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
        </form>
      </FormProvider>
    </Stack>
  );
};
