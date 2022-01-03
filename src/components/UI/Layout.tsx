import { Container, ContainerProps } from '@chakra-ui/react';
import { FC } from 'react';
import { NavMobile } from './NavMobile';
import { UnicornSpace } from './UnicornSpace';

export const Layout: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Container maxW={{ base: 'container.mobile', md: '600px' }} px={5} py={3} {...props}>
      <NavMobile />

      {children}

      <UnicornSpace />
    </Container>
  );
};
