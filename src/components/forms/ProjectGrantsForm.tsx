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
  InputGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { DropdownIndicator, ImportantText, PageText } from '../UI';

import { useShadowAnimation } from '../../hooks';

import { chakraStyles } from './selectStyles';

import planeVectorSVG from '../../public/images/plane-vector.svg';
import uploadSVG from '../../public/images/upload.svg';

import {
  COUNTRY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  OTHER,
  PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS
} from './constants';
import { MAX_PROPOSAL_FILE_SIZE, PROJECT_GRANTS_THANK_YOU_PAGE_URL } from '../../constants';

import { ProjectGrantsFormData, ProposalFile, ReferralSource } from '../../types';
import { api } from './api';

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const ProjectGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [maxFileSizeExceeded, setMaxFileSizeExceeded] = useState(false);

  const [referralSource, setReferralSource] = useState<ReferralSource | unknown>({
    value: '',
    label: ''
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm<ProjectGrantsFormData>({
    mode: 'onBlur'
  });
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  const onDrop = useCallback(
    files => {
      const file = files[0];

      if (file.size > MAX_PROPOSAL_FILE_SIZE) {
        setMaxFileSizeExceeded(true);
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();
      // we have to encode the file content as base64 to be able to upload it
      reader.readAsDataURL(file);

      reader.onabort = () => console.log('File reading was aborted.');
      reader.onerror = () => console.error('File reading has failed.');
      reader.onload = () => {
        const base64 = reader.result as string;

        const uploadedFile: ProposalFile = {
          name: file.name,
          type: file.type,
          // `data:*/*;base64,` needs to be removed to retrieve the base64 encoded string only
          content: base64.split('base64,')[1] as string,
          path: file.path
        };

        setValue('uploadProposal', uploadedFile, { shouldValidate: true });
      };

      toast({
        position: 'top-right',
        title: 'Proposal uploaded!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        containerStyle: {
          fontFamily: 'fonts.heading'
        }
      });
    },
    [setValue, toast]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = (data: ProjectGrantsFormData) => {
    api.projectGrants
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(PROJECT_GRANTS_THANK_YOU_PAGE_URL);
        } else {
          toast({
            position: 'top-right',
            title: 'Something went wrong while submitting, please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            containerStyle: {
              fontFamily: 'fonts.heading'
            }
          });

          throw new Error('Network response was not OK');
        }
      })
      .catch(err => console.error('There has been a problem with your operation: ', err.message));
  };

  const handleReferralSource = (source: ReferralSource | unknown) => {
    setReferralSource(source);
  };

  const handleUploadClick = () => inputRef.current?.click();

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName('');
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
                id='first-name'
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

              <Box mt={1}>
                {errors?.firstName?.type === 'required' && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    First name is required.
                  </PageText>
                )}
                {errors?.firstName?.type === 'maxLength' && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    First name cannot exceed 40 characters.
                  </PageText>
                )}
              </Box>
            </FormControl>

            <FormControl id='last-name-control' isRequired>
              <FormLabel htmlFor='lastName'>
                <PageText display='inline' fontSize='input'>
                  Last name
                </PageText>
              </FormLabel>
              <Input
                id='last-name'
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

              <Box mt={1}>
                {errors?.lastName?.type === 'required' && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Last name is required.
                  </PageText>
                )}
                {errors?.lastName?.type === 'maxLength' && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Last name cannot exceed 80 characters.
                  </PageText>
                )}
              </Box>
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

          <Box mt={1}>
            {errors?.email?.type === 'required' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Email is required.
              </PageText>
            )}
          </Box>
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

          <Box mt={1}>
            {errors?.company?.type === 'required' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Organization name is required.
              </PageText>
            )}
            {errors?.company?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Organization name cannot exceed 255 characters.
              </PageText>
            )}
          </Box>
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
            id='project-name'
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

          <Box mt={1}>
            {errors?.projectName?.type === 'required' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Project name is required.
              </PageText>
            )}
            {errors?.projectName?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Project name cannot exceed 255 characters.
              </PageText>
            )}
          </Box>
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

          <Box mt={1}>
            {errors?.website?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Website cannot exceed 255 characters.
              </PageText>
            )}
          </Box>
        </FormControl>

        <FormControl id='github-control' mb={8}>
          <FormLabel htmlFor='github' mb={1}>
            <PageText fontSize='input'>GitHub</PageText>
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

          <Box mt={1}>
            {errors?.github?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                GitHub URL cannot exceed 255 characters.
              </PageText>
            )}
          </Box>
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

          <Box mt={1}>
            {errors?.twitter?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Twitter handle cannot exceed 16 characters.
              </PageText>
            )}
          </Box>
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
            id='team-profile'
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

          <Box mt={1}>
            {errors?.teamProfile?.type === 'required' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Team profile is required.
              </PageText>
            )}
            {errors?.teamProfile?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Team profile cannot exceed 32768 characters.
              </PageText>
            )}
          </Box>
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
            id='project-description'
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

          <Box mt={1}>
            {errors?.projectDescription?.type === 'required' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Project description is required.
              </PageText>
            )}
            {errors?.projectDescription?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Project description cannot exceed 32768 characters.
              </PageText>
            )}
          </Box>
        </FormControl>

        <Controller
          name='projectCategory'
          control={control}
          rules={{ required: true, validate: selected => selected.value !== '' }}
          defaultValue={{ value: '', label: '' }}
          render={({ field: { onChange } }) => (
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
                  id='project-category'
                  options={PROJECT_CATEGORY_OPTIONS}
                  onChange={onChange}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
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
            id='requested-amount'
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

          <Box mt={1}>
            {errors?.projectDescription?.type === 'required' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Requested amount is required.
              </PageText>
            )}
            {errors?.projectDescription?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Requested amount cannot exceed 20 characters.
              </PageText>
            )}
          </Box>
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

              <Box mt={1}>
                {errors?.city?.type === 'maxLength' && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    City name cannot exceed 255 characters.
                  </PageText>
                )}
              </Box>
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
          render={({ field: { onChange } }) => (
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
                  onChange={onChange}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
              </Box>

              <Box mt={1}>
                {errors?.timezone && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Time zone is required.
                  </PageText>
                )}
              </Box>
            </FormControl>
          )}
        />

        <Controller
          name='howDidYouHearAboutESP'
          control={control}
          defaultValue={{ value: '', label: '' }}
          render={({ field: { onChange } }) => (
            <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={8}>
              <FormLabel htmlFor='howDidYouHearAboutESP'>
                <PageText display='inline' fontSize='input'>
                  How did you hear about the Ecosystem Support Program?
                </PageText>
              </FormLabel>

              <Select
                id='how-did-you-hear-about-ESP'
                options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
                components={{ DropdownIndicator }}
                placeholder='Select'
                closeMenuOnSelect={true}
                selectedOptionColor='brand.option'
                chakraStyles={chakraStyles}
                onChange={(selected: any) => {
                  onChange(selected);
                  handleReferralSource(selected.value);
                }}
              />
            </FormControl>
          )}
        />

        <Box display={(referralSource as ReferralSource).value === OTHER ? 'block' : 'none'}>
          <Fade in={(referralSource as ReferralSource).value === OTHER} delay={0.25}>
            <FormControl id='referral-source-if-other-control' mb={8}>
              <FormLabel htmlFor='referralSourceIfOther'>
                <PageText fontSize='input'>If Other, explain how</PageText>
              </FormLabel>
              <Input
                id='referral-source-if-other'
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

              <Box mt={1}>
                {errors?.referralSourceIfOther?.type === 'maxLength' && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    Referral source cannot exceed 255 characters.
                  </PageText>
                )}
              </Box>
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

          <Box mt={1}>
            {errors?.referralSourceIfOther?.type === 'maxLength' && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                Referral name cannot exceed 150 characters.
              </PageText>
            )}
          </Box>
        </FormControl>

        <FormControl id='upload-proposal' {...getRootProps()}>
          <InputGroup>
            <FormLabel htmlFor='uploadProposal'>
              <Input
                id='upload-proposal'
                type='file'
                role='button'
                aria-label='File Upload'
                hidden
                {...getInputProps({ name: 'base64' })}
                onChange={handleFileInput}
              />
            </FormLabel>
            <Flex
              bgColor='brand.uploadProposal'
              justifyContent='space-evenly'
              alignItems='center'
              cursor='pointer'
              py={9}
              px={{ base: 6, md: 16 }}
              mt={12}
              mb={12}
              onClick={handleUploadClick}
            >
              <Box mr={6} flexShrink={0}>
                <Image src={uploadSVG} alt='Upload file' height={42} width={44} />
              </Box>

              <Stack>
                <PageText fontSize='input' fontWeight={400} lineHeight='21px' mb={-1}>
                  <strong>Upload the proposal.</strong> Click here or drag file to this box.
                </PageText>

                <PageText as='small' fontSize='helpText' color='brand.helpText' lineHeight='17px'>
                  If you already have a proposal or document you&apos;d ike to share, please upload
                  it here. This is optional, but highly recommended.
                </PageText>

                {errors?.uploadProposal && (
                  <PageText as='small' fontSize='helpText' color='red.500'>
                    File size cannot exceed 2GB.
                  </PageText>
                )}

                {fileName.length > 0 && (
                  <Flex alignItems='center'>
                    <PageText mr={4}>{fileName}</PageText>
                    <Button type='reset' onClick={removeFile} px={2} border='1px solid #7c7ba1'>
                      X
                    </Button>
                  </Flex>
                )}
              </Stack>
            </Flex>
          </InputGroup>
        </FormControl>

        <Center>
          <Box id='submit-application' position='relative'>
            <MotionBox
              backgroundColor='brand.button.shadow'
              h='56px'
              w='310px'
              position='absolute'
              animate={shadowBoxControl}
              // opacity={!isValid ? 0 : 1}
            />

            <MotionButton
              backgroundColor='brand.accent'
              w='310px'
              py={7}
              borderRadius={0}
              type='submit'
              // isDisabled={!isValid}
              _hover={{ bg: 'brand.hover' }}
              whileHover={{ x: -1.5, y: -1.5 }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              // pointerEvents={!isValid ? 'none' : 'auto'}
            >
              <ImportantText color='white'>Submit Application</ImportantText>

              <Flex pl={5}>
                <Image src={planeVectorSVG} alt='paper plane vector' height='29px' width='32px' />
              </Flex>
            </MotionButton>
          </Box>
        </Center>
      </form>
    </Stack>
  );
};
