import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText, PrivacyPolicyAgreement } from '../../../components/UI';

const OfficeHoursApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Office Hours Request'
        description='Submit a request for an Office Hours session with a member of the Ecosystem Support team.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply to Office Hours
            </PageSubheading>

            <PageText mb={6}>
              If you have questions before submitting a grant application, or need support other
              than funding, you can request a session with a member of the ESP team in our virtual
              Office Hours. Please be specific about the type of help you&apos;re looking for.
            </PageText>

            <PageText mb={6}>
              We may reject Office Hour requests or contact you for clarification if the request
              appears to be out of scope.
            </PageText>

            <PageText mb={6}>
              For feedback about whether your project is eligible for a grant, click the Project Feedback button.
            </PageText>

            <PrivacyPolicyAgreement />
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default OfficeHoursApply;
