import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DropdownIndicator, PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha, TextField, TextAreaField } from '.';

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
  HYBRID_EVENT,
  PSE_SPONSORSHIP_CATEGORY_OPTIONS,
  COMMUNITY_EVENT
} from './constants';
import {
  MAX_TEXT_AREA_LENGTH,
  MAX_TEXT_LENGTH,
  PSE_SPONSORSHIPS_THANK_YOU_PAGE_URL,
  TOAST_OPTIONS
} from '../../constants';

import { EventFormat, IndividualOrTeam, PSESponsorshipsFormData } from '../../types';
import { containURL } from '../../utils';

export const PSESponsorshipsForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>(INDIVIDUAL);
  const [eventLocation, setEventLocation] = useState<EventFormat>(ONLINE_EVENT);
  const [isCommunityEvent, setIsCommunityEvent] = useState(true);
  const [categoryIsNotEmpty, setCategoryIsNotEmpty] = useState(false);

  const HAS_EVENT_LOCATION = eventLocation === IN_PERSON_EVENT || eventLocation === HYBRID_EVENT;

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
            <TextField
              id='firstName'
              label='First name'
              maxLength={40}
              isRequired
              registerOptions={{
                required: {
                  value: true,
                  message: 'First name is required.'
                },
                maxLength: {
                  value: 40,
                  message: 'First name cannot exceed 40 characters.'
                },
                validate: {
                  containURL: value => !containURL(value) || 'First name cannot contain a URL.'
                }
              }}
              mr={{ md: 12 }}
              mb={8}
            />

            <TextField
              id='lastName'
              label='Last name'
              maxLength={80}
              isRequired
              registerOptions={{
                required: {
                  value: true,
                  message: 'Last name is required.'
                },
                maxLength: {
                  value: 80,
                  message: 'Last name cannot exceed 80 characters.'
                },
                validate: {
                  containURL: value => !containURL(value) || 'Last name cannot contain a URL.'
                }
              }}
              mb={8}
            />
          </Flex>

          <TextField
            id='email'
            label='Email'
            type='email'
            hideCharCounter
            isRequired
            registerOptions={{
              required: {
                value: true,
                message: 'Email is required.'
              }
            }}
            mb={8}
          />

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

          {individualOrTeam === TEAM && (
            <>
              <Fade in={individualOrTeam === TEAM} delay={0.25}>
                <TextField
                  id='company'
                  label='Name of organization or entity'
                  helpText="Enter the name of organization or entity you're submitting for"
                  maxLength={MAX_TEXT_LENGTH}
                  isRequired={individualOrTeam === TEAM}
                  registerOptions={{
                    required: {
                      value: individualOrTeam === TEAM,
                      message: 'Organization name is required.'
                    },
                    maxLength: {
                      value: MAX_TEXT_LENGTH,
                      message: `Organization name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                    },
                    validate: {
                      containURL: value =>
                        !containURL(value) || 'Organization name cannot contain a URL.'
                    }
                  }}
                  mb={8}
                />
              </Fade>
            </>
          )}

          <TextAreaField
            id='individualOrTeamSummary'
            label='Individual or team summary'
            helpText='Tell us about your team and experience. Please include contact information and link to any biography pages, LinkedIn pages, etc.'
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_AREA_LENGTH,
                message: `Team summary cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <Flex direction='column' mb={8}>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
              <TextField
                id='city'
                label='City'
                maxLength={MAX_TEXT_LENGTH}
                registerOptions={{
                  maxLength: {
                    value: MAX_TEXT_LENGTH,
                    message: `City name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                  }
                }}
                mr={{ md: 12 }}
                mb={{ base: 8, md: 0 }}
              />

              <Controller
                name='country'
                control={control}
                defaultValue={{ value: '', label: '' }}
                render={({ field: { onChange } }) => (
                  <FormControl id='country-control' isRequired={isCommunityEvent}>
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
              Where are you and your team located? This is optional.
            </PageText>
          </Flex>

          <TextField
            id='website'
            label='Website'
            helpText='Enter your website address'
            maxLength={MAX_TEXT_LENGTH}
            registerOptions={{
              maxLength: {
                value: MAX_TEXT_LENGTH,
                message: `Website cannot exceed ${MAX_TEXT_LENGTH} characters.`
              }
            }}
            mb={8}
          />

          <TextField
            id='twitter'
            label='Twitter'
            helpText='twitter_handle'
            maxLength={16}
            registerOptions={{
              maxLength: {
                value: 16,
                message: 'Twitter handle cannot exceed 16 characters.'
              }
            }}
            mb={8}
          />

          <TextField
            id='contactTelegram'
            label='Contact Telegram'
            helpText='What is the Telegram handle of your primary contact person?'
            maxLength={150}
            registerOptions={{
              maxLength: {
                value: 150,
                message: 'Contact Telegram handle cannot exceed 150 characters.'
              }
            }}
            w={{ md: '50%' }}
            pr={{ md: 6 }}
            mb={8}
          />

          <Controller
            name='category'
            control={control}
            defaultValue={{ value: '', label: '' }}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='category-control' mb={8} pr={{ md: 6 }} w={{ md: '50%' }} isRequired>
                <FormLabel htmlFor='category'>
                  <PageText display='inline' fontSize='input'>
                    Category
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please choose a category that your project best fits in. Additional questions will
                  appear based on your selection.
                </PageText>

                <Select
                  id='category'
                  options={PSE_SPONSORSHIP_CATEGORY_OPTIONS}
                  onChange={(e: any) => {
                    onChange(e);
                    setIsCommunityEvent(e.value === COMMUNITY_EVENT);
                    setCategoryIsNotEmpty(true);
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
                      Category is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          {categoryIsNotEmpty && (
            <>
              {/* Community event */}
              {isCommunityEvent && (
                <>
                  <TextField
                    id='eventName'
                    label='Event name'
                    helpText="What's the official title of your event?"
                    maxLength={MAX_TEXT_LENGTH}
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Event name is required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `Event name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextField
                    id='eventDate'
                    label='Event date'
                    helpText='Please enter the first date of your event (MM/DD/YYYY)'
                    type='date'
                    hideCharCounter
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Event date is required.'
                      }
                    }}
                    w={{ md: '50%' }}
                    pr={{ md: 6 }}
                    mb={8}
                  />

                  <TextAreaField
                    id='eventPreviousWork'
                    label="List of any previous events you've organized"
                    helpText='The more information the better!'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Previous work cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextField
                    id='eventLink'
                    label='Is there a website for this event? Paste the link here.'
                    helpText='Meetup, Facebook page, event site, etc (URL only).'
                    maxLength={MAX_TEXT_LENGTH}
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `URL cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='eventDescription'
                    label='Describe your event'
                    helpText='For example: Will your agenda include talks, workshops, discussions? What is your planned format - round table, showcase or a more informal setting? What are your goals for the event?'
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Event details are required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Event details cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='eventTopics'
                    label='Event topics'
                    helpText='Please briefly describe the topics you plan to cover at this event. For example: staking, zero knowledge, defi, social impact, NFTs, etc.'
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Event topics are required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Event topics cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextField
                    id='referrals'
                    label='Who referred you?'
                    helpText='Please write the name of the person who shared this form with you.'
                    maxLength={MAX_TEXT_LENGTH}
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `Referrals info cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='pseRationale'
                    label="What do you hope PSE's support will add to this event?"
                    helpText='Are there specific topics or values that are especially relevant to PSE? Why PSE rather than EF generally?'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `The reasons cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <Flex direction={{ base: 'column', lg: 'row' }}>
                    <Controller
                      name='eventType'
                      control={control}
                      defaultValue={{ value: '', label: '' }}
                      render={({ field: { onChange } }) => (
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
                        required: isCommunityEvent,
                        validate: selected => selected.value !== ''
                      }}
                      defaultValue={{ value: '', label: '' }}
                      render={({ field: { onChange }, fieldState: { error } }) => (
                        <FormControl id='event-format-control' isRequired={isCommunityEvent} mb={8}>
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

                  {HAS_EVENT_LOCATION && (
                    <TextField
                      id='eventLocation'
                      label='Event location'
                      maxLength={MAX_TEXT_LENGTH}
                      isRequired={HAS_EVENT_LOCATION}
                      registerOptions={{
                        required: {
                          value: HAS_EVENT_LOCATION,
                          message: 'Event location is required.'
                        },
                        maxLength: {
                          value: MAX_TEXT_LENGTH,
                          message: `Event location cannot exceed ${MAX_TEXT_LENGTH} characters.`
                        }
                      }}
                      mb={8}
                    />
                  )}

                  <TextField
                    id='expectedAttendees'
                    label='Expected number of attendees/registrants'
                    helpText='Enter a whole number. Ex: 300.'
                    type='number'
                    hideCharCounter
                    registerOptions={{
                      maxLength: {
                        value: 18,
                        message: 'Expected number cannot exceed 18 characters.'
                      }
                    }}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                    mb={8}
                  />

                  <TextAreaField
                    id='targetAudience'
                    label='Target audience'
                    helpText='Ex: developers, entrepreneurs, general community.'
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Target audience is required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Target audience cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='confirmedSpeakers'
                    label='List any confirmed speakers'
                    helpText='Please list their full names and topic discussion. If you do not have any confirmed speakers, please explain why.'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Confirmed speakers list cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='confirmedSponsors'
                    label='List any confirmed sponsors'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Confirmed sponsors list cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='eventBudgetBreakdown'
                    label='Budget breakdown'
                    helpText='Please itemize your anticipated costs - best estimates are ok if things are not yet confirmed or dependent on final attendee count.'
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Budget breakdown is required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Budget breakdown cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextField
                    id='eventRequestedAmount'
                    label='Requested sponsorship amount'
                    helpText='Ex: USD 500.'
                    maxLength={MAX_TEXT_LENGTH}
                    isRequired={isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: isCommunityEvent,
                        message: 'Requested amount is required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `Requested amount cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                    mb={8}
                  />

                  <TextAreaField
                    id='additionalInfo'
                    label="Anything else you'd like to share?"
                    helpText="Is there anything we should know about that hasn't been covered by the questions above? You also have the option to link any supporting documents or relevant sites here."
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Additional info cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />
                </>
              )}

              {/* Quadratic Funding */}
              {!isCommunityEvent && (
                <>
                  <TextField
                    id='QFeventName'
                    label='Event name'
                    helpText="What's the name of the event you'll be running the round with? If not applicable, write 'N/A'"
                    maxLength={MAX_TEXT_LENGTH}
                    isRequired={!isCommunityEvent}
                    registerOptions={{
                      required: {
                        value: !isCommunityEvent,
                        message: 'Event name is required.'
                      },
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `Event name cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='roundDescription'
                    label='Round description'
                    helpText='A short description of the round. What is the goal of the round and who is the intended audience?'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Round description details cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <TextField
                      id='roundDate'
                      label='Round date'
                      helpText='When do you expect to launch your round?'
                      type='date'
                      hideCharCounter
                      isRequired={!isCommunityEvent}
                      registerOptions={{
                        required: {
                          value: !isCommunityEvent,
                          message: 'Round date is required.'
                        }
                      }}
                      mr={{ md: 12 }}
                      mb={8}
                    />

                    <TextField
                      id='roundSizeParticipants'
                      label='Round size - Participants'
                      helpText='How many participants do you estimate will vote or contribute to the round?'
                      type='number'
                      hideCharCounter
                      registerOptions={{
                        maxLength: {
                          value: 18,
                          message: 'Expected number cannot exceed 18 characters.'
                        }
                      }}
                      mb={8}
                    />
                  </Flex>

                  <TextAreaField
                    id='roundSizeProjects'
                    label='Round size - Projects'
                    helpText='How many recipient projects do you estimate will participate in the round?'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Round size - Projects cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextField
                    id='QFRoundWebsite'
                    label='Round Website?'
                    helpText='URL only.'
                    maxLength={MAX_TEXT_LENGTH}
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `QF Round Website URL cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextField
                    id='QFGrantAmount'
                    label='Grant amount'
                    helpText="What is the total amount in USD you're seeking (including for the matching pool)?"
                    maxLength={MAX_TEXT_LENGTH}
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_LENGTH,
                        message: `Grant amount cannot exceed ${MAX_TEXT_LENGTH} characters.`
                      }
                    }}
                    w={{ md: '50%' }}
                    pr={{ lg: 6 }}
                    mb={8}
                  />

                  <TextAreaField
                    id='QFUseOfFunds'
                    label='Use of funds'
                    helpText='How does your project plan to use/allocate this funding?'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Use of funds details cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />

                  <TextAreaField
                    id='whyEthereum'
                    label='Why are you interested in receiving this funding?'
                    registerOptions={{
                      maxLength: {
                        value: MAX_TEXT_AREA_LENGTH,
                        message: `Cannot exceed ${MAX_TEXT_AREA_LENGTH} characters.`
                      }
                    }}
                    mb={8}
                  />
                </>
              )}
            </>
          )}

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
