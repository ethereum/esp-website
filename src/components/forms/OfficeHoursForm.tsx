import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Checkbox,
  CheckboxGroup,
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
  HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS,
  OTHER,
  PROJECT_CATEGORY_OPTIONS,
  TEAM,
  TIMEZONE_OPTIONS
} from './constants';
import { OFFICE_HOURS_THANK_YOU_PAGE_URL } from '../../constants';

import {
  IndividualOrTeam,
  OfficeHoursFormData,
  ProjectGrantsFormData,
  ReasonForMeeting
} from '../../types';

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const OfficeHoursForm: FC = () => {
  const [individualOrTeam, setIndividualOrTeam] = useState<IndividualOrTeam>('Individual');
  const [reasonForMeeting, setReasonForMeeting] = useState<ReasonForMeeting>(['']);
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
    router.push(OFFICE_HOURS_THANK_YOU_PAGE_URL);
  };

  const handleRadioButton = (value: IndividualOrTeam) => {
    setIndividualOrTeam(value);
  };

  const handleCheckbox = (value: ReasonForMeeting) => {
    setReasonForMeeting(value);
  };

  return (
    <Stack
      w='100%'
      bgGradient='linear(to-br, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={5}
      pt={8}
      pb={20}
    >
      <form id='office-hours-form' onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='first-name-control' isRequired mb={8}>
          <FormLabel htmlFor='firstName'>
            <PageText display='inline' fontSize='input'>
              First Name
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
              Last Name
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
              placeholder="Enter the name of organization or entity you're submitting for"
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
        )}

        <FormControl id='project-name-control' mt={8} mb={8}>
          <FormLabel htmlFor='projectName' mb={1}>
            <PageText fontSize='input'>Project name</PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            If you&apos;re not asking for help on a project, or simply don&apos;t have a title yet,
            you can write &quot;N/A&quot;.
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
          />
        </FormControl>

        <FormControl id='project-summary-control' mb={8}>
          <FormLabel htmlFor='projectSummary' mb={1}>
            <PageText fontSize='input'>Brief Project Summary</PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            If you have a project you&apos;d like to discuss, give us a short summary of what you
            are hoping to accomplish. Just a paragraph will do.
          </PageText>

          <Textarea
            id='project-summary'
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

        <FormControl id='additional-info-control' mb={8}>
          <FormLabel htmlFor='additionalInfo' mb={1}>
            <PageText fontSize='input'>Where can we learn more?</PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Please share links to any relevant Github repos, social media, websites, published work
            or professional profiles.
          </PageText>

          <Textarea
            id='additional-info'
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

        <FormControl id='project-category-control' isRequired mb={8}>
          <FormLabel htmlFor='projectCategory' mb={1}>
            <PageText display='inline' fontSize='input'>
              Project Category
            </PageText>
          </FormLabel>

          <PageText as='small' fontSize='helpText' color='brand.helpText'>
            Choose what category your project best fits into.
          </PageText>

          <Box mt={3}>
            <Select
              id='project-category-select'
              options={PROJECT_CATEGORY_OPTIONS}
              components={{ DropdownIndicator }}
              placeholder='Select'
              closeMenuOnSelect={true}
              selectedOptionColor='brand.option'
              chakraStyles={chakraStyles}
            />
          </Box>
        </FormControl>

        <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={8}>
          <FormLabel htmlFor='howDidYouHearAboutESP'>
            <PageText display='inline' fontSize='input'>
              How did you hear about the Ecosystem Support Program?
            </PageText>
          </FormLabel>

          <Select
            id='how-did-you-hear-about-ESP-select'
            options={HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS}
            components={{ DropdownIndicator }}
            placeholder='Select'
            closeMenuOnSelect={true}
            selectedOptionColor='brand.option'
            chakraStyles={chakraStyles}
          />
        </FormControl>

        <FormControl id='reason-for-meeting-control' isRequired mb={2}>
          <FormLabel htmlFor='reasonForMeeting'>
            <PageText display='inline' fontSize='input'>
              What can we help you with? You may choose more than one reason.
            </PageText>
          </FormLabel>

          <CheckboxGroup colorScheme='white' onChange={handleCheckbox} value={reasonForMeeting}>
            <Stack>
              <Checkbox id='project-feedback' value='Project feedback or advice'>
                <PageText fontSize='input'>Project feedback or advice</PageText>
              </Checkbox>
              <Checkbox id='questions-about-esp' value='Questions about ESP'>
                <PageText fontSize='input'>Questions about ESP</PageText>
              </Checkbox>
              <Checkbox id='questions-about-applying' value='Questions about applying for a grant'>
                <PageText fontSize='input'>Questions about applying for a grant</PageText>
              </Checkbox>
              <Checkbox id='how-to-contribute' value='How to contribute to Ethereum'>
                <PageText fontSize='input'>How to contribute to Ethereum</PageText>
              </Checkbox>
              <Checkbox id='other' value='Other'>
                <PageText fontSize='input'>Other</PageText>
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        {reasonForMeeting.includes(OTHER) && (
          <FormControl id='other-reason-for-meeting-control' isRequired mb={8}>
            <FormLabel htmlFor='otherReasonForMeeting'>
              <PageText display='inline' fontSize='input'>
                Reason for meeting
              </PageText>
            </FormLabel>
            <Textarea
              id='other-reason-for-meeting'
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
            />
          </FormControl>
        )}

        <FormControl id='timezone-control' isRequired mt={8} mb={20}>
          <FormLabel htmlFor='timezone'>
            <PageText display='inline' fontSize='input'>
              Your Time Zone
            </PageText>
          </FormLabel>

          <Select
            id='timezone'
            options={TIMEZONE_OPTIONS}
            components={{ DropdownIndicator }}
            placeholder='Select'
            closeMenuOnSelect={true}
            selectedOptionColor='brand.option'
            chakraStyles={chakraStyles}
          />
        </FormControl>

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
