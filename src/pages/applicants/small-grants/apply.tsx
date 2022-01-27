import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { ApplicationAttentionMsg, PageSubheading, PageText } from '../../../components/UI';

const OfficeHoursApply: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Small Grants Application</title>
        <meta name='description' content='Small Grants Application' />
      </Head>

      <Stack mb={12}>
        <Stack>
          <section id='description'>
            <PageSubheading mb={8}>Apply to Small Grants</PageSubheading>

            <PageText>
              Answer the following questions thoughtfully and thoroughly. The information you
              provide now is what we&apos;ll use to make a final decision on whether to award a
              grant.
            </PageText>
          </section>
        </Stack>

        <Stack>
          <section id='attention'>
            <ApplicationAttentionMsg />
          </section>
        </Stack>
      </Stack>
    </>
  );
};

export default OfficeHoursApply;
