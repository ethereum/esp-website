import { Box, Center, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { ButtonLink } from '../../../components';
import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';

import { DOWNLOAD_APPLICATION_URL } from '../../../constants';

const ProjectGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Project Grants Application'
        description='Submit an application for a Project Grant from the Ecosystem Support Program.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <Stack mb={8}>
            <section id='description'>
              <PageSubheading mb={8} textAlign='center'>
                Apply to Project grants
              </PageSubheading>

              <PageText>
                This webform collects basic information about you and your project. You&apos;ll also
                need to download and fill out the full Project Grants application form, and upload
                it with your submission. We take this approach because we want you to take your time
                and be thoughtful in your responses, not be limited by formatting, and not have the
                stress of trusting an online form with hours&apos; worth of work. Don&apos;t feel
                constrained by the format, but make sure you answer all of the application questions
                clearly.
              </PageText>
            </section>
          </Stack>

          <Stack>
            <section id='download-application'>
              <Center>
                <ButtonLink
                  label='Download Application'
                  link={DOWNLOAD_APPLICATION_URL}
                  width='268px'
                />
              </Center>
            </section>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ProjectGrantsApply;
