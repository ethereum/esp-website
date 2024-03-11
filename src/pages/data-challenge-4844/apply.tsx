import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { DATA_CHALLENGE_GRANTS_PREVIEW_URL, GRANTS_EMAIL_ADDRESS } from '../../constants';

const DataChallengeApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='4844 Data Challenge Application'
        description='Submit an application for the 4844 Data Challenge from the Ecosystem Support Program.'
        image={DATA_CHALLENGE_GRANTS_PREVIEW_URL}
      />

      <Box
        position='relative'
        py={{ md: 12 }}
        px={{ md: 24, lg: 32, xl: 72 }}
        mt={{ base: 24, md: 6 }}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply to 4844 Data Challenge
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting a grant application, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${GRANTS_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {GRANTS_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default DataChallengeApply;
