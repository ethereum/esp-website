import { Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PlaceholderImage, ThankYouBody } from '../../../components/UI';

const OfficeHoursThankYou: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Thank you for applying to Office Hours</title>
        <meta name='description' content='Thank you for applying to Office Hours' />
        <meta name='robots' content='noindex' />
      </Head>

      <ThankYouBody grantType='Office Hours' />

      <Center>
        <PlaceholderImage height='250px' width='360px' />
      </Center>
    </>
  );
};

export default OfficeHoursThankYou;
