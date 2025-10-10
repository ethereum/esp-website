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
import { getGrantInitiativeItems } from '../../../lib/sf';

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
                  The Wishlist identifies key gaps and opportunities within the ecosystem. Instead of prescribing specific approaches, it invites builders to propose ideas and initiatives that address these priorities.
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
                  Select from the available Wishlist items below and submit your application. Please review the item details carefully and explain how your background and approach align with the project requirements. Provide clear information on your methodology, timeline, and deliverables.
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
  const wishlistItems = await getGrantInitiativeItems('Wishlist');

  if (!wishlistItems.length) {
    throw new Error('No wishlist items found');
  }

  return {
    props: { wishlistItems }
  };
};

export default Wishlist;
