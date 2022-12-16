import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { SEMAPHORE_GRANT_EMAIL_ADDRESS } from '../../constants';

const SemaphoreGrantApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Semaphore Community Grants'
        description='Semaphore has done the hard work of making zero-knowledge proofs accessible and practical for developers. Now it’s your turn. Tell us about your ideas for end-user applications, proofs of concept, or integration with other primitives. If you are building something with privacy at its core, we want to hear from you!'
      />

      <Box
        position='relative'
        py={{ md: 12 }}
        px={{ sm: 5, md: 24, lg: 32, xl: 72 }}
        pb={5}
        mt={{ base: 24, md: 6 }}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply to Semaphore Grants
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting a grant application, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${SEMAPHORE_GRANT_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {SEMAPHORE_GRANT_EMAIL_ADDRESS}
              </Link>
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default SemaphoreGrantApply;
