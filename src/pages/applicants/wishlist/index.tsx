import { Box, Flex, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { GetStaticProps, NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

import {
  ApplicantsSidebar,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  PrivacyPolicyAgreement,
  ApplicationAttentionMsg
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
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });

  const tags = useSearchParams().get('tags')?.split(',');

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
            sectionsInView={[inView, inView2]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Wishlist Applications</PageSubheading>

                <PageText>
                  The Wishlist identifies key gaps and opportunities within the ecosystem. Instead
                  of prescribing specific approaches, it invites builders to propose ideas and
                  initiatives that address these priorities.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <ApplicationAttentionMsg />

              <section id='apply' ref={ref2}>
                <PageSection mb={6}>Apply</PageSection>

                <PageText mb={6}>
                  Select from the available Wishlist items below and submit your application. Please
                  review the item details carefully and explain how your background and approach
                  align with the project requirements. Provide clear information on your
                  methodology, timeline, and deliverables.
                </PageText>

                <PrivacyPolicyAgreement />
              </section>

              <Box mt={8}>
                <WishlistSelection wishlistItems={wishlistItems} paramTags={tags} />
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

  return {
    props: { wishlistItems },
    revalidate: 3600 // Revalidate every hour (3600 seconds)
  };
};

export default Wishlist;
