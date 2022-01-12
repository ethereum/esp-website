import { Box, Center, Flex, FormControl, Input, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ImportantText } from '../headings';
import { PageText } from '../text';

type FormData = {
  email: string;
};

export const ProjectGrantsForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<FormData>({
    mode: 'onChange'
  });

  return (
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
              backgroundColor='brand.shadow'
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
  );
};
