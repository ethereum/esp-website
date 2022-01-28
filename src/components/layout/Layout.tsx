import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { Footer, FooterBackgroundImage, HomepageHero } from '../UI';
import { Forms, NewsletterSignup } from '../forms';
import { ApplicantsLayout } from '../layout';
import { NavMobile } from '../../components';

import { APPLICANTS_URL } from '../../constants';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Container maxW={{ base: 'container.mobile', md: '730px' }} p={0} {...props}>
      <Box px={5} py={3}>
        <NavMobile />
      </Box>

      {router.pathname === '/' && (
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
