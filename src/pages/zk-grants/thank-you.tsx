import { Box, Heading, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, PageSubheading } from '../../components/UI';

const ZKGrantsThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata title='Thank you' description='Thank you for applying to the ZK Grants' />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, xl: 64 }}>
        <Stack mb={10}>
          <section id='description'>
            <Heading
              as='h1'
              color='brand.heading'
              fontSize='h1'
              fontWeight={100}
              lineHeight='48px'
              textAlign='center'
              mb={4}
            >
              Thank you!
            </Heading>

            <PageSubheading mb={16} textAlign='center'>
              for applying to the ZK Grants
            </PageSubheading>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default ZKGrantsThankYou;
