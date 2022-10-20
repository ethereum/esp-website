import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const DimLayer: FC<BoxProps> = props => (
  <Box
    display={{ base: 'none', md: 'block' }}
    position='absolute'
    top={0}
    left={0}
    right={0}
    width='full'
    height='200px'
    bgGradient='linear-gradient(rgba(255,255,255,0.7), transparent)'
    zIndex={1}
    {...props}
  />
);
