import { Box, Container, ContainerProps, Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { Footer, NavMobile, NewsletterSignup, UnicornSpace } from '../UI/common';
import { ApplicantsLayout } from './ApplicantsLayout';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Container maxW={{ base: 'container.mobile', md: '600px' }} p={0} {...props}>
      <Box px={5} py={3}>
        <NavMobile />
      </Box>

      {router.pathname.startsWith('/applicants') ? (
        <Box mt={-6}>
          <main>
            <ApplicantsLayout>{children}</ApplicantsLayout>
          </main>
        </Box>
      ) : (
        children
      )}

      <Box px={5} py={3}>
        <UnicornSpace />
      </Box>

      <NewsletterSignup />

      <Footer />
    </Container>
  );
};
