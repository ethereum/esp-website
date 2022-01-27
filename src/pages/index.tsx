import { Box, Flex, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import { PageSection, PageText } from '../components/UI';

import smallSucculentSVG from '../public/images/small-succulent.svg';
import mediumSucculentSVG from '../public/images/medium-succulent.svg';
import bigSucculentSVG from '../public/images/big-succulent.svg';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Homepage</title>
        <meta name='description' content='Homepage' />
      </Head>

      <Stack mb={8} px={5} py={3}>
        <Stack spacing={10}>
          <section id='mission'>
            <PageSection mb={6}>The Ethereum Foundation&apos;s Mission</PageSection>

            <PageText>
              Our mission is to do what is best for Ethereum&apos;s long-term success. Our role is
              to <strong>allocate resources to critical projects</strong>, to be a valued voice
              within the Ethereum ecosystem, and to advocate for Ethereum to the outside world.
            </PageText>
          </section>

          <section id='esp-role'>
            <PageSection mb={6}>Ecosystem Support Program&apos;s Role</PageSection>

            <PageText mb={1}>
              As the public facing allocation arm of the Ethereum Foundation, ESP provides funding
              and other forms of support to eligible projects working to improve Ethereum. We focus
              on work that strengthens Ethereum&apos;s foundations and enables future builders, such
              as developer tools, research, community building, infrastructure and open standards.
            </PageText>
          </section>

          <section id='stats'>
            <Flex
              h='513px'
              justifyContent='center'
              alignItems='center'
              bgGradient='linear(to-br, rgba(255, 229, 226, 0.3) 2.29%, rgba(243, 209, 238, 0.3) 101.37%)'
              borderTop='5px solid'
              borderTopColor='brand.heading'
              borderBottom='5px solid'
              borderBottomColor='brand.heading'
            >
              <Flex direction='column'>
                <Flex justifyContent='center' alignItems='center' mb={10}>
                  <Flex w='150px' justifyContent='center' ml='-20px'>
                    <Image
                      src={smallSucculentSVG}
                      alt='small succulent plant representing allocation in 2019'
                      height='67.83px'
                      width='71.48px'
                    />
                  </Flex>

                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2019
                    </PageSection>

                    <Box>
                      <PageText fontSize='h1' fontWeight={200} mb={1}>
                        $7.7{' '}
                        <PageText as='span' fontSize='stats'>
                          million
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      68 projects
                    </PageText>
                  </Stack>
                </Flex>

                <Flex justifyContent='center' alignItems='center' mb={10}>
                  <Flex w='150px' justifyContent='center'>
                    <Image
                      src={mediumSucculentSVG}
                      alt='medium succulent plant representing allocation in 2020'
                      height='91.93px'
                      width='96.79px'
                    />
                  </Flex>

                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2020
                    </PageSection>

                    <Box>
                      <PageText fontSize='h1' fontWeight={200} mb={1}>
                        $12.9{' '}
                        <PageText as='span' fontSize='stats'>
                          million
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      99 projects
                    </PageText>
                  </Stack>
                </Flex>

                <Flex justifyContent='center' alignItems='center'>
                  <Flex w='150px' justifyContent='center' ml={2}>
                    <Image
                      src={bigSucculentSVG}
                      alt='big opened succulent plant representing allocation in 2021'
                      height='122.29px'
                      width='131px'
                    />
                  </Flex>

                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2021
                    </PageSection>

                    <Box>
                      <PageText fontSize='h1' fontWeight={200} mb={1}>
                        $24.0{' '}
                        <PageText as='span' fontSize='stats'>
                          million
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      125 projects
                    </PageText>
                  </Stack>
                </Flex>
              </Flex>
            </Flex>
          </section>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
