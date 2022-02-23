import { Box, Heading, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';

const GranteeFinanceThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata title='Thank you' description='Grantee Finance form.' />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, lg: 24, xl: 72 }}>
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
              for your submission
            </PageSubheading>

            <PageText mb={6} textAlign='center'>
              The ESP team will be in touch with details about your grant.
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default GranteeFinanceThankYou;
