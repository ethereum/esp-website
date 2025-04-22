import { Accordion, Box, Flex, Link, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
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
  OrderedList,
  BannerApplicationClosed,
  ReadyToApply
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
        title='Destino Devconnect Grants'
        description='A local grant round to bring Argentina onchain.'
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
                  <PageSubheading mb={8}>What are Destino Devconnect grants?</PageSubheading>

                  <PageText mb={6}>
                    Destino Devconnect is a local grants round focused on supporting events and
                    initiatives that help bring Argentina and the broader Latam region onchain.
                    Grants of up to $1,000 USD are available for impactful efforts that align with
                    this mission.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='who' ref={ref2}>
                  <PageSection mb={6}>Who we&apos;re looking for</PageSection>

                  <PageText mb={6}>We want to hear from:</PageText>

                  <List>
                    <ListItem>Community organizers</ListItem>
                    <ListItem>Educators and workshop hosts</ListItem>
                    <ListItem>University groups or clubs</ListItem>
                    <ListItem>Hackathon or meetup organizers</ListItem>
                    <ListItem>Builders and teams running local initiatives</ListItem>
                    <ListItem>
                      Anyone passionate about Ethereum&apos;s potential in the region
                    </ListItem>
                  </List>
                </section>

                <section id='eligibility' ref={ref3}>
                  <PageSection mb={6}>Eligibility</PageSection>

                  <PageText mb={6}>
                    To be eligible for a Destino Devconnect grant, your event or initiative should:
                  </PageText>

                  <List>
                    <ListItem>Be focused on Ethereum adoption, education, or application</ListItem>
                    <ListItem>Free to attend and open to anyone</ListItem>
                    <ListItem>Not focused on investment, price or token sales</ListItem>
                    <ListItem>Be based in Argentina or the wider Latin American region</ListItem>
                    <ListItem>Events that have already taken place are not eligible</ListItem>
                  </List>
                </section>

                <section id='eligibility' ref={ref3}>
                  <PageSection mb={6}>
                    Some ideas for Destino Devconnect events or initiatives
                  </PageSection>

                  <List>
                    <ListItem>
                      Beginner-friendly meetups to onboard newcomers to Ethereum wallets and apps
                    </ListItem>
                    <ListItem>
                      Workshops or study groups on Ethereum development, privacy, or public goods
                    </ListItem>
                    <ListItem>
                      Local governance experiments or hackathons exploring decentralized
                      decision-making
                    </ListItem>
                    <ListItem>
                      Mentorship sessions connecting experienced devs with newer builders
                    </ListItem>
                    <ListItem>
                      Showcases of local Ethereum projects, use cases, or community tools
                    </ListItem>
                    <ListItem>
                      Collaborations with universities to introduce students to Ethereum
                    </ListItem>
                    <ListItem>
                      Community strategy sessions on how Ethereum can support real needs in your
                      area
                    </ListItem>
                    <ListItem>
                      Creative formats from activations to street pop-ups that help bring Ethereum
                      into the public
                    </ListItem>
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

                    <ListItem>Wait to hear back from the Devconnect team about approval</ListItem>

                    <ListItem>
                      If approved, we will notify your team and send an invoice request for the
                      approved budget
                    </ListItem>

                    <ListItem>Host your event or initiative and document it!</ListItem>

                    <UnorderedList>
                      <ListItem>Take photos of the event showing the number present</ListItem>
                      <ListItem>
                        Get a copy of presentation materials and slides to show the themes discussed
                      </ListItem>
                    </UnorderedList>

                    <ListItem>
                      Follow up with the Devconnect team with a review of the event and the
                      documentation material from #4
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
                      Does the group have a history of organizing successful events or initiatives?
                    </ListItem>
                    <ListItem>What is the purpose of the funding requested?</ListItem>
                    <ListItem>How does the initiative help to bring Argentina onchain?</ListItem>
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
                    <FAQItem question='Who can submit proposals for Destino Devconnect?'>
                      <PageText>
                        Events or initiatives of any size, location, demographic or
                        (Ethereum-related) topic are welcome to apply as long as they meet the{' '}
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
