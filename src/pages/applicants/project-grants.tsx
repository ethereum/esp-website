import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, NavMobile, PageHeading, PageText, PlaceholderImage } from '../../components/UI';

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

        <Stack>
          <PageHeading>For Applicants</PageHeading>
          <PageText>
            Whether you&apos;re working on a specific project, or you&apos;re still exploring
            possibilities, you can connect with our team for guidance.
          </PageText>
          <PlaceholderImage height='250px' width='360px' />
        </Stack>
      </Layout>
    </>
  );
};

export default ProjectGrants;
