import { Box, Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { HomeAboutCard, PageMetadata, PageSection, PageText } from '../components/UI';

import smallSucculentSVG from '../../public/images/small-succulent.svg';
import mediumSucculentSVG from '../../public/images/medium-succulent.svg';
import bigSucculentSVG from '../../public/images/big-succulent.svg';
import whatWeSupportTree from '../../public/images/what-we-support-tree.png';
import whoWeSupportRoots from '../../public/images/who-we-support-roots.png';
import howWeSupportRoots from '../../public/images/how-we-support-roots.png';

import { ABOUT_URL, HOW_WE_SUPPORT_URL, WHO_WE_SUPPORT_URL } from '../constants';

const Home: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Home'
        description='The Ecosystem Support Program provides grants and other support to the builders of the Ethereum ecosystem'
      />

      <Box mx={{ md: 12 }} bg='white' position='relative'>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 9 }} py={{ base: 3, md: 12 }}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Stack mb={{ base: 10, md: 0 }} w={{ md: '100%' }} mr={{ base: 0, md: 12 }}>
              <section id='mission'>
                <PageSection mb={6}>The Ethereum Foundation&apos;s Mission</PageSection>

                <PageText fontSize='stats' fontWeight={100} lineHeight='32px'>
                  Our mission is to do what is best for Ethereum&apos;s long-term success. Our role
                  is to <strong>allocate resources to critical projects</strong>, to be a valued
                  voice within the Ethereum ecosystem, and to advocate for Ethereum to the outside
                  world.
                </PageText>
              </section>
            </Stack>

            <Stack w={{ md: '90%' }} mb={{ md: 8 }}>
              <section id='esp-role'>
                <PageSection mb={6}>Ecosystem Support Program&apos;s Role</PageSection>

                <PageText mb={1}>
                  As the public facing allocation arm of the Ethereum Foundation, ESP provides
                  funding and other forms of support to eligible projects working to improve
                  Ethereum. We focus on work that strengthens Ethereum&apos;s foundations and
                  enables future builders, such as developer tools, research, community building,
                  infrastructure and open standards.
                </PageText>
              </section>
            </Stack>
          </Flex>

          <section id='stats'>
            <Box
              justifyContent='center'
              alignItems='center'
              direction='column'
              bgGradient='linear(to-br, brand.stats.bgGradient.start 2.29%, brand.stats.bgGradient.end 101.37%)'
              borderTop='5px solid'
              borderTopColor='brand.heading'
              borderBottom='5px solid'
              borderBottomColor='brand.heading'
              px={{ base: 2, lg: 20, xl: 10 }}
              pt={7}
            >
              <Grid
                templateColumns={{
                  base: 'repeat(2, auto)',
                  lg: 'repeat(6, auto)',
                  xl: 'repeat(6, 1fr)'
                }}
                rowGap={10}
                justifyContent='space-evenly'
              >
                <GridItem alignSelf='center' justifySelf='center' mr={{ lg: 6, xl: 0, xl2: -20 }}>
                  <Box>
                    <Image
                      src={smallSucculentSVG}
                      alt='small succulent plant representing allocation in 2019'
                      layout='fixed'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mr={{ lg: 20, xl: 12 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2019
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
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
                </GridItem>
                <GridItem alignSelf='center' justifySelf='center' mr={{ lg: 6, xl: 0, xl2: -16 }}>
                  <Box>
                    <Image
                      src={mediumSucculentSVG}
                      alt='medium succulent plant representing allocation in 2020'
                      layout='fixed'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mr={{ lg: 20, xl: 12 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2020
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
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
                      alt='big opened succulent plant representing allocation in 2021'
                      layout='fixed'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mb={{ base: 8, lg: 0 }}>
                  <Stack>
                    <PageSection as='h4' textAlign='left' mb={2}>
                      2021
                    </PageSection>

                    <Box>
                      <PageText
                        fontSize={{ base: 'allocations', md: 'h1' }}
                        fontWeight={200}
                        mb={1}
                      >
                        $26.9{' '}
                        <PageText as='span' fontSize='stats'>
                          million
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      136 projects
                    </PageText>
                  </Stack>
                </GridItem>
              </Grid>

              <Stack mt={{ lg: 7 }}>
                <PageText fontSize='input' textAlign='center' p={4}>
                  * ESP grants and support are not inclusive of all EF allocations
                </PageText>
              </Stack>
            </Box>
          </section>

          <section id='what-we-support'>
            <HomeAboutCard
              bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
              img={{
                src: whatWeSupportTree,
                alt: 'supported categories tree',
                width: 540,
                height: 311.098
              }}
              title='What we support'
              link={ABOUT_URL}
            >
              <PageText mb={6}>
                We award dozens of grants each quarter, across a variety of categories. We support{' '}
                <strong>open source projects</strong> that strengthen Ethereum&apos;s foundations,
                with a particular focus on builder tools, infrastructure, research, community
                resources and other public goods. Funding is generally directed toward supporting
                builders rather than end users.
              </PageText>
            </HomeAboutCard>
          </section>

          <section id='who-we-support'>
            <HomeAboutCard
              bgGradient='linear(to-br, brand.whoWeSupport.bgGradient.start 0%, brand.whoWeSupport.bgGradient.end 100%)'
              img={{
                src: whoWeSupportRoots,
                alt: 'supported categories tree',
                width: 540,
                height: 298.968
              }}
              title='Who We Support'
              link={WHO_WE_SUPPORT_URL}
            >
              <PageText mb={6}>
                Our grantees come from all over the world and represent many different backgrounds,
                disciplines and levels of experience. We have supported individuals and teams of all
                kinds - companies, DAOs, nonprofits, institutions, academics, developers, educators,
                community organizers and more. Learn more and see a list of recent grantees.
              </PageText>
            </HomeAboutCard>
          </section>

          <section id='how-we-support'>
            <HomeAboutCard
              bgGradient='linear(to-br, brand.howWeSupport.bgGradient.start 2.29%, brand.howWeSupport.bgGradient.end 101.37%)'
              img={{
                src: howWeSupportRoots,
                alt: 'people making research about supported categories',
                width: 540,
                height: 280.666
              }}
              title='How We Support'
              link={HOW_WE_SUPPORT_URL}
            >
              <PageText mb={6}>
                We aim to deploy resources, both financial and non-financial, where they will have
                the biggest impact. We try to keep our processes flexible and evolving in order to
                be open to new ideas and support builders of all kinds.
              </PageText>

              <PageText>
                Grants are awarded through a formal application and evaluation process, while our
                office hours are an opportunity to explore a broad range of support through an
                informal conversation with a member of the ESP team, such as project feedback,
                advice, help navigating the ecosystem or guidance on submitting a grant application.
              </PageText>
            </HomeAboutCard>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
