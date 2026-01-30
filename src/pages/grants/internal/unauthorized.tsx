import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AlertCircle } from 'lucide-react';

import { PageMetadata } from '../../../components/UI';

const errorMessages: Record<string, string> = {
  invalid_domain: 'Only @ethereum.org email addresses can access this dashboard.',
  oauth_denied: 'You cancelled the sign-in process.',
  token_exchange: 'Failed to authenticate with Google. Please try again.',
  user_info: 'Failed to retrieve your user information. Please try again.',
  no_code: 'Invalid authentication request. Please try again.',
  unknown: 'An unexpected error occurred. Please try again.'
};

const Unauthorized: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const errorMessage = typeof error === 'string' && error in errorMessages
    ? errorMessages[error]
    : errorMessages.unknown;

  return (
    <>
      <PageMetadata
        title='Access Denied'
        description='You do not have permission to access this page.'
      />

      <Box bg='white' position='relative' py={{ base: 16, md: 24 }} minH='100vh'>
        <Container maxW='container.md' textAlign='center'>
          <Stack spacing={6} align='center'>
            <Box color='red.500'>
              <AlertCircle size={64} />
            </Box>

            <Heading as='h1' size='xl' color='brand.heading'>
              Access Denied
            </Heading>

            <Text color='brand.paragraph' fontSize='lg' maxW='md'>
              {errorMessage}
            </Text>

            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={4}>
              <Button
                as='a'
                href='/api/auth/google'
                colorScheme='orange'
                size='lg'
              >
                Try Again
              </Button>
              <Button
                as='a'
                href='/grants'
                variant='outline'
                size='lg'
              >
                View Public Grants
              </Button>
            </Stack>

            <Text color='brand.helpText' fontSize='sm' pt={4}>
              If you believe you should have access, please contact your administrator.
            </Text>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Unauthorized;
