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
  BannerApplicationClosed
} from '../../components/UI';

import {
  SIDEBAR_TEN_YEAR_ANNIVERSARY_LINKS,
  GRANTS_EMAIL_ADDRESS,
  TEN_YEAR_ANNIVERSARY_PREVIEW_URL
} from '../../constants';

const TenYearAnniversary: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });

  return (
    <>
      <PageMetadata
        title='10 Years of Ethereum Meetups'
        description='10 Years of Ethereum Meetups are a series of global meetups to celebrate the 10 year anniversary of the Genesis block.'
        image={TEN_YEAR_ANNIVERSARY_PREVIEW_URL}
      />
      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_TEN_YEAR_ANNIVERSARY_LINKS}
              sectionsInView={[inView, inView2, inView3, inView4, inView5, inView6]}
            />
            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <BannerApplicationClosed mb={12} />

              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>What are 10 Years of Ethereum Meetups</PageSubheading>

                  <PageText mb={6}>
                    10 Years of Ethereum Meetups are a series of global meetups to celebrate the 10
                    year anniversary of the Genesis block.
                  </PageText>

                  <PageText mb={6}>
                    These Meetups can be just a simple get-together to celebrate with your local
                    ethereum community members, or a larger gathering.{' '}
                    <strong> These events should take place on July 30, 2025.</strong> They are
                    self-organized and totally independent.
                  </PageText>

                  <PageText mb={6}>
                    To support local community organizers in running these meetups to celebrate, the
                    Ecosystem Support Program will provide funding for meetups around the globe with{' '}
                    <strong>up to $500 USD each.</strong>
                  </PageText>

                  <PageText mb={6}>
                    <strong>The deadline to apply for funding is June 15th, 2025.</strong>
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='who-should-apply' ref={ref2}>
                  <PageSection mb={6}>Who should apply?</PageSection>

                  <PageText mb={6}>We want to hear from organizers of:</PageText>

                  <List>
                    <ListItem>Meetups</ListItem>
                    <ListItem>University clubs</ListItem>
                    <ListItem>Grassroots communities</ListItem>
                    <ListItem>Local education initiatives or projects</ListItem>
                  </List>
                </section>

                <section id='eligibility' ref={ref3}>
                  <PageSection mb={6}>Eligibility</PageSection>

                  <PageText mb={6}>To be eligible for support, your event must be:</PageText>

                  <List>
                    <ListItem>Ethereum focused</ListItem>
                    <ListItem>Free to attend</ListItem>
                    <ListItem>Open to anyone</ListItem>
                    <ListItem>Scheduled for July 30, 2025</ListItem>
                  </List>
                </section>

                <section id='selection-criteria' ref={ref4}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <List>
                    <ListItem>
                      Application is aligned with the focus of this round and meets eligibility
                      criteria.
                    </ListItem>
                    <ListItem>Funding request is within the limits of this round.</ListItem>
                    <ListItem>
                      Applicant has previous experience and/or success organizing Ethereum community
                      events.
                    </ListItem>
                  </List>
                </section>

                <section id='next-steps' ref={ref5}>
                  <PageSection mb={6}>Next steps</PageSection>

                  <PageText mb={6}>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${GRANTS_EMAIL_ADDRESS}`}
                    >
                      {GRANTS_EMAIL_ADDRESS}
                    </Link>
                  </PageText>
                </section>

                <section id='faq' ref={ref6}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='Who can submit proposals for a meetup?'>
                      <PageText>
                        Anyone! Events of any size, location, demographic are welcome to apply as
                        long as they meet the application criteria.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline, my event is not eligible or I want to request an amount above the limit of this round?'>
                      <PageText>
                        You can always submit an inquiry for sponsorship or other support through
                        the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://esp.ethereum.foundation/applicants'
                        >
                          Ecosystem Support Program (ESP)
                        </Link>
                        , the EF&apos;s general support initiative.
                      </PageText>
                    </FAQItem>
                  </Accordion>
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
