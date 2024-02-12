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

import { GRANTS_EMAIL_ADDRESS, ZK_GRANTS_APPLY_URL, ZK_GRANTS_LINKS } from '../../constants';

const RunANodeGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });
  const [ref9, inView9] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='ZK Grants'
        description='ZK grants round co-funded with Aztec, Scroll, Taiko & zkSync to develop the ZK Layer 2 Ecosystem.'
      />

      <Box bg='white' position='relative' mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={12}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={ZK_GRANTS_LINKS}
              sectionsInView={[
                inView,
                inView2,
                inView3,
                inView4,
                inView5,
                inView6,
                inView7,
                inView8,
                inView9
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack spacing={10}>
                <Flex as='section' id='introduction' ref={ref} gap={6} direction='column'>
                  <PageSection>Introduction</PageSection>

                  <PageText>
                    The Ecosystem Support Program, in collaboration with{' '}
                    <Text as='strong'>Aztec</Text>, <Text as='strong'>Polygon</Text>,{' '}
                    <Text as='strong'>Scroll</Text>, <Text as='strong'>Taiko</Text> and{' '}
                    <Text as='strong'>zkSync</Text>, is launching this grants initiative to
                    encourage research and development for Zero-Knowledge proofs and standards for
                    ZK L2s. This collaborative grants round is a first for the Ecosystem Support
                    Program and will draw on both the funding support and the technical expertise of
                    the participating L2s. Each of the funders is contributing{' '}
                    <Text as='strong'>$150K</Text> to the shared prize pool, which totals{' '}
                    <Text as='strong'>$900K</Text>.
                  </PageText>
                </Flex>

                <Flex as='section' id='ideas' ref={ref2} gap={6} direction='column'>
                  <PageSection>Ideas</PageSection>

                  <PageText>
                    These are some high level topics, please review the entire wishlist for a
                    complete list of ideas.
                  </PageText>

                  <List>
                    <ListItem>
                      Performance benchmarking (prover time, verifier time, proof size) for
                      different types of proof systems as well as prover/verifier client
                      implementations
                    </ListItem>
                    <ListItem>
                      ZK DevX and further improvement in efficiency and ergonomics of ZK-DSLs &
                      associated libraries + tooling
                    </ListItem>
                    <ListItem>
                      Publicly accessible and easy-to-understand security and risk benchmarking for
                      ZKRs and bridges (a la L2beat)
                    </ListItem>
                    <ListItem>
                      Forced inclusion tools and frontend(?) for ZK and validity-proof based L2s
                    </ListItem>
                    <ListItem>zkDSL &lt;&gt; Solidity transpilers</ListItem>
                    <ListItem>Hardware acceleration</ListItem>
                    <ListItem>Multi-prover systems (validity/ZK + fraud proof)</ListItem>
                  </List>

                  <PageText>
                    Check out the{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@drigolvc/ZK-Round-Wishlist'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      full wishlist
                    </Link>
                  </PageText>
                </Flex>

                <Flex
                  as='section'
                  id='application-requirements'
                  ref={ref3}
                  gap={6}
                  direction='column'
                >
                  <PageSection>Application requirements</PageSection>

                  <List>
                    <ListItem>All applications must have a written proposal in PDF format</ListItem>
                    <List>
                      <ListItem>Proposals must be in English</ListItem>
                      <ListItem>
                        Proposals must include a detailed description, budget, and timeline for the
                        proposed scope of work
                      </ListItem>
                      <ListItem>Proposals must include an applicant profile</ListItem>
                      <ListItem>
                        Proposals must include a public repository or link to published work
                      </ListItem>
                    </List>
                    <ListItem>
                      Here is a{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://notes.ethereum.org/@drigolvc/Grant_Proposal_template'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        template
                      </Link>{' '}
                      for a proposal
                    </ListItem>
                    <ListItem>Ideas and projects at any stage of development are welcome:</ListItem>
                    <List>
                      <ListItem>Idea phase</ListItem>
                      <ListItem>Proof-of-concept</ListItem>
                      <ListItem>Work in progress</ListItem>
                      <ListItem>Fleshed out project</ListItem>
                    </List>
                    <ListItem>
                      Applications are open to individuals, teams, and organizations. We welcome
                      proposals from newcomers to Ethereum, established projects, past grantees and
                      previous applicants of all areas of expertise. We work with developers,
                      researchers, academics, designers, educators, communicators, community
                      organizers, and more. We encourage builders of all ages, origins, identities,
                      and backgrounds to apply
                    </ListItem>
                    <ListItem>
                      Applications are selected for funding on a case-by-case basis. You may submit
                      more than one application as long as each proposal is unique and meets the
                      requirements and goals of this round
                    </ListItem>
                  </List>

                  <PageText fontWeight='bold'>Deadline</PageText>
                  <PageText>
                    The application window opens for <Text as='strong'>4 weeks</Text> from{' '}
                    <Text as='strong'>Monday, February 19th, 2024</Text>, and closes on{' '}
                    <Text as='strong'>Monday, March 18th, 2024</Text>.
                  </PageText>
                </Flex>

                <Flex as='section' id='eligibility-criteria' ref={ref4} gap={6} direction='column'>
                  <PageSection>Eligibility criteria</PageSection>

                  <List>
                    <ListItem>
                      Projects must be open source with a free and permissive license
                    </ListItem>
                    <ListItem>
                      Projects must be aligned with the stated goals and wishlist for this round
                    </ListItem>
                    <ListItem>
                      Projects should be public goods that benefit the growth and development of the
                      Ethereum ZK L2 ecosystem
                    </ListItem>
                  </List>
                </Flex>

                <Flex as='section' id='not-eligible' ref={ref5} gap={6} direction='column'>
                  <PageSection>What is not eligible</PageSection>

                  <List>
                    <ListItem>
                      Anything that is not legal within the jurisdiction where the work is taking
                      place
                    </ListItem>
                    <ListItem>
                      Financial products and services (trading platforms, investment products,
                      stablecoins, lending or betting platforms, etc.)
                    </ListItem>
                    <ListItem>Art projects or social impact projects</ListItem>
                    <ListItem>Projects requesting retroactive funding</ListItem>
                    <ListItem>
                      Projects with a planned token launch or public funding round
                    </ListItem>
                  </List>
                </Flex>

                <Flex as='section' id='selection-criteria' ref={ref6} gap={6} direction='column'>
                  <PageSection>Selection criteria</PageSection>

                  <PageText>
                    Applications to this round will be reviewed and selected for funding by
                    evalutors from Aztec, Ethereum Foundation, Polygon, Scroll, Taiko, and zkSync
                    focusing on the following criteria. Note: depending on the proposal, some
                    criteria might not be applicable:
                  </PageText>

                  <List>
                    <ListItem>Potential impact on the Ethereum ZK L2 ecosystem</ListItem>
                    <ListItem>
                      Overall value and benefit of project to multiple L2s within the ecosystem
                    </ListItem>
                    <ListItem>Clarity, conciseness, and organization of documentation</ListItem>
                    <ListItem>
                      Individual or team profile demonstrates an experience and expertise capable of
                      executing project described
                    </ListItem>
                    <ListItem>
                      Timeline of project and requested budget reasonably match the scope of work
                    </ListItem>
                  </List>
                </Flex>

                <Flex
                  as='section'
                  id='next-steps-and-support'
                  ref={ref7}
                  gap={6}
                  direction='column'
                >
                  <PageSection>Next steps and support</PageSection>

                  <PageText>
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
                </Flex>

                <Flex as='section' id='faq' ref={ref8} gap={6} direction='column'>
                  <PageSection>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question="I have an idea, but I'm not sure if it's a good fit for this round">
                      <PageText>
                        If you would like feedback or guidance before submitting to this round, we
                        suggest requesting an{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='/applicants/office-hours'
                          _hover={{ textDecoration: 'none' }}
                        >
                          Office Hours
                        </Link>{' '}
                        with the Ecosystem Support Program team to briefly discuss the project. On
                        these calls, we cannot guarantee selection, but we can provide input on the
                        goals of the round, eligibility criteria, and project proposals.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='When can I expect to hear back about my proposal?'>
                      <PageText>
                        Applications will be evaluated beginning at the close of the application
                        window and typically take 6-8 weeks to complete. Final decisions will be
                        sent to applicants by email once evaluations are complete.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What makes a good proposal?'>
                      <PageText>
                        In short, we need enough information to understand your objectives, the
                        problem you’re aiming to tackle, the output, information on previous work,
                        who is involved in executing the scope of work, and a detailed plan for time
                        and budget.
                      </PageText>

                      <PageText>
                        The more details you provide, the better we’ll understand your project and
                        goals.
                      </PageText>

                      <Box>
                        <PageText>
                          For example - what could be included in the grant proposal:
                        </PageText>
                        <List>
                          <ListItem>State the problem and domain your project addresses</ListItem>
                          <ListItem>Establish the output</ListItem>
                          <ListItem>
                            Define the impact your project will have and how you foresee your output
                            being used or adopted by the Ethereum community
                          </ListItem>
                          <ListItem>
                            Outlinea your project milestones, the people involved and how much time
                            it will take to complete with a budget
                          </ListItem>
                        </List>
                      </Box>

                      <PageText>
                        Use this{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://notes.ethereum.org/@drigolvc/Grant_Proposal_template'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          template
                        </Link>{' '}
                        to help structure your proposal.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline?'>
                      <PageText>
                        The Ethereum Foundation has an open grants program called the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='/'
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ecosystem Support Program (ESP)
                        </Link>{' '}
                        where grant applications are always open. Please review ESP scope and
                        criteria to see if your project is a good fit.
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </Flex>

                <Flex as='section' id='apply' ref={ref9} gap={6} direction='column'>
                  <Stack>
                    <ReadyToApply link={`${ZK_GRANTS_APPLY_URL}`} />
                  </Stack>
                </Flex>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default RunANodeGrants;
