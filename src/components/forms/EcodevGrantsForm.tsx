// Libraries
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
import { FC, useCallback, useState, MouseEvent } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';

// API
import { api } from './api';

// Components
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';
import { DropdownIndicator, PageText } from '../UI';

import uploadSVG from '../../../public/images/upload.svg';

// Constants
import {
  COUNTRY_OPTIONS,
  PROJECT_GRANTS_PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS
} from './constants';
import {
  ECODEV_GRANTS_THANK_YOU_PAGE_URL,
  MAX_PROPOSAL_FILE_SIZE,
  TOAST_OPTIONS
} from '../../constants';

// Styles
import { chakraStyles } from './selectStyles';

// Types
import { EcodevGrantsFormData } from '../../types';
import { RemoveIcon } from '../UI/icons';
import { useDropzone } from 'react-dropzone';

// Utils
import { isURL } from '../../utils';

export const EcodevGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<null | File>(null);

  const methods = useForm<EcodevGrantsFormData>({
    mode: 'onBlur'
  });

  const {
    handleSubmit,
    register,
    trigger,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset
  } = methods;

  const onDrop = useCallback(
    files => {
      const file = files[0];

      setSelectedFile(file);

      setValue('uploadProposal', file, { shouldValidate: true });

      toast({
        ...TOAST_OPTIONS,
        title: 'Document uploaded!',
        status: 'success'
      });
    },
    [setValue, toast]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

  const handleRemoveFile = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSelectedFile(null);
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
                    maxLength: 40,
                    validate: value => !isURL(value)
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
                      First name cannot be a URL.
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
                  {...register('lastName', {
                    required: true,
                    maxLength: 80,
                    validate: value => !isURL(value)
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
                      Last name cannot be a URL.
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

          <FormControl id='company-control' isRequired mb={8}>
            <FormLabel htmlFor='company' mb={1}>
              <PageText display='inline' fontSize='input'>
                Organization name
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Name of your team or organization. If you do not have an organization name, write
              &quot;N/A&quot;.
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
                maxLength: 255,
                validate: value => !isURL(value)
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
                  Organization name cannot be a URL.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='team-profile-control' isRequired mb={8}>
            <FormLabel htmlFor='teamProfile' mb={1}>
              <PageText display='inline' fontSize='input'>
                Team profile
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Briefly describe your organization. Provide links to previous work. How is your
              organization suited to the project&apos;s objectives, and how does it provide the
              necessary expertise?
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
              <PageText fontSize='input'>Twitter</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Twitter handle for your team or project.
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

          <FormControl id='website-control' mb={8}>
            <FormLabel htmlFor='website' mb={1}>
              <PageText fontSize='input'>Website</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              https://
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Link to your team or project website.
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

          <FormControl id='project-repo-control' mb={8}>
            <FormLabel htmlFor='projectRepo' mb={1}>
              <PageText fontSize='input'>Project repo</PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              GitHub or other public repository of the project or related work.
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
                    options={PROJECT_GRANTS_PROJECT_CATEGORY_OPTIONS}
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
                Brief project summary
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Describe your project in a few sentences (you&apos;ll have the chance to go into more
              detail in the long form). If it&apos;s already underway, provide links to any existing
              published work.
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

          <FormControl id='problem-being-solved-control' isRequired mb={8}>
            <FormLabel htmlFor='problemBeingSolved' mb={1}>
              <PageText display='inline' fontSize='input'>
                What problem(s) are being solved by within the scope of the grant?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What is the specific problems, research questions, or needs you are trying to address?
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.problemBeingSolved?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.problemBeingSolved?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='proposed-timeline-control' isRequired mb={8}>
            <FormLabel htmlFor='proposedTimeline' mb={1}>
              <PageText display='inline' fontSize='input'>
                Proposed tasks, roadmap and budget?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Provide a summary that includes a timeline of the expected work and an estimated
              budgetary breakdown.
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
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.proposedTimeline?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl
            id='requested-amount-control'
            isRequired
            mb={8}
            w={{ md: '50%' }}
            pr={{ lg: 6 }}
          >
            <FormLabel htmlFor='requestedAmount' mb={1}>
              <PageText display='inline' fontSize='input'>
                Requested amount
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Estimated grant amount.
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

          <FormControl id='is-your-project-public-good-control' isRequired mb={8}>
            <FormLabel htmlFor='isYourProjectPublicGood' mb={1}>
              <PageText display='inline' fontSize='input'>
                Describe how your project will result in a public good.
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Public goods are things like open source code, shared infrastructure, openly shared
              research, documentation, community building or other benefits provided to the
              community that are typically under-provided by the free market.
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.isYourProjectPublicGood?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.isYourProjectPublicGood?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
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
                Describe key risks and challenges to your project.
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What are the critical risks, relating to both project implementation and achieving
              expected impacts?
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
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.challenges?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Cannot exceed 32768 characters.
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
              <PageText fontSize='input'>Anything else you&apos;d like to share?</PageText>
            </FormLabel>

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

          <FormControl id='referrals-control' isRequired mb={8}>
            <FormLabel htmlFor='referrals' mb={1}>
              <PageText display='inline' fontSize='input'>
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
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.referrals?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Field is required.
                </PageText>
              </Box>
            )}
            {errors?.referrals?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Referrals info cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='uploadProposal'
            control={control}
            rules={{ validate: file => (file ? file.size < MAX_PROPOSAL_FILE_SIZE : true) }}
            render={({ field: { onChange } }) => (
              <FormControl id='upload-proposal' {...getRootProps()}>
                <InputGroup>
                  <Input
                    id='uploadProposal'
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
                    mt={12}
                    mb={12}
                  >
                    <Grid>
                      <GridItem alignSelf='center'>
                        <Box mr={6} flexShrink={0}>
                          <Image src={uploadSVG} alt='Upload file' height={42} width={44} />
                        </Box>
                      </GridItem>
                      <GridItem mb={selectedFile ? 4 : 0}>
                        <Stack>
                          <FormLabel htmlFor='uploadProposal'>
                            <PageText fontSize='input' fontWeight={700} mb={2}>
                              Upload additional documents
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
                            Click here or drag file to this box. Use this space to upload any
                            additional documents you&apos;d like to share. This is optional, but
                            highly recommended.
                          </PageText>
                        </Stack>

                        {selectedFile && errors?.uploadProposal && (
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
