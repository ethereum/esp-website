import { Center, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { ButtonLink } from '../../../components';
import { ApplicationAttentionMsg, PageSubheading, PageText } from '../../../components/UI';

import { API_DOWNLOAD_APPLICATION_URL } from '../../../constants';

const ProjectGrantsApply: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Project Grants Application</title>
        <meta name='description' content='Project Grants Application' />
      </Head>

      <Stack mb={12}>
        <Stack mb={8}>
          <section id='description'>
            <PageSubheading mb={8}>Apply to Project grants</PageSubheading>

            <PageText>
              This webform collects basic information about you and your project. You&apos;ll also
              need to download and fill out the full Project Grants application form, and upload it
              with your submission. We take this approach because we want you to take your time and
              be thoughtful in your responses, not be limited by formatting, and not have the stress
              of trusting an online form with hours&apos; worth of work. Don&apos;t feel constrained
              by the format, but make sure you answer all of the application questions clearly.
            </PageText>
          </section>
        </Stack>

        <Stack>
          <section id='download-application'>
            <Center>
              <ButtonLink
                label='Download Application'
                link={API_DOWNLOAD_APPLICATION_URL}
                width='268px'
              />
            </Center>
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

export default ProjectGrantsApply;
