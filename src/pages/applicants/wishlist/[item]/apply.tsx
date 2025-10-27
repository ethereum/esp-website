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
import { getGrantInitiativeItems } from '../../../../lib/sf';

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
  const wishlistItems = await getGrantInitiativeItems('Wishlist');

  const paths = wishlistItems.map(item => ({
    params: { item: item.Custom_URL_Slug__c || item.Id }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<WishlistItemApplyProps> = async ({ params }) => {
  const itemId = params?.item as string;

  const wishlistItems = await getGrantInitiativeItems('Wishlist');
  const wishlistItem = wishlistItems.find(item => item.Custom_URL_Slug__c === itemId || item.Id === itemId);

  if (!wishlistItem) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      wishlistItem
    },
    revalidate: 3600 // Revalidate every hour (3600 seconds)
  };
};

export default WishlistApply;
