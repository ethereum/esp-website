import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { LogOut } from 'lucide-react';

import { PageMetadata } from '../../components/UI';
import { GrantsExplorer } from '../../components/grants';
import { getPrivateGrants } from '../../lib/sf/grants';
import { PrivateGrantRecord } from '../../types/grants';
import { verifyAuthToken, isAuthorizedEmail, AUTH_COOKIE_NAME } from '../../lib/auth/internal';

interface InternalGrantsPageProps {
  grants: PrivateGrantRecord[];
  userEmail: string;
}

const InternalGrants: NextPage<InternalGrantsPageProps> = ({ grants, userEmail }) => {
  return (
    <>
      <PageMetadata
        title='Internal Grants Explorer'
        description='Internal dashboard for ESP team - view grants with extended fields.'
      />

      <Box bg='white' position='relative' py={{ base: 8, md: 12 }} minH='100vh'>
        <Container maxW='container.xl' px={{ base: 4, md: 8 }}>
          <Stack spacing={8}>
            <Flex justify='space-between' align='flex-start' wrap='wrap' gap={4}>
              <Box>
                <Heading as='h1' size='xl' color='brand.heading' mb={4}>
                  Internal Grants Explorer
                </Heading>
                <Text color='brand.paragraph' maxW='3xl'>
                  Internal dashboard with extended grant information. Only accessible to
                  @ethereum.org team members.
                </Text>
              </Box>

              <Flex align='center' gap={3}>
                <Text fontSize='sm' color='brand.helpText'>
                  {userEmail}
                </Text>
                <Button
                  as='a'
                  href='/api/auth/logout'
                  size='sm'
                  variant='outline'
                  leftIcon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </Flex>
            </Flex>

            <GrantsExplorer grants={grants} showPrivateFields />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<InternalGrantsPageProps> = async ({ req }) => {
  // Get auth secret (must be set)
  const authSecret = process.env.INTERNAL_AUTH_SECRET;
  if (!authSecret) {
    console.error('INTERNAL_AUTH_SECRET environment variable not set');
    return {
      redirect: {
        destination: '/grants/internal/unauthorized?error=config',
        permanent: false
      }
    };
  }

  // Get and verify auth cookie
  const authCookie = req.cookies[AUTH_COOKIE_NAME];

  if (!authCookie) {
    return {
      redirect: {
        destination: '/api/auth/google',
        permanent: false
      }
    };
  }

  // Verify token signature (prevents forgery)
  const verification = verifyAuthToken(authCookie, authSecret);

  if (!verification.valid || !verification.payload) {
    console.warn('Invalid auth token:', verification.error);
    return {
      redirect: {
        destination: '/api/auth/google',
        permanent: false
      }
    };
  }

  // Double-check email domain authorization
  if (!isAuthorizedEmail(verification.payload.email)) {
    console.warn('Unauthorized email domain:', verification.payload.email);
    return {
      redirect: {
        destination: '/grants/internal/unauthorized?error=invalid_domain',
        permanent: false
      }
    };
  }

  const grants = await getPrivateGrants();

  return {
    props: {
      grants,
      userEmail: verification.payload.email
    }
  };
};

export default InternalGrants;
