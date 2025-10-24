import { Flex, Stack, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';
import { APPLICANTS_URL, ESP_EMAIL_ADDRESS } from '../../../constants';

const WishlistThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Thank you for your Wishlist application'
        description='Your Wishlist application has been successfully submitted to the Ethereum Foundation ESP team.'
        noindex
      />

      <Flex
        bg='white'
        position='relative'
        px={{ md: 24, lg: 32, xl: 72 }}
        py={{ base: 16, md: 24 }}
        direction='column'
        minHeight='50vh'
        justifyContent='center'
      >
        <Stack textAlign='center' spacing={8}>
          <PageSubheading mb={8} textAlign='center'>
            Thank you for your Wishlist application!
          </PageSubheading>

          <PageText fontSize='xl' mb={8}>
            We have received your Wishlist application and appreciate your interest in contributing to the Ethereum ecosystem.
          </PageText>

          <PageText mb={6}>
            You&apos;ll receive a confirmation email shortly. Our team will review your application and reach out via email in due course. You can learn more about the evaluation process on our{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={APPLICANTS_URL}
              _hover={{ textDecoration: 'none' }}
            >
              How to Apply page
            </Link>
            .
          </PageText>
          
          <PageText>
            If you have any questions about your application or the review process, please don&apos;t hesitate to contact us at{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={`mailto:${ESP_EMAIL_ADDRESS}`}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              {ESP_EMAIL_ADDRESS}
            </Link>
            .
          </PageText>
        </Stack>
      </Flex>
    </>
  );
};

export default WishlistThankYou;
