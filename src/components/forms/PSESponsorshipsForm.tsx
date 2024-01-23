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

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';

import { api } from './api';

import { chakraStyles } from './selectStyles';

import {
  COUNTRY_OPTIONS,
  INDIVIDUAL,
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  TEAM,
  ONLINE_EVENT,
  IN_PERSON_EVENT,
  HYBRID_EVENT
} from './constants';
import { PSE_SPONSORSHIPS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { EventFormat, IndividualOrTeam, PSESponsorshipsFormData } from '../../types';
import { containURL } from '../../utils';

export const PSESponsorshipsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>(INDIVIDUAL);
  const [eventLocation, setEventLocation] = useState<EventFormat>(ONLINE_EVENT);
  const HAS_EVENT_LOCATION = eventLocation === IN_PERSON_EVENT || eventLocation === HYBRID_EVENT;
  // `unknown` comes from react-select required typings (https://stackoverflow.com/a/54370057)

  const methods = useForm<PSESponsorshipsFormData>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: PSESponsorshipsFormData) => {
    return api.pseSponsorships
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(PSE_SPONSORSHIPS_THANK_YOU_PAGE_URL);
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
      bgGradient='linear(to-b, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={{ base: 5, md: 12 }}
      pt={{ base: 8, md: 12 }}
      pb={{ base: 20, md: 16 }}
      borderRadius={{ md: '10px' }}
    >
      <FormProvider {...methods}>
        <form id='pse-sponsorships-form' onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormControl id='first-name-control' isRequired mb={8} mr={{ md: 12 }}>
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
                  validate: value => !containURL(value)
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
                    First name cannot contain a URL.
                  </PageText>
                </Box>
              )}
            </FormControl>

            <FormControl id='last-name-control' isRequired mb={8}>
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
                  validate: value => !containURL(value)
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
                    Last name cannot contain a URL.
                  </PageText>
                </Box>
              )}
            </FormControl>
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

          {/* If the component doesn't expose input's ref, we should use the Controller component, */}
          {/* which will take care of the registration process (https://react-hook-form.com/get-started#IntegratingwithUIlibraries) */}
          <Controller
            name='individualOrTeam'
            control={control}
            rules={{ required: true }}
            defaultValue={INDIVIDUAL}
            render={({ field: { onChange, value } }) => (
              <FormControl
                id='individual-or-team-control'
                isRequired
                mb={individualOrTeam === TEAM ? 4 : 8}
              >
                <FormLabel htmlFor='individualOrTeam' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Are you submitting on behalf of a team, or as an individual?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='individualOrTeam'
                  onChange={(value: IndividualOrTeam) => {
                    onChange(value);
                    setIndividualOrTeam(value);
                  }}
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

          <Box display={individualOrTeam === TEAM ? 'block' : 'none'}>
            <Fade in={individualOrTeam === TEAM} delay={0.25}>
              <FormControl
                id='individual-or-team-control'
                isRequired={individualOrTeam === TEAM}
                mb={8}
              >
                <FormLabel htmlFor='individualOrTeam'>
                  <PageText display='inline' fontSize='input'>
                    Name of organization or entity
                  </PageText>
                </FormLabel>
                <Input
                  id='individualOrTeam'
                  type='text'
                  placeholder="Enter the name of organization or entity you're submitting for"
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  {...register('individualOrTeamSummary', {
                    required: individualOrTeam === TEAM,
                    maxLength: 255,
                    validate: value => !containURL(value)
                  })}
                />

                {errors?.individualOrTeam?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Organization name is required.
                    </PageText>
                  </Box>
                )}
                {errors?.individualOrTeam?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Organization name cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
                {errors?.individualOrTeam?.type === 'validate' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Organization name cannot contain a URL.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <FormControl id='individual-or-team-summary-control' mb={8}>
            <FormLabel htmlFor='individualOrTeamSummary' mb={1}>
              <PageText display='inline' fontSize='input'>
                Individual or team summary
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Tell us about yourself, your experience, and your motivations. Feel free to link to
              any biography pages, LinkedIn pages, etc.
            </PageText>

            <Textarea
              id='individualOrTeamSummary'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('individualOrTeamSummary', {
                maxLength: 32768
              })}
            />

            {errors?.individualOrTeamSummary?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team summary cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='company-control' isRequired mb={8}>
            <FormLabel htmlFor='company' mb={1}>
              <PageText display='inline' fontSize='input'>
                Name of organization or entity
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Name of your team or entity you&apos;re submitting for. If your organization
              doesn&apos;t have a formal name, just try to describe it in a few words!
            </PageText>

            <Input
              id='company'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('company', {
                required: true,
                maxLength: 255,
                validate: value => !containURL(value)
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
                  Organization name cannot contain a URL.
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
                  <FormControl id='country-control' isRequired>
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
              Where are you and your team located? This is optional
            </PageText>
          </Flex>

          <FormControl id='website-control' mb={8}>
            <FormLabel htmlFor='website'>
              <PageText fontSize='input'>Website</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              https://
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

          <FormControl id='twitter-control' mb={8}>
            <FormLabel htmlFor='twitter'>
              <PageText fontSize='input'>Twitter</PageText>
            </FormLabel>

            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <Input
              id='twitter'
              type='text'
              placeholder='twitter_handle'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              position='relative'
              color='brand.paragraph'
              fontSize='input'
              pl={8}
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

          <FormControl id='event-name-control' isRequired mb={8}>
            <FormLabel htmlFor='eventName' mb={1}>
              <PageText display='inline' fontSize='input'>
                Event name
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What&apos;s the official title of your event?
            </PageText>

            <Input
              id='eventName'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('eventName', {
                required: true,
                maxLength: 255
              })}
            />

            {errors?.eventName?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event name is required.
                </PageText>
              </Box>
            )}
            {errors?.eventName?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event name cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='event-date-control' isRequired mb={8}>
            <FormLabel htmlFor='eventDate' mb={1}>
              <PageText display='inline' fontSize='input'>
                Event date
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please enter the first date of your event (MM/DD/YYYY)
            </PageText>

            <Input
              id='eventDate'
              type='date'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('eventDate', {
                required: true
              })}
            />

            {errors?.eventDate?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event date is required.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='event-previous-work-control' mb={8}>
            <FormLabel htmlFor='eventPreviousWork' mb={1}>
              <PageText display='inline' fontSize='input'>
                List of any previous events you&apos;ve organized
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              The more information the better!
            </PageText>

            <Textarea
              id='eventPreviousWork'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('eventPreviousWork', {
                maxLength: 32768
              })}
            />

            {errors?.eventPreviousWork?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Previous work cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='event-link-control' mb={8}>
            <FormLabel htmlFor='eventLink' mb={1}>
              <PageText fontSize='input'>
                Is there a website for this event? Paste the link here.
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Meetup, Facebook page, event site, etc (URL only).
            </PageText>

            <Input
              id='eventLink'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('eventLink', {
                maxLength: 255
              })}
            />

            {errors?.eventLink?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  URL cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='event-description-control' isRequired mb={8}>
            <FormLabel htmlFor='eventDescription' mb={1}>
              <PageText display='inline' fontSize='input'>
                Describe your event
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              For example: Will your agenda include talks, workshops, discussions? What is your
              planned format - round table, showcase or a more informal setting? What are your goals
              for the event?
            </PageText>

            <Textarea
              id='eventDescription'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('eventDescription', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.eventDescription?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event details are required.
                </PageText>
              </Box>
            )}
            {errors?.eventDescription?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event details cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='event-topics-control' isRequired mb={8}>
            <FormLabel htmlFor='eventTopics' mb={1}>
              <PageText display='inline' fontSize='input'>
                Event topics
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please briefly describe the topics you plan to cover at this event. For example:
              staking, zero knowledge, defi, social impact, NFTs, etc.
            </PageText>

            <Textarea
              id='eventTopics'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('eventTopics', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.eventTopics?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event topics are required.
                </PageText>
              </Box>
            )}
            {errors?.eventTopics?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event topics cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='referrals-control' mb={8}>
            <FormLabel htmlFor='referrals' mb={1}>
              <PageText fontSize='input'>Who referred you?</PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please write the name of the person who shared this form with you.
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
              {...register('referrals', {
                maxLength: 255
              })}
            />

            {errors?.referrals?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Referrals info cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='pse-rationale-control' mb={8}>
            <FormLabel htmlFor='pseRationale' mb={1}>
              <PageText fontSize='input'>
                What do you hope PSE&apos;s support will add to this event?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Are there specific topics or values that are especially relevant to PSE? Why PSE
              rather than EF generally?
            </PageText>

            <Textarea
              id='pseRationale'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('pseRationale', {
                maxLength: 32768
              })}
            />

            {errors?.pseRationale?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  The reasons cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Flex direction={{ base: 'column', lg: 'row' }}>
            <Controller
              name='eventType'
              control={control}
              rules={{
                validate: selected => selected.value !== ''
              }}
              defaultValue={{ value: '', label: '' }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <FormControl id='event-type-control' mb={8} mr={{ md: 12 }}>
                  <FormLabel htmlFor='eventType'>
                    <PageText display='inline' fontSize='input'>
                      What type of event is this?
                    </PageText>
                  </FormLabel>

                  <Select
                    id='eventType'
                    options={EVENT_TYPE_OPTIONS}
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

            <Controller
              name='eventFormat'
              control={control}
              rules={{
                required: true,
                validate: selected => selected.value !== ''
              }}
              defaultValue={{ value: '', label: '' }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <FormControl id='event-format-control' isRequired mb={8}>
                  <FormLabel htmlFor='eventFormat'>
                    <PageText display='inline' fontSize='input'>
                      Is your event in-person or online?
                    </PageText>
                  </FormLabel>

                  <Select
                    id='eventFormat'
                    options={EVENT_FORMAT_OPTIONS}
                    onChange={(value: any) => {
                      onChange(value);
                      setEventLocation(value);
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
                        Event format is required.
                      </PageText>
                    </Box>
                  )}
                </FormControl>
              )}
            />
          </Flex>

          <FormControl
            display={HAS_EVENT_LOCATION ? 'block' : 'none'}
            id='event-location-control'
            isRequired={HAS_EVENT_LOCATION}
            mb={8}
          >
            <FormLabel htmlFor='eventLocation'>
              <PageText display='inline' fontSize='input'>
                Event location
              </PageText>
            </FormLabel>

            <Input
              id='eventLocation'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              {...register('eventLocation', {
                required: HAS_EVENT_LOCATION,
                maxLength: 255
              })}
            />

            {errors?.eventLocation?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event location is required.
                </PageText>
              </Box>
            )}
            {errors?.eventLocation?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Event location cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='expected-attendees-control' mb={8} w={{ md: '50%' }} pr={{ lg: 6 }}>
            <FormLabel htmlFor='expectedAttendees' mb={1}>
              <PageText display='inline' fontSize='input'>
                Expected number of attendees/registrants
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Enter a whole number. Ex: 300.
            </PageText>

            <Input
              id='expectedAttendees'
              type='number'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('expectedAttendees', {
                maxLength: 18
              })}
            />

            {errors?.expectedAttendees?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Expected number cannot exceed 18 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='target-audience-control' isRequired mb={8}>
            <FormLabel htmlFor='targetAudience' mb={1}>
              <PageText display='inline' fontSize='input'>
                Target audience
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Ex: developers, entrepreneurs, general community.
            </PageText>

            <Textarea
              id='targetAudience'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('targetAudience', {
                required: true,
                maxLength: 3000
              })}
            />

            {errors?.targetAudience?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Target audience is required.
                </PageText>
              </Box>
            )}
            {errors?.targetAudience?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Target audience cannot exceed 3000 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='confirmed-speakers-control' mb={8}>
            <FormLabel htmlFor='confirmedSpeakers' mb={1}>
              <PageText display='inline' fontSize='input'>
                List any confirmed speakers
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please list their full names and topic discussion. If you do not have any confirmed
              speakers, please explain why.
            </PageText>

            <Textarea
              id='confirmedSpeakers'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('confirmedSpeakers', {
                maxLength: 32768
              })}
            />

            {errors?.confirmedSpeakers?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Confirmed speakers list cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='confirmed-sponsors-control' mb={8}>
            <FormLabel htmlFor='confirmedSponsors'>
              <PageText display='inline' fontSize='input'>
                List any confirmed sponsors
              </PageText>
            </FormLabel>
            <Textarea
              id='confirmedSponsors'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              {...register('confirmedSponsors', {
                maxLength: 32768
              })}
            />

            {errors?.confirmedSponsors?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Confirmed sponsors list cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='event-budget-breakdown-control' isRequired mb={8}>
            <FormLabel htmlFor='eventBudgetBreakdown' mb={1}>
              <PageText display='inline' fontSize='input'>
                Budget breakdown
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please itemize your anticipated costs - best estimates are ok if things are not yet
              confirmed or dependent on final attendee count.
            </PageText>

            <Textarea
              id='eventBudgetBreakdown'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('eventBudgetBreakdown', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.eventBudgetBreakdown?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Budget breakdown is required.
                </PageText>
              </Box>
            )}
            {errors?.eventBudgetBreakdown?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Budget breakdown cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl
            id='event-requested-amount-control'
            isRequired
            mb={8}
            w={{ md: '50%' }}
            pr={{ lg: 6 }}
          >
            <FormLabel htmlFor='eventRequestedAmount' mb={1}>
              <PageText display='inline' fontSize='input'>
                Requested sponsorship amount
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Ex: USD 500.
            </PageText>

            <Input
              id='eventRequestedAmount'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('eventRequestedAmount', {
                required: true,
                maxLength: 255
              })}
            />

            {errors?.eventRequestedAmount?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Requested amount is required.
                </PageText>
              </Box>
            )}
            {errors?.eventRequestedAmount?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Requested amount cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='additional-info-control' mb={8}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>Anything else you&apos;d like to share?</PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Is there anything we should know about that hasn&apos;t been covered by the questions
              above? You also have the option to link any supporting documents or relevant sites
              here.
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

          <Stack mb={10}>
            <PageText fontSize='input' fontWeight={700} mb={-1}>
              NOTE:
            </PageText>

            <PageText fontSize='input'>
              Event sponsorships are <strong>not</strong> grants - there are some key differences in
              the way they are administered - but the application process starts in the same way.
            </PageText>
          </Stack>

          <Center mb={8}>
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
