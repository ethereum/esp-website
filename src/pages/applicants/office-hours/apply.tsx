import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageSubheading, PageText } from '../../../components/UI';

const OfficeHoursApply: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Office Hours Application</title>
        <meta name='description' content='Office Hours Application' />
      </Head>

      <Stack mb={4}>
        <section id='description'>
          <PageSubheading mb={8}>Apply to Office Hours</PageSubheading>

          <PageText mb={6}>
            If you have questions before submitting a grant application, or need support other than
            funding, you can request a session with a member of the ESP team. Please be specific
            about the type of help you&apos;re looking for!
          </PageText>

          <PageText>
            We may contact you for clarification if your request appears to be out of scope.
            Otherwise, we&apos;ll get in touch to set up a time.
          </PageText>
        </section>
      </Stack>
    </>
  );
};

export default OfficeHoursApply;
