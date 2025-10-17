import {
  Box,
  Flex,
  Grid,
  GridItem,
  ListItem,
  SimpleGrid,
  Stack,
  UnorderedList
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { HomeAboutCard, PageMetadata, PageSection, PageText } from '../components/UI';
import { ButtonLink } from '../components/ButtonLink';

import applicantsHero from '../../public/images/applicants-hero.png';
import smallSucculentSVG from '../../public/images/small-succulent.svg';
import mediumSucculentSVG from '../../public/images/medium-succulent.svg';
import bigSucculentSVG from '../../public/images/big-succulent.svg';
import whatWeSupportTree from '../../public/images/what-we-support-tree.png';
import howWeSupportRoots from '../../public/images/how-we-support-roots.png';
import communityOrganizersVector from '../../public/images/community-organizers-vector.svg';
import otherGrantProgramsVector from '../../public/images/other-grant-programs-vector.svg';
import researchersVector from '../../public/images/researchers-vector.svg';

import { ABOUT_URL, APPLICANTS_URL, FOUNDER_SUCCESS_URL, ENTERPRISE_ACCELERATION_URL, ETHEREUM_EVERYWHERE_URL } from '../constants';

const Home: NextPage = () => {
  const otherSupportCards = [
    {
      title: 'Founders',
      description:
        "Level up your founder journey with access to programs, mentorship, and visibility across the Ethereum ecosystem.",
      ctaLabel: 'Founder Success',
      href: FOUNDER_SUCCESS_URL,
      icon: {
        src: researchersVector,
        alt: 'Illustration representing founder success support'
      }
    },
    {
      title: 'Businesses',
      description:
        'Explore potential pathways and opportunities for businesses and enterprise looking to leverage Ethereum.',
      ctaLabel: 'Enterprise Team',
      href: ENTERPRISE_ACCELERATION_URL,
      icon: {
        src: otherGrantProgramsVector,
        alt: 'Building illustration representing business growth'
      }
    },
    {
      title: 'Community Builders',
      description:
        'Request support for organizing an event or launching a community initiative.',
      ctaLabel: 'Ethereum Everywhere',
      href: ETHEREUM_EVERYWHERE_URL,
      icon: {
        src: communityOrganizersVector,
        alt: 'Community illustration representing collaboration'
      }
    }
  ];

  return (
    <>
      <PageMetadata
        title='Home'
        description='The Ecosystem Support Program provides support to the builders of the Ethereum ecosystem.'
      />

      <Box mx={{ md: 12 }} bg='white' position='relative'>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 9 }} py={{ base: 3, md: 12 }}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Stack mb={{ base: 10, md: 0 }} w={{ md: '100%' }} mr={{ base: 0, md: 12 }}>
              <section id='mission'>
                <PageSection mb={6}>Our Mission</PageSection>

                <PageText fontSize='stats' fontWeight={100} lineHeight='32px'>
                  The Ecosystem Support Program is an ecosystem development cluster within the Ethereum Foundation comprising three teams: Grants Management, Funding Coordination, and Launchpad. Together, we focus on strengthening Ethereum&apos;s foundations, supporting teams across the ecosystem, and enabling future builders.
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
                      alt='small succulent plant representing allocation in 2019'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mr={{ lg: 20, xl: 12 }}>
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
                        136{' '}
                        <PageText as='span' fontSize='stats'>
                          projects
                        </PageText>
                      </PageText>
                    </Box>

                    <PageText fontSize='faq.question' fontWeight={400} mb={1}>
                      $26.9 million
                    </PageText>
                  </Stack>
                </GridItem>
                <GridItem alignSelf='center' justifySelf='center' mr={{ lg: 6, xl: 0, xl2: -16 }}>
                  <Box>
                    <Image
                      src={mediumSucculentSVG}
                      alt='medium succulent plant representing allocation in 2020'
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
                      alt='medium succulent plant representing allocation in 2020'
                    />
                  </Box>
                </GridItem>
                <GridItem alignSelf='center' mb={{ base: 8, lg: 0 }}>
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
              ESP comprises three teams:
              </PageText>
              <UnorderedList>
                <ListItem mb={2}>
                  <PageText>Grants Management: Supporting the strategic allocation of resources to projects that are most critical to Ethereum’s resilience and usability</PageText>
                </ListItem>
                <ListItem mb={2}>
                  <PageText>Funding Coordination: Streamlining access to funding and resources across multiple channels to support impactful projects</PageText>
                </ListItem>
                <ListItem>
                  <PageText>Launchpad: Guiding early-stage organizations in navigating key challenges (e.g. organizational design, financial sustainability, governance)</PageText>
                </ListItem>
              </UnorderedList>
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
                We support free and open-source projects that strengthen Ethereum&apos;s
                foundations, with a particular focus on builder tools, infrastructure, research,
                community resources, and other public goods. Our support is generally directed
                towards builders, rather than end users.
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
                Financial support is offered through our Wishlist and RFPs, which highlight funding opportunities curated by EF teams. Non-financial support is available through Office Hours, where builders can receive project feedback, guidance on navigating the ecosystem, or advice on aligning their project with a Wishlist or RFP item.
              </PageText>
            </HomeAboutCard>
          </section>

          <section id='other-support'>
            <Stack spacing={6}>
              <PageSection textAlign='left'>Other EcoDev Teams</PageSection>

              <PageText>
                Looking for different support? Connect with the team that best matches your next step in the ecosystem.
              </PageText>

              <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={{ base: 6, md: 8 }}>
                {otherSupportCards.map((card) => (
                  <Stack
                    key={card.title}
                    bg='brand.warning'
                    borderRadius='16px'
                    p={{ base: 6, md: 8 }}
                    spacing={5}
                    align='flex-start'
                    height='100%'
                  >
                    <Flex
                      alignItems='center'
                      justifyContent='center'
                      flexWrap={'wrap'}
                      bg='white'
                      borderRadius='12px'
                      p={4}
                      height='80px'
                      width='80px'
                    >
                      <Image src={card.icon.src} alt={card.icon.alt} width={48} height={48} />
                    </Flex>

                    <PageSection as='h4' fontSize='20px' lineHeight='28px' textAlign='left'>
                      {card.title}
                    </PageSection>

                    <PageText flex={1}>{card.description}</PageText>

                    <ButtonLink
                      label={card.ctaLabel}
                      link={card.href}
                      width='fit-content'
                    />
                  </Stack>
                ))}
              </SimpleGrid>
            </Stack>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
