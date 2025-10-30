import { Box, Flex, Link, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  List,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  OrderedList,
  ReadyToApply,
  // BannerApplicationClosed
} from '../../components/UI';

import {
  SIDEBAR_DEVCON_GRANTS_LINKS,
  DEVCON_GRANTS_EMAIL_ADDRESS,
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
  return (
    <>
      <PageMetadata
        title='Destino Devconnect Support'
        description=''
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
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              {/* <BannerApplicationClosed mb={12} title="Applications for Destino Devconnect Support are closed." hideDescription /> */}

              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>What is Destino Devconnect Support?</PageSubheading>

                  <PageText mb={6}>
                    Thanks to the incredible LatAm Ethereum communities, we&apos;ve achieved huge regional outreach with a <Link href="https://devconnect.org/destino#events" fontWeight={700} color='brand.orange.100' isExternal>stacked calendar of events</Link> on the road to Devconnect. Now, we&apos;re supporting local builders, organizers, and communities to be part of the first Ethereum World&apos;s Fair in Buenos Aires.
                  </PageText>
                </section>
                
                <PageSection mb={6}>Bring Your Community to the Ethereum World Fair</PageSection>

                <PageText mb={6}>
                You can apply for free tickets and/or voucher codes for discounted tickets to join this special edition! Whether you&apos;re part of a community, representing a university or startup, organizing a side event or hacker house, or bringing your company or study group to the co-work, there&apos;s a way to join the experience
                </PageText>

                <PageSection mb={6}>Become a Devconnect Fren</PageSection>

                <PageText mb={6}>
                Join the Devconnect Frens Program and support the Ethereum World Fair by spreading the word, collaborating with your community, gaining visibility, and connecting with the Ethereum ecosystem! You can get free tickets and discounts for your community or team, visibility across official Devconnect channels, and an on-chain certificate as an official Devconnect Fren. The request for tickets and discounts will be open until tickets are sold out.
                </PageText>
              </Stack>

              <Stack spacing={10}>
                <section id='who' ref={ref2}>
                  <PageSection mb={6}>Who we&apos;re looking for</PageSection>

                  <List>
                    <ListItem>Universities: Invite your university - you can even organize a class or workshop inside La Rural!</ListItem>
                    <ListItem>Startups: Apply with your startup group - we offer large, innovative coworking spaces, including quiet areas and meeting rooms.</ListItem>
                    <ListItem>Communities: Apply with your community to be part of the experience and connect with the Ethereum ecosystem.</ListItem>
                  </List>
                </section>

                <section id='how-to-apply' ref={ref3}>
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
                      with your community initiative idea and detailed support request
                    </ListItem>

                    <ListItem>
                      Once you&apos;ve submitted your application, the Destino Devconnect team will follow up with you via email. Wait to hear back from us regarding your application approval.
                    </ListItem>

                    <ListItem>
                      If approved, we will notify your team via email and provide instructions for the next steps.
                    </ListItem>

                    <ListItem>
                    Once your Devconnect ARG tickets are claimed, please spread the word! Share your{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href={"https://devconnect.org/argentina/ticket/anon/blue/v2u5ta"}
                        _hover={{ textDecoration: 'none' }}
                      >
                        social card
                      </Link>{' '}
                      by replacing “Anon” with your name and tagging @EFDevcon on X and Instagram. 
                    </ListItem>
                  </OrderedList>
                </section>

                <section id='selection-criteria' ref={ref4}>
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

                <section id='next-steps-and-support' ref={ref5}>
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

                <section id='apply' ref={ref6}>
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
