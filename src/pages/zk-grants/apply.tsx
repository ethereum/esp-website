import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, PageSubheading } from '../../components/UI';

const ZKGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='ZK Grants Application'
        description='Submit an application for a ZK grant from the Ecosystem Support Program.'
      />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

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
              Apply to ZK Grants
            </PageSubheading>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default ZKGrantsApply;
