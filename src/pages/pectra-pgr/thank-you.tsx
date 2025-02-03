import { Box, Heading, Link, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { PageMetadata, PageSubheading, PageText } from '../../components/UI'
import { PECTRA_PGR_EMAIL_ADDRESS } from '../../constants'

const PectraPGRThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata title='Thank you' description='Thank you for applying to Pectra PGR.' />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, xl: 64 }}>
        <Stack mb={10}>
          <section id='description'>
           <Heading
              as='h1'
              color='brand.heading'
              fontSize='h1'
              fontWeight={100}
              lineHeight='48px'
              textAlign='center'
              mb={4}
            >
              Thank you!
            </Heading>

            <PageSubheading mb={16} textAlign='center'>
              for applying to Pectra Proactive Grant Round
            </PageSubheading>

            <PageText mb={6} textAlign='center'>
              You should receive a confirmation email from us soon. If you have any questions in the
              meantime, you can reach us at{' '}
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
}

export default PectraPGRThankYou