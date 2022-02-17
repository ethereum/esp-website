import { Box, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, PlaceholderImage, ThankYouBody } from '../../../components/UI';

const OfficeHoursThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Thank you for applying to Office Hours'
        description='Thank you for applying to Office Hours'
      />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, lg: 24, xl: 72 }}>
        <ThankYouBody grantType='Office Hours' />

        <Center>
          <PlaceholderImage height='250px' width='360px' />
        </Center>
      </Box>
    </>
  );
};

export default OfficeHoursThankYou;
