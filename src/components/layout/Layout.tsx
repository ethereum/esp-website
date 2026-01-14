import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Footer, FooterBackgroundImage, HomepageHero } from '../UI';
import { Forms } from '../forms';

import {
  AboutLayout,
  ApplicantsLayout,
  AcademicGrantsLayout
} from '../layout';
import { Nav } from '../../components';

import {
  ABOUT_URL,
  ACADEMIC_GRANTS_URL,
  APPLICANTS_URL,
  HOME_URL,
  ROUNDS_URL
} from '../../constants';

export const Layout = ({ children, ...props }: ContainerProps) => {
  const router = useRouter();

  // Pages where nav floats over hero image
  const isHeroPage =
    router.pathname === ACADEMIC_GRANTS_URL ||
    router.pathname.startsWith(ROUNDS_URL);

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

    if (router.pathname === ACADEMIC_GRANTS_URL) {
      return (
        <main>
          <AcademicGrantsLayout>{children}</AcademicGrantsLayout>
        </main>
      );
    }

    if (router.pathname.startsWith(ROUNDS_URL)) {
      return <main>{children}</main>;
    }

    return children;
  };

  return (
    <Container maxW='100%' p={0} {...props}>
      {!isHeroPage && (
        <Box px={{ base: 5, md: 12 }} py={{ base: 3, md: 8 }}>
          <Nav />
        </Box>
      )}

      {isHeroPage && (
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          zIndex='banner'
          px={{ base: 5, md: 12 }}
          py={{ base: 3, md: 8 }}
        >
          <Nav />
        </Box>
      )}

      {renderContent()}

      <Forms />

      <FooterBackgroundImage />

      <Footer />
    </Container>
  );
};
