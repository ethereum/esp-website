// Libraries
import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

// Components
import {
  ApplicantsSidebar,
  List,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  ReadyToApply,
  FAQItem
} from '../../components/UI';

// Constants
import {
  LAYER_2_GRANTS_APPLY_URL,
  LAYER_2_GRANTS_EMAIL_ADDRESS,
  SIDEBAR_LAYER_2_GRANTS_LINKS,
  LAYER_2_GRANTS_PREVIEW_URL
} from '../../constants';
import { ButtonLink } from '../../components';

const Layer2Grants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Layer 2 Community Grants 2022'
        description='The Ethereum Foundation sponsors grants to support layer2 applications, analytics and education.'
        image={LAYER_2_GRANTS_PREVIEW_URL}
      />
      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_LAYER_2_GRANTS_LINKS}
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
                  <PageSubheading mb={8}>Layer 2 Community Grants 2022</PageSubheading>

                  <PageText mb={6} fontStyle='italic'>
                    The Ethereum Foundation sponsors grants to support layer2 applications,
                    analytics and education. Rollups are layer 2 scaling solutions for Ethereum
                    without compromising on security or decentralization. This grants round has up
                    to $750,000 in total available.
                  </PageText>

                  <PageText mb={6} fontStyle='italic'>
                    Proposals are due in 6 weeks from <strong>TBD</strong>.
                  </PageText>

                  <PageText mb={6} fontStyle='italic'>
                    All of the details you’ll need to apply can be found below.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='introduction' ref={ref2}>
                  <PageSection mb={6}>Introduction</PageSection>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        The Ethereum Foundation is launching a grants initiative to encourage
                        research and development around layer2 applications and education from
                        researching L2 metrics, multi-layer block explorer, compression for rollups,
                        and educating more users on L2.
                      </ListItem>
                      <ListItem>
                        Layer2 continues to grow rapidly, and the ecosystem needs more builders -
                        Read below and apply (all genuine applications are reviewed and replied to
                        with feedback).
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack>
                <section id='ideas' ref={ref3}>
                  <PageSection mb={6}>Ideas</PageSection>

                  <PageText mb={6} fontWeight='bold'>
                    Surprise us with your creativity! But here are a few ideas to kickstart your
                    imagination:
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>An open-source block explorer that supports all rollups</ListItem>
                      <ListItem>Better compression for rollups</ListItem>
                      <ListItem>
                        Research and define metrics for better understanding and comparing L2
                        activity -- e.g. transactions, TVL, etc
                      </ListItem>
                      <ListItem>
                        Check out a full list{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://https://hackmd.io/@BcrNKqoOR1OZEFsNu7su9w/SkdvCP7zs'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          here
                        </Link>
                      </ListItem>
                      <ListItem>
                        The goal of this grant round is to foster a community that builds
                        applications, analytics and education
                      </ListItem>
                      <List>
                        <ListItem>
                          Anyone passionate about building layer2 applications and tools
                        </ListItem>
                        <ListItem>
                          This is especially a good opportunity for builders that want to learn more
                          about zero-knowledge applications
                        </ListItem>
                        <ListItem>Worldwide applications encouraged</ListItem>
                        <ListItem>This is open to both individuals and teams</ListItem>
                        <ListItem>
                          For-profit companies can apply, although the work for the grant must be
                          open source, freely accessible and non-commercial
                        </ListItem>
                      </List>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='wishlist' ref={ref4}>
                  <PageSection mb={6}>Wishlist</PageSection>

                  <PageText mb={6}>
                    The Ethereum Foundation is interested in the following things, but don’t let
                    this restrict your creativity.
                  </PageText>

                  <PageText mb={6}>
                    💡 A lot of the below comes from James (non-technical) however, I have included
                    it in case it sparks a thought that might be worth including.{' '}
                    <strong>Please cross out if not relevant or add where necessary.</strong>
                  </PageText>

                  <PageText mb={6}>💡 Some of the below is intentionally broad.</PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        R&D aimed toward cross-rollup transaction execution (both synchronous and
                        asynchronous)
                      </ListItem>
                      <ListItem>Develop technical wallet standards to aid L2 support</ListItem>
                      <ListItem>
                        New transaction abstraction and aggregation techniques, i.e. allow using BLS
                        or another crypto instead of ECDSA
                      </ListItem>
                      <ListItem>Research solutions around liquidity fragmentation on L2s</ListItem>
                      <ListItem>Research on trustless bridging techniques</ListItem>
                      <ListItem>
                        Research and define metrics for better understanding and comparing L2
                        activity – e.g. transactions, TVL, etc
                      </ListItem>
                      <ListItem>
                        Research and define security metrics to help users compare L2’s
                      </ListItem>
                      <ListItem>Better compression for rollups</ListItem>
                      <ListItem>Ideas around Account Abstraction</ListItem>
                      <ListItem>Cross-chain MEV</ListItem>
                      <ListItem>Enabling new EVM functionality on L2s prior to L1</ListItem>
                      <ListItem>Layer 2 Light clients</ListItem>
                      <ListItem>Hardware/infrastructure design for ZK efficiency</ListItem>
                    </List>
                  </Box>

                  <PageText mb={6} fontWeight='bold'>
                    Analytics
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>Status dashboards to monitor network health</ListItem>
                      <ListItem>
                        Develop and Design an Ethereum panel/explorer (main chain and all chains
                        “secured by Ethereum”)
                      </ListItem>
                      <ListItem>
                        Analytics Dashboard that can provide useful data insights on layer2’s
                      </ListItem>
                      <ListItem>
                        Data visualization can help people understand different layer2 aspects (gas
                        costs, security, potential savings over a longer timeframe etc.)
                      </ListItem>
                      <ListItem>
                        An open-source block explorer that supports all rollups (the ability to
                        drill into the data would be a plus)
                      </ListItem>
                      <ListItem>
                        Research and analysis of L2 activity providing novel insights
                      </ListItem>
                    </List>
                  </Box>

                  <PageText mb={6} fontWeight='bold'>
                    Education
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>Educational content to help new and existing users</ListItem>
                      <ListItem>
                        Create educational material for potential coordinators and verifiers
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='deadline' ref={ref4}>
                  <PageSection mb={6}>Deadline</PageSection>

                  <PageText mb={6}>
                    The grant application window opens for <strong>6 weeks</strong> from{' '}
                    <strong>October 31st, 2022</strong> and closes on{' '}
                    <strong>December 5th, 2022</strong>
                  </PageText>

                  <Box mb={6}>
                    <ButtonLink
                      label='Submit application'
                      link={LAYER_2_GRANTS_APPLY_URL}
                      width='225px'
                    />
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='submit-proposal' ref={ref4}>
                  <PageSection mb={6}>Submit a proposal at any stage of your project</PageSection>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        Ideas and projects at any stage of development are welcome:
                      </ListItem>
                      <ListItem>Idea phase</ListItem>
                      <ListItem>Proof-of-concept</ListItem>
                      <ListItem>Work in progress</ListItem>
                      <ListItem>Fleshed out project</ListItem>
                      <ListItem>
                        Grants are decided case-by-case basis, and you may enter more than one
                        proposal! So long as each proposal is unique and meets the requirements
                      </ListItem>
                      <ListItem>We may contact you to discuss the project in more detail</ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='requirements' ref={ref5}>
                  <PageSection mb={6}>Requirements</PageSection>

                  <Box mb={6}>
                    <List>
                      <ListItem>Proposals must be in English</ListItem>
                      <ListItem>
                        Work must be open source with a free and permissive license
                      </ListItem>
                      <ListItem>If published work, it must be accessible by a URL</ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='selection-criteria' ref={ref6}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <PageText mb={6}>
                    A few selection criteria considerations (depending on the submission type, some
                    criteria might not be applicable):
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>Potential impact on the Layer2 ecosystem</ListItem>
                      <ListItem>Relevant team experience for the project</ListItem>
                      <ListItem>Clarity, conciseness and organization of documentation</ListItem>
                      <ListItem>Timeline of project</ListItem>
                    </List>
                  </Box>

                  <PageText mb={6}>Next steps and support</PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        For general support questions about your submission, please email{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={`mailto:${LAYER_2_GRANTS_EMAIL_ADDRESS}`}
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          {LAYER_2_GRANTS_EMAIL_ADDRESS}
                        </Link>
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='faq' ref={ref7}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='What is the budget available for this round?'>
                      <PageText>
                        This grants round has up to $750,000 in total, which is to be distributed
                        among selected projects.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='When can I expect to hear back?'>
                      <PageText>
                        Project submissions will be evaluated on a rolling basis, and contact will
                        be made with each applicant to inform them about the evaluation outcome.
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
                            Clearly showing the research area, you’re digging into.
                          </ListItem>
                          <ListItem>Outlining the output.</ListItem>
                          <ListItem>
                            Clearly state the impact your research will have and how you foresee
                            your findings being used by the Ethereum community.
                          </ListItem>
                          <ListItem>
                            A detailed description of your project, milestones, the people involved
                            and how much time you think it will take to complete with a budget.
                          </ListItem>
                        </List>
                      </Box>
                      <PageText>There is no template for a proposal.</PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline?'>
                      <PageText>
                        The Ethereum Foundation has a general grants initiative called the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={`https://esp.ethereum.foundation/`}
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
              </Stack>

              <Stack spacing={10}>
                <section id='apply' ref={ref8}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${LAYER_2_GRANTS_APPLY_URL}`} />
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

export default Layer2Grants;
