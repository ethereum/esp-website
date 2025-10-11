import { Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { ButtonLink } from '../../components';
import {
  ApplicantsSidebar,
  PageSubheading,
  List,
  PageText,
  PageMetadata,
} from '../../components/UI';

import {
  ARGOT_COLLECTIVE_URL,
  ENTERPRISE_ACCELERATION_URL,
  ETHEREUM_EVERYWHERE_URL,
  ETHEREUM_GRANTS_URL,
  FOUNDER_SUCCESS_URL,
  FUNDING_COORDINATION_EMAIL,
  LAUNCHPAD_EMAIL,
  POWDR_LABS_URL,
  REMIX_LABS_URL,
  SIDEBAR_ABOUT_LINKS
} from '../../constants';

const About = () => {
    // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0, initialInView: false });

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
            sectionsInView={[inView, inView2, inView3, inView4]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack spacing={10}>
              <section id='overview' ref={ref}>
                <PageSubheading mb={6}>Overview</PageSubheading>

                <PageText mb={6}>
                  The Ecosystem Support Program (ESP) is an ecosystem development cluster within the EF comprising three teams: Grants Management, Funding Coordination, and Launchpad. Together, we focus on strengthening Ethereum&apos;s foundations, supporting teams across the ecosystem, and enabling future builders. The work we support is free, open-source, non-commercial, and designed to create positive sum outcomes for the community. Learn more about each of our teams below!
                </PageText>

                <Stack
                  bg='brand.warning'
                  borderRadius='10px'
                  p={6}
                >
                  <PageText>
                    Are you a founder seeking access to programs, mentorship, and visibility across the Ethereum ecosystem? Connect with the <Link href={FOUNDER_SUCCESS_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Founder Success team</Link> to level up your journey. 
                  </PageText>
                  <PageText>
                    Are you leading a business or enterprise looking to leverage Ethereum? Get in touch with the <Link href={ENTERPRISE_ACCELERATION_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Enterprise Acceleration team</Link> to explore potential pathways and opportunities. 
                  </PageText>
                  <PageText>
                    Are you organizing an event or launching a community initiative? Reach out to the <Link href={ETHEREUM_EVERYWHERE_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Ethereum Everywhere team</Link> for support.
                  </PageText>
                </Stack>
              </section>

              <section id='grants-management' ref={ref2}>
                <Stack spacing={6}>
                  <PageSubheading>Grants Management</PageSubheading>
                  <PageText>
                    The Grants Management team focuses on allocating resources to the projects and initiatives that are most critical to Ethereum&apos;s resilience and usability. This involves coordinating grant-making across EF teams to ensure that support is aligned and impactful. In addition, we support grantees throughout their journey by offering guidance, fostering connections across the ecosystem, and drawing insights from outcomes to guide future efforts.
                  </PageText>
                </Stack>
              </section>

              <section id='funding-coordination' ref={ref3}>
                <Stack spacing={6}>
                  <PageSubheading>Funding Coordination</PageSubheading>
                  <PageText>
                    The Funding Coordination team aims to make it simpler and faster for impactful projects to secure funding. Our work is organized around four pillars: facilitating co-funding for EF grantees, securing co-funding for EF initiatives, improving access to funding opportunities throughout the ecosystem, and expanding the overall pool of available funding.
                  </PageText>
                  <PageText>
                    We execute this vision in various ways, including:
                  </PageText>
                  <List>
                    <ListItem>
                      Working with Octant, Gitcoin, ENS DAO, and others to co-curate funding domains and align co-funding opportunities for EF grantees
                    </ListItem>
                    <ListItem>
                      Providing coordination and resource support for EF-led initiatives such as the Proximity Prize, Noir Acceleration, and proactive grants rounds
                    </ListItem>
                    <ListItem>
                      Improving access to information and processes for builders and projects to secure funding from existing grant sources
                    </ListItem>
                    <ListItem>
                      Working with TradFi and compliant DeFi entities to explore crypto-native mechanisms for funding public-interest projects on Ethereum
                    </ListItem>
                  </List>
                  <PageText>Want to learn more about the Funding Coordination team?</PageText>
                  <ButtonLink label='Get in touch' link={FUNDING_COORDINATION_EMAIL} width={"auto"} display={"inline-block"} />
                  <PageText>Looking for more support options?</PageText>
                  <ButtonLink label='Explore our grants directory' width={"auto"} link={ETHEREUM_GRANTS_URL} display={"inline-block"} />
                </Stack>
              </section>

              <section id='launchpad' ref={ref4}>
                <Stack spacing={6}>
                  <PageSubheading>Launchpad</PageSubheading>
                  <PageText>
                    The Launchpad Program supports early-stage organizations in navigating key challenges, including organizational design, identifying paths to financial sustainability, and establishing robust governance. We work with spin-outs from the EF, grantees, and other ecosystem teams that can benefit from this guidance, helping them build strong and impactful organizations.
                  </PageText>
                  <PageText>
                    Think of Launchpad as a sparring partner that helps you get your organization off the ground in multiple different ways:
                  </PageText>
                  <List>
                    <ListItem>
                      <strong>Strategic Guidance</strong> - Best practices and lessons learned from other early-stage organizations in the ecosystem
                    </ListItem>
                    <ListItem>
                      <strong>Operational Toolkit</strong> - Tailored roadmaps, checklists, and other resources that helps facilitate the process of building out a new organization
                    </ListItem>
                    <ListItem>
                      <strong>Hands-on Support</strong> - Direct assistance in critical areas, including strategic vision, governance, hiring, and operational setup.
                    </ListItem>
                  </List>
                  <PageText>
                    We have worked with EF spinouts such as <Link href={ARGOT_COLLECTIVE_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Argot Collective</Link>, <Link href={REMIX_LABS_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Remix Labs</Link> and <Link href={POWDR_LABS_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Powdr Labs</Link>, as well as several EF grantees.
                  </PageText>
                  <PageText>
                    Want to learn more about the Launchpad Program?
                  </PageText>
                  <ButtonLink label='Get in touch' link={`mailto:${LAUNCHPAD_EMAIL}`} width={"auto"} display={"inline-block"} />
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
