import { Box, Flex, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { GetStaticProps, NextPage } from 'next';

import {
  ApplicantsSidebar,
  List,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  PrivacyPolicyAgreement
} from '../../../components/UI';

import { SIDEBAR_WISHLIST_LINKS } from '../../../constants';
import { WishlistSelection } from '../../../components/forms/WishlistSelection';
import { WishlistItem } from '../../../components/forms/schemas/Wishlist';
import { getActiveWishlistItems } from '../../../data/wishlistItems';

interface WishlistProps {
  wishlistItems: WishlistItem[];
}

const Wishlist: NextPage<WishlistProps> = ({ wishlistItems }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Wishlist Applications'
        description='Apply to work on specific projects and initiatives that the Ethereum ecosystem needs most.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_WISHLIST_LINKS}
            sectionsInView={[inView, inView2, inView3]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Wishlist Applications</PageSubheading>

                <PageText>
                  The Wishlist is a curated collection of specific projects and initiatives that the
                  Ethereum ecosystem needs most. These are concrete opportunities where your skills
                  and expertise can make a significant impact on Ethereum&apos;s development and
                  growth.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='what-are-wishlist-items' ref={ref2}>
                <PageSection mb={6}>What are wishlist items?</PageSection>

                <PageText mb={6}>
                  Wishlist items are specific projects, tools, research initiatives, or other
                  contributions that the Ethereum Foundation has identified as high-priority needs
                  for the ecosystem. Each item includes:
                </PageText>

                <List>
                  <ListItem>Clear project specifications and expected deliverables</ListItem>
                  <ListItem>Estimated timeline and effort requirements</ListItem>
                  <ListItem>Skills and expertise needed</ListItem>
                  <ListItem>Impact on the Ethereum ecosystem</ListItem>
                  <ListItem>Guidance and support available</ListItem>
                </List>

                <PageText mt={6}>
                  These items are continuously updated based on ecosystem needs, community feedback,
                  and strategic priorities.
                </PageText>
              </section>

              <section id='apply' ref={ref3}>
                <PageSection mb={6}>Apply</PageSection>

                <PageText mb={6}>
                  Select from the available wishlist items below and submit your application. Each
                  wishlist item represents a specific need in the Ethereum ecosystem where your
                  expertise can make a meaningful impact.
                </PageText>

                <PageText mb={6}>
                  Please review the item details carefully and explain how your background and
                  approach align with the requirements. Be specific about your methodology,
                  timeline, and expected deliverables.
                </PageText>

                <PrivacyPolicyAgreement />
              </section>

              <Box mt={8}>
                <WishlistSelection wishlistItems={wishlistItems} />
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<WishlistProps> = async () => {
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

export default Wishlist;
