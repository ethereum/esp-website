import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { ACADEMIC_GRANTS_PREVIEW_URL, DEVCON_GRANTS_EMAIL_ADDRESS } from '../../constants';

const DevconGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Join the Road to Devcon'
        description='To promote education around Ethereum in Southeast Asia along the Road to Devcon, we would like to offer support (both monetary and otherwise) to meetups, events, and other educational initiatives happening within the SEA region before Devcon 7.'
        image={ACADEMIC_GRANTS_PREVIEW_URL}
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
              Apply for Support on the Road to Devcon
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting an application for financial or non-financial
              support, you may contact us at{' '}
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
