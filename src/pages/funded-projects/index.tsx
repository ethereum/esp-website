import { Stack, Text } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import { Description, PageMetadata } from '../../components/UI';
import { GrantsExplorer } from '../../components/grants';
import { DashboardSkeleton } from '../../components/grants/GrantsDashboard';
import { getPublicGrants } from '../../lib/sf/grants';
import { GrantRecord } from '../../types/grants';

import aboutHero from '../../../public/images/about-hero.png';

const GrantsDashboard = dynamic(
  () => import('../../components/grants/GrantsDashboard').then(m => ({ default: m.GrantsDashboard })),
  { ssr: false, loading: () => <DashboardSkeleton /> }
);

interface GrantsPageProps {
  grants: GrantRecord[];
  grantRoundDescriptions: Record<string, string>;
}

const Grants: NextPage<GrantsPageProps> = ({ grants, grantRoundDescriptions }) => {
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
            <br /><br />
            <Text as='span' fontSize='sm' opacity={0.5}>
              Showing grants from 2024 onward.
            </Text>
          </Description>
        </section>
      </Stack>

      <Stack px={{ base: 5, md: 12, lg: 24 }} spacing={10}>
        <GrantsDashboard grants={grants} />
        <Stack mb={8} py={{ md: 12 }}>
          <GrantsExplorer grants={grants} grantRoundDescriptions={grantRoundDescriptions} />
        </Stack>
      </Stack>


    </>
  );
};

export const getStaticProps: GetStaticProps<GrantsPageProps> = async () => {
  // Let errors propagate — ISR serves the previously cached page on
  // revalidation failure, which is better than showing an empty page.
  const { grants, grantRoundDescriptions } = await getPublicGrants();

  return {
    props: { grants, grantRoundDescriptions },
    revalidate: 3600
  };
};

export default Grants;
