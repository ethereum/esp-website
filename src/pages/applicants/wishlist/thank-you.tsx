import { Box, Stack, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';
import { APPLICANTS_URL, ESP_EMAIL_ADDRESS } from '../../../constants';

const WishlistThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Application Submitted - Wishlist'
        description='Thank you for your wishlist application submission.'
        noindex
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack spacing={8} textAlign='center' maxW='600px' mx='auto'>
          <PageSubheading textAlign='center'>Thank You for Your Application!</PageSubheading>

          <PageText fontSize='lg'>
            We have received your wishlist application and appreciate your interest in contributing
            to the Ethereum ecosystem.
          </PageText>

          <PageText>
            Our team will review your application carefully. Given the specific nature of wishlist
            items, the review process typically takes 2-4 weeks. We will contact you during this
            period if we need any clarification or additional information.
          </PageText>

          <PageText>
            <strong>What happens next:</strong>
          </PageText>

          <PageText textAlign='left'>
            • <strong>Initial Review:</strong> We&apos;ll assess your application against the
            wishlist item requirements and your proposed approach
            <br />• <strong>Technical Evaluation:</strong> Our team and relevant experts will
            evaluate the feasibility and quality of your proposed solution
            <br />• <strong>Decision:</strong> You&apos;ll receive our decision via email, along
            with next steps if your application is selected
            <br />• <strong>Project Setup:</strong> If selected, we&apos;ll work together to
            finalize project details, timeline, and funding arrangements
          </PageText>

          <PageText>
            If you have any questions about your application or the review process, please
            don&apos;t hesitate to contact us at{' '}
            <Link
              href={`mailto:${ESP_EMAIL_ADDRESS}`}
              fontWeight={700}
              color='brand.orange.100'
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              {ESP_EMAIL_ADDRESS}
            </Link>
            .
          </PageText>

          <Box pt={4}>
            <Link
              href={APPLICANTS_URL}
              fontWeight={700}
              color='brand.orange.100'
              _hover={{ textDecoration: 'none' }}
            >
              Return to How to Apply
            </Link>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default WishlistThankYou;
