import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  ApplicationAttentionMsg,
  FAQItem,
  List,
  PageMetadata,
  PageSection,
  PageSubheading,
  PageText,
  ProcessStep,
  ReadyToApply
} from '../../../components/UI';

import {
  ETHEREUM_COMMUNITY_URL,
  ETHEREUM_GRANTS_URL,
  ETHRESEARCH_URL,
  SIDEBAR_SMALL_GRANTS_LINKS,
  SMALL_GRANTS_APPLY_URL
} from '../../../constants';

const SmallGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Small Grants'
        description='Learn more about applying for Small Grants from the Ecosystem Support Program: criteria, how to apply and tips for submitting a great application.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_SMALL_GRANTS_LINKS}
            sectionsInView={[inView, inView2, inView3, inView4, inView5, inView6, inView7, inView8]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={-4}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Small Grants</PageSubheading>

                <PageText mb={6}>
                  Small grants, <strong>capped at $30,000</strong>, are designed as seed grants for
                  projects with smaller scopes and timelines.
                </PageText>

                <PageText mb={6}>
                  A small grants application might be a good fit if any of the following apply to
                  your project:
                </PageText>

                <Stack mb={6}>
                  <List>
                    <ListItem>
                      In early stage: you&apos;ve started work but are still testing assumptions or
                      working toward a proof of concept.
                    </ListItem>
                    <ListItem>
                      Experimental: you have an idea that&apos;s a little &quot;out there&quot; but
                      potentially impactful - and the only way to find out is to try it.
                    </ListItem>
                    <ListItem>Smaller in scope: funding request comes in under $30,000. </ListItem>
                    <ListItem>
                      Community event related: sponsorship requests for events focused on
                      Ethereum&apos;s technology and community can also be submitted via the small
                      grants pipeline.
                    </ListItem>
                  </List>
                </Stack>
              </section>
            </Stack>

            <Stack mb={20}>
              <section id='attention'>
                <ApplicationAttentionMsg />
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='process' ref={ref2}>
                <PageSection mb={6}>Process</PageSection>

                <Stack spacing={3}>
                  <ProcessStep title='Application'>
                    Complete the online form in full. Make sure you have read and understand the
                    scope and eligibility criteria of the Ecosystem Support Program before
                    submitting. Upon submission, you will receive a confirmation email.
                  </ProcessStep>

                  <ProcessStep title='Evaluation'>
                    Every submission is read and considered by the Ecosystem Support Program team.
                    Evaluation steps often include: consulting with internal advisors, an
                    application interview to discuss the project proposal in detail, and potential
                    budget negotiation or project rescoping.
                  </ProcessStep>

                  <ProcessStep title='Decision'>
                    You will be notified by email of funding decisions. If selected for funding, you
                    will work with the Ecosystem Support Program team to set up a clear grant
                    structure with milestone-based payments.
                  </ProcessStep>

                  <ProcessStep title='Activation'>
                    All grant recipients of the Ethereum Foundation undergo an onboarding process
                    that includes Know Your Customer (KYC) and signing a legal grant agreement. Once
                    completed, the grant is considered Active and you can get to work. You will have
                    a Grant Evaluator at the Ethereum Foundation who will check in with you
                    regularly as you progress with your work.
                  </ProcessStep>

                  <ProcessStep title='Completion' isLastStep>
                    Once the scope of work is completed, you will share the results publicly in a
                    report, post, or video.
                  </ProcessStep>
                </Stack>
              </section>

              <section id='requirements' ref={ref3}>
                <PageSection mb={6}>Requirements</PageSection>

                <PageText>
                  We&apos;re flexible in many ways, but we do have some hard rules for the projects
                  we fund:
                </PageText>

                <List>
                  <ListItem>
                    Work funded by ESP grants must benefit Ethereum in a way that aligns with
                    ESP&apos;s mission and scope.
                  </ListItem>
                  <ListItem>
                    Any output must be open source or otherwise freely available; for-profit
                    companies are welcome to apply but the specific grant funded work must be
                    non-commercial.
                  </ListItem>
                </List>
              </section>

              <section id='eligibility' ref={ref4}>
                <PageSection mb={6}>Eligibility</PageSection>

                <PageText>
                  We are happy to hear from all kinds of contributors who are working within our
                  scope:
                </PageText>

                <List>
                  <ListItem>Individuals, teams or organizations.</ListItem>
                  <ListItem>
                    Newcomers to Ethereum, established projects, past grantees or applicants.
                  </ListItem>
                  <ListItem>
                    Any area of expertise - we work with developers, researchers, academics,
                    designers, educators, communicators, community organizers, and more.
                  </ListItem>
                  <ListItem>
                    Projects at any point in the development process: just an idea, early stages,
                    proof of concept, or with significant progress already made. However, we do not
                    fund past work.
                  </ListItem>
                  <ListItem>Builders of any age, origin, identity or background.</ListItem>
                </List>
              </section>

              <section id='what-is-not-eligible' ref={ref5}>
                <PageSection mb={6}>What is NOT eligible</PageSection>

                <List>
                  <ListItem>
                    Anything that is not legal within the jurisdiction where the work is taking
                    place.
                  </ListItem>
                  <ListItem>
                    Financial products (trading, investment products, lending, betting, etc).
                  </ListItem>
                  <ListItem>Projects with a planned token launch or public funding round.</ListItem>
                  <ListItem>
                    Art projects or charities that don&apos;t fit within our scope.
                  </ListItem>
                  <ListItem>Token or investment focused events.</ListItem>
                </List>
              </section>

              <section id='tips-application' ref={ref6}>
                <PageSection mb={6}>Tips for submitting a great application</PageSection>

                <PageText mb={6}>
                  The information you submit here is what we&apos;ll use to make a final decision
                  about your grant application, so take the time to understand what we&apos;re
                  looking for and answer the form questions thoughtfully.
                </PageText>

                <PageText mb={6}>
                  When evaluating your application, we look for much more than just an explanation
                  of the proposed work. In order to determine the potential impact on the ecosystem,
                  we need a deeper understanding of both the “why” and the “how” of the project.
                  Some things to keep in mind:
                </PageText>

                <List>
                  <ListItem>
                    <strong>Be specific:</strong> we want you to share your grand vision - but you
                    also need to tell us, concretely, how you plan to achieve your goals.
                  </ListItem>
                  <ListItem>
                    <strong>Be thorough:</strong> the more information you can provide in a grant
                    application, the better. We encourage you to provide any supporting documents
                    such as whitepapers, research papers, or slides from presentations you&apos;ve
                    given about your project.
                  </ListItem>
                  <ListItem>
                    <strong>Show your work:</strong> we expect you to have made a meaningful effort
                    to validate and refine your approach and researched what other solutions are
                    being developed, and to be able to articulate how yours is different.
                  </ListItem>
                  <ListItem>
                    <strong>Dig deeper:</strong> we want to know what problem you&apos;re trying to
                    solve, but also why you think it&apos;s important to solve that specific
                    problem, how solving it will benefit Ethereum and how it fits within our
                    mission.
                  </ListItem>
                  <ListItem>
                    <strong>Think broader:</strong> how does your project connect to, complement and
                    enable the work of others? How can you make sure your work stays relevant and
                    has a sustained impact?
                  </ListItem>
                  <ListItem>
                    <strong>Identify output</strong> (what is produced) as well as outcome (what is
                    accomplished): what will be the tangible result of your work - a research paper,
                    a code repo, a community event, a working prototype? Who will use it, and how
                    will they access it?
                  </ListItem>
                  <ListItem>
                    <strong>Be realistic:</strong> we&apos;ll consider the funding amount you
                    request in relation to the proposed scope of work, so go with a number that
                    reflects what you think you&apos;ll need for the specific work in your proposal.
                    Remember that being awarded a grant now doesn&apos;t mean you can&apos;t apply
                    for additional funding later!
                  </ListItem>
                </List>
              </section>

              <section id='faq' ref={ref7}>
                <PageSection mb={6}>FAQ</PageSection>

                <Accordion allowToggle>
                  <FAQItem question='Is my application confidential?'>
                    <PageText>
                      Applications are not shared with the public. However, any information you
                      provide may be shared with advisors in the review process, so let us know in
                      your application if there&apos;s something you want us to keep confidential!
                    </PageText>
                  </FAQItem>

                  <FAQItem question='Can I remain anonymous?'>
                    <PageText>
                      Mostly, yes. We are legally required to perform KYC before transferring funds
                      to you, and will need to know your real identity to complete that process.
                      However, we are happy to keep that information confidential outside of the few
                      members of the EF team involved in KYC processing, and use a pseudonym or omit
                      your name entirely in any communications that will be visible to anyone else.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What currency are grants paid in?'>
                    <PageText>We can provide payment in ETH, DAI, or Fiat currency.</PageText>
                  </FAQItem>

                  <FAQItem question='Is my for-profit company eligible for a grant?'>
                    <PageText mb={6}>
                      Ethereum&apos;s ecosystem is unique in the way it embraces both
                      entrepreneurship and collaboration, and we want to keep it that way. We
                      believe that builders can and should be able to build a business while
                      continuing to contribute to FOSS and public goods.
                    </PageText>

                    <PageText>
                      Although we do not fund work that is intended to be monetized, we are happy to
                      hear from for-profit entities that are building public goods. We regularly
                      fund components or areas of work carried out by for-profit companies, as long
                      as the specific funded work fits within our scope and remains free and open to
                      anyone.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='Will anybody actually read my application?'>
                    <PageText>
                      Yes! The team meets weekly to review every submission we receive, and give
                      careful consideration to whether the project is eligible and what we can do to
                      support. We love learning about the amazing work people are doing in the
                      ecosystem, even when that work is outside of our scope.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What if I need more than $30,000?'>
                    <PageText>
                      Small grants have a hard limit of $30,000, but if you anticipate needing more
                      to get to the finish line, you have options. You can apply for Project Grants,
                      which have no funding cap. If your project is otherwise a better fit for a
                      small grant, e.g. it&apos;s more experimental or in early stages, consider
                      applying for a small grant for a specific component or phase of work, and we
                      can revisit the possibility of funding additional work as you approach the
                      finish line on your initial grant.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What happens if I’m not awarded a grant?'>
                    <PageText mb={6}>
                      Don&apos;t be discouraged! We have a finite scope and sometimes it&apos;s just
                      not a fit, or not the right time - that doesn&apos;t mean the work you&apos;re
                      doing isn&apos;t important. Consider continuing to develop your idea at a
                      hackathon or by posting to forums like{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href={ETHRESEARCH_URL}
                        isExternal
                      >
                        ethresear.ch
                      </Link>
                      , looking into{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href={ETHEREUM_GRANTS_URL}
                        isExternal
                      >
                        other funding sources
                      </Link>
                      , or participating in{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href={ETHEREUM_COMMUNITY_URL}
                        isExternal
                      >
                        community groups or events
                      </Link>{' '}
                      for new perspectives and possibilities within the vast and vibrant Ethereum
                      ecosystem.
                    </PageText>

                    <PageText>
                      You can also reapply in the future if you feel that something has changed. If
                      you&apos;re considering reapplying, we recommend signing up for office hours
                      first before restarting the application process.
                    </PageText>
                  </FAQItem>
                </Accordion>
              </section>

              <section id='apply' ref={ref8}>
                <Stack mt={6}>
                  <ReadyToApply link={`${SMALL_GRANTS_APPLY_URL}`} />
                </Stack>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SmallGrants;
