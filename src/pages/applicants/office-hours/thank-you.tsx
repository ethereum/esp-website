import { Box, Heading, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';
import { CSATForm } from '../../../components/forms';

const OfficeHoursThankYou: NextPage = () => {
  const router = useRouter();
  const { applicationId, csatToken } = router.query;

  return (
    <>
      <PageMetadata title='Thank you' description='Thank you for applying to Office Hours.' />
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
              for applying to Office Hours
            </PageSubheading>

            <PageText mb={6} textAlign='center'>
              You should receive a confirmation email shortly. For more information, refer to the{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='/applicants/office-hours'
                _hover={{ textDecoration: 'none' }}
              >
                Office Hours About page
              </Link>
              .
            </PageText>
          </section>

          {/* CSAT Survey */}
          {applicationId && csatToken && (
            <CSATForm
              maxW='container.md'
              mx='auto'
              applicationId={applicationId as string}
              csatToken={csatToken as string}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default OfficeHoursThankYou;
