import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { ACADEMIC_GRANTS_EMAIL_ADDRESS } from '../../constants';

// Academic Grants Round is currently closed, so we return a 404 page instead
export function getStaticProps() {
  return {
    // returns the default 404 page with a status code of 404
    notFound: true
  };
}

const AcademicGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Academic Grants Application'
        description='Submit an application for an Academic Grant from the Ecosystem Support Program.'
      />

      <Box
        bg='white'
        position='relative'
        py={{ md: 12 }}
        px={{ md: 24, lg: 32, xl: 72 }}
        mt={{ base: 24, md: 6 }}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply to Academic Grants
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting a grant application, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${ACADEMIC_GRANTS_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {ACADEMIC_GRANTS_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default AcademicGrantsApply;
