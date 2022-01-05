import { Accordion, Link, ListItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
  ApplicantsDescription,
  FAQItem,
  List,
  PageSection,
  PageSubheading,
  PageText,
  ReadyToApply,
  StepArrow,
  StepHeader
} from '../../../components/UI';

const SmallGrants: NextPage = () => {
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
