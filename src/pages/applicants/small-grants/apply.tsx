import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../components/UI';
import { SMALL_GRANTS_URL } from '../../../constants';

const SmallGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Small Grants Application'
        description='Submit an application for a Small Grant from the Ecosystem Support Program.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <Stack>
          <Stack>
            <section id='description'>
              <PageSubheading mb={8} textAlign='center'>
                Apply to Small Grants
              </PageSubheading>

              <PageText mb={6}>
                This webform collects information about you and your project. Use the spaces below
                to answer the following questions thoughtfully and thoroughly. Each field has a
                limit of 2000 characters. The information you provide now is what we&apos;ll use to
                determine whether to award a grant. If you have any questions, please visit the{' '}
                <Link fontWeight={700} color='brand.orange.100' href={`${SMALL_GRANTS_URL}/#faq`}>
                  Small Grants FAQ
                </Link>{' '}
                page.
              </PageText>

              <PrivacyPolicyAgreement />
            </section>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SmallGrantsApply;
