import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { ACADEMIC_GRANTS_PREVIEW_URL, GRANTS_EMAIL_ADDRESS } from '../../constants';

const TenYearAnniversaryApply: NextPage = () => {
  return (
    <>
      {/* TODO: Add the correct image */}
      <PageMetadata
        title='Apply for 10 Years of Ethereum Anniversary'
        description=''
        image={ACADEMIC_GRANTS_PREVIEW_URL}
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
              Apply for 10 Years of Ethereum Anniversary
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting an application for financial or non-financial
              support, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${GRANTS_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {GRANTS_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default TenYearAnniversaryApply;