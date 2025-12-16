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
  HOME_URL
} from '../../constants';

export const Layout = ({ children, ...props }: ContainerProps) => {
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

    if (router.pathname === ACADEMIC_GRANTS_URL) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>
            <AcademicGrantsLayout>{children}</AcademicGrantsLayout>
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
