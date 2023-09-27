import { Accordion, Box, Flex, Link, ListItem, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageMetadata,
  PageSection,
  PageText,
  ReadyToApply
} from '../../components/UI';

import {
  DATA_COLLECTION_APPLY_URL,
  SIDEBAR_DATA_COLLECTION_GRANTS_LINKS,
  GRANTS_EMAIL_ADDRESS,
  DATA_COLLECTION_GRANTS_PREVIEW_URL
} from '../../constants';

const DataCollectionGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });
  const [ref9, inView9] = useInView({ threshold: 0.5, initialInView: false });
  const [ref10, inView10] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Data Collection Grants 2023'
        description='To promote public goods and infrastructure for Data collection and analysis in the Ethereum Ecosystem'
        image={DATA_COLLECTION_GRANTS_PREVIEW_URL}
      />

      <Box bg='white' position='relative'>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={12}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_DATA_COLLECTION_GRANTS_LINKS}
              sectionsInView={[
                inView2,
                inView3,
                inView4,
                inView5,
                inView6,
                inView7,
                inView8,
                inView9,
                inView10
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack spacing={10}>
                <section id='introduction' ref={ref2}>
                  <PageSection mb={6}>Introduction</PageSection>

                  <PageText mb={6}>
                    The Ecosystem Support Program is launching this grants initiative to encourage
                    research and development around data collection and visualization of the
                    Ethereum network. We are looking for builders to work on testnets, data
                    collection and XATU. The Ethereum ecosystem needs more free and open source
                    infrastructure for researchers, developers, and data analysts—read below and
                    apply!
                  </PageText>
                </section>

                <section id='ideas' ref={ref3}>
                  <PageSection mb={6}>Ideas</PageSection>

                  <PageText mb={6}>
                    Testnets: Updated homepages, fork monitors, and DVT Testing
                  </PageText>

                  <PageText mb={6}>
                    Data Collection: Improved indexing, anonymous data collection, and standardized
                    data models
                  </PageText>

                  <PageText mb={6}>
                    XATU: Plugins and visuals for the existing data pipeline
                  </PageText>

                  <PageText mb={6}>
                    Full wishlist{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@drigolvc/DataCollectionWishlist'
                      isExternal
                    >
                      here
                    </Link>
                  </PageText>
                </section>

                <section id='submit-proposal' ref={ref4}>
                  <PageSection mb={6}>Submit a proposal</PageSection>

                  <List mb={6}>
                    <ListItem>You must submit a written proposal in pdf format</ListItem>
                    <List>
                      <ListItem>Proposals must be in English</ListItem>
                      <ListItem>
                        Here is a{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://notes.ethereum.org/@drigolvc/Grant_Proposal_template'
                          isExternal
                        >
                          template
                        </Link>{' '}
                        for a proposal
                      </ListItem>
                      <ListItem>If published work, it must be accessible by a URL</ListItem>
                    </List>
                    <ListItem>Ideas and projects at any stage of development are welcome:</ListItem>
                    <List>
                      <ListItem>Idea phase</ListItem>
                      <ListItem>Proof-of-concept</ListItem>
                      <ListItem>Work in progress</ListItem>
                      <ListItem>Fleshed out project</ListItem>
                    </List>
                    <ListItem>
                      Grants are decided on a case-by-case basis, and you may enter more than one
                      proposal! So long as each proposal is unique and meets the requirements
                    </ListItem>
                    <ListItem>We may contact you to discuss the project in more detail</ListItem>
                  </List>
                </section>

                <section>
                  <PageText mb={6}>
                    <Text as='strong'>Deadline</Text>
                  </PageText>

                  <PageText mb={6}>
                    The grant application window opens for <Text as='strong'>4 weeks</Text> from{' '}
                    <Text as='strong'>September 25th, 2023</Text> and closes on{' '}
                    <Text as='strong'>October 23rd, 2023</Text>.
                  </PageText>

                  <Stack mt={6}>
                    <ReadyToApply link={`${DATA_COLLECTION_APPLY_URL}`} />
                  </Stack>
                </section>

                <section id='eligibility-criteria' ref={ref5}>
                  <PageSection mb={6}>Eligibility Criteria</PageSection>

                  <List>
                    <ListItem>Individuals, teams or organizations</ListItem>
                    <ListItem>
                      Newcomers to Ethereum, established projects, past grantees or applicants
                    </ListItem>
                    <ListItem>
                      Any area of expertise - we work with developers, researchers, academics,
                      designers, educators, communicators, community organizers, and more
                    </ListItem>
                    <ListItem>
                      Projects at any point in the development process: just an idea, early stages,
                      proof of concept, or with significant progress already made. However, we do
                      not fund past work
                    </ListItem>
                    <ListItem>Builders of any age, origin, identity or background</ListItem>
                  </List>
                </section>

                <section id='what-is-not-eligible' ref={ref6}>
                  <PageSection mb={6}>What is NOT eligible</PageSection>

                  <List>
                    <ListItem>
                      Anything that is not legal within the jurisdiction where the work is taking
                      place
                    </ListItem>
                    <ListItem>
                      Financial products (trading, investment products, lending, betting, etc)
                    </ListItem>
                    <ListItem>
                      Projects with a planned token launch or public funding round
                    </ListItem>
                    <ListItem>Art projects or charities that don’t fit within our scope</ListItem>
                  </List>
                </section>

                <section id='selection-criteria' ref={ref7}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <PageText mb={6}>
                    A few selection criteria considerations (depending on the submission type, some
                    criteria might not be applicable):
                  </PageText>

                  <List>
                    <ListItem>Potential impact on the Ethereum data ecosystem</ListItem>
                    <ListItem>Relevant team experience for the project</ListItem>
                    <ListItem>Clarity, conciseness and organization of proposal</ListItem>
                    <ListItem>Detailed budget and timeline</ListItem>
                    <ListItem>Alignment with grants round goals and stated wishlist</ListItem>
                  </List>
                </section>

                <section id='next-steps-and-support' ref={ref8}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {GRANTS_EMAIL_ADDRESS}
                    </Link>
                  </PageText>
                </section>

                <section id='faq' ref={ref9}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='When can I expect to hear back?'>
                      <PageText>
                        Projects will be evaluated after submissions are complete, evaluations will
                        take 6-8 weeks after the deadline.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What makes a good proposal?'>
                      <PageText>
                        In short, we need enough information to understand your objectives, the
                        problem you’re aiming to tackle, the output, information on previous
                        research work, who’s involved and estimation regarding time and budget.
                      </PageText>

                      <PageText>
                        The more details you provide, the more likely we’ll be able to help.
                      </PageText>

                      <PageText>
                        For example - what could be included in the grant proposal:
                      </PageText>

                      <Box>
                        <List>
                          <ListItem>
                            Clearly showing the research area that you’re digging into
                          </ListItem>
                          <ListItem>Outlining the output</ListItem>
                          <ListItem>
                            Clearly state the impact your research will have and how you foresee
                            your findings being used by the Ethereum community
                          </ListItem>
                          <ListItem>
                            A detailed description of your project, milestones, the people involved
                            and how much time you think it will take to complete with a budget
                          </ListItem>
                        </List>
                      </Box>

                      <PageText>
                        Here is a{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://notes.ethereum.org/@drigolvc/Grant_Proposal_template'
                          isExternal
                        >
                          template
                        </Link>{' '}
                        for a proposal.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline?'>
                      <PageText>
                        The Ethereum Foundation has a general grants initiative called the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://esp.ethereum.foundation/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ecosystem Support Program (ESP)
                        </Link>
                        .
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>

                <section id='apply' ref={ref10}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${DATA_COLLECTION_APPLY_URL}`} />
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

export default DataCollectionGrants;
