import {
  Box,
  Flex,
  Grid,
  GridItem,
  Link,
  Stack
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { HomeAboutCard, PageMetadata, PageSection, PageText } from '../components/UI';

import applicantsHero from '../../public/images/applicants-hero.png';
import smallSucculentSVG from '../../public/images/small-succulent.svg';
import mediumSucculentSVG from '../../public/images/medium-succulent.svg';
import bigSucculentSVG from '../../public/images/big-succulent.svg';
import whatWeSupportTree from '../../public/images/what-we-support-tree.png';
import howWeSupportRoots from '../../public/images/how-we-support-roots.png';

import { ABOUT_URL, APPLICANTS_URL } from '../constants';

const Home: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Home'
        description='The Ecosystem Support Program provides support to builders creating public goods for the Ethereum ecosystem.'
      />

      <Box mx={{ md: 12 }} bg='white' position='relative'>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 9 }} py={{ base: 3, md: 12 }}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Stack mb={{ base: 10, md: 0 }} w={{ md: '100%' }} mr={{ base: 0, md: 12 }}>
              <section id='mission'>
                <PageSection mb={6}>Our Mission</PageSection>

                <PageText fontSize='stats' fontWeight={100} lineHeight='32px'>
                  The Ecosystem Support Program focuses on strengthening Ethereum&apos;s
                  foundations, supporting teams across the ecosystem, and enabling future builders.
                </PageText>
              </section>
            </Stack>

            {/* <Stack w={{ md: '90%' }} mb={{ md: 8 }}>
              <section id='esp-role'>
                <PageSection mb={6}>Ecosystem Support Program&apos;s Role</PageSection>

                <PageText mb={1}>
                  ESP provides support to eligible projects working to improve Ethereum. We focus on
                  work that strengthens Ethereum&apos;s foundations and enables future builders,
                  such as developer tools, research, community building, infrastructure, and open
                  standards.
                </PageText>
              </section>
            </Stack> */}
          </Flex>

          <section id='stats'>
            <Box
              justifyContent='center'
              alignItems='center'
              flexDir='column'
              bgGradient='linear(to-br, brand.stats.bgGradient.start 2.29%, brand.stats.bgGradient.end 101.37%)'
              borderTop='5px solid'
              borderTopColor='brand.heading'
              borderBottom='5px solid'
              borderBottomColor='brand.heading'
              px={{ base: 2, lg: 20, xl: 10 }}
              py={7}
            >
              <Grid
                templateColumns={{
                  base: 'repeat(2, auto)',
                  lg: 'repeat(8, auto)',
                  xl: 'repeat(8, 1fr)'
                }}
                rowGap={10}
                justifyContent='space-evenly'
              >
                <GridItem alignSelf='center' justifySelf='center' mr={{ lg: 6, xl: 0, xl2: -20 }}>
                  <Box>
                    <Image
                      src={smallSucculentSVG}
                      alt='small succulent plant representing allocation in 2022'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mr={{ lg: 20, xl: 12 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2022
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
                        397{' '}
                        <PageText as='span' fontSize='stats'>
                          projects
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      $30.0 million
                    </PageText>
                  </Stack>
                </GridItem>
                <GridItem alignSelf='center' justifySelf='center' mr={{ lg: 6, xl: 0, xl2: -16 }}>
                  <Box>
                    <Image
                      src={mediumSucculentSVG}
                      alt='medium succulent plant representing allocation in 2023'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mr={{ lg: 20, xl: 12 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2023
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
                        498{' '}
                        <PageText as='span' fontSize='stats'>
                          projects
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      $61.1 million
                    </PageText>
                  </Stack>
                </GridItem>
                <GridItem alignSelf='center' justifySelf='center' mr={{ lg: 6, xl: 0, xl2: -16 }}>
                  <Box>
                    <Image
                      src={mediumSucculentSVG}
                      alt='medium succulent plant representing allocation in 2024'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mb={{ base: 8, lg: 0 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2024
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
                        677{' '}
                        <PageText as='span' fontSize='stats'>
                          projects
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      $44.4 million
                    </PageText>
                  </Stack>
                </GridItem>
                <GridItem
                  alignSelf='center'
                  justifySelf='center'
                  mr={{ lg: 6, xl: 0, xl2: -12 }}
                  mb={{ base: 8, lg: 0 }}
                >
                  <Box>
                    <Image
                      src={bigSucculentSVG}
                      alt='big opened succulent plant representing allocation in 2025'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mb={{ base: 8, lg: 0 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2025
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
                        388{' '}
                        <PageText as='span' fontSize='stats'>
                          projects
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      $29.1 million
                    </PageText>
                  </Stack>
                </GridItem>
              </Grid>
            </Box>
          </section>

          <section id='our-role'>
            <HomeAboutCard
              bgGradient='linear(to-br, brand.whoWeSupport.bgGradient.start 0%, brand.whoWeSupport.bgGradient.end 100%)'
              img={{
                src: applicantsHero,
                alt: 'supported categories tree',
                width: 540,
                height: 298.968
              }}
              title='Our Role'
              link={ABOUT_URL}
            >
              <PageText mb={6}>
                The Ecosystem Support Program (ESP) is an initiative of the Ethereum
                Foundation&apos;s Grant Management team. We provide both financial and
                non-financial support to projects focused on strengthening the Ethereum protocol
                and supporting builders.
              </PageText>
            </HomeAboutCard>
          </section>

          <section id='our-focus'>
            <HomeAboutCard
              bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
              img={{
                src: whatWeSupportTree,
                alt: 'supported categories tree',
                width: 540,
                height: 311.098
              }}
              title='Our Focus'
              link={APPLICANTS_URL}
            >
              <PageText mb={6}>
                We support free and open-source public goods aligned with the{' '}
                <Link
                  href='https://ethereum.foundation/ef-mandate.pdf'
                  isExternal
                  fontWeight={700}
                  color='brand.orange.100'
                  _hover={{ textDecoration: 'none' }}
                >
                  EF Mandate
                </Link>{' '}
                and CROPS principles (Censorship Resistance, Open Source, Privacy, and Security).
                Our focus centers on infrastructure, research, builder tools, and community
                resources that strengthen Ethereum&apos;s protocol and foundations.
              </PageText>
            </HomeAboutCard>
          </section>

          <section id='our-approach'>
            <HomeAboutCard
              bgGradient='linear(to-br, brand.howWeSupport.bgGradient.start 2.29%, brand.howWeSupport.bgGradient.end 101.37%)'
              img={{
                src: howWeSupportRoots,
                alt: 'people making research about supported categories',
                width: 540,
                height: 280.666
              }}
              title='Our Approach'
              link={APPLICANTS_URL}
            >
              <PageText>
                Financial support is offered through our Wishlist and RFPs, which highlight funding opportunities curated by EF teams. Non-financial support is available through Office Hours, where builders can receive direct project feedback and guidance on navigating the Ethereum ecosystem.
              </PageText>
            </HomeAboutCard>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
