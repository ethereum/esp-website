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
  ReadyToApply
} from '../../components/UI';

import {
  ACADEMIC_GRANTS_EMAIL_ADDRESS,
  HOME_URL,
  ACADEMIC_GRANTS_URL,
  SIDEBAR_ACADEMIC_GRANTS_LINKS
} from '../../constants';

const AcademicGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.3, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });
  const [ref9, inView9] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Academic Grants Round'
        description='Connect with a member of the Ecosystem Support team for support other than funding, including help with a grant application'
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_ACADEMIC_GRANTS_LINKS}
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
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>
                    We&apos;re calling all those interested in creating knowledge around the
                    Ethereum ecosystem!
                  </PageSubheading>

                  <PageText mb={6}>
                    Over recent years, the Ethereum community has grown immensely by putting
                    together developers, investors, artists, companies and even governments with a
                    shared vision of impact for this technology.
                  </PageText>

                  <PageText mb={6}>
                    With all the progress we&apos;ve made so far, we still lack formal academic
                    research on Ethereum, specifically when it comes to zero-knowledge proofs,
                    cryptography and applied cryptography, economics, computation, cybersecurity,
                    protocol and consensus mechanisms, formal verification, P2P networking, and
                    hardware, just to mention a few.
                  </PageText>

                  <PageText>
                    The Ethereum Foundation is therefore opening this grants round targeting
                    academia with the goal to stimulate open–source formal research related to
                    Ethereum.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='submit-proposal' ref={ref2}>
                  <PageSection mb={6}>Submit proposal</PageSection>

                  <PageText mb={6}>
                    Individual researchers with academic background, research centers, universities,
                    think-tanks, educators and other stakeholders interested in research related to
                    Ethereum and its ecosystem are encouraged to apply.
                  </PageText>

                  <PageText mb={6}>
                    Anyone is free to participate in this grants round, as an individual or with a
                    team.
                  </PageText>

                  <PageText mb={6}>
                    Research outputs are encouraged but not limited to the following{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@djrtwo/academic-grants-2022'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist
                    </Link>
                    .
                  </PageText>

                  <PageText mb={6}>
                    We welcome any stage of research, whether it&apos;s a new research idea based on
                    the wishlist, a follow-up of a research paper on Ethereum you already undertook,
                    or a lab experiment.
                  </PageText>

                  <PageText mb={6}>
                    Grants will be awarded on a rolling basis and on a case-by-case. You may enter
                    more than one proposal so long as each proposal is unique and meets the{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='#requirements'
                      _hover={{ textDecoration: 'none' }}
                    >
                      the requirements
                    </Link>
                    .
                  </PageText>

                  <PageText>
                    Submit your application{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`${ACADEMIC_GRANTS_URL}/apply`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      here
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='deadline' ref={ref3}>
                  <PageSection mb={6}>Deadline</PageSection>

                  <PageText mb={6}>
                    The deadline for proposals is any time the day of{' '}
                    <strong>Friday, April 22, 2022</strong>. We will follow-up with you about your
                    submission by email.
                  </PageText>
                </section>

                <section id='requirements' ref={ref4}>
                  <PageSection mb={6}>Requirements</PageSection>

                  <List>
                    <ListItem>Proposals must be in English.</ListItem>
                    <ListItem>Work must be open source.</ListItem>
                    <ListItem>Reports must be accessible by a url.</ListItem>
                  </List>
                </section>

                <section id='selection-criteria' ref={ref5}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <PageText mb={6}>
                    <strong>Surprise us with your creativity!</strong> But here are a few selection
                    criteria considerations:
                  </PageText>

                  <List>
                    <ListItem>Impact of the proposed research output.</ListItem>
                    <ListItem>Quality and previous experience of the research team.</ListItem>
                    <ListItem>Clarity, conciseness and organization of the proposal.</ListItem>
                    <ListItem>Contribution to the wishlist areas.</ListItem>
                    <ListItem>
                      Potential of long-term involvement in the Ethereum ecosystem.
                    </ListItem>
                    <ListItem>
                      Analyses or visualizations that help a non-technical audience gain insight
                      into the research.
                    </ListItem>
                  </List>
                </section>

                <section id='wishlist' ref={ref6}>
                  <PageSection mb={6}>Wishlist</PageSection>

                  <PageText mb={6}>
                    The Ethereum Foundation is interested in research and academic output in the
                    following domain areas, but don’t let this restrict your creativity. Check out
                    our{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@djrtwo/academic-grants-2022'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='next-steps-and-support' ref={ref7}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={ACADEMIC_GRANTS_EMAIL_ADDRESS}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      academics-grants@ethereum.org
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='faq' ref={ref8}>
                  <PageSection mb={6}>FAQ</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='Who can submit proposals for Academics Grants Round?'>
                      <PageText>
                        Academic institutions, consortia of universities, research centres,
                        universities, think-tanks and individuals with prior research experience.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What makes for a good proposal?'>
                      <PageText>
                        In short, we need enough information to understand your goals, the research
                        problem you&apos;re wanting to tackle, the academic output, information on
                        previous research work, who&apos;s involved and estimation regarding time
                        and budget. The more details you provide, the more likely we&apos;ll be able
                        to help.
                      </PageText>

                      <Box>
                        <PageText>For example:</PageText>
                        <List>
                          <ListItem>
                            Clearly showing the research area you&apos;re digging into.
                          </ListItem>
                          <ListItem>
                            Outlining the output. Is it a research paper or lab work that will
                            culminate in an experimental report?
                          </ListItem>
                          <ListItem>
                            Clearly stating the impact your research will have and how you foresee
                            your findings being used by the Ethereum community.
                          </ListItem>
                          <ListItem>
                            Detailed description of your project, milestones, the people involved
                            and how much time you think it will take to complete.
                          </ListItem>
                        </List>
                      </Box>
                    </FAQItem>

                    <FAQItem question='What stage does my idea or project need to be in?'>
                      <PageText>
                        If you have a follow-up idea of a previous research you conducted or if your
                        research is aligned with the wishlist domains, we want to hear about it! The
                        goal is to advance knowledge that pushes forward the Ethereum ecosystem.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What should the output be?'>
                      <PageText>
                        We are aiming to receive academic and formal research outputs, be it a
                        research paper, an experimental report or some sort of comprehensive
                        research output. Whatever the output, the information should be open-sourced
                        and available for the broader community to use. The Intelectual Property can
                        still be owned by the research team, but it is key that the output is open
                        source.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What is the budget available for this round?'>
                      <PageText>
                        This grants round has up to $750,000 in total, which is to be distributed
                        among selected projects.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What is the expected duration of the research project?'>
                      <PageText>
                        We envision projects to take between 6 to 12 months, however, we are open to
                        some flexibility depending on the project proposal.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Are applications evaluated on a rolling basis or at the end of the deadline?'>
                      <PageText>
                        Project submissions will be evaluated on a rolling basis and contact will be
                        made with each applicant to inform about the evaluation outcome.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline?'>
                      <PageText>
                        We encourage you to submit an inquiry for support through the Ecosystem
                        Support Program.
                      </PageText>

                      <PageText>
                        The Ethereum Foundation has a general grants initiative called the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={HOME_URL}
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ecosystem Support Program (ESP)
                        </Link>
                        .
                      </PageText>

                      <PageText>
                        If you miss the deadline for this dedicated round of grants, but have a
                        proposal that advances the Ethereum ecosystem, we encourage you to head over
                        to ESP.
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>

                <section id='apply' ref={ref9}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${ACADEMIC_GRANTS_URL}/apply`} />
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

export default AcademicGrants;
