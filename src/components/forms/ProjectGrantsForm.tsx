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
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, MouseEvent, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import uploadSVG from '../../../public/images/upload.svg';

import {
  COUNTRY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  OTHER,
  PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS
} from './constants';
import {
  MAX_PROPOSAL_FILE_SIZE,
  PROJECT_GRANTS_THANK_YOU_PAGE_URL,
  TOAST_OPTIONS
} from '../../constants';

import { ProjectGrantsFormData, ReferralSource } from '../../types';
import { RemoveIcon } from '../UI/icons';

export const ProjectGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<null | File>(null);

  const [referralSource, setReferralSource] = useState<ReferralSource | unknown>({
    value: '',
    label: ''
  });
  const {
    handleSubmit,
    register,
    trigger,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset
  } = useForm<ProjectGrantsFormData>({
    mode: 'onBlur'
  });

  const onDrop = useCallback(
    files => {
      const file = files[0];

      setSelectedFile(file);

      setValue('uploadProposal', file, { shouldValidate: true });

      toast({
        ...TOAST_OPTIONS,
        title: 'Proposal uploaded!',
        status: 'success'
      });
    },
    [setValue, toast]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
      <form id='project-grants-form' onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column' mb={8}>
          <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
            <FormControl id='first-name-control' isRequired mr={{ md: 12 }} mb={{ base: 8, md: 0 }}>
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

        <FormControl id='github-control' mb={8}>
          <FormLabel htmlFor='github' mb={1}>
            <PageText fontSize='input'>Project Repo</PageText>
          </FormLabel>
          <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
            https://github.com/
          </PageText>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            GitHub or other public repository of the project or related work.
          </PageText>

          <Input
            id='github'
            type='text'
            placeholder='yourgithubaccount'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            position='relative'
            color='brand.paragraph'
            fontSize='input'
            pl={36}
            mt={3}
            {...register('github', {
              maxLength: 255
            })}
          />

          {errors?.github?.type === 'maxLength' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                GitHub URL cannot exceed 255 characters.
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
                  options={PROJECT_CATEGORY_OPTIONS}
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

        <Controller
          name='howDidYouHearAboutESP'
          control={control}
          defaultValue={{ value: '', label: '' }}
          render={({ field: { onChange } }) => (
            <FormControl id='how-did-you-hear-about-ESP-control' mb={8}>
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
                          <PageText fontSize='input' fontWeight={400} lineHeight='21px' mb={-1}>
                            <strong>Upload the proposal.</strong> Click here or drag file to this
                            box.
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
                          If you already have a proposal or document you&apos;d ike to share, please
                          upload it here. This is optional, but highly recommended.
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
    </Stack>
  );
};
