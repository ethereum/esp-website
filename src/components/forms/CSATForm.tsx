import { FC, useState } from 'react';
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Textarea,
  useToast,
  VStack,
  HStack,
  BoxProps,
  Center
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CSATSchema, CSATData } from './schemas/CSAT';
import { api } from './api';
import { Captcha } from './fields/Captcha';
import { TOAST_OPTIONS } from '../../constants';

interface CSATFormProps extends BoxProps {
  applicationId: string;
  csatToken: string;
}

export const CSATForm: FC<CSATFormProps> = ({ applicationId, csatToken, ...props }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const methods = useForm<CSATData>({
    resolver: zodResolver(CSATSchema),
    mode: 'onSubmit',
    defaultValues: {
      applicationId,
      csatToken,
      csatRating: undefined,
      csatComments: '',
      captchaToken: ''
    }
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors }
  } = methods;

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('csatRating', rating, { shouldValidate: true });
  };

  const onSubmit = async (data: CSATData) => {
    try {
      const res = await api.csat.submit(data);

      if (res.ok) {
        setIsSubmitted(true);
        toast({
          ...TOAST_OPTIONS,
          title: 'Thank you for your feedback!',
          description: 'Your response has been recorded.',
          status: 'success'
        });
      } else {
        const errorData = await res.json();
        toast({
          ...TOAST_OPTIONS,
          title: 'Unable to submit feedback',
          description: errorData.error || 'Please try again later.',
          status: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting CSAT:', error);
      toast({
        ...TOAST_OPTIONS,
        title: 'Something went wrong',
        description: 'Please try again later.',
        status: 'error'
      });
    }
  };

  return (
    <Box p={8} mt={12} {...props}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align='stretch'>
            <Heading as='h3' size='md' textAlign='center' color='brand.heading'>
              How satisfied were you with your experience today?
            </Heading>

            {/* Rating Buttons */}
            <Box>
              <HStack spacing={4} justify='center' py={4}>
                {[1, 2, 3, 4, 5].map(rating => (
                  <Circle
                    key={rating}
                    size='60px'
                    border='2px solid'
                    borderColor={selectedRating === rating ? 'brand.orange.100' : 'gray.300'}
                    bg={selectedRating === rating ? 'brand.orange.100' : 'white'}
                    color={selectedRating === rating ? 'white' : 'gray.600'}
                    cursor='pointer'
                    fontSize='xl'
                    fontWeight='bold'
                    transition='all 0.2s'
                    _hover={{
                      borderColor: 'brand.orange.100',
                      transform: 'scale(1.1)'
                    }}
                    onClick={() => handleRatingClick(rating)}
                  >
                    {rating}
                  </Circle>
                ))}
              </HStack>

              {errors.csatRating && (
                <Box color='red.500' fontSize='sm' textAlign='center'>
                  {errors.csatRating.message}
                </Box>
              )}
            </Box>

            {/* Comments Textarea */}
            <Box>
              <Textarea
                {...register('csatComments')}
                placeholder='What improvements would you make to our application? (optional)'
                rows={4}
                resize='vertical'
              />
              {errors.csatComments && (
                <Box color='red.500' fontSize='sm' mt={1}>
                  {errors.csatComments.message}
                </Box>
              )}
            </Box>

            {/* Captcha */}
            <Flex justify='center'>
              <Captcha />
            </Flex>

            {/* Submit Button */}
            <Center>
              <Button
                type='submit'
                bg='brand.orange.100'
                color='white'
                size='lg'
                isLoading={isSubmitting}
                _hover={{ bg: 'brand.orange.hover' }}
                _active={{ bg: 'brand.orange.hover' }}
              >
                Submit Feedback
              </Button>
            </Center>

            {isSubmitted && (
              <Center>
                <Heading as='h4' size='sm' color='green.700'>
                  Thank you for your feedback!
                </Heading>
              </Center>
            )}
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};
