import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { DropdownIndicator, ImportantText, PageText } from '../UI';

import { useShadowAnimation } from '../../hooks';

import { chakraStyles } from './selectStyles';

import planeVectorSVG from '../../public/images/plane-vector.svg';

import {
  COMMUNITY_EVENT,
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  PROJECT_CATEGORY_OPTIONS,
  TEAM
} from './constants';
import { SMALL_GRANTS_THANK_YOU_PAGE_URL } from '../../constants';

import {
  IndividualOrTeam,
  OfficeHoursFormData,
  ProjectCategory,
  ProjectGrantsFormData
} from '../../types';

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const SmallGrantsForm: FC = () => {
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>('Individual');
  // `unknown` comes from react-select required typings (https://stackoverflow.com/a/54370057)
  const [projectCategory, setProjectCategory] = useState<ProjectCategory | unknown>({
    value: '',
    label: ''
  });
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<ProjectGrantsFormData>({
    mode: 'onChange'
  });
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  const onSubmit = (data: OfficeHoursFormData) => {
    router.push(SMALL_GRANTS_THANK_YOU_PAGE_URL);
  };

  const handleRadioButton = (value: IndividualOrTeam) => {
    setIndividualOrTeam(value);
  };

  const handleProjectCategory = (category: ProjectCategory | unknown) => {
    setProjectCategory(category);
    console.log((category as ProjectCategory).value);
  };

  return (
    <Stack
      w='100%'
      bgGradient='linear(to-b, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={5}
      pt={8}
      pb={20}
    >
      <form id='office-hours-form' onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='first-name-control' isRequired mb={8}>
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
          />
        </FormControl>

        <FormControl id='last-name-control' isRequired mb={8}>
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
          />
        </FormControl>

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
          />
        </FormControl>

        <FormControl id='individual-or-team-control' isRequired mb={8}>
          <FormLabel htmlFor='individualOrTeam' mb={4}>
            <PageText display='inline' fontSize='input'>
              Are you submitting on behalf of a team, or as an individual?
            </PageText>
          </FormLabel>

          <RadioGroup
            id='individual-or-team'
            onChange={handleRadioButton}
            value={individualOrTeam}
            fontSize='input'
            colorScheme='white'
          >
            <Stack direction='row'>
              <Radio
                id='individual'
                size='lg'
                name='individualOrTeam'
                value='Individual'
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

        {individualOrTeam === TEAM && (
          <FormControl id='company-control' isRequired mb={8}>
            <FormLabel htmlFor='company'>
              <PageText display='inline' fontSize='input'>
                Name of organization or entity
              </PageText>
            </FormLabel>
            <Input
              id='company'
              type='text'
              placeholder="Enter the name of organization or entity you're submitting for"
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
            />
          </FormControl>
        )}

        <FormControl id='individual-or-team-summary-control' isRequired mb={8}>
          <FormLabel htmlFor='individualOrTeamSummary' mb={1}>
            <PageText display='inline' fontSize='input'>
              Individual or team summary
            </PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Tell us about yourself, your experience and motivations
          </PageText>

          <Textarea
            id='individual-or-team-summary'
            // TODO: change this when input validation is added
            // value={''}
            // onChange={() => {}}
            placeholder=''
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
            h='150px'
            mt={3}
          />
        </FormControl>

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
          />
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
          />
        </FormControl>

        <FormControl id='project-category-control' isRequired mb={8}>
          <FormLabel htmlFor='projectCategory'>
            <PageText display='inline' fontSize='input'>
              Project Category
            </PageText>
          </FormLabel>

          <Select
            id='project-category'
            options={PROJECT_CATEGORY_OPTIONS}
            components={{ DropdownIndicator }}
            placeholder='Select'
            closeMenuOnSelect={true}
            selectedOptionColor='brand.option'
            chakraStyles={chakraStyles}
            onChange={handleProjectCategory}
          />
        </FormControl>

        {(projectCategory as ProjectCategory).value !== COMMUNITY_EVENT &&
          (projectCategory as ProjectCategory).value !== '' && (
            <>
              <FormControl id='project-name-control' isRequired mt={8} mb={8}>
                <FormLabel htmlFor='projectName' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Project name
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  A short, concise title of what you&apos;re working on
                </PageText>

                <Input
                  id='project-name'
                  type='text'
                  placeholder='Enter project name'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                />
              </FormControl>

              <FormControl id='project-repo-control' mb={8}>
                <FormLabel htmlFor='projectRepo' mb={1}>
                  <PageText fontSize='input'>Project repo</PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Github, Radicle, etc
                </PageText>

                <Input
                  id='project-repo'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                />
              </FormControl>

              <FormControl id='other-links-control' mb={8}>
                <FormLabel htmlFor='otherLinks' mb={1}>
                  <PageText fontSize='input'>Other links</PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  If you have a demo or published work, show us your stuff!
                </PageText>

                <Textarea
                  id='other-links'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                />
              </FormControl>

              <FormControl id='project-summary-control' isRequired mb={8}>
                <FormLabel htmlFor='projectSummary' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Describe your project
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Describe your project in 140 characters or less
                </PageText>

                <Input
                  id='project-summary'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                />
              </FormControl>

              <FormControl id='project-description-control' isRequired mb={8}>
                <FormLabel htmlFor='projectDescription' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    What is the project?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Describe the main concept and components of the proposed work
                </PageText>

                <Textarea
                  id='project-description'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                />
              </FormControl>

              <FormControl id='why-is-project-important-control' isRequired mb={8}>
                <FormLabel htmlFor='whyIsProjectImportant' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Why is your project important?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Why is this project important for your target demographic/problem area? How do you
                  know people need what you&apos;re making?
                </PageText>

                <Textarea
                  id='why-is-project-important'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                />
              </FormControl>

              <FormControl id='how-does-your-project-differ-control' isRequired mb={8}>
                <FormLabel htmlFor='howDoesYourProjectDiffer' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    How does your project differ from similar ones?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Why are you building this project? Do you have unique expertise/perspective? What
                  are the current alternative options that people rely on?
                </PageText>

                <Textarea
                  id='how-does-your-project-differ'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                />
              </FormControl>

              <FormControl id='is-your-project-public-good-control' isRequired mb={8}>
                <FormLabel htmlFor='isYourProjectPublicGood' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Is your project a public good?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  If so, tell us how?
                </PageText>

                <Textarea
                  id='is-your-project-public-good'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                />
              </FormControl>

              <FormControl id='roadmap-control' isRequired mb={8}>
                <FormLabel htmlFor='roadmap' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Proposed Tasks, roadmap and budget
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Provide a brief timeline of the expected work and estimated budget for each
                  objective
                </PageText>

                <Textarea
                  id='roadmap'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder='- *Month 1 Main objectives* - *Task* - *Task* - *Deliverables* - *Budget* - *M2 Main objectives* - *Task* - *Task* - *Deliverables* - *Budget* - *M3* -*Task* - *Task* - *Deliverables* - *Budget*'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                />
              </FormControl>

              <FormControl id='requested-amount-control' isRequired mb={8}>
                <FormLabel htmlFor='requestedAmount' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Requested Amount
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Give us an itemized breakdown of how you&apos;ll be using the requested funds!
                </PageText>

                <Input
                  id='requested-amount'
                  type='text'
                  placeholder='Ex: USD 5,000'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                />
              </FormControl>

              <FormControl id='is-open-source-control' isRequired mb={8}>
                <FormLabel htmlFor='isOpenSource'>
                  <PageText display='inline' fontSize='input'>
                    Is your project open source?
                  </PageText>
                </FormLabel>
                <Textarea
                  id='is-open-source'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder='If not, tell us why not?'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                />
              </FormControl>

              <FormControl id='future-plans-control' isRequired mb={8}>
                <FormLabel htmlFor='futurePlans'>
                  <PageText display='inline' fontSize='input'>
                    What are your plans after the grant is completed?
                  </PageText>
                </FormLabel>
                <Textarea
                  id='future-plans'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder="Tell us how you aim to be sustainable after the grant? Or tell us why this project doesn't need to be sustainable!"
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                />
              </FormControl>

              <FormControl id='alternative-work-control' isRequired mb={8}>
                <FormLabel htmlFor='alternativeWork'>
                  <PageText display='inline' fontSize='input'>
                    If you didn&apos;t work on this project, what would you work on instead?
                  </PageText>
                </FormLabel>
                <Textarea
                  id='alternative-work'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder=''
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                />
              </FormControl>

              <FormControl id='progress-since-previous-application-control' isRequired mb={8}>
                <FormLabel htmlFor='progressSincePreviousApplication'>
                  <PageText display='inline' fontSize='input'>
                    If you&apos;ve applied previously with the same idea, how much progress have you
                    made since the last time you applied?
                  </PageText>
                </FormLabel>
                <Textarea
                  id='progress-since-previous-application'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder=''
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                />
              </FormControl>

              <FormControl id='applied-previously-control' isRequired mb={8}>
                <FormLabel htmlFor='appliedPreviously'>
                  <PageText display='inline' fontSize='input'>
                    Have you applied for or received other funding?
                  </PageText>
                </FormLabel>
                <Textarea
                  id='applied-previously'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder=''
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                />
              </FormControl>

              <FormControl id='project-additional-info-control' mb={8}>
                <FormLabel htmlFor='projectAdditionalInfo'>
                  <PageText fontSize='input'>Anything else you&apos;d like to share?</PageText>
                </FormLabel>
                <Textarea
                  id='project-additional-info'
                  // TODO: change this when input validation is added
                  // value={''}
                  // onChange={() => {}}
                  placeholder=''
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                />
              </FormControl>
            </>
          )}

        {(projectCategory as ProjectCategory).value === COMMUNITY_EVENT && (
          <>
            <FormControl id='previous-work-control' isRequired mb={8}>
              <FormLabel htmlFor='previousWork'>
                <PageText display='inline' fontSize='input'>
                  List of any previous events you&apos;ve organized
                </PageText>
              </FormLabel>
              <Textarea
                id='previous-work'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='event-name-control' isRequired mb={8}>
              <FormLabel htmlFor='eventName'>
                <PageText display='inline' fontSize='input'>
                  Event name
                </PageText>
              </FormLabel>
              <Input
                id='event-name'
                type='text'
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
              />
            </FormControl>

            <FormControl id='event-date-control' isRequired mb={8}>
              <FormLabel htmlFor='eventDate'>
                <PageText display='inline' fontSize='input'>
                  Event date
                </PageText>
              </FormLabel>
              <Input
                id='event-date'
                type='date'
                placeholder='Enter the first date of your event (MM/DD/YYYY)'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
              />
            </FormControl>

            <FormControl id='event-link-control' mb={8}>
              <FormLabel htmlFor='eventLink'>
                <PageText fontSize='input'>Is there a website for this event?</PageText>
              </FormLabel>
              <Input
                id='event-link'
                type='text'
                placeholder='Meetup, Facebook page, event site, etc. URL only'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
              />
            </FormControl>

            <FormControl id='event-topics-control' isRequired mb={8}>
              <FormLabel htmlFor='eventTopics'>
                <PageText display='inline' fontSize='input'>
                  Event topics
                </PageText>
              </FormLabel>
              <Textarea
                id='event-topics'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='event-description-control' isRequired mb={8}>
              <FormLabel htmlFor='eventDescription'>
                <PageText display='inline' fontSize='input'>
                  Describe your event
                </PageText>
              </FormLabel>
              <Textarea
                id='event-description'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='event-type-control' isRequired mb={8}>
              <FormLabel htmlFor='eventType'>
                <PageText display='inline' fontSize='input'>
                  What type of event is this?
                </PageText>
              </FormLabel>

              <Select
                id='event-type'
                options={EVENT_TYPE_OPTIONS}
                components={{ DropdownIndicator }}
                placeholder='Select'
                closeMenuOnSelect={true}
                selectedOptionColor='brand.option'
                chakraStyles={chakraStyles}
              />
            </FormControl>

            <FormControl id='event-format-control' isRequired mb={8}>
              <FormLabel htmlFor='eventFormat'>
                <PageText display='inline' fontSize='input'>
                  Is your event in-person or online?
                </PageText>
              </FormLabel>

              <Select
                id='event-format'
                options={EVENT_FORMAT_OPTIONS}
                components={{ DropdownIndicator }}
                placeholder='Select'
                closeMenuOnSelect={true}
                selectedOptionColor='brand.option'
                chakraStyles={chakraStyles}
              />
            </FormControl>

            <FormControl id='expected-attendees-control' isRequired mb={8}>
              <FormLabel htmlFor='expectedAttendees'>
                <PageText display='inline' fontSize='input'>
                  Expected number of attendees/registrants
                </PageText>
              </FormLabel>
              <Input
                id='expected-attendees'
                type='number'
                placeholder='Estimated number. Ex: 300'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
              />
            </FormControl>

            <FormControl id='target-audience-control' isRequired mb={8}>
              <FormLabel htmlFor='targetAudience'>
                <PageText display='inline' fontSize='input'>
                  Target Audience
                </PageText>
              </FormLabel>
              <Textarea
                id='target-audience'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder='Ex: developers, entrepreneurs, general community'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='confirmed-speakers-control' isRequired mb={8}>
              <FormLabel htmlFor='confirmedSpeakers'>
                <PageText display='inline' fontSize='input'>
                  List any confirmed speakers
                </PageText>
              </FormLabel>
              <Textarea
                id='confirmed-speakers'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='confirmed-sponsors-control' isRequired mb={8}>
              <FormLabel htmlFor='confirmedSponsors'>
                <PageText display='inline' fontSize='input'>
                  List any confirmed sponsors
                </PageText>
              </FormLabel>
              <Textarea
                id='confirmed-sponsors'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='budget-breakdown-control' isRequired mb={8}>
              <FormLabel htmlFor='budgetBreakdown'>
                <PageText display='inline' fontSize='input'>
                  Budget breakdown
                </PageText>
              </FormLabel>
              <Textarea
                id='budget-breakdown'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <FormControl id='event-requested-amount-control' isRequired mb={8}>
              <FormLabel htmlFor='eventRequestedAmount'>
                <PageText display='inline' fontSize='input'>
                  Requested Sponsorship Amount
                </PageText>
              </FormLabel>
              <Input
                id='event-requested-amount'
                type='text'
                placeholder='Ex: USD $500-1,500'
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                h='56px'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
              />
            </FormControl>

            <FormControl id='event-additional-info-control' mb={8}>
              <FormLabel htmlFor='eventAdditionalInfo'>
                <PageText fontSize='input'>Anything else you&apos;d like to share?</PageText>
              </FormLabel>
              <Textarea
                id='event-additional-info'
                // TODO: change this when input validation is added
                // value={''}
                // onChange={() => {}}
                placeholder=''
                bg='white'
                borderRadius={0}
                borderColor='brand.border'
                _placeholder={{ fontSize: 'input' }}
                color='brand.paragraph'
                fontSize='input'
                h='150px'
              />
            </FormControl>

            <Stack mb={10}>
              <PageText fontSize='input' fontWeight={700} mb={-1}>
                NOTE:
              </PageText>

              <PageText fontSize='input'>
                Event sponsorships are <strong>not</strong> grants - there are some key differences
                in the way they are administered - but the application process starts in the same
                way.
              </PageText>
            </Stack>
          </>
        )}

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
