import { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
  to: string;
}

export const SiteBanner: FC<Props> = ({ children, to, ...props }) => {
  return (
    <NextLink href={to} passHref>
      <Link _hover={{ textDecoration: 'none' }}>
        <Box
          w='100%'
          minH='60px'
          px={3}
          py={3}
          display='flex'
          justifyContent='center'
          alignItems='center'
          bg='brand.accent'
          color='white'
          {...props}
        >
          {children}
        </Box>
      </Link>
    </NextLink>
  );
};
