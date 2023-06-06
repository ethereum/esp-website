import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  ReadyToApply,
  OrderedList
} from '../../components/UI';

import {
  SIDEBAR_DEVCON_GRANTS_LINKS,
  DEVCON_GRANTS_EMAIL_ADDRESS,
  APPLICANTS_URL,
  DEVCON_GRANTS_APPLY_URL,
  ACADEMIC_GRANTS_PREVIEW_URL
} from '../../constants';

const DevconGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.3, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Join the Road to Devcon'
        description='To promote education around Ethereum in Southeast Asia along the Road to Devcon, we would like to offer support (both monetary and otherwise) to meetups, events, and other educational initiatives happening within the SEA region before Devcon 7.'
        image={ACADEMIC_GRANTS_PREVIEW_URL}
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_DEVCON_GRANTS_LINKS}
              sectionsInView={[
                inView,
                inView2,
                inView3,
                inView4,
                inView5,
                inView6,
                inView7,
                inView8
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>Join the Road to Devcon</PageSubheading>

                  <PageText mb={6}>Calling all community organizers!</PageText>

                  <PageText mb={6}>
                    We are excited to announce that we will be launching a funding round to support
                    and empower the Ethereum community in Southeast Asia. Inspired by the
                    involvement of the flourishing Latin American Ethereum community at Devcon VI in
                    Bogotá, we aim to create a similar impact in Southeast Asia with the Road to
                    Devcon 7.
                  </PageText>

                  <PageText mb={6}>
                    One of the reasons we plan to{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://blog.ethereum.org/2023/02/28/devcon-7-update'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      organize Devcon in 2024 instead of 2023
                    </Link>{' '}
                    is to give more time for your local communities to grow and blossom. We want to
                    help new grassroots communities sprout up{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://www.youtube.com/watch?v=2_9YoS_1ut4'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      in the infinite garden
                    </Link>
                    . Let&apos;s see what kind of magic you can create!
                  </PageText>

                  <PageText>
                    In collaboration with the Ecosystem Support team, this funding round will be a
                    wave of small sponsorships to help cover costs incurred in organizing
                    small-scale events, such as local meetups or topical workshops, and other local
                    educational initiatives.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='who' ref={ref2}>
                  <PageSection mb={6}>Who</PageSection>

                  <PageText mb={6}>We want to hear from organizers of:</PageText>

                  <List>
                    <ListItem>Meetups</ListItem>
                    <ListItem>University clubs</ListItem>
                    <ListItem>Workshops</ListItem>
                    <ListItem>Hackathons</ListItem>
                    <ListItem>Grassroots communities</ListItem>
                    <ListItem>Local education initiatives or projects</ListItem>
                  </List>

                  <PageText mt={6}>
                    Other community efforts - creative formats are welcome to apply!
                  </PageText>
                </section>

                <section id='eligibility' ref={ref3}>
                  <PageSection mb={6}>Eligibility</PageSection>

                  <PageText mb={6}>To be eligible for a grant, your event should be:</PageText>

                  <List>
                    <ListItem>Ethereum focused</ListItem>
                    <ListItem>Free to attend</ListItem>
                    <ListItem>Open to anyone</ListItem>
                    <ListItem>Not focused on investment, price or token sales</ListItem>
                    <ListItem>Events that have already taken place are not eligible</ListItem>
                    <ListItem>Focused in Southeast Asia (or nearby regions)</ListItem>
                  </List>
                </section>

                <section id='how-to-apply' ref={ref4}>
                  <PageSection mb={6}>How to apply</PageSection>

                  <OrderedList>
                    <ListItem>
                      Submit{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href={DEVCON_GRANTS_APPLY_URL}
                        _hover={{ textDecoration: 'none' }}
                      >
                        this form
                      </Link>{' '}
                      with your event idea and detailed budget request
                    </ListItem>
                    <ListItem>
                      Wait to hear back from the Devcon team about event and budget approval
                    </ListItem>
                    <ListItem>
                      If approved, host your event, including Road to Devcon branding, and document
                      it:
                    </ListItem>

                    <OrderedList>
                      <ListItem>Take photos of the event showing the number present</ListItem>
                      <ListItem>
                        Get a copy of presentation materials and slides to show the themes discussed
                      </ListItem>
                    </OrderedList>

                    <ListItem>
                      Follow up with the Devcon team with a review of the event and the
                      documentation material from #3
                    </ListItem>
                    <ListItem>
                      The Devcon team will reimburse based on the pre-approved budget
                    </ListItem>
                  </OrderedList>

                  <PageText mt={6}>
                    Once you&apos;ve submitted your application, we&apos;ll follow up by email.
                  </PageText>
                </section>

                <section id='selection-criteria' ref={ref5}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <List>
                    <ListItem>
                      How big is the audience / how many people will the event reach?
                    </ListItem>
                    <ListItem>How does the plan aim to publicize and expand reach?</ListItem>
                    <ListItem>
                      Does the group have a history of organizing successful events?
                    </ListItem>
                    <ListItem>What is the purpose of the funding requested?</ListItem>
                  </List>
                </section>

                <section id='next-steps-and-support' ref={ref6}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${DEVCON_GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {DEVCON_GRANTS_EMAIL_ADDRESS}
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='faq' ref={ref7}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='Who can submit proposals for Road to Devcon Meetup and Event Grants?'>
                      <PageText>
                        Events of any size, location, demographic or (Ethereum-related) topic are
                        welcome to apply as long as they meet the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='#eligibility'
                          _hover={{ textDecoration: 'none' }}
                        >
                          application criteria
                        </Link>
                        .
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What are the requirements for the application?'>
                      <List>
                        <ListItem>
                          Please read{' '}
                          <Link
                            fontWeight={700}
                            color='brand.orange.100'
                            href='#eligibility'
                            _hover={{ textDecoration: 'none' }}
                          >
                            eligibility
                          </Link>{' '}
                          criteria above to make sure your event is eligible
                        </ListItem>
                        <ListItem>
                          Events may be held in any language, but we&apos;re currently only able to
                          accept proposals in English.
                        </ListItem>
                        <ListItem>Events must be publicly posted</ListItem>
                      </List>
                    </FAQItem>

                    <FAQItem question='What stage of planning should I be in?'>
                      <PageText>
                        Your event should have a confirmed date. Other than that, any stage of
                        planning is fine!
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline, my event is not eligible or I want to request an amount above the limit for this round?'>
                      <PageText>
                        You can always submit an inquiry for sponsorship or other support through
                        the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={APPLICANTS_URL}
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ecosystem Support Program (ESP)
                        </Link>
                        , the EF&apos;s general support initiative.
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>

                <section id='apply' ref={ref8}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${DEVCON_GRANTS_APPLY_URL}`} />
                  </Stack>
                </section>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default DevconGrants;
