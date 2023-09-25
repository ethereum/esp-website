import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { GRANTS_EMAIL_ADDRESS } from '../../constants';

const DataCollectionRoundApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Data Collection Round Application'
        description='Submit an application for a Data Collection Grant from the Ecosystem Support Program.'
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
              Apply to Data Collection Round
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

export default DataCollectionRoundApply;
