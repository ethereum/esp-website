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

import { SIDEBAR_RFP_LINKS } from '../../../constants';
import { RFPSelection } from '../../../components/forms/RFPSelection';
import { getGrantInitiativeItems } from '../../../lib/sf';
import { RFPItem } from '../../../components/forms/schemas/RFP';

interface RFPProps {
  rfpItems: RFPItem[];
}

const RFP: NextPage<RFPProps> = ({ rfpItems }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Request for Proposals (RFPs)'
        description='Apply for targeted research and development projects that address specific needs in the Ethereum ecosystem.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_RFP_LINKS}
            sectionsInView={[inView, inView2, inView3]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Request for Proposals (RFPs)</PageSubheading>

                <PageText>
                  Request for Proposals (RFPs) are targeted solicitations for specific research,
                  development, or implementation work that addresses identified needs within the
                  Ethereum ecosystem. Unlike open-ended grant applications, RFPs define specific
                  objectives, requirements, and expected deliverables.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='what-are-rfps' ref={ref2}>
                <PageSection mb={6}>What are RFPs?</PageSection>

                <PageText mb={6}>
                  Request for Proposals are formal invitations for qualified teams and individuals
                  to submit proposals for specific projects that have been identified as ecosystem
                  priorities. RFPs typically include:
                </PageText>

                <List>
                  <ListItem>Clear project specifications and technical requirements</ListItem>
                  <ListItem>Expected deliverables and milestones</ListItem>
                  <ListItem>Skills, experience, and qualifications needed</ListItem>
                  <ListItem>Timeline and budget guidance</ListItem>
                  <ListItem>Evaluation criteria and selection process</ListItem>
                </List>

                <PageText mt={6}>
                  Each RFP represents a strategic priority area where the Ethereum Foundation seeks
                  specialized expertise to advance the ecosystem.
                </PageText>
              </section>

              <section id='apply' ref={ref3}>
                <PageSection mb={6}>Apply</PageSection>

                <PageText mb={6}>
                  Select from the available Request for Proposals (RFPs) below and submit your
                  application. Each RFP represents a specific research or development need
                  identified by the Ethereum ecosystem where your expertise can make a significant
                  impact.
                </PageText>

                <PageText mb={6}>
                  Please review the RFP details carefully, including requirements and expected
                  deliverables. Your proposal should demonstrate how your background, methodology,
                  and approach align with the specific requirements. Include a detailed timeline and
                  clear deliverables.
                </PageText>

                <PrivacyPolicyAgreement />
              </section>

              <Box mt={8}>
                <RFPSelection rfpItems={rfpItems} />
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

  if (!rfpItems.length) {
    throw new Error('No RFP items found');
  }

  return {
    props: {
      rfpItems
    }
  };
};

export default RFP;
