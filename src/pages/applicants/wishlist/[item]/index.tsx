import {
    Box,
    Center,
    Heading,
    Stack,
    Text,
    Wrap,
    WrapItem,
    Tag,
  } from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
  PageMetadata,
} from '../../../../components/UI';
import { WishlistItem } from '../../../../components/forms/schemas/Wishlist';
import { ButtonLink } from '../../../../components/ButtonLink';
import { getGrantInitiativeItems } from '../../../../lib/sf';
import parseStringForUrls from '../../../../utils/parseStringForUrls';

interface WishlistItemApplyProps {
  wishlistItem: WishlistItem;
}

const WishlistItemPage: NextPage<WishlistItemApplyProps> = ({ wishlistItem }) => {
  const parseResources = (resources?: string) => {
      if (!resources) return null;
      return parseStringForUrls(resources)
    };
  
  const parseTags = (tags?: string) =>
    tags
      ?.split(';')
      .map(tag => tag.trim())
      .filter(Boolean) ?? [];

  return (
    <>
      <PageMetadata
        title={`Apply for ${wishlistItem.Name}`}
        description={`Submit your application for: ${wishlistItem.Name} - ${wishlistItem.Description__c}`}
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Box
          mt={8}
          p={6}
          bg='brand.newsletter.bgGradient.start'
          borderRadius='lg'
          borderLeft='4px solid'
          borderLeftColor='brand.orange.100'
        >
          <Stack spacing={3}>
            <Heading size='md' color='brand.heading'>
              Selected: {wishlistItem.Name}
            </Heading>
            <Text color='brand.paragraph'>{wishlistItem.Description__c}</Text>
            {wishlistItem.Expected_Deliverables__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Expected Deliverables
                </Text>
                <Text color='brand.paragraph'>{wishlistItem.Expected_Deliverables__c}</Text>
              </Box>
            )}
            {wishlistItem.Tags__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Tags
                </Text>
                <Wrap spacing={2}>
                  {parseTags(wishlistItem.Tags__c).map(tag => (
                    <WrapItem key={tag}>
                      <Tag
                        size='md'
                        variant='subtle'
                        colorScheme='orange'
                        px={3}
                        py={1}
                        borderRadius='full'
                      >
                        {tag}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}
            {wishlistItem.Out_of_Scope__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Out of Scope
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {wishlistItem.Out_of_Scope__c}
                </Text>
              </Box>
            )}
            {wishlistItem.Resources__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Resources
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {parseResources(wishlistItem.Resources__c)}
                </Text>
              </Box>
            )}
          </Stack>
        </Box>

        <Center mt={8}>
          <ButtonLink
            label='Apply'
            link={`/applicants/wishlist/${wishlistItem?.Id}/apply`}
            width='208px'
          />
        </Center>
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const wishlistItems = await getGrantInitiativeItems('Wishlist');

  const paths = wishlistItems.map(item => ({
    params: { item: item.Id }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<WishlistItemApplyProps> = async ({ params }) => {
  const itemId = params?.item as string;

  const wishlistItems = await getGrantInitiativeItems('Wishlist');
  const wishlistItem = wishlistItems.find(item => item.Id === itemId);

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

export default WishlistItemPage;
