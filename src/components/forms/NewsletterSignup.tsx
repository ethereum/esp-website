import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Flex,
  FormControl,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { ImportantText } from '../UI/headings';
import { PageText } from '../UI/text';

import { useShadowAnimation } from '../../hooks';
import { NewsletterFormData } from '../../types';

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const NewsletterSignup: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<NewsletterFormData>({
    mode: 'onChange'
  });
  const toast = useToast();
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  const onSubmit = (data: NewsletterFormData) => {
    if (errors.email) {
      toast({
        position: 'top-right',
        title: 'Email is not valid, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        containerStyle: {
          fontFamily: 'fonts.heading'
        }
      });
    } else {
      toast({
        position: 'top-right',
        title: 'Success!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        containerStyle: {
          fontFamily: 'fonts.heading'
        }
      });
    }

    reset();
  };

  return (
    <Flex
      id='newsletter'
      direction='column'
      justifyContent='center'
      alignItems='center'
      bgGradient='linear(to-b, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={10}
      py={8}
    >
      <Stack mb={6}>
        <ImportantText color='brand.ready.text' textAlign='center'>
          Join our newsletter to stay tuned!
        </ImportantText>

        <PageText textAlign='center'>
          Sign up to receive ESP updates to your inbox! You&apos;ll hear from us every few weeks,
          and we&apos;ll only ever contact you with ESP news.
        </PageText>
      </Stack>

      <Stack w='100%'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id='email' isRequired mb={3}>
            <Input
              type='email'
              placeholder='Enter your email'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
          </FormControl>

          <Center>
            <Box position='relative'>
              <MotionBox
                backgroundColor='brand.button.shadow'
                h='56px'
                w='148px'
                position='absolute'
                animate={shadowBoxControl}
                opacity={!isValid ? 0 : 1}
              />

              <MotionButton
                backgroundColor='brand.accent'
                w='148px'
                py={7}
                borderRadius={0}
                justifyContent='center'
                alignItems='center'
                type='submit'
                isDisabled={!isValid}
                _hover={{ bg: 'brand.hover' }}
                whileHover={{ x: -1.5, y: -1.5 }}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                pointerEvents={!isValid ? 'none' : 'auto'}
              >
                <ImportantText color='white'>Sign up</ImportantText>
              </MotionButton>
            </Box>
          </Center>
        </form>
      </Stack>
    </Flex>
  );
};