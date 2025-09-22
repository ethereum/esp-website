import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../components/UI';
import { WishlistForm } from '../../../components/forms/WishlistForm';

const WishlistApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Apply for Wishlist Item'
        description='Submit your application for a specific wishlist item that matches your skills and interests.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply for Wishlist Item
            </PageSubheading>

            <PageText mb={6}>
              Select from the available wishlist items below and submit your application. Each
              wishlist item represents a specific need in the Ethereum ecosystem where your
              expertise can make a meaningful impact.
            </PageText>

            <PageText mb={6}>
              Please review the item details carefully and explain how your background and approach
              align with the requirements. Be specific about your methodology, timeline, and
              expected deliverables.
            </PageText>

            <PrivacyPolicyAgreement />
          </section>

          <Box mt={8}>
            <WishlistForm />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default WishlistApply;
