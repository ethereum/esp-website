import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { FC } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'

import { DropdownIndicator, PageText } from '../UI'
import { SubmitButton } from '../SubmitButton'
import { Captcha, Field, TextAreaField, TextField, UploadFile } from '.'

import { api } from './api'

import { chakraStyles } from './selectStyles'

import {
  COUNTRY_OPTIONS,
  FIAT_CURRENCY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE,
  INDIVIDUAL,
  OTHER,
  PECTRA_PGR_PROJECT_CATEGORY_OPTIONS,
  TEAM,
  TIMEZONE_OPTIONS,
} from './constants'

import { PECTRA_PGR_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants'

import { PectraPGRSchema, PectraPGRData } from './schemas/PectraPGR'

export const PectraPGRForm: FC = () => {
  const router = useRouter()
  const toast = useToast()

  const methods = useForm<PectraPGRData>({
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      individualOrTeam: INDIVIDUAL,
      repeatApplicant: false
    },
    resolver: zodResolver(PectraPGRSchema)
  })

  const {
    handleSubmit,
    register,
    trigger,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = methods

  const individualOrTeam = watch('individualOrTeam')
  const referralSource = watch('referralSource')

  const handleDrop = () => {
    toast({
      ...TOAST_OPTIONS,
      title: 'Proposal uploaded!',
      status: 'success'
    });
  }

  const onSubmit = async (data: PectraPGRData) => {
    return api.pectraPGR.submit(data).then(res => {
      if (res.ok) {
        reset()
        router.push(PECTRA_PGR_THANK_YOU_PAGE_URL)
      } else {
        toast({
          ...TOAST_OPTIONS,
          title: 'Something went wrong while submitting, please try again.',
          status: 'error'
        })

        throw new Error('Network response was not OK')
      }
    })
    .catch(err => console.error('There has been a problem with your operation: ', err.message))
  }

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
          id='pectra-pgr-form'
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
            name='individualOrTeam'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field id='individualOrTeam' label='Individual or team?' isRequired>
                <RadioGroup
                  id='individualOrTeam'
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
                      name='individualOrTeam'
                      value={INDIVIDUAL}
                      mr={8}
                    >
                      <PageText fontSize='input'>{INDIVIDUAL}</PageText>
                    </Radio>

                    <Radio id='repeat-applicant-no' size='lg' name='individualOrTeam' value={TEAM}>
                      <PageText fontSize='input'>{TEAM}</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Field>
            )}
          />

          <Box display={individualOrTeam === TEAM ? 'block' : 'none'}>
            <Fade in={individualOrTeam === TEAM} delay={0.25}>
              <TextField
                id='company'
                label='Name of organization or entity'
                helpText='Name of your team or entity you&apos;re submitting for. If your organization doesn&apos;t have a formal name, just try to describe it in a few words!'
                isRequired
              />
            </Fade>
          </Box>

          <Controller
            name='country'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='country'
                label='Country'
                helpText='Please indicate the country where the Institution/Lead Investigator is located'
                error={error}
                isRequired
              >
                <Select
                  id='country'
                  options={COUNTRY_OPTIONS}
                  onChange={option => {
                    const value = (option as (typeof COUNTRY_OPTIONS)[number]).value;
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
              >
                <Select
                  id='timezone'
                  options={TIMEZONE_OPTIONS}
                  onChange={option => {
                    onChange((option as (typeof TIMEZONE_OPTIONS)[number]).value);
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

          <TextField
            id='projectName'
            label='Project name'
            helpText='This should be a concise description of the title of your project'
            isRequired
          />

          <TextAreaField
            id='projectDescription'
            label='Brief project summary'
            helpText="Describe your project in a few sentences (you'll have the chance to go into more
              detail in the long form). If it's already underway, provide links to any existing
              published work"
            isRequired
          />

          <TextAreaField
            id='impact'
            label='Why is your project important?'
            isRequired
          />

          <TextAreaField
            id='howIsItDifferent'
            label='How is it different?'
            isRequired
          />

          <UploadFile
            id='proposalAttachment'
            label='Proposal'
            title='Proposal upload'
            helpText={
              <>
                Attach a PDF proposal for this scope of work. A proposal template is available{' '}
                <Link
                  fontWeight={700}
                  color='brand.orange.100'
                  href='https://notes.ethereum.org/@drigolvc/Grant_Proposal_template/'
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
                  options={PECTRA_PGR_PROJECT_CATEGORY_OPTIONS}
                  onChange={option => {
                    onChange(
                      (option as (typeof PECTRA_PGR_PROJECT_CATEGORY_OPTIONS)[number]).value
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
          <Stack>
            <Stack>
              <PageText display='inline' fontSize='input'>
                Requested amount
              </PageText>

              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                Estimated grant amount, i.e. USD 50,000. Proposals should include a detailed budget
                breakdown for requested amount.
              </PageText>
            </Stack>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
              <Controller
                name='fiatCurrency'
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Field id='fiatCurrency' label='Fiat currency' error={error} isRequired>
                    <Select
                      id='fiatCurrency'
                      value={FIAT_CURRENCY_OPTIONS.find(option => option.value === value)}
                      options={FIAT_CURRENCY_OPTIONS}
                      onChange={option => {
                        onChange((option as (typeof FIAT_CURRENCY_OPTIONS)[number]).value);
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

              <TextField id='requestAmount' label='Amount' isRequired />
            </Flex>
          </Stack>

          <Controller
            name='referralSource'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Field
                id='referralSource'
                label='How did you hear about this grant round?'
                error={error}
                isRequired
              >
                <Select
                  id='referralSource'
                  options={HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE}
                  onChange={option =>
                    onChange((option as (typeof HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE)[number]).value)
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
                label='If other, explain how'
                helpText='Please be as specific as possible. (e.g., an email received, an individual who
              recommended you apply, a link to a tweet, etc.).'
              />
            </Fade>
          </Box>

          <TextField id='linkedinProfile' label='LinkedIn Profile(s)' helpText='URL only' />

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

          <TextField id='website' label='Website' helpText='University website or Google Scholar profile' />

          <TextField
            id='alternativeContact'
            label='Telegram username or alternative contact info'
            helpText="In regards to your submission, we'll get in touch with you via email by default. As backup, if you'd like to provide alternative contact info, you may do so."
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

          <TextAreaField
            id='additionalInfo'
            label="Do you have any questions about this grants round, or is there anything else
            you'd like to share?"
            helpText="Is there anything we didn't cover in the above questions? Feel free to add any
            relevant links here."
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
  )
}
