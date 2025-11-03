import { Box, Center, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import { ButtonLink } from '../../components';
import { ApplicantsSidebar, List, PageSection, PageText, PageMetadata } from '../../components/UI';

import {
  ETHEREUM_GRANTS_URL,
  FUNDING_COORDINATION_EMAIL,
  SIDEBAR_ABOUT_LINKS
} from '../../constants';

import GrantManagementLogo from '../../../public/images/grant-management-logo.png';
import FundingCoordinationLogo from '../../../public/images/funding-coordination-logo.png';

const About = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='About'
        description="We provide support for open source projects that strengthen Ethereum's foundations, with a particular focus on builder tools, infrastructure, research and public goods."
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_ABOUT_LINKS}
            sectionsInView={[inView, inView2, inView3]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack spacing={10}>
              <section id='overview' ref={ref}>
                <PageSection mb={6}>Overview</PageSection>
                <Stack spacing={6}>
                  <PageText>
                    ESP is an ecosystem development cluster within the EF comprising two teams:
                    Grant Management and Funding Coordination.
                  </PageText>
                  <PageText>
                    Together, we focus on strengthening Ethereum&apos;s foundations, supporting
                    teams across the ecosystem, and enabling future builders. The work we support is
                    free, open-source, non-commercial, and designed to create positive sum outcomes
                    for the community.
                  </PageText>
                  <PageText>Learn more about each of our teams below!</PageText>
                </Stack>
              </section>

              <section id='grant-management' ref={ref2}>
                <Stack
                  spacing={6}
                  mt={8}
                  bgGradient='linear(to-br, brand.whoWeSupport.bgGradient.start 0%, brand.whoWeSupport.bgGradient.end 100%)'
                  p={12}
                  borderRadius='10px'
                >
                  <Image
                    src={GrantManagementLogo}
                    alt='Grant Management'
                    height={100}
                    objectFit='contain'
                  />
                  <PageSection>Grant Management</PageSection>
                  <PageText>
                    The Grant Management team focuses on allocating resources to the projects and
                    initiatives that are most critical to Ethereum&apos;s resilience and usability.
                  </PageText>
                  <PageText>
                    This involves coordinating grant-making across EF teams to ensure that support
                    is aligned and impactful. In addition, we support grantees throughout their
                    journey by offering guidance, fostering connections across the ecosystem, and
                    drawing insights from outcomes to guide future efforts.
                  </PageText>
                </Stack>
              </section>

              <section id='funding-coordination' ref={ref3}>
                <Stack
                  spacing={6}
                  mt={8}
                  bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
                  p={12}
                  borderRadius='10px'
                >
                  <Image
                    src={FundingCoordinationLogo}
                    alt='Funding Coordination'
                    height={100}
                    objectFit='contain'
                  />
                  <PageSection>Funding Coordination</PageSection>
                  <PageText>
                    The Funding Coordination team aims to make it simpler and faster for impactful
                    projects to secure funding. Our work is organized around four pillars:
                    facilitating co-funding for EF grantees, securing co-funding for EF initiatives,
                    improving access to funding opportunities throughout the ecosystem, and
                    expanding the overall pool of available funding.
                  </PageText>
                  <PageText>We execute this vision in various ways, including:</PageText>
                  <List>
                    <ListItem>
                      Working with Octant, Gitcoin, ENS DAO, and others to co-curate funding domains
                      and align co-funding opportunities for EF grantees
                    </ListItem>
                    <ListItem>
                      Providing coordination and resource support for EF-led initiatives such as the
                      Proximity Prize, Noir Acceleration, and proactive grants rounds
                    </ListItem>
                    <ListItem>
                      Improving access to information and processes for builders and projects to
                      secure funding from existing grant sources
                    </ListItem>
                    <ListItem>
                      Working with TradFi and compliant DeFi entities to explore crypto-native
                      mechanisms for funding public-interest projects on Ethereum
                    </ListItem>
                  </List>
                  <Center gap={2} flexDirection={{ base: 'column', md: 'row' }}>
                    <ButtonLink
                      label='Get in touch'
                      link={`mailto:${FUNDING_COORDINATION_EMAIL}`}
                      width='fit-content'
                    />
                    <ButtonLink
                      label='Explore our grants directory'
                      width='fit-content'
                      link={ETHEREUM_GRANTS_URL}
                    />
                  </Center>
                </Stack>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default About;
