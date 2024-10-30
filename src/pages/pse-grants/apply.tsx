import { Box, Center, Link, Stack, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';

import pseSponsorshipsHero from '../../../public/images/pse-sponsorships.png';

const PSEApplicationPage: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='PSE Grants Application'
        description='Submit Application to Privacy & Scaling Explorations.'
      />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box
        position='relative'
        py={{ md: 12 }}
        px={{ sm: 5, md: 24, lg: 32, xl: 72 }}
        pb={5}
        mt={{ base: 24, md: 6 }}
      >
        <Center>
          <Image
            src={pseSponsorshipsHero}
            alt=''
            placeholder='blur'
            sizes='100vw'
            style={{
              objectFit: 'cover'
            }}
          />
        </Center>

        <VStack>
          <VStack
            as='section'
            id='description'
            mt={6}
            gap={6}
            maxW='container.lg'
            textAlign='center'
          >
            <PageSubheading mb={8} textAlign='center'>
              Submit Application to Privacy & Scaling Explorations
            </PageSubheading>

            <PageText>
              The following webform is used to apply to the Ethereum Foundation&apos;s Privacy and
              Scaling Explorations (PSE) grants program. Answer the following questions thoroughly
              and create a complete, detailed project proposal using the{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://hackmd.io/_vMHk_W3SrGdVJehilnxvw'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                HackMD proposal template
              </Link>{' '}
              to be considered for funding.
            </PageText>

            <PageText>
              For more information about PSE, visit:{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://pse.dev/'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                https://pse.dev/
              </Link>
            </PageText>

            <PageText>
              Please note that by submitting this application, you confirm that you have read and
              agree to our{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://ethereum.org/en/privacy-policy/'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                Privacy Policy
              </Link>
              .
            </PageText>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default PSEApplicationPage;
