// Libraries
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

// API
import { api } from './api';

// Components
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';
import { DropdownIndicator, PageText } from '../UI';

// Constants
import {
  APPLYING_AS_OPTIONS,
  COUNTRY_OPTIONS,
  MERGE_DATA_CHALLENGE_PROJECT_CATEGORY_OPTIONS,
  OTHER,
  TIMEZONE_OPTIONS,
  WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS
} from './constants';
import { MERGE_DATA_CHALLENGE_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';


// Styles
import { chakraStyles } from './selectStyles';

// Types
import { MergeDataChallengeFormData, ApplyingAs } from '../../types';

export const MergeDataChallengeForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [applyingAs, setApplyingAs] = useState<ApplyingAs | unknown>({
    value: '',
    label: ''
  });

  const methods = useForm<MergeDataChallengeFormData>({
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

  const onSubmit = async(data: MergeDataChallengeFormData) => {
    return api.mergeDataChallenge
    .submit(data)
    .then(res => {
      if (res.ok) {
        reset();
        router.push(MERGE_DATA_CHALLENGE_THANK_YOU_PAGE_URL);
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
  }

  const handleApplyingAs = (value: ApplyingAs) => {
    setApplyingAs(value);
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
              <FormControl
                id='first-name-control'
                isRequired
                mr={{ md: 12 }}
                mb={{ base: 8, md: 0 }}
              >
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

              <FormControl id='last-name-control' isRequired>
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

            {!errors?.firstName && !errors?.lastName && (
              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                Who is the point of contact for the application?
              </PageText>
            )}
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

          <FormControl id='title-control' isRequired mb={8}>
            <FormLabel htmlFor='title'>
              <PageText display='inline' fontSize='input'>
                Title
              </PageText>
            </FormLabel>
            <Input
              id='title'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              {...register('title', { required: true, maxLength: 128 })}
            />

            {errors?.title?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Title is required.
                </PageText>
              </Box>
            )}

            {errors?.email?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Title cannot exceed 128 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='applyingAs'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='applyingAs-control' isRequired mb={8}>
                <FormLabel htmlFor='applyingAs'>
                  <PageText display='inline' fontSize='input'>
                    In which capacity are you applying?
                  </PageText>
                </FormLabel>

                <Box>
                  <Select
                    id='applyingAs'
                    options={APPLYING_AS_OPTIONS}
                    onChange={(value: any) => {
                      onChange(value);
                      handleApplyingAs(value);
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
                        Please select in which capacity you are applying.
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <Box display={(applyingAs as ApplyingAs).value === OTHER ? 'block' : 'none'}>
            <Fade in={(applyingAs as ApplyingAs).value === OTHER} delay={0.25}>
              <FormControl id='applyingAsOther-control' mb={8}>
                <FormLabel htmlFor='applyingAsOther'>
                  <PageText fontSize='input'>If other, please specify</PageText>
                </FormLabel>
                <Input
                  id='applyingAsOther'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('applyingAsOther', {
                    maxLength: 255
                  })}
                />

                {errors?.applyingAsOther?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Applying as info cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='company-control' isRequired mb={8}>
            <FormLabel htmlFor='company' mb={1}>
              <PageText display='inline' fontSize='input'>
                If applying as an Institution, please specify its name:
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Name of your university program, team, or organization. If you do not have an organization name, write &quot;N/A&quot;.
            </PageText>

            <Input
              id='company'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('company', {
                required: true,
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

          <Controller
            name='country'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='country-control' mb={8} w={{ md: '50%' }} isRequired>
                <FormLabel htmlFor='country' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Country
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please indicate the country where the Institution/Lead Investigator is located.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='country'
                    options={COUNTRY_OPTIONS}
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
                      Country is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <FormControl id='countriesOfTeam-control' mb={8}>
            <FormLabel htmlFor='countriesOfTeam' mb={1}>
              <PageText display='inline' fontSize='input'>
                If you are a team of distributed researchers, please indicate where your fellow researchers are located.
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              You can write as many countries as needed.
            </PageText>

            <Input
              id='countriesOfTeam'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('countriesOfTeam', {
                maxLength: 255
              })}
            />

            {errors?.countriesOfTeam?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Countries list cannot exceed 255 characters.
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

          <FormControl id='project-name-control' isRequired mb={8}>
            <FormLabel htmlFor='projectName' mb={1}>
              <PageText display='inline' fontSize='input'>
                Project name
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              This should be a concise description of the title of your project.
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
                required: true,
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

          <FormControl id='project-description-control' isRequired mb={8}>
            <FormLabel htmlFor='projectDescription' mb={1}>
              <PageText display='inline' fontSize='input'>
                Brief project summary
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Describe your project in a few sentences (you&apos;ll have the chance to go into more detail on your blog post).
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
                required: true,
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
                  Please choose a category that your project best fits in.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='projectCategory'
                    options={MERGE_DATA_CHALLENGE_PROJECT_CATEGORY_OPTIONS}
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

          <FormControl id='blogPostURL-control' isRequired mb={8}>
            <FormLabel htmlFor='blogPostURL' mb={1}>
              <PageText display='inline' fontSize='input'>
                Blog Post URL
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please provide a link to your blog post for review.
            </PageText>

            <Input
              id='blogPostURL'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('blogPostURL', {
                required: true,
                maxLength: 255
              })}
            />

            {errors?.blogPostURL?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Blog post URL is required.
                </PageText>
              </Box>
            )}
            {errors?.blogPostURL?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Blog post URL cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='additionalSupportRequests-control' mb={8}>
            <FormLabel htmlFor='additionalSupportRequests' mb={1}>
              <PageText display='inline' fontSize='input'>
                Additional support requests
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Aside from funding and financial support, are there other resources that would help you or your team succeed?
            </PageText>

            <Textarea
              id='additionalSupportRequests'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('additionalSupportRequests', {
                maxLength: 32768
              })}
            />

            {errors?.additionalSupportRequests?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Additional support requests cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='wouldYouShareYourResearch'
            control={control}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='wouldYouShareYourResearch-control' mb={8}>
                <FormLabel htmlFor='wouldYouShareYourResearch'>
                  <PageText display='inline' fontSize='input'>
                    If the opportunity presents itself, would you like to share your findings/research output through a Conference/Discord talk?
                  </PageText>
                </FormLabel>

                <Select
                  id='wouldYouShareYourResearch'
                  options={WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS}
                  onChange={onChange}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
              </FormControl>
            )}
          />

          <FormControl id='twitter-control' mb={8}>
            <FormLabel htmlFor='twitter' mb={1}>
              <PageText fontSize='input'>Twitter Handle(s)</PageText>
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
              {...register('twitter', {
                maxLength: 40
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

          <FormControl id='githubUser-control' mb={8}>
            <FormLabel htmlFor='githubUser' mb={1}>
              <PageText fontSize='input'>GitHub User(s)</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Ex: @mygithub
            </PageText>

            <Input
              id='githubUser'
              type='text'
              placeholder='mygithub'
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
              {...register('githubUser', {
                maxLength: 40
              })}
            />

            {errors?.githubUser?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  GitHub User(s) handle cannot exceed 16 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='telegram-control' mb={8}>
            <FormLabel htmlFor='telegram' mb={1}>
              <PageText display='inline' fontSize='input'>
                Telegram username or alternative contact info
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              In regards to your submission, we&apos;ll get in touch with you via email by default. As backup, if you&apos;d like to provide alternative contact info, you may do so. Not required.
            </PageText>

            <Input
              id='telegram'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('telegram', {
                maxLength: 150
              })}
            />

            {errors?.telegram?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Alternative contact info cannot exceed 150 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='repeatApplicant'
            control={control}
            rules={{ required: true }}
            defaultValue='No'
            render={({ field: { onChange, value } }) => (
              <FormControl id='repeat-applicant-control' isRequired mb={8}>
                <FormLabel htmlFor='repeatApplicant'>
                  <PageText display='inline' fontSize='input'>
                    Have you applied before to any grants at the Ethereum Foundation?
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

          <Controller
            name='canTheEFReachOut'
            control={control}
            defaultValue='Yes'
            render={({ field: { onChange, value } }) => (
              <FormControl id='canTheEFReachOut-control' mb={8}>
                <FormLabel htmlFor='canTheEFReachOut'>
                  <PageText display='inline' fontSize='input'>
                    Is it OK for a member of the Ethereum Foundation to reach out to you (say, in regards to getting involved in other opportunities that may come up)?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='canTheEFReachOut'
                  onChange={onChange}
                  value={value}
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

          <FormControl id='additional-info-control' mb={12}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>
                Do you have any questions about this challenge, or is there anything else you&apos;d like to share?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Is there anything we didn&apos;t cover in the above questions? Feel free to add any relevant links here. This is optional.
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
  )
}