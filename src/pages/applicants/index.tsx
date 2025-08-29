import { Box, Center, Flex, Link, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';
import Image from 'next/image';

import {
  ApplicantsSidebar,
  PageMetadata,
  PageSection,
  PageSubheading,
  PageText
} from '../../components/UI';

import softwareDevelopersSVG from '../../../public/images/software-developers-vector.svg';
import researchersSVG from '../../../public/images/researchers-vector.svg';
import academicsSVG from '../../../public/images/academics-vector.svg';
import communityOrganizersSVG from '../../../public/images/community-organizers-vector.svg';

import { SIDEBAR_APPLICANTS_LINKS } from '../../constants';

const Applicants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Applicants Overview'
        description="Information about the Ecosystem Support Program's mission, scope and types of support we offer for potential grant applicants."
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_APPLICANTS_LINKS}
            sectionsInView={[inView, inView2]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <PageSubheading mb={6}>ESP Support Overview</PageSubheading>

              <section id='mission-and-scope' ref={ref}>
                <PageSection mb={6}>Mission and Scope</PageSection>
                <PageText mb={6}>
                  ESP is in the process of refining our priorities and approach, aligning with the
                  Ethereum Foundation&apos;s updated{' '}
                  <Link
                    fontWeight={700}
                    color='brand.orange.100'
                    href='https://blog.ethereum.org/2025/07/10/future-of-ecodev'
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                  >
                    ecosystem development strategy
                  </Link>
                  . Learn more in our{' '}
                  <Link
                    fontWeight={700}
                    color='brand.orange.100'
                    href='https://blog.ethereum.org/2025/08/29/esp-next-chapter'
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                  >
                    blog post
                  </Link>{' '}
                  and stay tuned for news on ESP&apos;s revised strategy, coming Q4 2025!
                </PageText>

                <PageText mb={8}>
                  ESP provides support to eligible projects working to improve Ethereum. We focus on
                  work that strengthens Ethereum&apos;s foundations and enables future builders,
                  such as open-source tooling, building blocks and libraries, research, community
                  building, educational resources, open standards, infrastructure, and protocol
                  improvements.
                </PageText>
                <PageText mb={8}>
                  ESP support is generally directed toward enabling builders rather than end-users:
                  strengthening Ethereum&apos;s infrastructure, expanding the range of tools
                  available to those building on Ethereum, gaining a deeper understanding of
                  cryptographic primitives, and growing the builder ecosystem through education and
                  community development. We&apos;re open to supporting work from people and teams of
                  all kinds.
                </PageText>
                <Center mb={12}>
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Stack mr={{ base: 0, md: 10 }} mb={{ base: 2, md: 0 }}>
                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image
                            src={softwareDevelopersSVG}
                            alt='Software and protocol developers vector'
                            height={37}
                            width={40}
                          />
                        </Box>
                        <Flex h='37px' alignItems='center'>
                          <PageText fontWeight={600}>Software and protocol developers</PageText>
                        </Flex>
                      </Flex>

                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image
                            src={researchersSVG}
                            alt='Researchers vector'
                            height={40}
                            width={40}
                          />
                        </Box>
                        <Flex h='40px' alignItems='center'>
                          <PageText fontWeight={600}>Researchers</PageText>
                        </Flex>
                      </Flex>
                    </Stack>

                    <Stack>
                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image src={academicsSVG} alt='Academics vector' height={36} width={40} />
                        </Box>
                        <Flex h='36px' alignItems='center'>
                          <PageText fontWeight={600}>Academics</PageText>
                        </Flex>
                      </Flex>

                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image
                            src={communityOrganizersSVG}
                            alt='Community organizers vector'
                            height={36}
                            width={40}
                          />
                        </Box>
                        <Flex h='36px' alignItems='center'>
                          <PageText fontWeight={600}>Community organizers</PageText>
                        </Flex>
                      </Flex>
                    </Stack>
                  </Flex>
                </Center>
                <PageText mb={6}>
                  We don&apos;t often support dapps or front-end platforms, although this is not a
                  hard rule and there are exceptions—for example, where an application serves as a
                  research or educational tool, or a reference implementation of a new standard.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='how-we-support' ref={ref2}>
                <PageSection mb={6}>How we support</PageSection>

                <PageText mb={6}>
                  The Ethereum Foundation has many valuable resources: visibility, access to a
                  massive collective knowledge base, a creative and dedicated team, along with
                  connections to leading developers, researchers, and community members. Our goal is
                  to make the most meaningful use of these resources. Builders can book an Office
                  Hours session for non-financial support such as project feedback, advice, or help
                  navigating the ecosystem.
                </PageText>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Applicants;
