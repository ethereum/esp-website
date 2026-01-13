import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Footer, FooterBackgroundImage, HomepageHero, ActiveRoundBanner } from '../UI';
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
import { RoundFrontmatter } from '../../types';

export const Layout = ({ children, ...props }: ContainerProps) => {
  const router = useRouter();
  const [activeRound, setActiveRound] = useState<RoundFrontmatter | null>(null);

  // Fetch active round for banner
  useEffect(() => {
    const fetchActiveRound = async () => {
      try {
        const response = await fetch('/api/active-round');
        const data = await response.json();
        setActiveRound(data.round);
      } catch (error) {
        console.error('Failed to fetch active round:', error);
      }
    };

    fetchActiveRound();
  }, []);

  // Don't show banner on the round page itself
  const showBanner = activeRound && !router.pathname.startsWith(ROUNDS_URL);

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

    if (router.pathname.startsWith(ROUNDS_URL)) {
      return (
        <Box mt={{ md: -10, lg: 0 }}>
          <main>{children}</main>
        </Box>
      );
    }

    return children;
  };

  return (
    <Container maxW='100%' p={0} {...props}>
      {showBanner && <ActiveRoundBanner round={activeRound} />}

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
