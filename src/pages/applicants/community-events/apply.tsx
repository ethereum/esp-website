import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../components/UI';

const CommunityEventApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Community Event Application'
        description='Submit an application for a Community Event grant from the Ecosystem Support Program.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <Stack>
            <section id='description'>
              <PageSubheading mb={8} textAlign='center'>
                Apply to Community Event Grant
              </PageSubheading>

              <PageText mb={6}>
                Answer the following questions thoughtfully and thoroughly. The information you
                provide now is what we&apos;ll use to make a final decision on whether to award a
                grant.
              </PageText>

              <PrivacyPolicyAgreement />
            </section>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default CommunityEventApply;
