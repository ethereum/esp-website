import { Box, Link, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'

import { PageMetadata, PageSubheading, PageText } from '../../components/UI'
import { PECTRA_PGR_EMAIL_ADDRESS } from '../../constants'

const PectraPGRApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Pectra Proactive Grant Round Application'
        description='Submit an application for the Pectra Proactive Grant Round'
      />

      <Box
        position='relative'
        py={{ md: 12 }}
        px={{ md: 24, lg: 32, xl: 72 }}
        mt={{ base: 24, md: 6 }}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Apply to Pectra Proactive Grant Round
            </PageSubheading>

            <PageText textAlign='center'>
              If you have questions before submitting a grant application, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${PECTRA_PGR_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {PECTRA_PGR_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  )
};

export default PectraPGRApply
