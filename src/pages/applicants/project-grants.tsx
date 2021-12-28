import { Center, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, NavMobile, PageHeading, PageText, PlaceholderImage } from '../../components/UI';
import { PageSubheading } from '../../components/UI/headings';

const ProjectGrants: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Project Grants</title>
        <meta name='description' content='Project Grants' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout
        bgGradient='linear(to-b, #FFE5E2 0%, #E4DEFF 81.77%, rgba(228, 222, 255, 0) 100%)'
        h='600px'
      >
        <NavMobile />
        <main>
          <section id='hero'>
            <Stack mb={32}>
              <PageHeading>For Applicants</PageHeading>
              <PageText>
                Whether you&apos;re working on a specific project, or you&apos;re still exploring
                possibilities, you can connect with our team for guidance.
              </PageText>
              <PlaceholderImage height='250px' width='360px' />
            </Stack>
          </section>

          <section id='project-grants'>
            <Center mb={3}>
              <PageSubheading>Project grants</PageSubheading>
            </Center>

            <PageText mb={6}>
              Project grants undergo an intensive process of review and potentially rescoping. There
              is no hard limit on the size of the request, and the timeline for a decision is
              typically two months but varies depending on factors such as the technical nature of
              the work, amount of due diligence required, and how much revision is required from the
              original proposal. A Project Grant might be a good fit if any of the following apply
              to your project:
            </PageText>

            <UnorderedList
              color='brand.paragraph'
              fontSize='paragraph'
              fontWeight={300}
              lineHeight='24px'
              ml={6}
              spacing={1}
            >
              <ListItem>
                More complex, or larger in scope: the proposed work has multiple components or
                stages, a longer project timeline, or will require you to make new long-term hires.
              </ListItem>
              <ListItem>Higher-cost: your expected budget exceeds $30,000.</ListItem>
              <ListItem>
                A mature idea: you have thought deeply about your goals and strategy, asked yourself
                difficult questions to validate your approach, and thoroughly researched the state
                of the art in your chosen domain.
              </ListItem>
            </UnorderedList>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default ProjectGrants;
