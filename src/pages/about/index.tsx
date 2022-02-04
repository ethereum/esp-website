import { Center, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import { PageSection, PageText } from '../../components/UI';

import aboutSVG from '../../public/images/about.svg';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>What We Support | Ethereum Foundation Ecosystem Support Program</title>
        <meta
          name='description'
          content="We provide grants and other support for open source projects that strengthen Ethereum's foundations, with a particular focus on builder tools, infrastructure, research and public goods."
        />
      </Head>

      <Stack mb={12}>
        <section id='our-scope'>
          <PageSection mb={6}>Our scope</PageSection>

          <PageText mb={6}>
            ESP focuses on strengthening Ethereum&apos;s foundations and enabling future builders:
            improving infrastructure, expanding the range of tools available to those building on
            Ethereum, deepening our understanding of cryptographic primitives, and growing the
            builder ecosystem through education and community development. The work we support is
            open source, non-commercial and built for positive sum outcomes.
          </PageText>

          <PageText>
            ESP support is generally directed toward enabling builders rather than end-users:
            strengthening Ethereum&apos;s infrastructure, expanding the range of tools available to
            those building on Ethereum, gaining a deeper understanding of cryptographic primitives,
            and growing the builder ecosystem through education and community development.
          </PageText>
        </section>
      </Stack>

      <Center>
        <Image
          src={aboutSVG}
          alt='watering the garden of grants categories'
          objectFit='cover'
          quality={85}
          priority={true}
        />
      </Center>
    </>
  );
};

export default About;
