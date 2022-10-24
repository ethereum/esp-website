import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { LAYER_2_GRANTS_EMAIL_ADDRESS } from '../../constants';

const Layer2GrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Layer 2 Community Grants Application'
        description='Submit an application for a Layer 2 grant from the Ecosystem Support Program.'
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
              Apply to Layer 2 Grants
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting a grant application, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${LAYER_2_GRANTS_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {LAYER_2_GRANTS_EMAIL_ADDRESS}
              </Link>
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default Layer2GrantsApply;
