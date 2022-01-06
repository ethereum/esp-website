import { Button, Center, Flex, FormControl, Input, Stack, useToast } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ImportantText } from '../headings';
import { PageText } from '../text';

type FormData = {
  email: string;
};

export const NewsletterSignup: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<FormData>({
    mode: 'onChange'
  });
  const toast = useToast();

  const onSubmit = (data: FormData) => {
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
            <Button
              _hover={{ bg: 'brand.hover' }}
              backgroundColor='brand.accent'
              w='148px'
              py={7}
              borderRadius={0}
              justifyContent='center'
              alignItems='center'
              type='submit'
              isDisabled={!isValid}
            >
              <ImportantText color='white'>Sign up</ImportantText>
            </Button>
          </Center>
        </form>
      </Stack>
    </Flex>
  );
};
