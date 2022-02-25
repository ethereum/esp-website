import { FC } from 'react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Banner } from './Banner';

interface Props {
  to: string;
}

export const BannerClickeable: FC<Props> = ({ children, to, ...props }) => {
  return (
    <NextLink href={to} passHref>
      <Link _hover={{ textDecoration: 'none' }}>
        <Banner {...props}>{children}</Banner>
      </Link>
    </NextLink>
  );
};
