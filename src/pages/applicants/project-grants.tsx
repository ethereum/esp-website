import { Center, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Layout,
  NavMobile,
  PageHeading,
  PageSection,
  PageSubheading,
  PageText,
  PlaceholderImage
} from '../../components/UI';

const ProjectGrants: NextPage = () => {
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
                <UnorderedList
                  color='brand.paragraph'
                  fontSize='paragraph'
                  fontWeight={300}
                  lineHeight='24px'
                  spacing={1}
                  ml={6}
                >
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
                </UnorderedList>
              </Stack>
            </section>
          </Stack>

          <Stack spacing={8}>
            <section id='process'>
              <PageSection>Process</PageSection>
            </section>

            <section id='requirements'>
              <PageSection>Requirements</PageSection>
            </section>

            <section id='eligibility'>
              <PageSection>Eligibility</PageSection>
            </section>

            <section id='not-eligible'>
              <PageSection>What is NOT eligible</PageSection>
            </section>

            <section id='tips-application'>
              <PageSection>Tips for submitting a great application</PageSection>
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
