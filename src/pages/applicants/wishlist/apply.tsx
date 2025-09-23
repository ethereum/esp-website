import { Box, Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../components/UI';
import { WishlistSelection } from '../../../components/forms/WishlistSelection';
import { WishlistItem } from '../../../components/forms/schemas/Wishlist';
// import { getGrantInitiativeItems } from '../../../lib/sf';
import { getActiveWishlistItems } from '../../../data/wishlistItems';

interface WishlistApplyProps {
  wishlistItems: WishlistItem[];
}

const WishlistApply: NextPage<WishlistApplyProps> = ({ wishlistItems }) => {
  return (
    <>
      <PageMetadata
        title='Start Your Wishlist Application'
        description='Choose an active wishlist item that fits your skills and interests to begin your application.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Select a wishlist item to apply for
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
            <WishlistSelection wishlistItems={wishlistItems} />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<WishlistApplyProps> = async () => {
  try {
    // TODO: Uncomment this when we have a way to get the wishlist items from Salesforce
    // const wishlistItems = await getGrantInitiativeItems('Wishlist');
    const wishlistItems = getActiveWishlistItems();

    return {
      props: { wishlistItems }
    };
  } catch (error) {
    console.error(error);
    return {
      props: { wishlistItems: [] }
    };
  }
};

export default WishlistApply;
