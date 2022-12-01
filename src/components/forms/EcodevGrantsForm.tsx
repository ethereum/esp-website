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
  COUNTRY_OPTIONS,
  ECODEV_GRANTS_PROJECT_CATEGORY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ECODEV_GRANTS_WAVE,
  INDIVIDUAL,
  OTHER
} from './constants';
import { ECODEV_GRANTS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

// Styles
import { chakraStyles } from './selectStyles';

// Types
import { EcodevGrantsFormData, EcodevGrantsReferralSource } from '../../types';

export const EcodevGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [referralSource, setReferralSource] = useState<EcodevGrantsReferralSource | unknown>({
    value: '',
    label: ''
  });

  const methods = useForm<EcodevGrantsFormData>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: EcodevGrantsFormData) => {
    return api.ecodevGrants
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(ECODEV_GRANTS_THANK_YOU_PAGE_URL);
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

  const handleReferralSource = (source: EcodevGrantsReferralSource) => {
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
          <Controller
            name='individualOrTeam'
            control={control}
            rules={{ required: true }}
            defaultValue={INDIVIDUAL}
            render={({ field: { value } }) => (
              <FormControl id='individual-or-team-control' isRequired mb={8}>
                <FormLabel htmlFor='individualOrTeam' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Are you submitting on behalf of a team, or as an individual?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='individualOrTeam'
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

          <FormControl id='company-control' mb={8}>
            <FormLabel htmlFor='company' mb={1}>
              <PageText display='inline' fontSize='input'>
                If applying as an Organization, please specify its name:
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Name of your university program, team, or organization. If you do not have an
              organization name, write &quot;N/A&quot;
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
                maxLength: 255
              })}
            />

            {errors?.company?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Organization name cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='team-profile-control' isRequired mb={8}>
            <FormLabel htmlFor='teamProfile' mb={1}>
              <PageText display='inline' fontSize='input'>
                Team/Individuals description - A brief summary of your team&apos;s relevant
                experience
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Who is working on this project? Give us a bit of info and include relevant links, if
              available! Please provide other projects or research papers (ideally public and/or
              open source), engagements or other types of proof that your team has the necessary
              experience to undertake the project you are applying for.
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
              {...register('teamProfile', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.teamProfile?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team profile is required.
                </PageText>
              </Box>
            )}
            {errors?.teamProfile?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team profile cannot exceed 32768 characters.
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

          <FormControl id='website-control' isRequired mb={8}>
            <FormLabel htmlFor='website' mb={1}>
              <PageText display='inline' fontSize='input'>
                Grant Proposal URL
              </PageText>
            </FormLabel>

            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              https://
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please provide a link to your grant proposal for review.
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
              mt={3}
              {...register('website', {
                required: true,
                maxLength: 255
              })}
            />

            {errors?.website?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  The URL cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
            {errors?.website?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Grant Proposal URL is required.
                </PageText>
              </Box>
            )}
          </FormControl>

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
              {...register('linkedinProfile', {
                maxLength: 255
              })}
            />

            {errors?.linkedinProfile?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  LinkedIn profiles cannot exceed 255 characters.
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
                    options={ECODEV_GRANTS_PROJECT_CATEGORY_OPTIONS}
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

          <FormControl id='project-description-control' isRequired mb={8}>
            <FormLabel htmlFor='projectDescription' mb={1}>
              <PageText display='inline' fontSize='input'>
                Brief Project Summary
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Describe your project in a few sentences (you&apos;ll have the chance to go into more
              detail on your blogpost).
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

          <FormControl id='progress-control' isRequired mb={8}>
            <FormLabel htmlFor='progress' mb={1}>
              <PageText display='inline' fontSize='input'>
                Describe the current status of the project and progress achieved so far
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              For example, do you have an MVP? Please describe its functionality and limitations and
              provide a link to it here.
            </PageText>

            <Textarea
              id='progress'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('progress', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.progress?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.progress?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='problemBeingSolved-control' isRequired mb={8}>
            <FormLabel htmlFor='problemBeingSolved'>
              <PageText display='inline' fontSize='input'>
                What problem are you trying to solve?
              </PageText>
            </FormLabel>

            <Textarea
              id='problemBeingSolved'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              {...register('problemBeingSolved', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.problemBeingSolved?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Problem being solved is required.
                </PageText>
              </Box>
            )}
            {errors?.problemBeingSolved?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Problem being solved cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='proposed-timeline-control' isRequired mb={8}>
            <FormLabel htmlFor='proposedTimeline' mb={1}>
              <PageText display='inline' fontSize='input'>
                Budget breakdown and project roadmap
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please include a brief explanation on the milestones/roadmap in a 3-6 months
              timeframe, along with expected deliverables. Also outline how the funds will be used
              for the research project and/or members of the team.
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.proposedTimeline?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project roadmap is required.
                </PageText>
              </Box>
            )}
            {errors?.proposedTimeline?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project roadmap cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='requested-amount-control' isRequired mb={8} w={{ md: '50%' }}>
            <FormLabel htmlFor='requestedAmount' mb={1}>
              <PageText display='inline' fontSize='input'>
                Total budget requested
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Estimated grant amount. Ex: USD 50,000.
            </PageText>

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
              {...register('requestedAmount', {
                required: true,
                maxLength: 20
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
                  Requested amount cannot exceed 20 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          {/* budgetBreakdown */}

          <FormControl id='why-is-project-important-control' isRequired mb={8}>
            <FormLabel htmlFor='whyIsProjectImportant' mb={1}>
              <PageText display='inline' fontSize='input'>
                Why is your project important?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Why should solving these problems or addressing these needs be prioritized, what
              evidence do you have of importance or demand?
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.whyIsProjectImportant?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.whyIsProjectImportant?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='how-does-your-project-differ-control' isRequired mb={8}>
            <FormLabel htmlFor='howDoesYourProjectDiffer' mb={1}>
              <PageText display='inline' fontSize='input'>
                How does your project differ from similar ones?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What other solutions are being worked on, what unique contribution will you make or
              advance will you provide beyond the state of the art?
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.howDoesYourProjectDiffer?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.howDoesYourProjectDiffer?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='isYourProjectPublicGood-control' isRequired mb={8}>
            <FormLabel htmlFor='isYourProjectPublicGood'>
              <PageText display='inline' fontSize='input'>
                How does this project benefit the greater Ethereum ecosystem?
              </PageText>
            </FormLabel>

            <Textarea
              id='isYourProjectPublicGood'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              {...register('isYourProjectPublicGood', {
                required: true,
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

          <FormControl id='is-open-source-control' isRequired mb={8}>
            <FormLabel htmlFor='isOpenSource' mb={1}>
              <PageText display='inline' fontSize='input'>
                Will your results be open source?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              If not, please explain why.
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.isOpenSource?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.isOpenSource?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='why-ethereum-control' isRequired mb={8}>
            <FormLabel htmlFor='whyEthereum' mb={1}>
              <PageText display='inline' fontSize='input'>
                Describe the expected effects of your project proposal on the Ethereum ecosystem.
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please list the expected results of the project and explain how they will have a
              positive effect on the Ethereum ecosystem at large.
            </PageText>

            <Textarea
              id='whyEthereum'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('whyEthereum', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.whyEthereum?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.whyEthereum?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
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
              Have you come across any obstacles thus far? If so, how have you attempted to tackle
              these issues? Have you been successful in overcoming them?
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
              {...register('challenges', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.challenges?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Challenges description is required.
                </PageText>
              </Box>
            )}
            {errors?.challenges?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Challenges description cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='sustainability-plan-control' isRequired mb={8}>
            <FormLabel htmlFor='sustainabilityPlan' mb={1}>
              <PageText display='inline' fontSize='input'>
                What are your plans after the grant is completed?
              </PageText>
            </FormLabel>

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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.sustainabilityPlan?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.sustainabilityPlan?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='other-projects-control' isRequired mb={8}>
            <FormLabel htmlFor='otherProjects' mb={1}>
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
              mt={3}
              {...register('otherProjects', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.otherProjects?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.otherProjects?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
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

          <FormControl id='other-funding-control' isRequired mb={8}>
            <FormLabel htmlFor='otherFunding' mb={1}>
              <PageText display='inline' fontSize='input'>
                Have you applied for or received other funding?
              </PageText>
            </FormLabel>

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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.otherFunding?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.otherFunding?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='additional-info-control' mb={8}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>
                Do you have any questions about this challenge, or is there anything else you&apos;d
                like to share?
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
                    maxLength: 255
                  })}
                />

                {errors?.city?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      City name cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <Controller
                name='country'
                control={control}
                defaultValue={{ value: '', label: '' }}
                render={({ field: { onChange } }) => (
                  <FormControl id='country-control'>
                    <FormLabel htmlFor='country'>
                      <PageText display='inline' fontSize='input'>
                        Country
                      </PageText>
                    </FormLabel>

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
                  </FormControl>
                )}
              />
            </Flex>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Where is your team located?
            </PageText>
          </Flex>

          <Controller
            name='howDidYouHearAboutESP'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={12}>
                <FormLabel htmlFor='howDidYouHearAboutESP'>
                  <PageText display='inline' fontSize='input'>
                    How did you hear about this wave of grants?
                  </PageText>
                </FormLabel>

                <Select
                  id='howDidYouHearAboutESP'
                  options={HOW_DID_YOU_HEAR_ABOUT_ECODEV_GRANTS_WAVE}
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

          <Box
            display={
              (referralSource as EcodevGrantsReferralSource).value === OTHER ? 'block' : 'none'
            }
          >
            <Fade in={(referralSource as EcodevGrantsReferralSource).value === OTHER} delay={0.25}>
              <FormControl id='referral-source-if-other-control' mb={8}>
                <FormLabel htmlFor='referralSourceIfOther'>
                  <PageText fontSize='input'>If other, explain how</PageText>
                </FormLabel>
                <Input
                  id='referralSourceIfOther'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('referralSourceIfOther', {
                    maxLength: 255
                  })}
                />

                {errors?.referralSourceIfOther?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Referral source cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='referrals' mb={12}>
            <FormLabel htmlFor='referrals' mb={1}>
              <PageText fontSize='input'>
                Did anyone recommend that you contact Ecosystem Support?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please write the name of the person who recommended that you apply.
            </PageText>

            <Input
              id='referrals'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('referrals', {
                maxLength: 150
              })}
            />

            {errors?.referralSourceIfOther?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Referral name cannot exceed 150 characters.
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
  );
};
