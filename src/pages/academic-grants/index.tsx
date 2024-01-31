import { Accordion, Box, Flex, Link, ListItem, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageSection,
  PageText,
  PageMetadata,
  ReadyToApply
} from '../../components/UI';

import {
  ACADEMIC_GRANTS_EMAIL_ADDRESS,
  HOME_URL,
  OFFICE_HOURS_URL,
  SIDEBAR_ACADEMIC_GRANTS_LINKS,
  ACADEMIC_GRANTS_APPLY_URL
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
  const [ref9, inView9] = useInView({ threshold: 0.5, initialInView: false });
  const [ref10, inView10] = useInView({ threshold: 0.5, initialInView: false });
  const [ref11, inView11] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Academic Grants Round 2024'
        description='The Ethereum Foundation is sponsoring a wave of grants to support Ethereum-related academic work. Find all the details you need to apply here.'
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
                inView9,
                inView10,
                inView11
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageText mb={6}>
                    The Ethereum Foundation is thrilled to announce the Academic Grants Round 2024,
                    an initiative dedicated to fostering research in the Ethereum ecosystem.
                    Following the overwhelming success of the 2023 round, where we funded 43
                    projects from 20 countries, we are eager to continue supporting the academic
                    contributions. With a focus on a wide array of domains such as, cryptography,
                    mathematics, zero-knowledge proofs, economics, computation, cybersecurity,
                    protocol and consensus mechanisms, formal verification, P2P networking, society
                    and regulation, and hardware, we aim to catalyze research that propels the
                    Ethereum ecosystem forward.
                  </PageText>

                  <PageText mb={6}>
                    In 2023, we received an astounding 250 applications, emphasizing the global
                    academic community’s growing interest in Ethereum. The diversity and quality of
                    these applications were remarkable. This year, we aim to build on this momentum
                    by inviting even more researchers and institutions from more countries to
                    participate. By sponsoring this wave of grants, the Ethereum Foundation
                    underscores its commitment to supporting rigorous academic work that addresses
                    key challenges and unlocks new opportunities.
                  </PageText>

                  <PageText mb={6}>
                    We are looking for proposals that not only align with our wishlist but also
                    bring novel perspectives and approaches. We encourage you to draw inspiration
                    from the wishlist and think creatively about how your research can contribute to
                    the Ethereum ecosystem.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='submit-proposal' ref={ref2}>
                  <PageSection mb={6}>Submit proposal</PageSection>

                  <PageText mb={6}>
                    Individual researchers with academic backgrounds, research centers,
                    universities, think-tanks, educators and other stakeholders interested in
                    research on matters related to Ethereum and its ecosystem are encouraged to
                    apply.
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
                      href='https://notes.ethereum.org/7YjG-rcTS6GqkmzMuQdmag'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='requirements' ref={ref3}>
                  <PageSection mb={6}>Application requirements</PageSection>

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
                        href='https://hackmd.io/@rodrigolvc/Example_Grant'
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
                      Applications are open to individuals, teams, and organizations. Individual
                      researchers with academic backgrounds, research centers, universities,
                      think-tanks, educators and other stakeholders interested in Ethereum research
                    </ListItem>
                    <ListItem>
                      Undergraduate researchers will require a posdoctoral advisor
                    </ListItem>
                    <ListItem>
                      Applications are selected for funding on a case-by-case basis. You may submit
                      more than one application as long as each proposal is unique and meets the
                      requirements and goals of this round
                    </ListItem>
                    <ListItem>
                      Decisions will be emailed 6 weeks after the application deadline
                    </ListItem>
                  </List>
                </section>

                <section id='deadline' ref={ref4}>
                  <PageSection mb={6}>Deadline</PageSection>

                  <PageText mb={6}>
                    The deadline for proposals is <strong>Monday, March 5th, 2024</strong>. We will
                    follow-up regarding your submission by email.
                  </PageText>
                </section>

                <section id='eligibility-criteria' ref={ref5}>
                  <PageSection mb={6}>Eligibility criteria</PageSection>

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
                </section>

                <section id='not-eligible' ref={ref6}>
                  <PageSection mb={6}>
                    What is <i>not</i> eligible
                  </PageSection>

                  <List>
                    <ListItem>
                      Anything that is not legal within the jurisdiction where the work is taking
                      place
                    </ListItem>
                    <ListItem>
                      Financial products and services (trading platforms, investment products,
                      stablecoins, lending or betting platforms, etc.)
                    </ListItem>
                    <ListItem>
                      Art projects or social impact projects that don’t fit within the scope of this
                      round
                    </ListItem>
                    <ListItem>Projects requesting retroactive funding</ListItem>
                    <ListItem>
                      Projects with a planned token launch or public funding round
                    </ListItem>
                  </List>
                </section>

                <section id='selection-criteria' ref={ref7}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <PageText mb={6}>
                    Applications to this round will be reviewed and selected for funding by
                    evalutors from Aztec, Ethereum Foundation, Scroll, Taiko, and zkSync using the
                    following considerations. Note: depending on the proposal, some criteria might
                    not be applicable:
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
                </section>

                <section id='next-steps-and-support' ref={ref8}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${ACADEMIC_GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {ACADEMIC_GRANTS_EMAIL_ADDRESS}
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='wishlist' ref={ref9}>
                  <PageSection mb={6}>Wishlist</PageSection>

                  <PageText mb={6}>
                    The Ethereum Foundation is interested in research and academic output in the
                    following domain areas, but don&apos;t let this restrict your creativity. Check
                    out our{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://hackmd.io/@rodrigolvc/AGR_2023_Wishlist'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist
                    </Link>
                    .
                  </PageText>

                  <PageText mb={6}>
                    <strong>Surprise us with your creativity!</strong>
                  </PageText>
                </section>

                <section id='faq' ref={ref10}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='Does the Ethereum Foundation have an Indirect Costs Policy?'>
                      <PageText>
                        ESP has an{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='/Academic_Grants_Round_-_Indirect_Costs_Guide.pdf'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          indirect costs policy for Academic Grants
                        </Link>
                        .
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Who can submit proposals for Academic Grants Round?'>
                      <PageText>
                        Academic institutions, consortia of universities, research centres,
                        universities, think-tanks and individuals with prior research experience.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What makes for a good proposal?'>
                      <PageText>
                        In short, we need enough information to understand your goals, the research
                        problem you&apos;re aiming to tackle, the academic output, information on
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
                        goal is to advance knowledge that pushes the Ethereum ecosystem forward.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What should the output be?'>
                      <PageText>
                        We are aiming to receive academic and formal research outputs, be it a
                        research paper, an experimental report or some sort of comprehensive
                        research output. Whatever the output, the information should be open-source
                        and available for the broader community to use. The Intellectual Property
                        can still be owned by the research team, but it is key that the output is
                        open source.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What is the budget available for this round?'>
                      <PageText>
                        This grants round has up to $1 Million in total, which is to be distributed
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
                        Project submission will be evaluated after the deadline, and contact will be
                        made with each applicant to inform them about the evaluation outcome.
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
                        proposal that advances the Ethereum ecosystem, we encourage you to book an
                        appointment for{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={OFFICE_HOURS_URL}
                          _hover={{ textDecoration: 'none' }}
                        >
                          ESP&apos;s Office Hours
                        </Link>
                        .
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>

                <section id='apply' ref={ref11}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${ACADEMIC_GRANTS_APPLY_URL}`} />
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
