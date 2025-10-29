import { NextPage } from 'next';
import { Box, Text, VStack, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PageMetadata, PageSubheading } from '../../../components/UI';
import { CSATForm } from '../../../components/forms';

const DirectGrantThankYouPage: NextPage = () => {
  const router = useRouter();
  const { applicationId } = router.query;

  return (
    <>
      <PageMetadata
        title='Thank You - Direct Grant Application - ESP'
        description='Thank you for submitting your direct grant application to the Ethereum Foundation Ecosystem Support Program'
        noindex
      />

      <Box maxW='container.md' mx='auto' px={6} py={16}>
        <VStack spacing={8} align='center' textAlign='center'>
          <PageSubheading textAlign='center'>Thank You for Your Application!</PageSubheading>

          <Text fontSize='lg'>
            Your direct grant application has been successfully submitted to the Ethereum Foundation
            Ecosystem Support Program.
          </Text>

          <Text color='gray.600'>
            We have received your application and our team will review it carefully. You should
            expect to hear back from us within a few weeks.
          </Text>

          <Text color='gray.600'>
            If you have any questions in the meantime, please don&apos;t hesitate to reach out to
            us.
          </Text>

          <Box pt={4}>
            <Link
              href='/'
              fontWeight={700}
              color='brand.orange.100'
              _hover={{ textDecoration: 'none' }}
            >
              Return to Homepage
            </Link>
          </Box>
        </VStack>

        {/* CSAT Survey */}
        {applicationId && typeof applicationId === 'string' && (
          <CSATForm maxW='container.md' mx='auto' applicationId={applicationId} />
        )}
      </Box>
    </>
  );
};

export default DirectGrantThankYouPage;
