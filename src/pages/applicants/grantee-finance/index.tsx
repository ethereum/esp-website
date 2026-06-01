import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';

import { ETHEREUM_WALLETS_URL } from '../../../constants';

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
              Please submit your wallet details using this secure form. The Ethereum Foundation
              disburses grant payments in ETH and transactions are processed exclusively on the
              Ethereum Mainnet.
            </PageText>

            <PageText mb={6}>
              Once your grant tranche is ready for disbursement, someone from the Ethereum
              Foundation will contact you via email to confirm your address with a test amount
              before sending the entirety of the funds.
            </PageText>

            <PageText>
              For best practices on selecting and securing an Ethereum wallet, visit{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={ETHEREUM_WALLETS_URL}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                ethereum.org/wallets
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default GranteeFinancePage;
