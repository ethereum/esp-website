import { Box, Link, ListItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { List, PageSection, PageText, PageMetadata } from '../../components/UI';

import { OFFICE_HOURS_URL } from '../../constants';

const HowWeSupport: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='How We Support'
        description="We provide grants and other support for open source projects that strengthen Ethereum's foundations, with a particular focus on builder tools, infrastructure, research and public goods."
      />

      <Box bg='white' position='relative' px={{ md: 20, lg: 60 }} py={{ md: 12 }}>
        <Stack spacing={10}>
          <section id='grants'>
            <PageSection mb={6} textAlign='center'>
              Grants
            </PageSection>

            <PageText mb={6}>
              When we say &quot;grants&quot;, we&apos;re referring to direct funding awarded
              following a formal application, review, and a decision made by the ESP team with input
              from technical advisors.
            </PageText>

            <PageText>
              Grants are not donations, nor do we expect financial return. We give grants to support
              recipients in building things that are vital to Ethereum&apos;s success without the
              need to commercialize their work, so that these resources remain free and open to all.
            </PageText>
          </section>

          <section id='grant-types'>
            <PageSection mb={6} textAlign='center'>
              Grant types
            </PageSection>

            <PageText>There are several different ways we go about awarding funds:</PageText>

            <List>
              <ListItem>
                <strong>Small grants</strong>, capped at $30,000, are aimed at projects that are
                smaller in scope, more experimental, in early stages or have a shorter timeline.
              </ListItem>
              <ListItem>
                <strong>Project Grants</strong> undergo a more intensive process of review and
                feedback, with no hard limit on the size of the request. Larger grants often evolve
                significantly from the initial application, in collaboration with the ESP team.
                Project Grants are targeted toward projects with multiple phases or components,
                longer timelines, more complex needs and greater financial or operational overhead.
              </ListItem>
              <ListItem>
                <strong>Event sponsorships:</strong> we accept sponsorship requests for events
                focused on Ethereum&apos;s technology and community through our small grants
                program.
              </ListItem>
            </List>
          </section>

          <section id='other-support'>
            <PageSection mb={6} textAlign='center'>
              Other Support
            </PageSection>

            <PageText mb={6}>
              The “support” in Ecosystem Support Program can mean many different things. Although
              grants are narrowly defined, with some specific qualifying criteria and standardized
              processes, the other work we do is less clear-cut. The Ethereum Foundation has many
              valuable resources: visibility; access to a massive collective knowledge base; a
              creative and dedicated team; connections to leading developers, researchers and
              community members. Our goal is to deploy these resources as impactfully as we can.{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={OFFICE_HOURS_URL}
                _hover={{ textDecoration: 'none' }}
              >
                Office Hours
              </Link>{' '}
              are our primary channel for delivering a variety of non-financial support.
            </PageText>

            <PageText as='h4'>
              <strong>Examples of non-financial support</strong>
            </PageText>

            <PageText mb={6}>
              Some of the most common forms of support we&apos;ve provided in the past include:
            </PageText>
            <List>
              <ListItem>Feedback and guidance.</ListItem>
              <ListItem>Facilitating collaborations with other teams and individuals.</ListItem>
              <ListItem>
                Connections with mentors, advisors or others working in the same topic area.
              </ListItem>
              <ListItem>
                Information about events (hackathons, conferences, etc.) to meet the community,
                showcase work, and get feedback.
              </ListItem>
              <ListItem>Introductions to community members in the same geographical area.</ListItem>
              <ListItem>Platform access.</ListItem>
              <ListItem>Identifying other resources or funding opportunities.</ListItem>
            </List>

            <PageText mt={6}>
              This is not an exhaustive list - we are open to new ideas and take an individualized
              approach to every project we work with.
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default HowWeSupport;
