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
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { DropdownIndicator, ImportantText, PageText } from '../UI';

import { api } from './api';
import { useShadowAnimation } from '../../hooks';

import { chakraStyles } from './selectStyles';

import planeVectorSVG from '../../../public/images/plane-vector.svg';

import {
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS
} from './constants';
import { DEVCON_GRANTS_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { DevconGrantsFormData, EventFormat } from '../../types';

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const DevconGrantsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [eventFormat, setEventFormat] = useState<EventFormat | unknown>({
    value: '',
    label: ''
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<DevconGrantsFormData>({
    mode: 'onBlur'
  });
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  const onSubmit = (data: DevconGrantsFormData) => {
    api.devconGrants
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(DEVCON_GRANTS_THANK_YOU_PAGE_URL);
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

  const isInPerson = (eventFormat as EventFormat).value === EVENT_FORMAT_OPTIONS[0].value;

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
              The point of contact for the application.
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

        <FormControl id='team-profile-control' isRequired mb={8}>
          <FormLabel htmlFor='teamProfile' mb={1}>
            <PageText display='inline' fontSize='input'>
              Team/Individuals description - A brief summary of your team&apos;s relevant experience
            </PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Who is working on this project? Give us a bit of info and include relevant links, if
            available! Please provide other projects or research papers (ideally public and/or open
            source), engagements or other types of proof that your team has the necessary experience
            to undertake the project you are applying for.
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
            Please enter the first date of your event (DD/MM/YYYY)
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

        <FormControl id='sponsorship-link-control' mb={8}>
          <FormLabel htmlFor='sponsorshipLink' mb={1}>
            <PageText fontSize='input'>
              Is there a website for this event? Paste the link here.
            </PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Meetup, Facebook page, event site, etc (URL only).
          </PageText>

          <Input
            id='sponsorshipLink'
            type='text'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
            mt={3}
            {...register('sponsorshipLink', {
              maxLength: 255
            })}
          />

          {errors?.sponsorshipLink?.type === 'maxLength' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                URL cannot exceed 255 characters.
              </PageText>
            </Box>
          )}
        </FormControl>

        <FormControl id='sponsorship-details-control' isRequired mb={8}>
          <FormLabel htmlFor='sponsorshipDetails' mb={1}>
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
            id='sponsorshipDetails'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
            h='150px'
            mt={3}
            {...register('sponsorshipDetails', {
              required: true,
              maxLength: 32768
            })}
          />

          {errors?.sponsorshipDetails?.type === 'required' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                Event details are required.
              </PageText>
            </Box>
          )}
          {errors?.sponsorshipDetails?.type === 'maxLength' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                Event details cannot exceed 32768 characters.
              </PageText>
            </Box>
          )}
        </FormControl>

        <FormControl id='project-description-control' mb={8}>
          <FormLabel htmlFor='projectDescription' mb={1}>
            <PageText fontSize='input'>What is your project about?</PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            If you have a project you&apos;d like to discuss, give us a short summary of what you
            are hoping to accomplish. Just a paragraph will do.
          </PageText>

          <Textarea
            id='projectDescription'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            color='brand.paragraph'
            fontSize='input'
            h='150px'
            mt={3}
            {...register('projectDescription', {
              maxLength: 32768
            })}
          />

          {errors?.projectDescription?.type === 'maxLength' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                Project description cannot exceed 32768 characters.
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
              <FormControl id='event-type-control' isRequired mb={8} mr={{ md: 12 }}>
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
                  onChange={value => {
                    onChange(value);
                    setEventFormat(value);
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

        <Box display={isInPerson ? 'block' : 'none'}>
          <Fade in={isInPerson} delay={0.25}>
            <FormControl id='city-control' mr={{ md: 12 }} mb={8}>
              <FormLabel htmlFor='city'>
                <PageText fontSize='input'>Event location</PageText>
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
          </Fade>
        </Box>

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

        <FormControl id='expected-attendees-control' isRequired mb={8}>
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
              required: true,
              maxLength: 18
            })}
          />

          {errors?.expectedAttendees?.type === 'required' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                Expected number is required.
              </PageText>
            </Box>
          )}
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

        <FormControl id='proposed-timeline-control' isRequired mb={8}>
          <FormLabel htmlFor='proposedTimeline' mb={1}>
            <PageText display='inline' fontSize='input'>
              Proposed tasks, roadmap and budget
            </PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Give us an itemized breakdown of how you&apos;ll be using the requested funds. Provide a
            brief timeline of the expected work and estimated budget. For each month or stage of
            work, list: main objectives, tasks that need to be completed to reach each objective,
            deliverables, and anticipated budget.
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
                Proposed timeline is required.
              </PageText>
            </Box>
          )}
          {errors?.proposedTimeline?.type === 'maxLength' && (
            <Box mt={1}>
              <PageText as='small' fontSize='helpText' color='red.500'>
                Proposed timeline cannot exceed 32768 characters.
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

        <FormControl id='additional-info-control' mb={8}>
          <FormLabel htmlFor='additionalInfo' mb={1}>
            <PageText fontSize='input'>Anything else you&apos;d like to share?</PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Is there anything we should know about that hasn&apos;t been covered by the questions
            above? You also have the option to link any supporting documents or relevant sites here.
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

        <Controller
          name='howDidYouHearAboutESP'
          control={control}
          rules={{ required: true, validate: selected => selected.value !== '' }}
          defaultValue={{ value: '', label: '' }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={8}>
              <FormLabel htmlFor='howDidYouHearAboutESP'>
                <PageText display='inline' fontSize='input'>
                  How did you hear about the Ecosystem Support Program?
                </PageText>
              </FormLabel>

              <Select
                id='howDidYouHearAboutESP'
                options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
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
                    Referral source is required.
                  </PageText>
                </Box>
              )}
            </FormControl>
          )}
        />

        <Center>
          <Box id='submit-application' position='relative'>
            <MotionBox
              backgroundColor='brand.button.shadow'
              h='56px'
              w='310px'
              position='absolute'
              animate={shadowBoxControl}
              opacity={!isValid ? 0 : 1}
            />

            <MotionButton
              backgroundColor='brand.accent'
              w='310px'
              py={7}
              borderRadius={0}
              type='submit'
              isDisabled={!isValid}
              _hover={{ bg: 'brand.hover' }}
              whileHover={{ x: -1.5, y: -1.5 }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              pointerEvents={!isValid ? 'none' : 'auto'}
            >
              <ImportantText as='h3' color='white'>
                Submit Application
              </ImportantText>

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
