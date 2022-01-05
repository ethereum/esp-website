import { Link, ListItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import {
  ApplicantsDescription,
  List,
  PageSection,
  PageSubheading,
  PageText,
  ReadyToApply,
  StepArrow,
  StepHeader,
  StepReadMore,
  VisuallyHiddenText
} from '../../../components/UI';

const SmallGrants: NextPage = () => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Small Grants</title>
        <meta name='description' content='Project Grants' />
        <link rel='icon' href='/images/favicon.ico' type='image/x-icon' />
      </Head>

      <main>
        <Stack mb={32}>
          <section id='hero'>
            <ApplicantsDescription />
          </section>
        </Stack>

        <Stack mb={10}>
          <section id='description'>
            <PageSubheading mb={8}>Small Grants</PageSubheading>

            <PageText mb={6}>
              Small grants, <strong>capped at $30,000</strong>, have a streamlined application and
              evaluation process to deliver a decision around two weeks after submission.
            </PageText>

            <PageText>
              A small grants application might be a good fit if <strong>any</strong> of the
              following apply to your project:
            </PageText>

            <Stack mb={6}>
              <List>
                <ListItem>
                  In early stage: you&apos;ve started work but are still testing assumptions or
                  working toward a proof of concept
                </ListItem>
                <ListItem>
                  Experimental: you have an idea that&apos;s a little “out there” but potentially
                  impactful - and the only way to find out is to try it
                </ListItem>
                <ListItem>Time sensitive: you need a decision within a few weeks</ListItem>
                <ListItem>Smaller in scope: funding request comes in under $30,000.</ListItem>
                <ListItem>
                  Community event related: sponsorship requests for events focused on
                  Ethereum&apos;s technology and community can also be submitted via the small
                  grants pipeline.
                </ListItem>
              </List>
            </Stack>

            <PageText>
              If you&apos;re uncertain about any part of your application, please feel free to reach
              out through{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='/applicants/office-hours'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                office hours
              </Link>{' '}
              to get your questions answered before submitting.
            </PageText>
          </section>
        </Stack>

        <Stack spacing={10} mb={10}>
          <section id='process'>
            <PageSection mb={6}>Process</PageSection>

            <Stack spacing={5}>
              <Stack>
                <StepHeader>Application</StepHeader>

                <PageText>
                  Just fill out the online form! Make sure you have read and understood our scope
                  and criteria below. After submitting, you&apos;ll receive a confirmation email
                  within two business days.
                </PageText>

                <StepArrow />
              </Stack>

              <Stack>
                <StepHeader>Evaluation</StepHeader>

                <PageText>
                  Every submission is read and considered by the ESP team. You most likely
                  won&apos;t hear from us during the evaluation process for a small grant
                  application, but you&apos;re always welcome to get in touch - just reply to the
                  <span hidden={readMore}>... </span>{' '}
                  <VisuallyHiddenText readMore={readMore}>
                    confirmation email if you have questions or think of anything else we should
                    know.
                  </VisuallyHiddenText>
                  <StepReadMore hidden={readMore} onClick={() => setReadMore(true)} />
                  <span hidden={readMore}>.</span>
                </PageText>

                <StepArrow />
              </Stack>

              <Stack>
                <StepHeader>Decision</StepHeader>

                <PageText>
                  Unless we reach out to clarify anything on your application, you can expect to
                  hear back from us with a final decision around two weeks after you submit it.
                </PageText>

                <StepArrow />
              </Stack>

              <Stack>
                <StepHeader>Activation</StepHeader>

                <PageText>
                  We sign a grant agreement, complete KYC and send funds in fiat, ETH or DAI - and
                  you get to work!
                </PageText>

                <StepArrow />
              </Stack>

              <Stack>
                <StepHeader>Completition</StepHeader>

                <PageText>
                  Once you&apos;ve completed work on your grant, you&apos;ll share the results in a
                  report, blog post or video.
                </PageText>
              </Stack>
            </Stack>
          </section>

          <section id='requirements'>
            <PageSection mb={6}>Requirements</PageSection>

            <PageText>
              We&apos;re flexible in many ways, but we do have some hard rules for the projects we
              fund:
            </PageText>

            <List>
              <ListItem>
                Work funded by ESP grants must benefit Ethereum in a way that aligns with ESP&apos;s
                mission and scope.
              </ListItem>
              <ListItem>
                Any output must be open source or otherwise freely available; for-profit companies
                are welcome to apply but the specific grant funded work must be non-commercial.
              </ListItem>
            </List>
          </section>

          <section id='eligibility'>
            <PageSection mb={6}>Elegibility</PageSection>

            <PageText>
              We are happy to hear from all kinds of contributors who are working within our scope:
            </PageText>

            <List>
              <ListItem>Individuals, teams or organizations.</ListItem>
              <ListItem>
                Newcomers to Ethereum, established projects, past grantees or applicants.
              </ListItem>
              <ListItem>
                Any area of expertise - we work with developers, researchers, academics, designers,
                educators, communicators, community organizers, and more.
              </ListItem>
              <ListItem>
                Projects at any point in the development process: just an idea, early stages, proof
                of concept, or with significant progress already made. However, we do not fund past
                work.
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
                Financial products (trading, investment products, lending, betting, etc).
              </ListItem>
              <ListItem>Projects with a planned token launch or public funding round.</ListItem>
              <ListItem>Art projects or charities that don&apos;t fit within our scope.</ListItem>
              <ListItem>Token -or investment- focused events.</ListItem>
            </List>
          </section>

          <section id='tips-application'>
            <PageSection mb={6}>Tips for submitting a great application</PageSection>

            <PageText mb={6}>
              The information you submit here is what we&apos;ll use to make a final decision about
              your grant application, so take the time to understand what we&apos;re looking for and
              answer the form questions thoughtfully.
            </PageText>

            <PageText mb={6}>
              When evaluating your application, we look for much more than just an explanation of
              the proposed work. In order to determine the potential impact on the ecosystem, we
              need a deeper understanding of both the “why” and the “how” of the project. Some
              things to keep in mind:
            </PageText>

            <List>
              <ListItem>
                <strong>Be specific:</strong> we want you to share your grand vision - but you also
                need to tell us, concretely, how you plan to achieve your goals.
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
                enable the work of others? How can you make sure your work stays relevant and has a
                sustained impact?
              </ListItem>
              <ListItem>
                <strong>Identify output</strong> (what is produced) as well as outcome (what is
                accomplished): what will be the tangible result of your work - a research paper, a
                code repo, a community event, a working prototype? Who will use it, and how will
                they access it?
              </ListItem>
              <ListItem>
                <strong>Be realistic:</strong> we&apos;ll consider the funding amount you request in
                relation to the proposed scope of work, so go with a number that reflects what you
                think you&apos;ll need for the specific work in your proposal. Remember that being
                awarded a grant now doesn&apos;t mean you can&apos;t apply for additional funding
                later!
              </ListItem>
            </List>
          </section>
        </Stack>

        <Stack>
          <section id='ready-to-apply'>
            <ReadyToApply link='/applicants/small-grants/apply' />
          </section>
        </Stack>
      </main>
    </>
  );
};

export default SmallGrants;
