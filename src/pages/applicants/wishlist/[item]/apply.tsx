import { Box, Stack } from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../../components/UI';
import { WishlistForm } from '../../../../components/forms/WishlistForm';
import { WishlistItem } from '../../../../components/forms/schemas/Wishlist';
import { getActiveWishlistItems, getWishlistItemById } from '../../../../data/wishlistItems';

interface WishlistItemApplyProps {
  wishlistItem: WishlistItem;
}

const WishlistApply: NextPage<WishlistItemApplyProps> = ({ wishlistItem }) => {
  return (
    <>
      <PageMetadata
        title={`Apply for ${wishlistItem.Name}`}
        description={`Submit your application for: ${wishlistItem.Name} - ${wishlistItem.Description__c}`}
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply for {wishlistItem.Name}
            </PageSubheading>

            <PageText mb={6}>{wishlistItem.Description__c}</PageText>

            <PageText mb={6}>
              Please review the item details carefully and explain how your background and approach
              align with the requirements. Be specific about your methodology, timeline, and
              expected deliverables.
            </PageText>

            <PrivacyPolicyAgreement />
          </section>

          <Box mt={8}>
            <WishlistForm wishlistItem={wishlistItem} />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const wishlistItems = getActiveWishlistItems();

  const paths = wishlistItems.map(item => ({
    params: { item: item.Id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<WishlistItemApplyProps> = async ({ params }) => {
  const itemId = params?.item as string;
  const wishlistItem = getWishlistItemById(itemId);

  if (!wishlistItem) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      wishlistItem
    }
  };
};

export default WishlistApply;
