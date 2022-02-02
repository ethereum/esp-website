import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { Footer, FooterBackgroundImage, HomepageHero } from '../UI';
import { Forms, NewsletterSignup } from '../forms';
import { ApplicantsLayout } from '../layout';
import { Nav } from '../../components';

import { APPLICANTS_URL, HOME_URL } from '../../constants';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Container maxW='100%' p={0} {...props}>
      <Box px={{ base: 5, md: 12 }} py={{ base: 3, md: 8 }}>
        <Nav />
      </Box>

      {router.pathname === HOME_URL && (
        <>
          <HomepageHero />

          {children}
        </>
      )}

      {router.pathname.startsWith(APPLICANTS_URL) && (
        <Box mt={-6}>
          <main>
            <ApplicantsLayout>{children}</ApplicantsLayout>
          </main>
        </Box>
      )}

      <Forms />

      <FooterBackgroundImage />

      <NewsletterSignup />

      <Footer />
    </Container>
  );
};
