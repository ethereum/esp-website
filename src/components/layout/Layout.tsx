import { Box, Container, ContainerProps, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Footer, FooterBackgroundImage, HomepageHero } from '../UI';
import { Forms } from '../forms';

import {
  AboutLayout,
  AcademicGrantsApplyLayout,
  AcademicGrantsLayout,
  ApplicantsLayout
} from '../layout';
import { Nav } from '../../components';

import {
  ABOUT_URL,
  ACADEMIC_GRANTS_URL,
  APPLICANTS_URL,
  DEVCON_GRANTS_URL,
  GRANTS_URLS,
  HOME_URL,
  LAYER_2_GRANTS_URL
} from '../../constants';
import { DevconGrantsLayout } from './DevconGrantsLayout';
import { Layer2GrantsLayout } from './Layer2GrantsLayout';

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

    if (router.pathname === ACADEMIC_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrantsLayout>{children}</AcademicGrantsLayout>
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
