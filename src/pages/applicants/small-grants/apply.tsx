import { Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageSubheading, PageText } from '../../../components/UI';

import { OFFICE_HOURS_URL } from '../../../constants';

const OfficeHoursApply: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Small Grants Application</title>
        <meta name='description' content='Small Grants Application' />
      </Head>

      <Stack mb={4}>
        <section id='description'>
          <PageSubheading mb={8}>Apply to Small Grants</PageSubheading>

          <PageText mb={6}>
            Answer the following questions thoughtfully and thoroughly. The information you provide
            now is what we&apos;ll use to make a final decision on whether to award a grant.
          </PageText>

          <PageText>
            If you&apos;re feeling uncertain about anything in the application, consider signing up
            for{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={OFFICE_HOURS_URL}
              _hover={{ textDecoration: 'none' }}
            >
              Office Hours
            </Link>{' '}
            before submitting.
          </PageText>
        </section>
      </Stack>
    </>
  );
};

export default OfficeHoursApply;
