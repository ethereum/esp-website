import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';

const AcademicGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Office Hours Request'
        description='Submit a request for an Office Hours session with a member of the Ecosystem Support team'
      />

      <Box
        bg='white'
        position='relative'
        py={{ md: 12 }}
        px={{ md: 24, lg: 32, xl: 72 }}
        mt={{ base: 24, md: 6 }}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply to Academic Grants
            </PageSubheading>

            <PageText mb={6}>
              <strong>[UPDATE THIS]</strong> If you have questions before submitting a grant
              application, or need support other than funding, you can request a session with a
              member of the ESP team. Please be specific about the type of help you&apos;re looking
              for!
            </PageText>

            <PageText>
              We may contact you for clarification if your request appears to be out of scope.
              Otherwise, we&apos;ll get in touch to set up a time.
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default AcademicGrantsApply;
