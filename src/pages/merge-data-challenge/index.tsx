import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { MERGE_DATA_CHALLENGE_EMAIL_ADDRESS } from '../../constants';

const MergeDataChallenge: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Merge data challenge'
        description='Calling all Ethereans, data scientists, data engineers, data visualizers, developers, and anyone interested in digging into Ethereum data!'
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
              Apply to the Merge data challenge
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting an application, you may contact us at{' '}
              {/* TODO: replace email with merge data challenge email */}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${MERGE_DATA_CHALLENGE_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {MERGE_DATA_CHALLENGE_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default MergeDataChallenge;