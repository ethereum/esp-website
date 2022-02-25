import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { ACADEMIC_GRANTS_EMAIL_ADDRESS } from '../../constants';

const AcademicGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Office Hours Request'
        description='Submit a request for an Office Hours session with a member of the Ecosystem Support team'
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
                href={ACADEMIC_GRANTS_EMAIL_ADDRESS}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                academics-grants@ethereum.org
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
