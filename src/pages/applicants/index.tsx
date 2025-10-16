import { Accordion, Box, Center, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';
import Image from 'next/image';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageMetadata,
  PageSection,
  PageSubheading,
  PageText,
  ProcessStep,
} from '../../components/UI';

import softwareDevelopersSVG from '../../../public/images/software-developers-vector.svg';
import researchersSVG from '../../../public/images/researchers-vector.svg';
import academicsSVG from '../../../public/images/academics-vector.svg';
import communityOrganizersSVG from '../../../public/images/community-organizers-vector.svg';

import {
  ESP_TWITTER_URL,
  ESP_FARCASTER_URL,
  ESP_LENS_URL,
  ESP_BLUESKY_URL,
  FOUNDER_SUCCESS_URL,
  SIDEBAR_APPLICANTS_LINKS,
  ENTERPRISE_ACCELERATION_URL,
  ETHEREUM_EVERYWHERE_URL,
} from '../../constants';

const Applicants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Applicants Overview'
        description="Information about the Ecosystem Support Program's mission, scope, and support we offer."
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_APPLICANTS_LINKS}
            sectionsInView={[inView, inView2, inView3, inView4]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack spacing={10}>
              <section id='mission-and-scope' ref={ref}>
                <PageSubheading mb={6}>Mission and Scope</PageSubheading>
              
                <PageText mb={8}>
                ESP provides financial and/or non-financial support to eligible projects working to improve Ethereum. We focus on work that strengthens Ethereum&apos;s foundations and enables future builders. The work we support is free, open-source, non-commercial, and designed to create positive sum outcomes for the community.
                </PageText>
                <PageText mb={8}>
                Our support is generally directed toward enabling builders rather than end-users: strengthening Ethereum&apos;s infrastructure, expanding the range of tools available to those building on Ethereum, gaining a deeper understanding of cryptographic primitives, growing the builder ecosystem through education and community development, etc. 
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

              <section id="process" ref={ref2}>
                <PageSection mb={6}>Process</PageSection>

                <Stack spacing={3}>
                  <ProcessStep title="Browse">
                    Browse the available Wishlist or RFP items and find one that matches your interests and expertise. Each item includes a detailed description and, when applicable, relevant resources.
                  </ProcessStep>
                  <ProcessStep title="Apply">
                    Submit your application detailing how you plan to address the Wishlist or RFP item. Describe how your background and approach align with the project requirements by providing clear information on your methodology, timeline, and deliverables. Once submitted, you will receive a confirmation email.
                  </ProcessStep>
                  <ProcessStep title="Review">
                    The Grants Management (GM) team reviews applications in collaboration with the EF team responsible for the corresponding Wishlist or RFP item. The evaluation process may include an interview to discuss your proposal in detail, project rescoping, or budget negotiations.
                  </ProcessStep>
                  <ProcessStep title="Decision">
                    You will be notified of funding decisions via email. If your project is selected, we will work closely with you to establish a clear grant structure with milestone-based payments. All grant recipients also complete an onboarding process, involving KYC verification and signing a legal grant agreement. 
                  </ProcessStep>
                  <ProcessStep title="Execute">
                    Begin work on your project with ongoing support from the GM team. You will be paired with a Grant Evaluator for regular check-ins, milestone reviews, and support as you progress.
                  </ProcessStep>
                  <ProcessStep title="Complete" isLastStep>
                    Once the scope of work is completed, you will share the results publicly in a report or post.
                  </ProcessStep>
                </Stack>
              </section>

              <section id="selection-criteria" ref={ref3}>
                <PageSection mb={6}>Selection criteria</PageSection>

                <PageText mb={6}>
                  Applications are evaluated based on several key factors, such as:
                </PageText>

                <List>
                  <ListItem>
                    <strong>Technical approach</strong>: Soundness, feasibility, and clarity of your proposed methodology and implementation plan
                  </ListItem>
                  <ListItem>
                    <strong>Ecosystem impact</strong>: Potential benefit to the Ethereum community and alignment with ecosystem priorities
                  </ListItem>
                  <ListItem>
                    <strong>Open source</strong>: All outputs must be open-source or otherwise freely available; for-profit companies are welcome to apply, but the specific grant-funded work must be open-source and accessible to the community
                  </ListItem>
                  <ListItem>
                    <strong>Budget</strong>: Cost-effectiveness and appropriate allocation of resources; since we are offering non-dilutive capital, we generally anticipate some flexibility below standard market rates
                  </ListItem>
                  <ListItem>
                    <strong>Experience</strong>: Relevant background, skills, and prior work that demonstrate capability
                  </ListItem>
                  <ListItem>
                    <strong>Alignment</strong>: Understanding of Ethereum&apos;s values and ecosystem needs, and how your work contributes to them
                  </ListItem>
                </List>
              </section>

              <section id="faq" ref={ref4}>
                <PageSection mb={6}>FAQ</PageSection>

                <Accordion allowToggle>
                  <FAQItem question="What&apos;s the difference between Wishlist and RFP items?">
                    <PageText>
                      Wishlist items identify key gaps and opportunities within the ecosystem. Instead of prescribing specific approaches, it invites builders to propose ideas and initiatives that address these priorities. On the other hand, RFP items define focused problems and invites applicants to propose solutions. They are more prescriptive and time-bound than Wishlist items, focusing on a clear deliverable or outcome to be achieved.
                    </PageText>
                  </FAQItem>
                  <FAQItem question="Can I apply for multiple Wishlist or RFP items simultaneously?">
                    <PageText>
                      You can apply for multiple items, but we recommend focusing on those that best match your expertise. If applying for multiple items, please submit separate applications for each.
                    </PageText>
                  </FAQItem>
                  <FAQItem question="How long does the evaluation process take?">
                    <PageText>
                      After submitting your application, you will receive a confirmation email. Most applications are reviewed within 3-6 weeks, though the exact timeline may vary depending on the complexity of the Wishlist or RFP item and the details of the application.
                    </PageText>
                  </FAQItem>
                  <FAQItem question="How often are new Wishlist or RFP items added?">
                    <PageText>
                      Items are added based on the evolving needs and strategic priorities of the Ethereum ecosystem. To stay up to date, follow ESP on <Link href={ESP_TWITTER_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>X (Twitter)</Link>, <Link href={ESP_FARCASTER_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Farcaster</Link>, <Link href={ESP_LENS_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Lens</Link>, or <Link href={ESP_BLUESKY_URL} fontWeight={700} color='brand.orange.100' isExternal _hover={{ textDecoration: 'none' }}>Bluesky</Link>, or check back periodically for updates on new opportunities.
                    </PageText>
                  </FAQItem>
                  <FAQItem question="What is the typical funding range for a grant awarded through the Wishlist or RFP?">
                    <PageText>
                      Grant funding is determined based on the scope and complexity of the proposal, unless otherwise specified in the posted Wishlist or RFP item. Where applicable, RFPs may include budget guidance estimates. The GM team will work with applicants to determine final grant amounts. 
                    </PageText>
                  </FAQItem>
                </Accordion>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Applicants;
