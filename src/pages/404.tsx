import { Box, Center, Heading, Link, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';

const PageNotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Ethereum Foundation ESP</title>
        <meta name='description' content='Page Not Found' />
      </Head>

      <Center textAlign='center' my={{ md: 12, lg: 24, xl: 32 }}>
        <Box>
          <Heading as='h1' color='brand.heading' fontSize='h1' fontWeight={100}>
            404.
          </Heading>

          <Heading as='h4' color='brand.heading' fontSize='h4' fontWeight={700} lineHeight='24px'>
            Page not found.
          </Heading>

          <Text
            mt={9}
            color='brand.paragraph'
            fontSize='paragraph'
            fontWeight={300}
            lineHeight='24px'
          >
            Please go back to{' '}
            <NextLink href='/' passHref>
              <Link fontWeight={700} color='brand.orange.100' _hover={{ textDecoration: 'none' }}>
                our home
              </Link>
            </NextLink>{' '}
            to get started.
          </Text>
        </Box>
      </Center>
    </>
  );
};

export default PageNotFound;
