import { Button, Center, Flex, FormControl, Input, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ImportantText, PageText } from '../text';

export const NewsletterSignup: FC = () => {
  const { handleSubmit, register } = useForm();

  function onSubmit() {
    console.log('submitted!');
  }

  return (
    <Flex
      id='newsletter'
      direction='column'
      justifyContent='center'
      alignItems='center'
      bgGradient='linear(to-b, #FFF8EC 10%, #FEE8DC 100%)'
      px={10}
      py={8}
    >
      <Stack mb={6}>
        <ImportantText color='brand.ready' textAlign='center'>
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
              {...register('email', { required: true })}
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
            >
              <ImportantText color='white'>Sign up</ImportantText>
            </Button>
          </Center>
        </form>
      </Stack>

      {/* <Flex
        as='button'
        type='submit'
        _hover={{ bg: 'brand.hover' }}
        backgroundColor='brand.accent'
        w='148px'
        py={4}
        justifyContent='center'
        alignItems='center'
        onClick={() => console.log('subscribed!')}
      >
        <ImportantText color='white'>Sign up</ImportantText>
      </Flex> */}
    </Flex>
  );
};
