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
  OrderedList,
  ReadyToApply
} from '../../components/UI';

import {
  TEN_YEAR_ANNIVERSARY_URL,
  TEN_YEAR_ANNIVERSARY_APPLY_URL,
  SIDEBAR_TEN_YEAR_ANNIVERSARY_LINKS,
  GRANTS_EMAIL_ADDRESS,
  ACADEMIC_GRANTS_PREVIEW_URL //TODO: Replace with correct image when ready
} from '../../constants';

const TenYearAnniversary: NextPage = () => {
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
        title='10 Years of Ethereum Meetups'
        description='10 Years of Ethereum Meetups are a series of global meetups to celebrate the 10 year anniversary of the Genesis block.'
        image={ACADEMIC_GRANTS_PREVIEW_URL}
      />
      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_TEN_YEAR_ANNIVERSARY_LINKS}
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
                  <PageSubheading mb={8}>
                    What are 10 Years of Ethereum Meetups
                  </PageSubheading>

                  <PageText mb={6}>
                    10 Years of Ethereum Meetups are a series of global meetups to celebrate the 10 year anniversary of the Genesis block.
                  </PageText>

                  <PageText mb={6}>
                    These Meetups can be just a simple get-together to celebrate with your local ethereum community members, or a larger gathering. <strong> These events should take place on July 30, 2025.</strong> They are self-organized and totally independent.
                  </PageText>

                  <PageText mb={6}>
                    To support local community organizers in running these meetups to celebrate, the Ecosystem Support Program will provide funding for meetups around the globe with <strong>up to $500 USD each.</strong>
                  </PageText>

                  <PageText mb={6}>
                    <strong>The deadline to apply for funding is June 15th, 2025.</strong>
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='who-should-apply' ref={ref2}>
                  <PageSection mb={6}>
                    Who should apply?
                  </PageSection>

                  <PageText mb={6}>
                    We want to hear from organizers of:
                  </PageText>

                  <List>
                    <ListItem>Meetups</ListItem>
                    <ListItem>University clubs</ListItem>
                    <ListItem>Grassroots communities</ListItem>
                    <ListItem>Local education initiatives or projects</ListItem>
                  </List>
                </section>

                <section id='eligibility' ref={ref3}>
                  <PageSection mb={6}>
                    Eligibility
                  </PageSection>

                  <PageText mb={6}>
                    To be eligible for support, your event must be:
                  </PageText>

                  <List>
                    <ListItem>Ethereum focused</ListItem>
                    <ListItem>Free to attend</ListItem>
                    <ListItem>Open to anyone</ListItem>
                    <ListItem>Not focused on investment, price or token sales</ListItem>
                    <ListItem>Scheduled for July 30, 2025</ListItem>
                  </List>
                </section>

                <section id='how-to-apply' ref={ref4}>
                  <PageSection mb={6}>
                    How to apply
                  </PageSection>

                  <OrderedList >
                    <ListItem>
                      Submit <Link fontWeight={700} color='brand.orange.100' href={`${TEN_YEAR_ANNIVERSARY_URL}/#apply`}>this form</Link> with your event details and budget requests.
                    </ListItem>
                    <ListItem>
                      Wait to hear back on your application
                    </ListItem>
                    <ListItem mb={6}>
                      Host your event!
                    </ListItem>
                  </OrderedList>

                  <PageText mb={6}>
                    Once you&apos;ve submitted your application, we&apos;ll follow up by email.
                  </PageText>
                </section>

                <section id='selection-criteria' ref={ref5}>
                  <PageSection mb={6}>
                    Selection criteria
                  </PageSection>

                  <List>
                    <ListItem>
                      What is the purpose of the funding request?
                    </ListItem>
                    <ListItem>
                      Does the group have a history of organizing successful events?
                    </ListItem>
                  </List>
                </section>

                <section id='next-steps' ref={ref6}>
                  <PageSection mb={6}>
                    Next steps
                  </PageSection>

                  <PageText mb={6}>
                  For any general support questions about your submission, please email <Link fontWeight={700} color='brand.orange.100' href={`mailto:${GRANTS_EMAIL_ADDRESS}`}>{GRANTS_EMAIL_ADDRESS}</Link>
                  </PageText>
                </section>

                <section id='faq' ref={ref7}>
                  <PageSection mb={6}>
                    Frequently asked questions
                  </PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='Who can submit proposals for a 10 Years of Ethereum Meetup?'>
                      <PageText>
                        Anyone! Events of any size, location, demographic are welcome to apply as long as they meet the application criteria.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What are the requirements or the application?'>
                      <List>
                        <ListItem>
                          Please read the <Link fontWeight={700} color='brand.orange.100' href="#eligibility">eligibility</Link> criteria above to make sure your event is eligible.
                        </ListItem>
                        <ListItem>
                          Events may be held in any language, but we&apos;re currently only able to accept proposals in English.
                        </ListItem>
                        <ListItem>
                          Events must be publicly posted and have a shareable url or meetup link
                        </ListItem>
                      </List>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline, my event is not eligible or I want to request an amount above the limit of this round?'>
                      <PageText>
                        You can always submit an inquiry for sponsorship or other support through the <Link fontWeight={700}
                        color='brand.orange.100' href="https://esp.ethereum.foundation/applicants">Ecosystem Support Program (ESP)</Link>, the EF&apos;s general support initiative.
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>

                <section id='apply' ref={ref8}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${TEN_YEAR_ANNIVERSARY_APPLY_URL}`} />
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

export default TenYearAnniversary;
