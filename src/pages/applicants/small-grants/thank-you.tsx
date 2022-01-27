import { Center } from '@chakra-ui/react';
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

      <ThankYouBody grantType='Small Grants' />

      <Center>
        <PlaceholderImage height='250px' width='360px' />
      </Center>
    </>
  );
};

export default SmallGrantsThankYou;
