import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, ThankYouBody } from '../../components/UI';

const AcademicGrantsThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata title='Thank you' description='Thank you for applying to Academic Grants' />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, lg: 24, xl: 72 }}>
        <ThankYouBody grantType='Academic Grants' />
      </Box>
    </>
  );
};

export default AcademicGrantsThankYou;
