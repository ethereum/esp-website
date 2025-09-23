import { Box, Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../components/UI';
import { RFPItem } from '../../../components/forms/schemas/RFP';
import { getActiveRFPItems } from '../../../data/rfpItems';
import { RFPSelection } from '../../../components/forms/RFPSelection';
// import { getGrantInitiativeItems } from '../../../lib/sf';

interface RFPApplyProps {
  rfpItems: RFPItem[];
}

const RFPApply: NextPage<RFPApplyProps> = ({ rfpItems }) => {
  return (
    <>
      <PageMetadata
        title='Start Your RFP Application'
        description='Choose an active RFP to begin your application.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Select an RFP to apply for
            </PageSubheading>

            <PageText mb={6}>
              Select from the available Request for Proposals (RFPs) below and submit your
              application. Each RFP represents a specific research or development need identified by
              the Ethereum ecosystem where your expertise can make a significant impact.
            </PageText>

            <PageText mb={6}>
              Please review the RFP details carefully, including requirements and expected
              deliverables. Your proposal should demonstrate how your background, methodology, and
              approach align with the specific requirements. Include a detailed timeline and clear
              deliverables.
            </PageText>

            <PrivacyPolicyAgreement />
          </section>

          <Box mt={8}>
            <RFPSelection rfpItems={rfpItems} />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<RFPApplyProps> = async () => {
  try {
    // TODO: Uncomment this when we have a way to get the RFP items from Salesforce
    // const rfpItems = await getGrantInitiativeItems('RFP');
    const rfpItems = getActiveRFPItems();

    return {
      props: {
        rfpItems
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: { rfpItems: [] }
    };
  }
};

export default RFPApply;
