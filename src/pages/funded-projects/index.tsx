import { Box, Grid, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import { Description, PageMetadata } from '../../components/UI';
import { GrantsExplorer } from '../../components/grants';
import { cardStyle } from '../../components/grants/GrantsDashboard';
import { getPublicGrants } from '../../lib/sf/grants';
import { GrantRecord } from '../../types/grants';

import aboutHero from '../../../public/images/about-hero.png';

const DashboardSkeleton = () => (
  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} alignItems='stretch'>
    <Box {...cardStyle}>
      <Skeleton height='20px' width='120px' mx='auto' mb={4} />
      <Box h='180px' display='flex' alignItems='flex-end' justifyContent='space-around' px={2}>
        {[60, 80, 100, 70, 90, 50].map((h, i) => (
          <Skeleton key={i} width='12%' height={`${h}%`} borderRadius='4px 4px 0 0' />
        ))}
      </Box>
    </Box>
    <Box {...cardStyle}>
      <Skeleton height='20px' width='140px' mx='auto' mb={4} />
      <Box h='180px' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Skeleton height='60px' width='80px' mb={2} />
        <Skeleton height='14px' width='40px' />
      </Box>
    </Box>
    <Box {...cardStyle}>
      <Skeleton height='20px' width='80px' mx='auto' mb={4} />
      <Box h='180px' display='flex' alignItems='center' justifyContent='center'>
        <SkeletonCircle size='140px' />
      </Box>
    </Box>
    <Box {...cardStyle}>
      <Skeleton height='20px' width='80px' mx='auto' mb={4} />
      <Box h='180px' display='flex' alignItems='center' justifyContent='center'>
        <SkeletonCircle size='140px' />
      </Box>
    </Box>
  </Grid>
);

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
