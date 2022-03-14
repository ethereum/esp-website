import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { DEVCON_GRANTS_EMAIL_ADDRESS } from '../../constants';

const DevconGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Devcon Grants Application'
        description='Submit an application for an Devcon Grant from the Ecosystem Support Program.'
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
              Apply to Devcon Grants
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting a grant application, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${DEVCON_GRANTS_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {DEVCON_GRANTS_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default DevconGrantsApply;
