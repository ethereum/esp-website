import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Footer, FooterBackgroundImage, HomepageHero } from '../UI';
import { Forms } from '../forms';

import {
  AboutLayout,
  AcademicGrantsApplyLayout,
  AcademicGrants2022Layout,
  ApplicantsLayout,
  DevconGrantsLayout,
  Layer2GrantsLayout,
  MergeDataChallengeLayout,
  SemaphoreGrantLayout,
  AcademicGrantsLayout,
  AccountAbstractionGrantsLayout,
  RunANodeGrantLayout,
  DataCollectionLayout,
  AcademicGrants2023Layout,
  ZKGrantsLayout,
  DataChallengeLayout
} from '../layout';
import { Nav } from '../../components';

import {
  ABOUT_URL,
  ACADEMIC_GRANTS_URL,
  ACADEMIC_GRANTS_2022_URL,
  APPLICANTS_URL,
  DEVCON_GRANTS_URL,
  GRANTS_URLS,
  HOME_URL,
  LAYER_2_GRANTS_URL,
  MERGE_DATA_CHALLENGE_URL,
  SEMAPHORE_GRANT_URL,
  ACCOUNT_ABSTRACTION_GRANTS_URL,
  RUN_A_NODE_GRANTS_URL,
  DATA_COLLECTION_ROUND_URL,
  ACADEMIC_GRANTS_2023_URL,
  ZK_GRANTS_URL,
  DATA_CHALLENGE_ROUND_URL
} from '../../constants';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  const router = useRouter();

  const renderContent = (): ReactNode => {
    if (router.pathname === HOME_URL) {
      return (
        <>
          <HomepageHero />

          {children}
        </>
      );
    }

    if (router.pathname.startsWith(APPLICANTS_URL)) {
      return (
        <Box mt={-6}>
          <main>
            <ApplicantsLayout>{children}</ApplicantsLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname.startsWith(ABOUT_URL)) {
      return (
        <Box mt={-6}>
          <main>
            <AboutLayout>{children}</AboutLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === DEVCON_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <DevconGrantsLayout>{children}</DevconGrantsLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === ACADEMIC_GRANTS_2022_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrants2022Layout>{children}</AcademicGrants2022Layout>
          </main>
        </Box>
      );
    }

    if (router.pathname === ACADEMIC_GRANTS_2023_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrants2023Layout>{children}</AcademicGrants2023Layout>
          </main>
        </Box>
      );
    }

    if (router.pathname === ACADEMIC_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrantsLayout>{children}</AcademicGrantsLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === MERGE_DATA_CHALLENGE_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <MergeDataChallengeLayout>{children}</MergeDataChallengeLayout>
          </main>
        </Box>
      );
    }

    // TODO: refactor these if conditions ????
    if (router.pathname === SEMAPHORE_GRANT_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <SemaphoreGrantLayout>{children}</SemaphoreGrantLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === LAYER_2_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <Layer2GrantsLayout>{children}</Layer2GrantsLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === ACCOUNT_ABSTRACTION_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AccountAbstractionGrantsLayout>{children}</AccountAbstractionGrantsLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === RUN_A_NODE_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <RunANodeGrantLayout>{children}</RunANodeGrantLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === DATA_COLLECTION_ROUND_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <DataCollectionLayout>{children}</DataCollectionLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === ZK_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <ZKGrantsLayout>{children}</ZKGrantsLayout>
          </main>
        </Box>
      );
    }

    if (router.pathname === DATA_CHALLENGE_ROUND_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <DataChallengeLayout>{children}</DataChallengeLayout>
          </main>
        </Box>
      );
    }

    if (GRANTS_URLS.includes(router.pathname)) {
      return (
        <Box mt={-6}>
          <main>
            <AcademicGrantsApplyLayout>{children}</AcademicGrantsApplyLayout>
          </main>
        </Box>
      );
    }

    return children;
  };

  return (
    <Container maxW='100%' p={0} {...props}>
      <Box px={{ base: 5, md: 12 }} py={{ base: 3, md: 8 }}>
        <Nav />
      </Box>

      {renderContent()}

      <Forms />

      <FooterBackgroundImage />

      <Footer />
    </Container>
  );
};
