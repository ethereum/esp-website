import { Accordion, Link, ListItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import {
  ApplicantsDescription,
  FAQItem,
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
