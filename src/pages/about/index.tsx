import { Box, Center, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import { ButtonLink } from '../../components';
import {
  ApplicantsSidebar,
  List,
  PageSection,
  PageText,
  PageMetadata,
} from '../../components/UI';

import {
  ARGOT_COLLECTIVE_URL,
  ETHEREUM_GRANTS_URL,
  FUNDING_COORDINATION_EMAIL,
  LAUNCHPAD_EMAIL,
  POWDR_LABS_URL,
  REMIX_LABS_URL,
  SIDEBAR_ABOUT_LINKS
} from '../../constants';

import AboutHeroImage from '../../../public/images/about-hero.png';
import ApplicantsHeroImage from '../../../public/images/applicants-hero.png';
import HowWeSupportRootsImage from '../../../public/images/how-we-support-roots.png';

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
                <PageSection mb={6}>Overview</PageSection>
                <Stack
                  spacing={6}
                >
                  <PageText>
                    ESP is an ecosystem development cluster within the EF comprising three teams: Grants Management, Funding Coordination, and Launchpad.
                  </PageText>
                  <PageText>
                    Together, we focus on strengthening Ethereum&apos;s foundations, supporting teams across the ecosystem, and enabling future builders. The work we support is free, open-source, non-commercial, and designed to create positive sum outcomes for the community.
                  </PageText>
                  <PageText>
                    Learn more about each of our teams below!
                  </PageText>
                </Stack>
              </section>

              <section id='grants-management' ref={ref2}>
                <Stack spacing={6}>
                  <Center>
                    <Image src={HowWeSupportRootsImage} alt='Grants Management' width={540} height={298.968} />
                  </Center>
                  <PageSection>Grants Management</PageSection>
                  <PageText>
                    The Grants Management team focuses on allocating resources to the projects and initiatives that are most critical to Ethereum&apos;s resilience and usability. 
                  </PageText>
                  <PageText>
                    This involves coordinating grant-making across EF teams to ensure that support is aligned and impactful. In addition, we support grantees throughout their journey by offering guidance, fostering connections across the ecosystem, and drawing insights from outcomes to guide future efforts.
                  </PageText>
                </Stack>
              </section>

              <section id='funding-coordination' ref={ref3}>
                <Stack spacing={6}>
                  <Center>
                    <Image src={ApplicantsHeroImage} alt='Funding Coordination' width={540} height={298.968} />
                  </Center>
                  <PageSection>Funding Coordination</PageSection>
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
                  <Center gap={2} flexDirection={{ base: 'column', md: 'row' }}>
                    <ButtonLink label='Get in touch' link={FUNDING_COORDINATION_EMAIL} width="fit-content" />
                    <ButtonLink label='Explore our grants directory' width="fit-content" link={ETHEREUM_GRANTS_URL} />
                  </Center>
                </Stack>
              </section>

              <section id='launchpad' ref={ref4}>
                <Stack spacing={6}>
                  <Center>
                    <Image src={AboutHeroImage} alt='Launchpad' width={540} height={298.968} />
                  </Center>
                  <PageSection>Launchpad</PageSection>
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
                  <Center>
                    <ButtonLink label='Get in touch' link={`mailto:${LAUNCHPAD_EMAIL}`} width="fit-content" />
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
