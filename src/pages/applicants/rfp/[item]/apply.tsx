import { Box, Stack } from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../../components/UI';
import { RFPForm } from '../../../../components/forms/RFPForm';
import { RFPItem } from '../../../../components/forms/schemas/RFP';
import { getActiveRFPItems, getRFPItemById } from '../../../../data/rfpItems';

interface RFPItemApplyProps {
  rfpItem: RFPItem;
}

const RFPApply: NextPage<RFPItemApplyProps> = ({ rfpItem }) => {
  return (
    <>
      <PageMetadata
        title={`Apply for ${rfpItem.Name}`}
        description={`Submit your application for: ${rfpItem.Name} - ${rfpItem.Description__c}`}
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply for {rfpItem.Name}
            </PageSubheading>

            <PageText mb={6}>{rfpItem.Description__c}</PageText>

            <PageText mb={6}>
              Please review the RFP requirements carefully and submit a comprehensive proposal that
              demonstrates your expertise and approach. Include detailed methodology, timeline, and
              expected deliverables in your PDF proposal.
            </PageText>

            <PrivacyPolicyAgreement />
          </section>

          <Box mt={8}>
            <RFPForm rfpItem={rfpItem} />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const rfpItems = getActiveRFPItems();

  const paths = rfpItems.map(item => ({
    params: { item: item.Id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<RFPItemApplyProps> = async ({ params }) => {
  const itemId = params?.item as string;
  const rfpItem = getRFPItemById(itemId);

  if (!rfpItem) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      rfpItem
    }
  };
};

export default RFPApply;
