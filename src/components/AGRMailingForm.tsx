import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast
} from '@chakra-ui/react';
import { PageText } from './UI';

export const AGRMailingSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().optional(),
  university: z.string().optional()
});

type FormData = z.infer<typeof AGRMailingSchema>;

const AGRMailingForm = (props: BoxProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(AGRMailingSchema)
  });
  const toast = useToast();

  const onSubmit = async (data: FormData) => {
    const req: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data
      })
    };

    const res = await fetch('/api/agr-mailing', req);

    if (!res.ok) {
      toast({
        title: 'Error',
        description: 'There was an error subscribing to the mailing list.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });

      return;
    }

    toast({
      title: 'Subscribed!',
      description: "You've been added to the AGR grants mailing list.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    reset();
  };

  return (
    <Box color='brand.paragraph' {...props}>
      <Heading fontSize='h4' fontWeight={700} mb={2}>
        Subscribe to our mailing list
      </Heading>
      <PageText mb={4}>Receive updates when the Academic Grants Round opens again.</PageText>
      <Box
        as='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        maxW={{ base: 'full', md: 600 }}
        mx='auto'
      >
        <VStack spacing={4} align='stretch'>
          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel fontSize='input'>Email</FormLabel>
            <Input type='email' bg='white' {...register('email')} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel fontSize='input'>Name</FormLabel>
              <Input bg='white' {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.university}>
              <FormLabel fontSize='input'>University</FormLabel>
              <Input bg='white' {...register('university')} />
              <FormErrorMessage>{errors.university?.message}</FormErrorMessage>
            </FormControl>
          </Flex>
          <Button
            type='submit'
            color='white'
            backgroundColor='brand.accent'
            _hover={{ bg: 'brand.hover' }}
            isLoading={isSubmitting}
          >
            Subscribe for updates
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AGRMailingForm;
