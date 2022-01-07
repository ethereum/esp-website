import { Box, Container, ContainerProps, Flex, Stack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import { Footer, NavMobile, NewsletterSignup, UnicornSpace } from '../UI/common';
import { ApplicantsLayout } from './ApplicantsLayout';

import { ApplicantsContext } from '../../contexts';

import { APPLICANTS_URL } from '../../constants';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const store = { currentTab, setCurrentTab };
  const router = useRouter();

  return (
    <Container maxW={{ base: 'container.mobile', md: '600px' }} p={0} {...props}>
      <Box px={5} py={3}>
        <NavMobile />
      </Box>

      {router.pathname.startsWith(APPLICANTS_URL) ? (
        <Box mt={-6}>
          <main>
            <ApplicantsContext.Provider value={store}>
              <ApplicantsLayout>{children}</ApplicantsLayout>
            </ApplicantsContext.Provider>
          </main>
        </Box>
      ) : (
        children
      )}

      <Box px={5} pb={3}>
        <UnicornSpace />
      </Box>

      <NewsletterSignup />

      <Footer />
    </Container>
  );
};
