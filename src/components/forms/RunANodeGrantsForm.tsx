import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
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
import { Captcha } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  APPLYING_AS_RUN_A_NODE_OPTIONS,
  COUNTRY_OPTIONS,
  DOWNLOAD_SPEED_OPTIONS,
  HARDWARE,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  MONTHLY_DATA_CAP_OPTIONS,
  OTHER,
  STIPEND,
  TIMEZONE_OPTIONS
} from './constants';
import { RUN_A_NODE_GRANTS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { schema, type Data } from './schemas/runANode';

export const RunANodeGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<Data>({
    mode: 'onBlur',
    shouldFocusError: true,
    resolver: zodResolver(schema)
  });

  const {
    handleSubmit,
    register,
    control,
    trigger,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = methods;

  // for conditional fields, get the current values
  const hardwareOrStipend = watch('hardwareOrStipend');
  const applyingAs = watch('applyingAs');
  const referralSource = watch('referralSource');

  const isStipendSelected = hardwareOrStipend === STIPEND;

  const onSubmit: SubmitHandler<Data> = async data => {
    return api.runANodeGrants
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(RUN_A_NODE_GRANTS_THANK_YOU_PAGE_URL);
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
                  {...register('firstName')}
                />

                {errors?.firstName && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      {errors?.firstName.message}
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
                  {...register('lastName')}
                />

                {errors?.lastName && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      {errors?.lastName.message}
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Flex>

            {!errors?.firstName && !errors?.lastName && (
              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                This should be the main contact we&apos;ll be talking to.
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
              {...register('email')}
            />

            {errors?.email && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.email.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='applyingAs'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='applyingAs-control' isRequired mb={8}>
                <FormLabel htmlFor='applyingAs'>
                  <PageText display='inline' fontSize='input'>
                    Are you applying as an individual or a team?
                  </PageText>
                </FormLabel>

                <Box>
                  <Select
                    id='applyingAs'
                    options={APPLYING_AS_RUN_A_NODE_OPTIONS}
                    onChange={option =>
                      onChange((option as typeof APPLYING_AS_RUN_A_NODE_OPTIONS[number]).value)
                    }
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />

                  {error && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        {error.message}
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <Box display={applyingAs === OTHER ? 'block' : 'none'}>
            <Fade in={applyingAs === OTHER} delay={0.25}>
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
                  {...register('applyingAsOther')}
                />

                {errors?.applyingAsOther && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      {errors?.applyingAsOther.message}
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='team-profile-control' isRequired mb={8}>
            <FormLabel htmlFor='teamProfile' mb={1}>
              <PageText display='inline' fontSize='input'>
                Team/ Individuals Description - A brief summary of you or your team&apos;s relevant
                experience
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Who is working on this project? Provide an individual/team profile with relevant
              experience and expertise.
            </PageText>

            <Textarea
              id='teamProfile'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('teamProfile')}
            />

            {errors?.teamProfile && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.teamProfile.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <Flex direction={{ base: 'column', md: 'row' }} gap={12} mb={3}>
            <Controller
              name='country'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <FormControl id='country-control' mb={8} isRequired>
                  <FormLabel htmlFor='country' mb={1}>
                    <PageText display='inline' fontSize='input'>
                      Country
                    </PageText>
                  </FormLabel>

                  <PageText as='small' fontSize='helpText' color='brand.helpText'>
                    Provide the country of where the node would be located
                  </PageText>

                  <Box mt={3}>
                    <Select
                      id='country'
                      options={COUNTRY_OPTIONS}
                      onChange={option =>
                        onChange((option as typeof COUNTRY_OPTIONS[number]).value)
                      }
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
                        {error.message}
                      </PageText>
                    </Box>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name='timezone'
              control={control}
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
                  </Box>

                  {error && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        {error.message}
                      </PageText>
                    </Box>
                  )}
                </FormControl>
              )}
            />
          </Flex>

          <FormControl id='project-name-control' isRequired mb={8}>
            <FormLabel htmlFor='projectName' mb={1}>
              <PageText display='inline' fontSize='input'>
                Project name
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please name your project title &quot;Run a Node - [Your Location]&quot;
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
              {...register('projectName')}
            />

            {errors?.projectName && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.projectName.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='company-control' isRequired mb={8}>
            <FormLabel htmlFor='company' mb={1}>
              <PageText display='inline' fontSize='input'>
                Organization
              </PageText>
            </FormLabel>

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
              {...register('company')}
            />

            {errors?.company && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.company.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='project-description-control' isRequired mb={8}>
            <FormLabel htmlFor='projectDescription' mb={1}>
              <PageText display='inline' fontSize='input'>
                Describe your motivation for running a node.
              </PageText>
            </FormLabel>

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
              {...register('projectDescription')}
            />

            {errors?.projectDescription && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.projectDescription.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='project-previous-work-control' isRequired mb={8}>
            <FormLabel htmlFor='projectPreviousWork' mb={1}>
              <PageText display='inline' fontSize='input'>
                Describe your expertise and experience with nodes and clients.
              </PageText>
            </FormLabel>

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
              {...register('projectPreviousWork')}
            />

            {errors?.projectPreviousWork && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.projectPreviousWork.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='why-is-project-important-control' isRequired mb={8}>
            <FormLabel htmlFor='whyIsProjectImportant' mb={1}>
              <PageText display='inline' fontSize='input'>
                Proposed Impact
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What are you hoping to accomplish for the Ethereum community by running this node?
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
              {...register('whyIsProjectImportant')}
            />

            {errors?.whyIsProjectImportant && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.whyIsProjectImportant.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='hardwareOrStipend'
            control={control}
            defaultValue={HARDWARE}
            render={({ field: { onChange, value } }) => (
              <FormControl id='hardwareOrStipend-control' isRequired mb={8}>
                <FormLabel htmlFor='individualOrTeam' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Hardware or Stipend
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText' mb={4}>
                  Please indicate whether you would like use to send you hardware directly or a
                  stipend amount.
                </PageText>

                <RadioGroup
                  id='hardwareOrStipend'
                  onChange={onChange}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='hardware'
                      size='lg'
                      name='hardwareOrStipend'
                      value={HARDWARE}
                      defaultChecked
                      mr={8}
                    >
                      <PageText fontSize='input'>{HARDWARE}</PageText>
                    </Radio>

                    <Radio id='stipend' size='lg' name='hardwareOrStipend' value={STIPEND}>
                      <PageText fontSize='input'>{STIPEND}</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Box display={isStipendSelected ? 'block' : 'none'}>
            <Fade in={isStipendSelected} delay={0.25}>
              <FormControl id='requested-amount-control' isRequired mb={8}>
                <FormLabel htmlFor='requestedAmount' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Provide details about how you will spend this stipend
                  </PageText>
                </FormLabel>
                <Input
                  id='requestedAmount'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('requestedAmount')}
                />

                {errors?.requestedAmount && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      {errors?.requestedAmount.message}
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Controller
            name='downloadSpeed'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='download-speed-control' isRequired mb={8}>
                <FormLabel htmlFor='downloadSpeed' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Download Speeds
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Select download speed
                </PageText>

                <Box mt={3}>
                  <Select
                    id='downloadSpeed'
                    options={DOWNLOAD_SPEED_OPTIONS}
                    onChange={option =>
                      onChange((option as typeof DOWNLOAD_SPEED_OPTIONS[number]).value)
                    }
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />

                  {error && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        {error.message}
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <Controller
            name='dataLimitations'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='download-speed-control' isRequired mb={8}>
                <FormLabel htmlFor='dataLimitations' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Data Limitations
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Monthly data cap
                </PageText>

                <Box mt={3}>
                  <Select
                    id='dataLimitations'
                    options={MONTHLY_DATA_CAP_OPTIONS}
                    onChange={option =>
                      onChange((option as typeof MONTHLY_DATA_CAP_OPTIONS[number]).value)
                    }
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />

                  {error && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        {error.message}
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <FormControl id='proposed-timeline-control' isRequired mb={8}>
            <FormLabel htmlFor='proposedTimeline' mb={1}>
              <PageText display='inline' fontSize='input'>
                Timeline
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Indicate how long you can commit to running a node.
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
              {...register('proposedTimeline')}
            />

            {errors?.proposedTimeline && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.proposedTimeline.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='challenges-control' isRequired mb={8}>
            <FormLabel htmlFor='challenges' mb={1}>
              <PageText display='inline' fontSize='input'>
                Challenges
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Detail any challenges or obstacles you may have to running a node.
            </PageText>

            <Textarea
              id='challenges'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('challenges')}
            />

            {errors?.challenges && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.challenges.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='referralSource'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='referral-source-control' isRequired mb={8}>
                <FormLabel htmlFor='referralSource'>
                  <PageText display='inline' fontSize='input'>
                    How did you hear about this wave of grants?
                  </PageText>
                </FormLabel>

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

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      {error.message}
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Box display={referralSource === OTHER ? 'block' : 'none'}>
            <Fade in={referralSource === OTHER} delay={0.25}>
              <FormControl id='referral-source-if-other-control' mb={8}>
                <FormLabel htmlFor='referralSourceIfOther'>
                  <PageText fontSize='input'>If &apos;Other&apos; is chosen</PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please be as specific as possible. (e.g., an email received, an individual who
                  recommended you apply, a link to a tweet, etc.)
                </PageText>

                <Textarea
                  id='referralSourceIfOther'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('referralSourceIfOther')}
                />

                {errors?.referralSourceIfOther && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      {errors?.referralSourceIfOther.message}
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='telegram-control' mb={8}>
            <FormLabel htmlFor='telegram' mb={1}>
              <PageText display='inline' fontSize='input'>
                Telegram Username or Alternative Contact Info
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              In regards to your submission, we&apos;ll get in touch with you via email by default.
              As backup, if you&apos;d like to provide alternative contact info, you may do so.
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
              {...register('telegram')}
            />

            {errors?.telegram && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.telegram.message}
                </PageText>
              </Box>
            )}
          </FormControl>

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

          <FormControl id='linkedinProfile-control' mb={8}>
            <FormLabel htmlFor='linkedinProfile' mb={1}>
              <PageText display='inline' fontSize='input'>
                LinkedIn Profile(s)
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              URL only.
            </PageText>

            <Input
              id='linkedinProfile'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('linkedinProfile')}
            />

            {errors?.linkedinProfile && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.linkedinProfile.message}
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='repeatApplicant'
            control={control}
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
                    Is it OK for a member of the Ethereum Foundation to reach out to you (say, in
                    regards to getting involved in other opportunities that may come up)?
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

          <FormControl id='additional-info-control' mb={8}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>
                Do you have any questions about this grants round, or is there anything else
                you&apos;d like to share?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Is there anything we didn&apos;t cover in the above questions? Feel free to add any
              relevant links here. This is optional.
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
              {...register('additionalInfo')}
            />

            {errors?.additionalInfo && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  {errors?.additionalInfo.message}
                </PageText>
              </Box>
            )}
          </FormControl>

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
