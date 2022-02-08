import { Box, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PlaceholderImage, ThankYouBody } from '../../../components/UI';

const SmallGrantsThankYou: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Thank you for applying to Small Grants</title>
        <meta name='description' content='Thank you for applying to Small Grants' />
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, lg: 24, xl: 72 }}>
        <ThankYouBody grantType='Small Grants' />

        <Center>
          <PlaceholderImage height='250px' width='360px' />
        </Center>
      </Box>
    </>
  );
};

export default SmallGrantsThankYou;
