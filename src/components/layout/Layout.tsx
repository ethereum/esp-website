import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { Footer, FooterBackgroundImage, HomepageHero } from '../UI';
import { useCurrentPath } from '../../hooks/useCurrentPath';
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
  const path = useCurrentPath();

  const renderContent = (): ReactNode => {
    if (path === HOME_URL) {
      return (
        <>
          <HomepageHero />

          {children}
        </>
      );
    }

    if (path.startsWith(APPLICANTS_URL)) {
      return (
        <Box mt={-6}>
          <main>
            <ApplicantsLayout>{children}</ApplicantsLayout>
          </main>
        </Box>
      );
    }

    if (path.startsWith(ABOUT_URL)) {
      return (
        <Box mt={-6}>
          <main>
            <AboutLayout>{children}</AboutLayout>
          </main>
        </Box>
      );
    }

    if (path === DEVCON_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <DevconGrantsLayout>{children}</DevconGrantsLayout>
          </main>
        </Box>
      );
    }

    if (path === ACADEMIC_GRANTS_2022_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrants2022Layout>{children}</AcademicGrants2022Layout>
          </main>
        </Box>
      );
    }

    if (path === ACADEMIC_GRANTS_2023_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrants2023Layout>{children}</AcademicGrants2023Layout>
          </main>
        </Box>
      );
    }

    if (path === ACADEMIC_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrantsLayout>{children}</AcademicGrantsLayout>
          </main>
        </Box>
      );
    }

    if (path === MERGE_DATA_CHALLENGE_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <MergeDataChallengeLayout>{children}</MergeDataChallengeLayout>
          </main>
        </Box>
      );
    }

    // TODO: refactor these if conditions ????
    if (path === SEMAPHORE_GRANT_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <SemaphoreGrantLayout>{children}</SemaphoreGrantLayout>
          </main>
        </Box>
      );
    }

    if (path === LAYER_2_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <Layer2GrantsLayout>{children}</Layer2GrantsLayout>
          </main>
        </Box>
      );
    }

    if (path === ACCOUNT_ABSTRACTION_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AccountAbstractionGrantsLayout>{children}</AccountAbstractionGrantsLayout>
          </main>
        </Box>
      );
    }

    if (path === RUN_A_NODE_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <RunANodeGrantLayout>{children}</RunANodeGrantLayout>
          </main>
        </Box>
      );
    }

    if (path === DATA_COLLECTION_ROUND_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <DataCollectionLayout>{children}</DataCollectionLayout>
          </main>
        </Box>
      );
    }

    if (path === ZK_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <ZKGrantsLayout>{children}</ZKGrantsLayout>
          </main>
        </Box>
      );
    }

    if (path === DATA_CHALLENGE_ROUND_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <DataChallengeLayout>{children}</DataChallengeLayout>
          </main>
        </Box>
      );
    }

    if (GRANTS_URLS.includes(path)) {
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
