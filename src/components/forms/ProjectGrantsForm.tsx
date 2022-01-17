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
  Stack,
  Textarea
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
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
  PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS
} from './constants';
import { PROJECT_GRANTS_THANK_YOU_PAGE_URL } from '../../constants';

import { ProjectGrantsFormData } from '../../types';

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const ProjectGrantsForm: FC = () => {
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

  const onSubmit = (data: ProjectGrantsFormData) => {
    router.push(PROJECT_GRANTS_THANK_YOU_PAGE_URL);
  };

  return (
    <Stack
      w='100%'
      id='project-grants-apply'
      bgGradient='linear(to-b, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={5}
      pt={8}
      pb={20}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='projectName'>
            <PageText display='inline' fontSize='input'>
              Project name
            </PageText>
          </FormLabel>
          <Input
            id='projectName'
            type='text'
            placeholder='Enter project name'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='organizationName'>
            <PageText display='inline' fontSize='input'>
              Organization name
            </PageText>
          </FormLabel>
          <Input
            id='organizationName'
            type='text'
            placeholder='Enter organization name'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl mb={8}>
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

        <FormControl mb={8}>
          <FormLabel htmlFor='github'>
            <PageText fontSize='input'>GitHub</PageText>
          </FormLabel>
          <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
            https://github.com/
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
          />
        </FormControl>

        <FormControl mb={8}>
          <FormLabel htmlFor='twitter'>
            <PageText fontSize='input'>Twitter</PageText>
          </FormLabel>
          <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
            https://twitter.com/
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
            pl={36}
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='teamProfile'>
            <PageText display='inline' fontSize='input'>
              Team Profile
            </PageText>
          </FormLabel>
          <Textarea
            id='teamProfile'
            // TODO: change this when input validation is added
            // value={''}
            // onChange={() => {}}
            placeholder="Briefly describe your organization. Provide links to previous work. How is your organization suited to the project's objectives, and how does it provide the necessary expertise?"
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
            h='150px'
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='projectSummary'>
            <PageText display='inline' fontSize='input'>
              Brief Project Summary
            </PageText>
          </FormLabel>
          <Textarea
            id='projectSummary'
            // TODO: change this when input validation is added
            // value={''}
            // onChange={() => {}}
            placeholder="Describe your project in a few sentences (you'll have the chance to go into more detail in the long form). If it's already underway, provide links to any existing published work."
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
            h='150px'
          />
        </FormControl>

        {/* {TODO: Project Category values are not defined yet} */}
        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='projectCategory'>
            <PageText display='inline' fontSize='input'>
              Project Category
            </PageText>
          </FormLabel>

          <Select
            id='projectCategory'
            options={PROJECT_CATEGORY_OPTIONS}
            components={{ DropdownIndicator }}
            placeholder='Select'
            closeMenuOnSelect={true}
            selectedOptionColor='brand.option'
            chakraStyles={chakraStyles}
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='requestedAmount'>
            <PageText display='inline' fontSize='input'>
              Requested Amount
            </PageText>
          </FormLabel>
          <Input
            id='requestedAmount'
            type='text'
            placeholder='Estimated grant amount. Ex: USD 50,000'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='firstName'>
            <PageText display='inline' fontSize='input'>
              First Name
            </PageText>
          </FormLabel>
          <Input
            id='firstName'
            type='text'
            placeholder='Enter your first name'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='lastName'>
            <PageText display='inline' fontSize='input'>
              Last Name
            </PageText>
          </FormLabel>
          <Input
            id='lastName'
            type='text'
            placeholder='Enter your last name'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='email'>
            <PageText display='inline' fontSize='input'>
              Email
            </PageText>
          </FormLabel>
          <Input
            id='email'
            type='email'
            placeholder='Enter your Email'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl mb={8}>
          <FormLabel htmlFor='city'>
            <PageText fontSize='input'>City</PageText>
          </FormLabel>
          <Input
            id='city'
            type='text'
            placeholder='Enter your city'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <FormControl isRequired mb={8}>
          <FormLabel htmlFor='country'>
            <PageText display='inline' fontSize='input'>
              Country
            </PageText>
          </FormLabel>

          <Select
            id='country'
            options={COUNTRY_OPTIONS}
            components={{ DropdownIndicator }}
            placeholder='Select'
            closeMenuOnSelect={true}
            selectedOptionColor='brand.option'
            chakraStyles={chakraStyles}
          />
        </FormControl>

        <FormControl isRequired mb={8}>
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

        <FormControl isRequired mb={8}>
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
          />
        </FormControl>

        <FormControl mb={12}>
          <FormLabel htmlFor='recommendation'>
            <PageText fontSize='input'>
              Did anyone recommend that you contact Ecosystem Support?
            </PageText>
          </FormLabel>
          <Input
            id='recommendation'
            type='text'
            placeholder='Enter your recommendation'
            bg='white'
            borderRadius={0}
            borderColor='brand.border'
            h='56px'
            _placeholder={{ fontSize: 'input' }}
            color='brand.paragraph'
            fontSize='input'
          />
        </FormControl>

        <Center mb={12}>
          <Flex
            h='136px'
            w='100%'
            bgColor='brand.uploadProposal'
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
          >
            <Box mr={5}>
              <Image src={uploadSVG} alt='Upload file' height={42} width={44} />
            </Box>

            <PageText fontSize='input' fontWeight={400} lineHeight='21px' maxW='220px'>
              Upload the proposal. Click here or drag file to this box.
            </PageText>
          </Flex>
        </Center>

        <Center>
          <Box position='relative'>
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
