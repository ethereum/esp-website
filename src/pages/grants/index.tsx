import { Box, Container, Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';

import { Description, PageMetadata } from '../../components/UI';
import { GrantsExplorer } from '../../components/grants';
import { getPublicGrants } from '../../lib/sf/grants';
import { GrantRecord } from '../../types/grants';

import aboutHero from '../../../public/images/about-hero.png';

interface GrantsPageProps {
  grants: GrantRecord[];
}

const Grants: NextPage<GrantsPageProps> = ({ grants }) => {
  return (
    <>
      <PageMetadata
        title='Funded Projects'
        description='Explore projects supported by the Ethereum Foundation Ecosystem Support Program — spanning research, tooling, infrastructure, and community across the Ethereum ecosystem.'
      />


      <Stack mb={5} py={3} px={{ base: 5, md: 12 }}>
        <section id='hero'>
          <Description
            title='Funded Projects'
            img={{ src: aboutHero, alt: 'People reading about the ESP', width: 498, height: 296 }}
          >
            The Ecosystem Support Program funds teams and individuals building the next generation
            of Ethereum infrastructure, research, developer tooling, and community resources.
            Browse the projects we&apos;ve supported below.
          </Description>
        </section>
      </Stack>

      <Stack px={{ base: 5, md: 12 }}>
        <Stack mb={8}>
          <Box bg='white' position='relative' py={{ md: 12 }} px={{ lg: 12 }}>
            <GrantsExplorer grants={grants} />
          </Box>
        </Stack>
      </Stack>


    </>
  );
};

export const getStaticProps: GetStaticProps<GrantsPageProps> = async () => {
  // Let errors propagate — ISR serves the previously cached page on
  // revalidation failure, which is better than showing an empty page.
  const grants = await getPublicGrants();

  return {
    props: { grants },
    revalidate: 3600
  };
};

export default Grants;
