import { Center, ListItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useReducer } from 'react';
import {
  Layout,
  List,
  NavMobile,
  PageHeading,
  PageSection,
  PageSubheading,
  PageText,
  PlaceholderImage,
  StepArrow,
  StepHeader,
  StepReadMore,
  VisuallyHiddenText
} from '../../components/UI';
import { processReducer } from '../../reducers';

const initialProcessState = {
  apply: false,
  evaluate: false,
  decision: false
};

const ProjectGrants: NextPage = () => {
  const [readMore, dispatch] = useReducer(processReducer, initialProcessState);

  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Project Grants</title>
        <meta name='description' content='Project Grants' />
        <link rel='icon' href='/images/favicon.ico' type='image/x-icon' />
      </Head>

      <Layout
        bgGradient='linear(to-b, #FFE5E2 0%, #E4DEFF 81.77%, rgba(228, 222, 255, 0) 100%)'
        h='600px'
      >
        <NavMobile />
        <main>
          <Stack mb={32}>
            <section id='hero'>
              <PageHeading mb={4} ml={-1}>
                For Applicants
              </PageHeading>
              <PageText mb={2}>
                Whether you&apos;re working on a specific project, or you&apos;re still exploring
                possibilities, you can connect with our team for guidance.
              </PageText>
              <Center>
                <PlaceholderImage height='250px' width='360px' />
              </Center>
            </section>
          </Stack>

          <Stack mb={10}>
            <section id='description'>
              <PageSubheading mb={8}>Project grants</PageSubheading>

              <PageText mb={6}>
                Project grants undergo an intensive process of review and potentially rescoping.
                There is no hard limit on the size of the request, and the timeline for a decision
                is typically two months but varies depending on factors such as the technical nature
                of the work, amount of due diligence required, and how much revision is required
                from the original proposal. A Project Grant might be a good fit if any of the
                following apply to your project:
              </PageText>

              <Stack>
                <List>
                  <ListItem>
                    More complex, or larger in scope: the proposed work has multiple components or
                    stages, a longer project timeline, or will require you to make new long-term
                    hires.
                  </ListItem>
                  <ListItem>Higher-cost: your expected budget exceeds $30,000.</ListItem>
                  <ListItem>
                    A mature idea: you have thought deeply about your goals and strategy, asked
                    yourself difficult questions to validate your approach, and thoroughly
                    researched the state of the art in your chosen domain.
                  </ListItem>
                </List>
              </Stack>
            </section>
          </Stack>

          <Stack spacing={10}>
            <section id='process'>
              <PageSection mb={6}>Process</PageSection>

              <Stack spacing={5}>
                <Stack>
                  <StepHeader>Apply</StepHeader>

                  <PageText>
                    You&apos;ll need to fill out the form on the next page as well as a long-form
                    application where you&apos;ll go into depth about your goals, motivations, plans
                    and intended impact. Make sure you have read and
                    <span hidden={readMore.apply}>... </span>{' '}
                    <VisuallyHiddenText readMore={readMore.apply}>
                      understood our scope and criteria, and see below for advice on crafting a
                      great application. After submitting, you&apos;ll receive a confirmation email
                      within two business days.
                    </VisuallyHiddenText>
                    <StepReadMore
                      hidden={readMore.apply}
                      onClick={() => dispatch({ type: 'PROCESS_APPLY' })}
                    />
                    <span hidden={readMore.apply}>.</span>
                  </PageText>

                  <StepArrow />
                </Stack>

                <Stack>
                  <StepHeader>Evaluate and refine</StepHeader>

                  <PageText>
                    If we determine that a project is in scope for ESP support, we&apos;ll begin a
                    deeper evaluation of the project&apos;s technical approach, potential impact,
                    risks, and other factors. Our next steps might
                    <span hidden={readMore.evaluate}>... </span>{' '}
                    <VisuallyHiddenText readMore={readMore.evaluate}>
                      include gathering more information, getting input from advisors, and working
                      with you to refine or rescope the project proposal.
                    </VisuallyHiddenText>
                    <StepReadMore
                      hidden={readMore.evaluate}
                      onClick={() => dispatch({ type: 'PROCESS_EVALUATE' })}
                    />
                    <span hidden={readMore.evaluate}>.</span>
                  </PageText>

                  <StepArrow />
                </Stack>

                <Stack>
                  <StepHeader>Decision</StepHeader>

                  <PageText>
                    Once the proposal is finalized, we&apos;ll make an allocation decision based on
                    our assessment as well as input received from advisors. Decision time for a
                    project grant application varies depending on scope
                    <span hidden={readMore.decision}>... </span>{' '}
                    <VisuallyHiddenText readMore={readMore.decision}>
                      and complexity, and may take a few months from when the application was first
                      submitted.
                    </VisuallyHiddenText>
                    <StepReadMore
                      hidden={readMore.decision}
                      onClick={() => dispatch({ type: 'PROCESS_DECISION' })}
                    />
                    <span hidden={readMore.decision}>.</span>
                  </PageText>

                  <StepArrow />
                </Stack>

                <Stack>
                  <StepHeader>Activation</StepHeader>

                  <PageText>
                    We sign a grant agreement, complete KYC and send funds in fiat, ETH or DAI - and
                    you get to work! You&apos;ll have a point of contact at the EF who will check in
                    with you regularly as you progress with your work.
                  </PageText>
                </Stack>
              </Stack>
            </section>

            <section id='requirements'>
              <PageSection mb={6}>Requirements</PageSection>

              <PageText mb={6}>
                We&apos;re flexible in many ways, but we do have some hard rules for the projects we
                fund:
              </PageText>

              <List>
                <ListItem>
                  Work funded by ESP grants must benefit Ethereum in a way that aligns with
                  ESP&apos;s mission and scope.
                </ListItem>
                <ListItem>
                  Any output must be open source or otherwise freely available; for-profit companies
                  are welcome to apply but the specific grant funded work must be non-commercial.
                </ListItem>
              </List>
            </section>

            <section id='eligibility'>
              <PageSection mb={6}>Eligibility</PageSection>

              <PageText mb={6}>
                We are happy to hear from all kinds of contributors who are working within our
                scope:
              </PageText>

              <List>
                <ListItem>Individuals, teams or organizations.</ListItem>
                <ListItem>
                  Established projects, newcomers to Ethereum, past grantees or applicants.
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

            <section id='not-eligible'>
              <PageSection mb={6}>What is NOT eligible</PageSection>

              <List>
                <ListItem>
                  Anything that is not legal within the jurisdiction where the work is taking place.
                </ListItem>
                <ListItem>
                  Financial products (trading, investment products, lending, betting etc).
                </ListItem>
                <ListItem>Projects with a planned token launch or public funding round.</ListItem>
                <ListItem>Art projects or charities that don&apos;t fit within our scope.</ListItem>
              </List>
            </section>

            <section id='tips-application'>
              <PageSection mb={6}>Tips for submitting a great application</PageSection>

              <PageText mb={6}>
                The information you submit here is what we&apos;ll use to make a decision about
                whether to proceed with your grant application, so take the time to understand what
                we&apos;re looking for and answer the form questions thoughtfully. When evaluating
                your application, we look for much more than just an explanation of the proposed
                work. In order to determine the potential impact on the ecosystem, we need a deeper
                understanding of both the “why” and the “how” of the project. Some things to keep in
                mind:
              </PageText>

              <List>
                <ListItem>
                  <strong>Be specific:</strong> we want you to share your grand vision - but you
                  also need to tell us, concretely, how you plan to achieve your goals.
                </ListItem>
                <ListItem>
                  <strong>Be thorough:</strong> the more information you can provide in a grant
                  application, the better. We encourage you to provide any supporting documents such
                  as whitepapers, research papers, or slides from presentations you&apos;ve given
                  about your project.
                </ListItem>
                <ListItem>
                  <strong>Show your work:</strong> we expect you to have made a meaningful effort to
                  validate and refine your approach and researched what other solutions are being
                  developed, and to be able to articulate how yours is different.
                </ListItem>
                <ListItem>
                  <strong>Dig deeper:</strong> we want to know what problem you&apos;re trying to
                  solve, but also why you think it&apos;s important to solve that specific problem,
                  how solving it will benefit Ethereum and how it fits within our mission.
                </ListItem>
                <ListItem>
                  <strong>Think broader:</strong> how does your project connect to, complement and
                  enable the work of others? How can you make sure your work stays relevant and has
                  a sustained impact?
                </ListItem>
                <ListItem>
                  <strong>Identify output</strong> (what is produced) as well as outcome (what is
                  accomplished): what will be the tangible result of your work - a research paper, a
                  code repo, a community event, a working prototype? Who will use it, and how will
                  they access it?
                </ListItem>
                <ListItem>
                  <strong>Be realistic:</strong> we&apos;ll consider the funding amount you request
                  in relation to the proposed scope of work, so go with a number that reflects what
                  you think you&apos;ll need for the specific work in your proposal. Remember that
                  being awarded a grant now doesn&apos;t mean you can&apos;t apply for additional
                  funding later!
                </ListItem>
                <ListItem>
                  <strong>Be flexible:</strong> project grant proposals can undergo significant
                  revision in the evaluation process. We often take a modular approach, breaking the
                  project up into components or phases and considering each one individually. The
                  goal of this process is not to nickel and dime you - it&apos;s to delineate the
                  idea more clearly, identifying places we can mitigate risks and test assumptions,
                  so that we can maximize the impact of our support. Even as you&apos;re crafting
                  your application, we ask you to start thinking about different potential paths to
                  achieving your goals.
                </ListItem>
              </List>
            </section>

            <section id='faq'>
              <PageSection>FAQ</PageSection>
            </section>
          </Stack>
        </main>
      </Layout>
    </>
  );
};

export default ProjectGrants;
