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

import { SIDEBAR_RFP_LINKS } from '../../../constants';
import { RFPSelection } from '../../../components/forms/RFPSelection';
import { getGrantInitiativeItems } from '../../../lib/sf';
import { RFPItem } from '../../../components/forms/schemas/RFP';

interface RFPProps {
  rfpItems: RFPItem[];
}

const RFP: NextPage<RFPProps> = ({ rfpItems }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });

  const tags = useSearchParams().get('tags')?.split(',');

  return (
    <>
      <PageMetadata
        title='Request for Proposals (RFPs)'
        description='Apply for targeted research and development projects that address specific needs in the Ethereum ecosystem.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar sidebarLinks={SIDEBAR_RFP_LINKS} sectionsInView={[inView, inView2]} />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Request for Proposals (RFPs)</PageSubheading>

                <PageText>
                  RFPs define focused problems and outline clear target outcomes. They are more
                  prescriptive and time-bound, providing opportunities for specific research,
                  development, or implementation efforts that address identified needs within the
                  Ethereum ecosystem.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <ApplicationAttentionMsg />

              <section id='apply' ref={ref2}>
                <PageSection mb={6}>Apply</PageSection>

                <PageText mb={6}>
                  Select from the available RFP items below and submit your application. Please
                  review the item details carefully and explain how your background and approach
                  align with the project requirements. Provide clear information on your
                  methodology, timeline, and deliverables.
                </PageText>

                <PrivacyPolicyAgreement />
              </section>

              <Box mt={8}>
                <RFPSelection rfpItems={rfpItems} paramTags={tags} />
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<RFPProps> = async () => {
  const rfpItems = await getGrantInitiativeItems('RFP');

  return {
    props: {
      rfpItems
    },
    revalidate: 3600 // Revalidate every hour (3600 seconds)
  };
};

export default RFP;
