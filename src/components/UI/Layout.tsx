import { Container } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  bgGradient?: string;
  h?: string;
}

export const Layout: FC<Props> = ({ bgGradient, children, h }) => {
  return (
    <Container
      bgGradient={bgGradient}
      h={h}
      maxW={{ base: 'container.mobile', md: '600px' }}
      px={5}
      py={3}
    >
      {children}
    </Container>
  );
};
