import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';

const GranteeFinancePage: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Grantee Finance Form'
        // TODO: add description
        description=''
      />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box
        bg='white'
        position='relative'
        pt={{ base: 12 }}
        pb={{ base: 28, md: 32, lg: 16 }}
        px={{ base: 5, md: 24, lg: 32, xl: 72 }}
        mb={-8}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Grantee Finance Form
            </PageSubheading>

            <PageText mb={6}>
              Please submit your bank or wallet details using this secure form. The Ethereum
              Foundation can remit payment in DAI, ETH, or the fiat currency of your choosing.
            </PageText>

            <PageText mb={6}>
              <strong>If you choose to be paid in any fiat currency</strong>, the payment will be
              sent from our account on the following Monday and should arrive in your account in
              roughly 10 business days. Please note this will be an international wire transfer, so
              please provide international banking details.
            </PageText>

            <PageText>
              <strong>If you choose to be paid in ETH or DAI</strong>, someone from the Ethereum
              Foundation will contact you via email to confirm your address with a test amount
              before sending the entirety of the funds.
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default GranteeFinancePage;
