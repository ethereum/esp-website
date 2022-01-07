import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { FC } from 'react';

import { Footer, NavMobile, NewsletterSignup, UnicornSpace } from '../UI/common';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Container maxW={{ base: 'container.mobile', md: '600px' }} p={0} {...props}>
      <Box px={5} py={3}>
        <NavMobile />

        {children}

        <UnicornSpace />
      </Box>

      <NewsletterSignup />

      <Footer />
    </Container>
  );
};
