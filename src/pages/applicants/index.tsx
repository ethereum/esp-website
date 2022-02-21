import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';
import Image from 'next/image';

import {
  ApplicantsSidebar,
  ApplicationTypeCard,
  PageMetadata,
  PageSection,
  PageSubheading,
  PageText
} from '../../components/UI';

import softwareDevelopersSVG from '../../../public/images/software-developers-vector.svg';
import researchersSVG from '../../../public/images/researchers-vector.svg';
import academicsSVG from '../../../public/images/academics-vector.svg';
import communityOrganizersSVG from '../../../public/images/community-organizers-vector.svg';
import designersSVG from '../../../public/images/designers-vector.svg';
import otherGrantsProgramsSVG from '../../../public/images/other-grant-programs-vector.svg';

import {
  OFFICE_HOURS_URL,
  PROJECT_GRANTS_URL,
  SIDEBAR_APPLICANTS_LINKS,
  SMALL_GRANTS_URL
} from '../../constants';

const Applicants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Applicants Overview'
        description="Information about the Ecosystem Support Program's mission, scope and types of support we offer for potential grant applicants"
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_APPLICANTS_LINKS}
            sectionsInView={[inView, inView2, inView3]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <PageSubheading mb={6}>ESP Grants and Support Overview</PageSubheading>

              <section id='mission-and-scope' ref={ref}>
                <PageSection mb={6}>Mission and Scope</PageSection>

                <PageText mb={6}>
                  As the public facing allocation arm of the Ethereum Foundation, ESP provides
                  funding and other forms of support to eligible projects working to improve
                  Ethereum. We focus on work that strengthens Ethereum&apos;s foundations and
                  enables future builders, such as open source tooling, building blocks and
                  libraries, research, community building, educational resources, open standards,
                  infrastructure and protocol improvements.
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

                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image src={academicsSVG} alt='Academics vector' height={36} width={40} />
                        </Box>
                        <Flex h='36px' alignItems='center'>
                          <PageText fontWeight={600}>Academics</PageText>
                        </Flex>
                      </Flex>
                    </Stack>

                    <Stack>
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

                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image src={designersSVG} alt='Designers vector' height={38} width={40} />
                        </Box>
                        <Flex h='38px' alignItems='center'>
                          <PageText fontWeight={600}>Designers</PageText>
                        </Flex>
                      </Flex>

                      <Flex>
                        <Box mr={4} flexShrink={0}>
                          <Image
                            src={otherGrantsProgramsSVG}
                            alt='Other grant programs and public goods funding platforms vector'
                            height={40}
                            width={40}
                          />
                        </Box>
                        <Flex h='40px' alignItems='center' maxW={{ base: '235px', md: '275px' }}>
                          <PageText fontWeight={600}>
                            Other grant programs and public goods funding platforms
                          </PageText>
                        </Flex>
                      </Flex>
                    </Stack>
                  </Flex>
                </Center>

                <PageText mb={6}>
                  We don&apos;t often fund dapps or front-end platforms, although this is not a hard
                  rule and there are exceptions - for example, where an application serves as a
                  research or educational tool, or a reference implementation of a new standard.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='how-we-support' ref={ref2}>
                <PageSection mb={6}>How we support</PageSection>

                <PageText mb={6}>
                  Grants are direct funding, awarded following a formal application, evaluation, and
                  input from technical advisors. Grants are not donations or equity investments. We
                  give grants to support recipients in building things that are vital to
                  Ethereum&apos;s success, without the need to commercialize their work, so that
                  these resources remain free and open to all. ESP grants are separated into two
                  categories, small grants and project grants, each with a different process and
                  criteria.
                </PageText>

                <PageText mb={6}>
                  ESP also provides non-financial support. The Ethereum Foundation has many valuable
                  resources in addition to funding: visibility; access to a massive collective
                  knowledge base; a creative and dedicated team; connections to leading developers,
                  researchers and community members. Our goal is to deploy these resources as
                  impactfully as we can. If funding isn&apos;t what&apos;s needed, builders can also
                  book an office hours session for non-financial support such as project feedback or
                  help navigating the Ethereum ecosystem.
                </PageText>
              </section>

              <section id='application-types' ref={ref3}>
                <PageSection mb={6}>Application types</PageSection>

                <PageText mb={6}>
                  There are several ways to request support from ESP. Choose an application type to
                  see which one might be a fit for you and learn more about the process.
                </PageText>

                <PageText mb={6}>
                  Before submitting, please take time to understand the criteria and expectations
                  for each type of application, as well as ESP&apos;s mission and scope in order to
                  make sure you provide the appropriate information and context for us to make an
                  informed decision on how to proceed with your application.
                </PageText>

                <Center>
                  <Stack spacing={4}>
                    <ApplicationTypeCard title='Office Hours' link={OFFICE_HOURS_URL}>
                      Office Hours are a chance to connect directly with a member of the EF&apos;s
                      Ecosystem Support team for support other than funding, including support with
                      the process of submitting a grant application.
                    </ApplicationTypeCard>

                    <ApplicationTypeCard title='Small Grants' link={SMALL_GRANTS_URL}>
                      Small grants, capped at $30,000, have a streamlined application and evaluation
                      process to deliver a decision around two weeks after submission.
                    </ApplicationTypeCard>

                    <ApplicationTypeCard title='Project Grants' link={PROJECT_GRANTS_URL}>
                      Project grants have no specific funding cap, and undergo a more intensive
                      process of review and potentially rescoping. Timelines vary widely depending
                      on scope and complexity.
                    </ApplicationTypeCard>
                  </Stack>
                </Center>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Applicants;
